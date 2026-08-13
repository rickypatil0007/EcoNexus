/**
 * Global User Types — EcoNexus
 *
 * TypeScript interfaces for all user-related data structures.
 * These types map to the Supabase database schema (09-database.md).
 *
 * Reference: 09-database.md (users, profiles tables)
 */

// ── User Roles ──────────────────────────────────────────────────────────────
/**
 * The four user roles supported by EcoNexus MVP.
 * Used for role-based access control and dashboard routing.
 */
export type UserRole = "individual" | "college" | "ngo" | "csr";

// ── Base User ───────────────────────────────────────────────────────────────
/**
 * The authenticated user record from Supabase Auth.
 * Extended by Profile for additional user data.
 */
export interface User {
  readonly id: string;
  readonly email: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ── User Profile ─────────────────────────────────────────────────────────────
/**
 * Extended user profile stored in the `profiles` table.
 * Created after initial Supabase Auth signup.
 */
export interface Profile {
  readonly id: string;
  readonly userId: string;
  readonly displayName: string;
  readonly avatarUrl: string | null;
  readonly role: UserRole;
  readonly bio: string | null;
  readonly location: string | null;
  readonly onboardingCompleted: boolean;
  readonly greenPoints: number;
  readonly streakDays: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

/**
 * Profile creation payload — used when creating a new profile after signup.
 */
export type CreateProfilePayload = Omit<
  Profile,
  "id" | "createdAt" | "updatedAt" | "greenPoints" | "streakDays"
>;

/**
 * Profile update payload — all fields optional.
 */
export type UpdateProfilePayload = Partial<
  Omit<Profile, "id" | "userId" | "createdAt" | "updatedAt">
>;

// ── User Session ─────────────────────────────────────────────────────────────
/**
 * Combines auth user + profile for use in the application layer.
 */
export interface UserSession {
  readonly user: User;
  readonly profile: Profile;
}

// ── Onboarding ───────────────────────────────────────────────────────────────
/**
 * User onboarding answers — used to seed the initial Carbon Blueprint.
 * Reference: 07-carbon-blueprint.md
 */
export interface OnboardingAnswers {
  // Transportation
  readonly weeklyCarKm: number;
  readonly usesPublicTransport: boolean;
  readonly flightsPerYear: number;

  // Energy
  readonly monthlyElectricityKwh: number;
  readonly usesRenewableEnergy: boolean;

  // Lifestyle
  readonly dietType: "vegan" | "vegetarian" | "omnivore" | "meat_heavy";
  readonly recyclingHabit: "always" | "sometimes" | "rarely" | "never";
  readonly wasteKgPerWeek: number;
}
