/**
 * Challenge Types — EcoNexus
 *
 * TypeScript interfaces for the Eco Challenge system.
 * Maps to `challenges` and `user_challenges` tables (09-database.md).
 *
 * Reference: 07-carbon-blueprint.md (challenge section), 09-database.md
 */

import type { CarbonCategory } from "./carbon";

// ── Challenge ─────────────────────────────────────────────────────────────────
export interface Challenge {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: CarbonCategory;
  readonly difficulty: "easy" | "medium" | "hard";
  /** Green Points awarded on completion */
  readonly pointsReward: number;
  /** Estimated CO₂e reduction in kg */
  readonly estimatedImpactKg: number;
  /** Duration in days */
  readonly durationDays: number;
  readonly isActive: boolean;
  readonly createdAt: string;
}

// ── User Challenge ────────────────────────────────────────────────────────────
/**
 * A user's participation record for a specific challenge.
 */
export interface UserChallenge {
  readonly id: string;
  readonly userId: string;
  readonly challengeId: string;
  readonly challenge: Challenge;
  readonly status: "active" | "completed" | "abandoned";
  readonly startedAt: string;
  readonly completedAt: string | null;
  readonly proofImageUrl: string | null;
  readonly pointsEarned: number;
  readonly createdAt: string;
}

/**
 * Payload to join a challenge.
 */
export type JoinChallengePayload = {
  readonly userId: string;
  readonly challengeId: string;
};

/**
 * Payload to complete a challenge.
 */
export type CompleteChallengePayload = {
  readonly userChallengeId: string;
  readonly proofImageUrl?: string;
};
