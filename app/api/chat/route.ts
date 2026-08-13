import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText } from "ai";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

function getMessageContent(message: {
  content?: string;
  parts?: Array<{ type: string; text?: string }>;
}): string {
  if (typeof message.content === "string") return message.content;
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text ?? "")
      .join("");
  }
  return "";
}

function normalizeChatMessages(messages: unknown[]) {
  return messages.map((message) => {
    if (!message || typeof message !== "object") {
      return { role: "user", parts: [{ type: "text", text: "" }] };
    }

    const candidate = message as {
      role?: string;
      content?: unknown;
      parts?: unknown;
    };

    const role = candidate.role === "assistant" ? "assistant" : "user";
    const content = typeof candidate.content === "string" ? candidate.content : "";

    if (Array.isArray(candidate.parts) && candidate.parts.length > 0) {
      return {
        role,
        parts: candidate.parts.map((part) => {
          if (part && typeof part === "object" && "type" in part && part.type === "text") {
            return {
              type: "text",
              text: typeof (part as { text?: unknown }).text === "string" ? (part as { text: string }).text : "",
            };
          }

          return { type: "text", text: String(part ?? "") };
        }),
      };
    }

    return {
      role,
      parts: [{ type: "text", text: content }],
    };
  });
}

function formatStreamError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);

  if (message.includes("429") || message.toLowerCase().includes("quota")) {
    return "OpenAI API quota exceeded. Please try again later.";
  }
  if (message.toLowerCase().includes("rate limit")) {
    return "OpenAI rate limit reached. Please wait a moment and try again.";
  }
  return "Failed to generate a response. Please try again.";
}

// Simple in-memory rate limiter (For MVP/Hackathon scale)
// In production, use Redis (e.g. Upstash) or a dedicated rate limiting service
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS_PER_MINUTE = 10;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // ── Rate Limiting ─────────────────────────────────────────────────────────
    const now = Date.now();
    const userLimit = rateLimitMap.get(user.id);
    
    if (userLimit && now < userLimit.resetAt) {
      if (userLimit.count >= MAX_REQUESTS_PER_MINUTE) {
        return new NextResponse("Too Many Requests", { status: 429 });
      }
      userLimit.count++;
    } else {
      // Reset or initialize
      rateLimitMap.set(user.id, { count: 1, resetAt: now + 60 * 1000 });
    }

    let body: { messages?: unknown };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "messages must be a non-empty array" }, { status: 400 });
    }

    // ── Modular Context & Prompt Engine ───────────────────────────────────────
    const { buildUserContext } = await import("@/lib/ai/context-builder");
    const { generateSystemPrompt } = await import("@/lib/ai/prompt-engine");

    const userContext = await buildUserContext(supabase, user.id);
    const systemPrompt = generateSystemPrompt(userContext);

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "NVIDIA API is not configured on the server." },
        { status: 503 },
      );
    }

    // ── Real AI Call ──────────────────────────────────────────────────────────
    const { getChallengesAction, joinChallengeAction } = await import("@/actions/challenges");
    const { z } = await import("zod");
    const { tool } = await import("ai");

    const openai = createOpenAI({
      baseURL: 'https://integrate.api.nvidia.com/v1',
      apiKey,
    });

    const modelId = "meta/llama-3.1-70b-instruct";
    const normalizedMessages = normalizeChatMessages(messages as unknown[]);

    const ecoTools = {
      get_challenges: tool({
        description: "Get the list of available eco-challenges the user can join, as well as the ones they are currently active in.",
        parameters: z.object({}),
        execute: async (_args: any) => {
          const res = await getChallengesAction();
          if (res.error) return "Failed to fetch challenges: " + res.error;
          return JSON.stringify(res);
        },
      } as any),
      join_challenge: tool({
        description: "Join an eco-challenge by ID.",
        parameters: z.object({
          challengeId: z.string().describe("The UUID of the challenge to join"),
        }),
        execute: async (args: any) => {
          const res = await joinChallengeAction(args.challengeId);
          if (res.error) return "Failed to join challenge: " + res.error;
          return "Successfully joined the challenge!";
        },
      } as any),
    };

    const modelMessages = await convertToModelMessages(normalizedMessages as any, {
      tools: ecoTools,
    });

    const result = streamText({
      model: openai.chat(modelId),
      system: systemPrompt,
      messages: modelMessages,
      maxRetries: 0,
      tools: ecoTools,
      onFinish: async ({ text, toolCalls, toolResults }) => {
        // Save the conversation history using Memory Manager
        const { saveConversationHistory } = await import("@/lib/ai/memory-manager");
        
        // We save the last user message and the assistant's response.
        const lastUserMessage = messages[messages.length - 1];

        await saveConversationHistory(supabase, user.id, [
          { role: "user", content: getMessageContent(lastUserMessage) },
          { role: "assistant", content: text || "Tool execution response" },
        ]);
      },
    });

    return result.toUIMessageStreamResponse({
      getErrorMessage: formatStreamError,
    });
  } catch (error) {
    console.error("REAL ECO COACH ERROR:", error);
    console.error({
      hasOpenAIKey: Boolean(process.env.OPENAI_API_KEY),
      hasAnthropicKey: Boolean(process.env.ANTHROPIC_API_KEY),
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
    return NextResponse.json({ error: formatStreamError(error) }, { status: 500 });
  }
}
