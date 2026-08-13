/**
 * Carbon Blueprint Types — EcoNexus
 *
 * TypeScript interfaces for carbon footprint data structures.
 * Maps to the `carbon_records` table in 09-database.md.
 *
 * Reference: 07-carbon-blueprint.md, 09-database.md
 */

// ── Carbon Categories ────────────────────────────────────────────────────────
/**
 * The emission categories tracked by the Carbon Blueprint engine.
 */
export type CarbonCategory =
  | "transportation"
  | "energy"
  | "food"
  | "waste"
  | "shopping"
  | "other";

// ── Carbon Record ─────────────────────────────────────────────────────────────
/**
 * A single carbon footprint record stored in the database.
 * Created by the Carbon Blueprint calculator.
 */
export interface CarbonRecord {
  readonly id: string;
  readonly userId: string;
  /** Total footprint in kg CO₂e */
  readonly totalKgCo2e: number;
  /** Breakdown by category in kg CO₂e */
  readonly breakdown: CarbonBreakdown;
  /** Normalized score 0–100 (lower = better environmental impact) */
  readonly score: number;
  /** Month this record represents (YYYY-MM format) */
  readonly month: string;
  readonly calculatedAt: string;
  readonly createdAt: string;
}

/**
 * Carbon emission breakdown by category.
 */
export interface CarbonBreakdown {
  readonly transportation: number;
  readonly energy: number;
  readonly food: number;
  readonly waste: number;
  readonly shopping: number;
  readonly other: number;
}

/**
 * Input payload for calculating a new carbon record.
 */
export type CalculateCarbonPayload = {
  readonly userId: string;
  readonly transportationKm: number;
  readonly electricityKwh: number;
  readonly dietType: "vegan" | "vegetarian" | "omnivore" | "meat_heavy";
  readonly wasteKg: number;
  readonly flightsShortHaul: number;
  readonly flightsLongHaul: number;
};

// ── Carbon Trend ─────────────────────────────────────────────────────────────
/**
 * Month-over-month change for trend display.
 */
export interface CarbonTrend {
  readonly month: string;
  readonly totalKgCo2e: number;
  readonly score: number;
  readonly changePercent: number;
  readonly direction: "up" | "down" | "stable";
}

// ── Carbon Recommendation ─────────────────────────────────────────────────────
/**
 * An AI-generated sustainability recommendation.
 * Part of the Eco Coach output.
 */
export interface CarbonRecommendation {
  readonly id: string;
  readonly category: CarbonCategory;
  readonly title: string;
  readonly description: string;
  /** Estimated CO₂e reduction in kg/month */
  readonly estimatedImpactKg: number;
  readonly difficulty: "easy" | "medium" | "hard";
  readonly confidence: number; // 0–100
}
