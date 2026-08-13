/**
 * lib/utils.ts — Core Utility Functions
 *
 * Shared pure utility functions used across the EcoNexus application.
 * All functions here must be side-effect free.
 *
 * Reference: 02-structure.md (lib/ responsibility)
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ── Tailwind Class Merging ──────────────────────────────────────────────────
/**
 * Merges Tailwind CSS class names, resolving conflicts intelligently.
 * Used by all shadcn/ui components and custom components.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-eco-green", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ── Number Formatting ───────────────────────────────────────────────────────
/**
 * Formats a carbon emission value (kg CO₂e) into a human-readable string.
 *
 * @example
 * formatCarbon(1234.5) → "1,234.5 kg CO₂e"
 * formatCarbon(0.25)   → "0.25 kg CO₂e"
 */
export function formatCarbon(kg: number): string {
  return `${kg.toLocaleString("en-US", { maximumFractionDigits: 1 })} kg CO₂e`;
}

/**
 * Formats carbon in tonnes if value >= 1000 kg.
 *
 * @example
 * formatCarbonSmart(1500) → "1.5 tonnes CO₂e"
 * formatCarbonSmart(250)  → "250 kg CO₂e"
 */
export function formatCarbonSmart(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toLocaleString("en-US", { maximumFractionDigits: 2 })} tonnes CO₂e`;
  }
  return formatCarbon(kg);
}

/**
 * Formats a Green Points value with thousands separator.
 *
 * @example
 * formatPoints(12500) → "12,500 pts"
 */
export function formatPoints(points: number): string {
  return `${points.toLocaleString("en-US")} pts`;
}

// ── Date Utilities ──────────────────────────────────────────────────────────
/**
 * Formats a date as a relative string (e.g., "2 days ago", "just now").
 */
export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;

  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Formats a date as a short readable string.
 *
 * @example
 * formatDate(new Date()) → "Aug 6, 2026"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ── String Utilities ────────────────────────────────────────────────────────
/**
 * Converts a string to title case.
 *
 * @example
 * toTitleCase("carbon blueprint") → "Carbon Blueprint"
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
}

/**
 * Truncates a string to a max length, adding ellipsis if needed.
 *
 * @example
 * truncate("Long description text", 15) → "Long descriptio..."
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
}

// ── Validation Helpers ──────────────────────────────────────────────────────
/**
 * Checks if a value is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Checks if an email address is valid (basic format check).
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Carbon Score Utilities ──────────────────────────────────────────────────
/**
 * Returns a semantic label for a carbon score.
 * Score is normalized 0–100 where lower is better.
 *
 * @example
 * getCarbonLabel(15) → "Excellent"
 * getCarbonLabel(75) → "Needs Work"
 */
export function getCarbonLabel(
  score: number,
): "Excellent" | "Good" | "Average" | "Needs Work" | "Critical" {
  if (score <= 20) return "Excellent";
  if (score <= 40) return "Good";
  if (score <= 60) return "Average";
  if (score <= 80) return "Needs Work";
  return "Critical";
}

/**
 * Returns the EcoNexus accent color for a carbon score.
 * Used consistently across all carbon-related UI elements.
 */
export function getCarbonColor(score: number): string {
  if (score <= 20) return "#2ED47A"; // eco-green
  if (score <= 40) return "#3AE374"; // emerald
  if (score <= 60) return "#FFD54A"; // yellow
  if (score <= 80) return "#FF9D42"; // orange
  return "#FF5D73";                  // red
}
