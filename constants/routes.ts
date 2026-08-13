/**
 * Application Routes — EcoNexus
 *
 * Centralized route constants. Import from here — never hardcode paths.
 * Changing a route only requires updating this file.
 *
 * Reference: 02-structure.md (section 27 — Route Groups)
 */

export const ROUTES = {
  // ── Public ──────────────────────────────────────────────────────────────
  HOME: "/",
  ABOUT: "/about",
  FEATURES: "/features",
  PRICING: "/pricing",
  CONTACT: "/contact",
  FAQ: "/faq",
  PRIVACY: "/privacy",
  TERMS: "/terms",

  // ── Authentication ───────────────────────────────────────────────────────
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    VERIFY_EMAIL: "/verify-email",
    ONBOARDING: "/onboarding",
  },

  // ── Dashboard ─────────────────────────────────────────────────────────────
  DASHBOARD: {
    HOME: "/dashboard",
    CARBON: "/dashboard/carbon-blueprint",
    CHALLENGES: "/dashboard/challenges",
    ASSISTANT: "/dashboard/assistant",
    ECOFOREST: "/dashboard/ecoforest",
    REWARDS: "/dashboard/rewards",
    REPORTS: "/dashboard/reports",
    SETTINGS: "/dashboard/settings",
    PROFILE: "/dashboard/profile",
  },

  // ── Organization ──────────────────────────────────────────────────────────
  ORG: {
    DASHBOARD: "/organization/dashboard",
    MEMBERS: "/organization/members",
    CAMPAIGNS: "/organization/campaigns",
    REPORTS: "/organization/reports",
    SETTINGS: "/organization/settings",
  },
} as const;

// ── Protected Routes (requires authentication) ───────────────────────────────
export const PROTECTED_ROUTE_PREFIXES = [
  "/dashboard",
  "/organization",
] as const;

// ── Auth Routes (redirect to dashboard if authenticated) ─────────────────────
export const AUTH_ROUTE_PREFIX = "/auth";

// ── Default Redirect After Login ─────────────────────────────────────────────
export const DEFAULT_AUTH_REDIRECT = ROUTES.DASHBOARD.HOME;
