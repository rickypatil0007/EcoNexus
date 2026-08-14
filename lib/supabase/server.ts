/**
 * Supabase Server Client — EcoNexus
 *
 * Creates a Supabase client for use in Server Components, Server Actions,
 * and Route Handlers. Reads cookies via Next.js cookies() API.
 *
 * Usage in Server Component:
 *   const supabase = await createClient()
 *   const { data: { user } } = await supabase.auth.getUser()
 *
 * Usage in Server Action:
 *   const supabase = await createClient()
 *   const { error } = await supabase.from('profiles').insert(...)
 *
 * Reference: 09-database.md, 17-security-architecture.md
 *
 * IMPORTANT: Never import this in Client Components ('use client' files).
 * For Client Components, use @/lib/supabase/client instead.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import type { Database } from "@/types/database";

export const createClient = cache(async () => {
  const cookieStore = await cookies();

  return createServerClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll() is called from Server Components where cookies
            // cannot be set. This can be safely ignored if middleware
            // handles session refresh.
          }
        },
      },
    },
  );
});
