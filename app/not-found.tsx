/**
 * Custom 404 Not Found Page — EcoNexus
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center text-center"
      style={{ backgroundColor: "#05070A" }}
    >
      <div className="space-y-6">
        <p className="text-8xl font-bold text-gradient-eco">404</p>
        <h1 className="text-2xl font-semibold" style={{ color: "#FFFFFF" }}>
          Page not found
        </h1>
        <p className="max-w-sm text-sm" style={{ color: "#7C8794" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex h-12 items-center justify-center rounded-xl px-8 text-sm font-semibold text-white transition-all"
          style={{
            background: "linear-gradient(135deg, #2ED47A, #3AE374)",
            boxShadow: "0 0 24px rgba(46, 212, 122, 0.25)",
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
