/**
 * types/index.ts — Global Type Barrel Export
 *
 * Single entry point for all global TypeScript types.
 * Import from here rather than from individual type files when possible:
 *
 *   import type { User, Profile, CarbonRecord } from "@/types"
 */

export type * from "./user";
export type * from "./carbon";
export type * from "./challenge";
export type * from "./api";
// database types are imported directly where needed for Supabase client typing
