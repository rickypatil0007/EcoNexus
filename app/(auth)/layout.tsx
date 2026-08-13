/**
 * Auth Layout — (auth) Route Group
 *
 * Wraps all authentication pages: login, register, forgot-password.
 * Features:
 *   - Full-height dark background with ambient glows
 *   - EcoNexus logo header
 *   - Centered content area
 *   - Subtle animated background particles
 *
 * Reference: 04-design.md, 05-landing-spec.md
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default:  "Sign In | EcoNexus",
    template: "%s | EcoNexus",
  },
};

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ backgroundColor: "#05070A" }}
    >
      {/* ── Ambient Background Glows ── */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        {/* Top-left blue glow */}
        <div
          className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(79,169,255,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Center-right green glow */}
        <div
          className="absolute right-0 top-1/3 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(46,212,122,0.10) 0%, transparent 70%)",
          }}
        />
        {/* Bottom cyan glow */}
        <div
          className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 translate-y-1/3 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(105,229,255,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Star-like dots (CSS-only, no JS) */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Back to EcoNexus home"
        >
          {/* Icon */}
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(46,212,122,0.25), rgba(79,169,255,0.15))",
              border: "1px solid rgba(46,212,122,0.25)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#2ED47A" opacity="0.3"/>
              <path d="M12 4.5C7.31 4.5 3.5 8.31 3.5 13c0 2.41 1.02 4.6 2.64 6.14C7.08 20.33 9.46 21 12 21s4.92-.67 5.86-1.86C19.48 17.6 20.5 15.41 20.5 13c0-4.69-3.81-8.5-8.5-8.5z" fill="#2ED47A" opacity="0.5"/>
              <path d="M12 7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" fill="#2ED47A"/>
            </svg>
          </div>
          <span className="text-base font-bold tracking-tight" style={{ color: "#FFFFFF" }}>
            Eco<span style={{ color: "#2ED47A" }}>Nexus</span>
          </span>
        </Link>

        {/* Already have account link */}
        <Link
          href="/login"
          className="text-sm transition-colors hover:text-white"
          style={{ color: "#7C8794" }}
        >
          Sign in
        </Link>
      </header>

      {/* ── Main Content ── */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        {children}
      </main>

      {/* ── Footer ── */}
      <footer className="px-6 py-4 text-center text-xs" style={{ color: "#4A5568" }}>
        &copy; {new Date().getFullYear()} EcoNexus. All rights reserved.
        <span className="mx-2">·</span>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <span className="mx-2">·</span>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
      </footer>
    </div>
  );
}
