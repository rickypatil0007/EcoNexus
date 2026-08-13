/**
 * EcoButton — EcoNexus Primary Button Component
 *
 * The primary interactive button for the EcoNexus application.
 * Implements the full button system from design.md.
 *
 * Variants (design.md Button System):
 *   primary   — Eco Green gradient, main CTA actions
 *   secondary — Glass surface, secondary actions
 *   ghost     — No background, minimal emphasis
 *   outline   — Border only, neutral actions
 *   danger    — Red, destructive actions
 *
 * Sizes:
 *   sm  — 36px height
 *   md  — 48px height (default, per design.md)
 *   lg  — 56px height
 *   icon — 40x40px square
 *
 * Reference: 04-design.md (Button System section)
 */

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface EcoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  /** Show a loading spinner and disable the button */
  readonly isLoading?: boolean;
  /** Optional icon rendered before the label */
  readonly leftIcon?: React.ReactNode;
  /** Optional icon rendered after the label */
  readonly rightIcon?: React.ReactNode;
}

// ── Base Styles ────────────────────────────────────────────────────────────────
const baseStyles =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-green focus-visible:ring-offset-2 focus-visible:ring-offset-eco-bg-primary disabled:pointer-events-none disabled:opacity-40 select-none active:scale-[0.97]";

// ── Variant Styles ────────────────────────────────────────────────────────────
const variantClasses: Record<ButtonVariant, string> = {
  primary:   "text-white",
  secondary: "text-eco-text-secondary hover:text-white",
  ghost:     "text-eco-text-secondary hover:text-white hover:bg-white/5",
  outline:   "text-eco-text-secondary hover:text-white hover:border-white/20",
  danger:    "text-white",
};

const variantInlineStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #2ED47A, #3AE374)",
    boxShadow: "0 0 24px rgba(46, 212, 122, 0.25)",
    color: "#05070A",
  },
  secondary: {
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
  },
  ghost: {
    background: "transparent",
  },
  outline: {
    background: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.14)",
  },
  danger: {
    background: "linear-gradient(135deg, #FF5D73, #FF3355)",
    boxShadow: "0 0 20px rgba(255, 93, 115, 0.20)",
    color: "#FFFFFF",
  },
};

// ── Size Styles ───────────────────────────────────────────────────────────────
const sizeClasses: Record<ButtonSize, string> = {
  sm:   "h-9 rounded-xl px-4 text-sm font-medium tracking-wide",
  md:   "h-11 rounded-xl px-5 text-sm font-semibold tracking-wide",
  lg:   "h-13 rounded-xl px-7 text-[15px] font-semibold tracking-wide",
  icon: "h-10 w-10 rounded-xl",
};

// ── Loading Spinner ───────────────────────────────────────────────────────────
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      <path
        d="M14 8a6 6 0 01-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
const EcoButton = forwardRef<HTMLButtonElement, EcoButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        style={{
          ...variantInlineStyles[variant],
          ...style,
        }}
        {...props}
      >
        {isLoading ? <LoadingSpinner /> : leftIcon}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon}
      </button>
    );
  },
);

EcoButton.displayName = "EcoButton";

export { EcoButton };
export type { EcoButtonProps, ButtonVariant, ButtonSize };
