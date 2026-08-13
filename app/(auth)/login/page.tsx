/**
 * Login Page — EcoNexus
 *
 * Full Supabase email/password login with:
 * - Form validation
 * - Loading states
 * - Error handling
 * - Framer Motion entrance animations
 *
 * Reference: 04-design.md, 17-security-architecture.md
 */

"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Mail, Lock, ArrowRight, Leaf } from "lucide-react";
import { loginAction, type AuthResult } from "@/actions/auth";
import { AuthInput } from "@/components/ui/auth-input";
import { EcoButton } from "@/components/ui/eco-button";

// ── Animation Variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

// ── Initial state ─────────────────────────────────────────────────────────────

const initialState: AuthResult = {};

// ── Component ─────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const emailRef = useRef<HTMLInputElement>(null);

  // Focus email on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="w-full max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-3xl p-8"
        style={{
          background: "rgba(5, 7, 10, 0.85)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(46,212,122,0.4) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        {/* Header */}
        <motion.div className="mb-8 text-center" variants={itemVariants}>
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(46,212,122,0.2), rgba(79,169,255,0.1))",
              border: "1px solid rgba(46,212,122,0.25)",
            }}
          >
            <Leaf size={24} style={{ color: "#2ED47A" }} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#FFFFFF" }}>
            Welcome back
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#9BA3AE" }}>
            Continue your sustainability journey
          </p>
        </motion.div>

        {/* Form */}
        <form action={formAction} className="space-y-4" noValidate>
          <motion.div variants={itemVariants}>
            <AuthInput
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              label="Email address"
              defaultValue="demo@econexus.com"
              placeholder="you@example.com"
              autoComplete="email"
              icon={<Mail size={16} />}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AuthInput
              id="password"
              name="password"
              type="password"
              label="Password"
              defaultValue="password123"
              placeholder="••••••••"
              autoComplete="current-password"
              icon={<Lock size={16} />}
            />
          </motion.div>

          {/* Forgot password */}
          <motion.div className="flex justify-end" variants={itemVariants}>
            <Link
              href="/forgot-password"
              className="text-xs transition-colors hover:text-white"
              style={{ color: "#4FA9FF" }}
            >
              Forgot password?
            </Link>
          </motion.div>

          {/* Server error */}
          {state.error && (
            <motion.div
              className="rounded-xl p-3 text-sm"
              style={{
                background: "rgba(255, 93, 115, 0.08)",
                border: "1px solid rgba(255, 93, 115, 0.20)",
                color: "#FF5D73",
              }}
              role="alert"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {state.error}
            </motion.div>
          )}

          {/* Submit */}
          <motion.div variants={itemVariants}>
            <EcoButton
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isPending}
              rightIcon={<ArrowRight size={16} />}
              className="w-full"
              id="login-submit"
            >
              {isPending ? "Signing in…" : "Sign in"}
            </EcoButton>
          </motion.div>
        </form>

        {/* Divider */}
        <motion.div className="my-6 flex items-center gap-3" variants={itemVariants}>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
          <span className="text-xs" style={{ color: "#4A5568" }}>or</span>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.08)" }} />
        </motion.div>

        {/* Demo Login */}
        <motion.div className="mb-6" variants={itemVariants}>
          <form action={formAction}>
            <input type="hidden" name="email" value="demo@econexus.com" />
            <input type="hidden" name="password" value="password123" />
            <EcoButton
              type="submit"
              variant="secondary"
              className="w-full bg-white/5 hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#FFFFFF" }}
            >
              Log in with Demo Account
            </EcoButton>
          </form>
        </motion.div>

        {/* Register link */}
        <motion.p className="text-center text-sm" style={{ color: "#9BA3AE" }} variants={itemVariants}>
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold transition-colors hover:opacity-80"
            style={{ color: "#2ED47A" }}
          >
            Create one free
          </Link>
        </motion.p>
      </div>
    </motion.div>
  );
}
