/**
 * GlassCard — EcoNexus Shared Component
 *
 * The primary card/panel component using the EcoNexus glassmorphism design.
 * Features an interactive cursor spotlight effect on mouse hover.
 *
 * Variants:
 *   default   — standard glass panel
 *   elevated  — higher contrast for prominent content
 *   bordered  — with accent color border
 *
 * Reference: 04-design.md (Component Design System)
 */

"use client";

import { type HTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
type GlassCardVariant = "default" | "elevated" | "bordered";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: GlassCardVariant;
  /** Remove the default padding */
  readonly noPadding?: boolean;
}

// ── Variant Styles ────────────────────────────────────────────────────────────
const variantStyles: Record<GlassCardVariant, string> = {
  default:  "glass-card",
  elevated: "glass-card shadow-xl",
  bordered: "glass-card",
};

const variantInlineStyles: Record<
  GlassCardVariant,
  React.CSSProperties
> = {
  default: {
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  elevated: {
    border: "1px solid rgba(255, 255, 255, 0.10)",
    boxShadow:
      "0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.07)",
  },
  bordered: {
    border: "1px solid rgba(46, 212, 122, 0.20)",
    boxShadow: "0 0 24px rgba(46, 212, 122, 0.06)",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────
const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", noPadding = false, style, onMouseMove, onMouseLeave, ...props }, ref) => {
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      if (onMouseMove) onMouseMove(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setMousePos(null);
      if (onMouseLeave) onMouseLeave(e);
    };

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative overflow-hidden rounded-[20px] transition-all duration-200",
          variantStyles[variant],
          !noPadding && "p-6",
          className,
        )}
        style={{
          ...variantInlineStyles[variant],
          ...style,
        }}
        {...props}
      >
        {mousePos && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
            style={{
              background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(46, 212, 122, 0.10), rgba(79, 169, 255, 0.04) 50%, transparent 75%)`,
            }}
          />
        )}
        <div className="relative z-20">{props.children}</div>
      </div>
    );
  },
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
export type { GlassCardProps, GlassCardVariant };
