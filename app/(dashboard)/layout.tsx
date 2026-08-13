/**
 * Dashboard Layout — (dashboard) Route Group
 *
 * Server Component that:
 *   1. Fetches the authenticated user from Supabase
 *   2. Redirects to /login if not authenticated
 *   3. Fetches profile data (display_name)
 *   4. Passes user context to the DashboardShell (client component)
 *
 * Reference: 02-structure.md, 17-security-architecture.md
 */

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default:  "Dashboard | EcoNexus",
    template: "%s | EcoNexus",
  },
};

export default async function DashboardLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  // ── Auth Guard ─────────────────────────────────────────────────────────────
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ── Fetch Profile (best-effort — no hard fail) ─────────────────────────────
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("user_id", user.id)
    .maybeSingle() as { data: { display_name: string | null } | null; error: unknown };

  const displayName = profile?.display_name ?? undefined;
  const userEmail   = user.email ?? undefined;

  return (
    <DashboardShell
      userEmail={userEmail}
      displayName={displayName}
    >
      {children}
    </DashboardShell>
  );
}

