/**
 * Loading Spinner — EcoNexus Shared Component
 *
 * Accessible loading indicator used across the application.
 * Respects prefers-reduced-motion via CSS (globals.css).
 */

import { cn } from "@/lib/utils";

interface SpinnerProps {
  readonly size?: "sm" | "md" | "lg";
  readonly className?: string;
  readonly label?: string;
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 40,
};

export function Spinner({
  size = "md",
  className,
  label = "Loading...",
}: SpinnerProps) {
  const px = sizeMap[size];

  return (
    <div
      role="status"
      aria-label={label}
      className={cn("flex items-center justify-center", className)}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        className="animate-spin"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
        <path
          d="M22 12a10 10 0 01-10 10"
          stroke="#2ED47A"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
