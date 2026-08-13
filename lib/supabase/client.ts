/**
 * Supabase Browser Client — EcoNexus
 *
 * Creates a Supabase client for use in Client Components (browser context).
 * Singleton pattern — one client instance per browser session.
 *
 * Usage:
 *   const supabase = createClient()
 *   const { data, error } = await supabase.from('profiles').select()
 *
 * Reference: 09-database.md, 17-security-architecture.md
 *
 * IMPORTANT: Never import this in Server Components.
 * For Server Components, use @/lib/supabase/server instead.
 */

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
