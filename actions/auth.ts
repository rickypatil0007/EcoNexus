/**
 * Auth Server Actions — EcoNexus
 *
 * All authentication operations go through these server actions.
 * They sit between the UI forms and Supabase Auth, performing
 * validation before calling the DB.
 *
 * Reference: 02-structure.md (actions layer), 17-security-architecture.md
 */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AuthResult {
  error?: string;
  success?: boolean;
}

// ── Login ─────────────────────────────────────────────────────────────────────

export async function loginAction(_prevState: AuthResult, formData: FormData): Promise<AuthResult> {
  const email    = formData.get("email")    as string;
  const password = formData.get("password") as string;

  // Validation
  if (!email || !password) {
    return { error: "Email and password are required." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Incorrect email or password. Please try again." };
    }
    if (error.message.includes("Email not confirmed")) {
      return { error: "Please verify your email address before signing in." };
    }
    return { error: error.message };
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

// ── Register ──────────────────────────────────────────────────────────────────

export async function registerAction(_prevState: AuthResult, formData: FormData): Promise<AuthResult> {
  const name            = formData.get("name")            as string;
  const email           = formData.get("email")           as string;
  const password        = formData.get("password")        as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validation
  if (!name || !email || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }
  if (name.trim().length < 2) {
    return { error: "Name must be at least 2 characters." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name.trim() },
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "An account with this email already exists." };
    }
    return { error: error.message };
  }

  // If email confirmation is enabled, session will be null
  if (!data.session) {
    return { success: true, error: "Please check your email to verify your account before signing in." };
  }

  // Profile is auto-created via DB trigger (handle_new_user).
  // Redirect to dashboard; middleware confirms session.
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

// ── Logout ────────────────────────────────────────────────────────────────────

export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

// ── Forgot Password ───────────────────────────────────────────────────────────

export async function forgotPasswordAction(_prevState: AuthResult, formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Please enter your email address." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
