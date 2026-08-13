/**
 * EcoNexus Design Token Constants
 *
 * JavaScript/TypeScript access to the design system tokens from globals.css.
 * Used in components that need programmatic access to colors (charts, canvas, etc.).
 *
 * Reference: 04-design.md
 */

// ── Background Colors ────────────────────────────────────────────────────────
export const COLORS = {
  // Backgrounds
  BG_PRIMARY:   "#05070A",
  BG_SECONDARY: "#0D1117",
  BG_SURFACE:   "#141A22",
  BG_ELEVATED:  "#1C2530",

  // Glass
  GLASS:        "rgba(255, 255, 255, 0.08)",
  GLASS_BORDER: "rgba(255, 255, 255, 0.12)",

  // Text
  TEXT_PRIMARY:   "#FFFFFF",
  TEXT_SECONDARY: "#B7BDC6",
  TEXT_MUTED:     "#7C8794",

  // Accents
  ECO_GREEN:   "#2ED47A",
  OCEAN_BLUE:  "#4FA9FF",
  SKY_CYAN:    "#69E5FF",
  SOLAR_YELLOW:"#FFD54A",
  WARNING_ORANGE: "#FF9D42",
  ERROR_RED:   "#FF5D73",
  EMERALD:     "#3AE374",
} as const;

// ── Gradient Definitions ─────────────────────────────────────────────────────
export const GRADIENTS = {
  EARTH_GLOW: "linear-gradient(135deg, #2ED47A, #4FA9FF)",
  AURORA:     "linear-gradient(135deg, #69E5FF, #3AE374)",
  SOLAR:      "linear-gradient(135deg, #FFD54A, #FF9D42)",
  NIGHT:      "linear-gradient(180deg, #0D1117, #05070A)",
  HERO_BG:    "radial-gradient(ellipse at top, rgba(46,212,122,0.08) 0%, transparent 60%)",
} as const;

// ── Carbon Score Color Map ────────────────────────────────────────────────────
/** Maps normalized score ranges (0–100) to display colors. Lower = better. */
export const CARBON_SCORE_COLORS = {
  EXCELLENT:  { max: 20, color: "#2ED47A", label: "Excellent" },
  GOOD:       { max: 40, color: "#3AE374", label: "Good" },
  AVERAGE:    { max: 60, color: "#FFD54A", label: "Average" },
  NEEDS_WORK: { max: 80, color: "#FF9D42", label: "Needs Work" },
  CRITICAL:   { max: 100, color: "#FF5D73", label: "Critical" },
} as const;
