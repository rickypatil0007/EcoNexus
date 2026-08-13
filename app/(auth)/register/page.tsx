/**
 * Register Page — EcoNexus
 *
 * Full Supabase signup form with:
 * - Name, email, password, confirm password fields
 * - Client-side validation feedback
 * - Loading states & error handling
 * - Framer Motion entrance animations
 *
 * Reference: 04-design.md, 17-security-architecture.md
 */

"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Sprout } from "lucide-react";
import { registerAction, type AuthResult } from "@/actions/auth";
import { AuthInput } from "@/components/ui/auth-input";
import { EcoButton } from "@/components/ui/eco-button";

// ── Animation Variants ────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

// ── Initial State ─────────────────────────────────────────────────────────────

const initialState: AuthResult = {};

// ── Component ─────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
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
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(79,169,255,0.5) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        {/* Header */}
        <motion.div className="mb-8 text-center" variants={itemVariants}>
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(79,169,255,0.2), rgba(46,212,122,0.1))",
              border: "1px solid rgba(79,169,255,0.25)",
            }}
          >
            <Sprout size={24} style={{ color: "#4FA9FF" }} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#FFFFFF" }}>
            Start your journey
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#9BA3AE" }}>
            Create your free EcoNexus account
          </p>
        </motion.div>

        {/* Form */}
        <form action={formAction} className="space-y-4" noValidate>
          <motion.div variants={itemVariants}>
            <AuthInput
              ref={nameRef}
              id="name"
              name="name"
              type="text"
              label="Full name"
              placeholder="Alex Johnson"
              autoComplete="name"
              icon={<User size={16} />}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AuthInput
              id="email"
              name="email"
              type="email"
              label="Email address"
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
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              icon={<Lock size={16} />}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <AuthInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm password"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              icon={<Lock size={16} />}
            />
          </motion.div>

          {/* Terms */}
          <motion.p className="text-xs leading-relaxed" style={{ color: "#9BA3AE" }} variants={itemVariants}>
            By creating an account, you agree to our{" "}
            <a href="#" className="underline hover:text-white" style={{ color: "#B7BDC6" }}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-white" style={{ color: "#B7BDC6" }}>
              Privacy Policy
            </a>.
          </motion.p>

          {/* Server feedback */}
          {state.error && !state.success && (
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

          {state.success && (
            <motion.div
              className="rounded-xl p-3 text-sm"
              style={{
                background: "rgba(46, 212, 122, 0.08)",
                border: "1px solid rgba(46, 212, 122, 0.20)",
                color: "#2ED47A",
              }}
              role="status"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {state.error || "Account created successfully!"}
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
              id="register-submit"
            >
              {isPending ? "Creating account…" : "Create free account"}
            </EcoButton>
          </motion.div>
        </form>

        {/* Login link */}
        <motion.p className="mt-6 text-center text-sm" style={{ color: "#9BA3AE" }} variants={itemVariants}>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold transition-colors hover:opacity-80"
            style={{ color: "#2ED47A" }}
          >
            Sign in
          </Link>
        </motion.p>
      </div>
    </motion.div>
  );
}
