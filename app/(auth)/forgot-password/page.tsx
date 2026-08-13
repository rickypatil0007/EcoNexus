/**
 * Forgot Password Page — EcoNexus
 *
 * Sends a password reset email via Supabase.
 * Shows success state after submission.
 *
 * Reference: 17-security-architecture.md
 */

"use client";

import { useActionState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { forgotPasswordAction, type AuthResult } from "@/actions/auth";
import { AuthInput } from "@/components/ui/auth-input";
import { EcoButton } from "@/components/ui/eco-button";

// ── Animations ────────────────────────────────────────────────────────────────

import type { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const initialState: AuthResult = {};

// ── Component ─────────────────────────────────────────────────────────────────

export default function ForgotPasswordPage() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, initialState);

  return (
    <motion.div
      className="w-full max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        className="relative overflow-hidden rounded-3xl p-8"
        style={{
          background: "rgba(20, 26, 34, 0.85)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(255,213,74,0.4) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        {state.success ? (
          /* ── Success State ── */
          <motion.div
            className="py-4 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "rgba(46,212,122,0.12)", border: "1px solid rgba(46,212,122,0.3)" }}
            >
              <CheckCircle size={28} style={{ color: "#2ED47A" }} />
            </div>
            <h2 className="text-xl font-bold" style={{ color: "#FFFFFF" }}>Check your inbox</h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#7C8794" }}>
              We&apos;ve sent you a password reset link. Check your email and follow the instructions.
            </p>
            <div className="mt-6">
              <Link href="/login">
                <EcoButton variant="secondary" size="md" className="w-full" leftIcon={<ArrowLeft size={16} />}>
                  Back to sign in
                </EcoButton>
              </Link>
            </div>
          </motion.div>
        ) : (
          /* ── Form State ── */
          <>
            <motion.div className="mb-8 text-center" variants={itemVariants}>
              <div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(255,213,74,0.15), rgba(255,157,66,0.1))",
                  border: "1px solid rgba(255,213,74,0.25)",
                }}
              >
                <Mail size={24} style={{ color: "#FFD54A" }} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#FFFFFF" }}>
                Reset your password
              </h1>
              <p className="mt-1 text-sm" style={{ color: "#7C8794" }}>
                Enter your email and we&apos;ll send a reset link
              </p>
            </motion.div>

            <form action={formAction} className="space-y-4" noValidate>
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

              <motion.div variants={itemVariants}>
                <EcoButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isPending}
                  className="w-full"
                  id="forgot-submit"
                >
                  {isPending ? "Sending…" : "Send reset link"}
                </EcoButton>
              </motion.div>
            </form>

            <motion.div className="mt-6 text-center" variants={itemVariants}>
              <Link
                href="/login"
                className="inline-flex items-center gap-1 text-sm transition-colors hover:text-white"
                style={{ color: "#7C8794" }}
              >
                <ArrowLeft size={14} />
                Back to sign in
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
