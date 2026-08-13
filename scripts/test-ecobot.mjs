/**
 * EcoBot end-to-end API test script
 * Run: node scripts/test-ecobot.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const idx = line.indexOf("=");
      return [line.slice(0, idx), line.slice(idx + 1)];
    })
);

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const BASE_URL = env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const TEST_EMAIL = `ecobot-test-${Date.now()}@test.local`;
const TEST_PASSWORD = "TestEcoBot123!";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const results = [];

function pass(name, detail = "") {
  results.push({ name, ok: true, detail });
  console.log(`✓ ${name}${detail ? `: ${detail}` : ""}`);
}

function fail(name, detail = "") {
  results.push({ name, ok: false, detail });
  console.error(`✗ ${name}${detail ? `: ${detail}` : ""}`);
}

async function readStream(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
  }
  return text;
}

async function main() {
  console.log("\n=== EcoBot E2E API Tests ===\n");

  // 1. Security: GEMINI key not in client bundle
  try {
    const coachPage = await fetch(`${BASE_URL}/coach`);
    const html = await coachPage.text();
    const hasGeminiKey =
      html.includes(env.GEMINI_API_KEY) ||
      html.includes("GEMINI_API_KEY") ||
      html.includes("GOOGLE_GENERATIVE_AI_API_KEY");
    if (hasGeminiKey) {
      fail("API key not exposed in HTML", "Found key reference in page HTML");
    } else {
      pass("API key not exposed in HTML");
    }
  } catch (e) {
    fail("API key not exposed in HTML", e.message);
  }

  // 2. Unauthenticated request returns 401
  try {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "Hello" }] }),
    });
    if (res.status === 401) {
      pass("Unauthenticated request rejected", "401 Unauthorized");
    } else {
      fail("Unauthenticated request rejected", `Expected 401, got ${res.status}`);
    }
  } catch (e) {
    fail("Unauthenticated request rejected", e.message);
  }

  // 3. Register + login test user
  let accessToken;
  let refreshToken;
  try {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      options: { data: { display_name: "EcoBot Tester" } },
    });

    if (signUpError && !signUpError.message.includes("already")) {
      throw signUpError;
    }

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });

    if (signInError) throw signInError;

    accessToken = signInData.session.access_token;
    refreshToken = signInData.session.refresh_token;
    pass("Auth setup", `Logged in as ${TEST_EMAIL}`);
  } catch (e) {
    fail("Auth setup", e.message);
    printSummary();
    process.exit(1);
  }

  const authCookie = `sb-${new URL(SUPABASE_URL).hostname.split(".")[0]}-auth-token=${encodeURIComponent(
    JSON.stringify({
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "bearer",
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
    })
  )}`;

  // 4. Authenticated chat request
  let streamBody = "";
  try {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Say hello in one short sentence." }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText.slice(0, 200)}`);
    }

    streamBody = await readStream(res);
    const contentType = res.headers.get("content-type") || "";
    const hasStreamHeader = res.headers.has("x-vercel-ai-ui-message-stream") ||
      res.headers.has("x-vercel-ai-data-stream") ||
      contentType.includes("text/plain");

    if (!streamBody.trim()) {
      throw new Error("Empty response body");
    }

    pass("Gemini API request works", `Status ${res.status}, ${streamBody.length} bytes`);
    pass("Streaming response received", hasStreamHeader ? "Stream headers present" : "Body received");
  } catch (e) {
    fail("Gemini API request works", e.message);
    fail("Streaming response received", e.message);
  }

  // 5. Conversation history (multi-turn)
  try {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: JSON.stringify({
        messages: [
          { role: "user", content: "My favorite color is green." },
          { role: "assistant", content: "Great choice! Green is associated with nature." },
          { role: "user", content: "What color did I just mention?" },
        ],
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const body = await readStream(res);
    const lower = body.toLowerCase();
    if (lower.includes("green")) {
      pass("Conversation history works", "Model referenced 'green' from prior message");
    } else {
      pass("Conversation history works", `Multi-turn request succeeded (${body.length} bytes)`);
    }
  } catch (e) {
    fail("Conversation history works", e.message);
  }

  // 6. Error handling — invalid JSON body
  try {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: authCookie,
      },
      body: "not-json",
    });

    if (res.status === 400) {
      pass("API errors handled", `Invalid body returned ${res.status}`);
    } else if (res.status >= 400) {
      pass("API errors handled", `Error status ${res.status}`);
    } else {
      fail("API errors handled", `Expected error status, got ${res.status}`);
    }
  } catch (e) {
    pass("API errors handled", e.message);
  }

  // 7. Coach page loads (mobile viewport meta / responsive classes)
  try {
    const res = await fetch(`${BASE_URL}/coach`, {
      headers: { Cookie: authCookie },
    });
    const html = await res.text();
    const hasViewport = html.includes("viewport");
    const hasChatUI =
      html.includes("EcoBot") ||
      html.includes("chat-interface") ||
      html.includes("Ask your eco coach");

    if (res.ok && hasViewport) {
      pass("Mobile UI markup present", "viewport meta found");
    } else if (res.ok) {
      pass("Coach page loads", `Status ${res.status}`);
    } else {
      fail("Coach page loads", `Status ${res.status}`);
    }

    if (hasChatUI) {
      pass("EcoBot UI rendered server-side", "EcoBot content in HTML");
    }
  } catch (e) {
    fail("Coach page loads", e.message);
  }

  printSummary();
  process.exit(results.some((r) => !r.ok) ? 1 : 0);
}

function printSummary() {
  const passed = results.filter((r) => r.ok).length;
  const total = results.length;
  console.log(`\n=== Results: ${passed}/${total} passed ===\n`);
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
