/**
 * Dashboard Page — EcoNexus
 *
 * Personal sustainability command center.
 * Shows all placeholder cards for Phase 4.
 * Phase 5: Cards become live with real data from Supabase.
 *
 * Reference: 02-structure.md, 04-design.md
 */

import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CarbonScoreCard } from "@/features/dashboard/components/cards/carbon-score-card";
import { EcoCoachCard }    from "@/features/dashboard/components/cards/eco-coach-card";
import { ChallengesCard }  from "@/features/dashboard/components/cards/challenges-card";
import { ProgressCard }    from "@/features/dashboard/components/cards/progress-card";
import { ActivityCard }    from "@/features/dashboard/components/cards/activity-card";
import { AQICard }         from "@/features/dashboard/components/cards/aqi-card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal EcoNexus sustainability dashboard.",
};

export default async function DashboardPage() {
  // Fetch user for greeting
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  let carbonRecord = null;
  let userChallenges = null;
  let activities: any[] = [];

  if (user) {
    const [profileRes, carbonRecordRes, userChallengesRes, activitiesRes] = await Promise.all([
      (supabase as any).from("profiles").select("*").eq("user_id", user.id).single(),
      (supabase as any).from("carbon_records").select("*").eq("user_id", user.id).order("assessment_date", { ascending: false }).limit(1).single(),
      (supabase as any).from("user_challenges").select("*, challenges(*)").eq("user_id", user.id).eq("status", "active").limit(3),
      (supabase as any).from("activities").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5)
    ]);
    
    profile = profileRes.data;
    carbonRecord = carbonRecordRes.data;
    userChallenges = userChallengesRes.data;
    activities = activitiesRes.data || [];
  }

  const firstName = (profile as any)?.display_name?.split(" ")[0]
    ?? user?.email?.split("@")[0]
    ?? "Explorer";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 18 ? "Good afternoon" :
    "Good evening";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <p className="text-sm" style={{ color: "#7C8794" }}>
          {greeting},
        </p>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#FFFFFF" }}>
          {firstName}
        </h1>
        <p className="text-xs" style={{ color: "#4A5568" }}>
          Here&apos;s your sustainability snapshot for today
        </p>
      </div>

      {/* Top Row: Carbon Score + AI Coach + Challenges */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <CarbonScoreCard record={carbonRecord} />
        <EcoCoachCard />
        <ChallengesCard activeChallenges={userChallenges || []} />
      </div>

      {/* Bottom Row: Progress + Activity + AQI */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ProgressCard profile={profile} />
        <ActivityCard activities={activities || []} />
        <AQICard />
      </div>

      {/* Phase notice */}
      <div
        className="px-5 py-4 text-sm"
        style={{
          background: "rgba(46,212,122,0.04)",
          border: "1px solid rgba(46,212,122,0.10)",
          color: "#2ED47A",
        }}
      >
        <span className="font-semibold">Phase 5 complete</span>
        <span style={{ color: "#7C8794" }}>
          {" "}— Dashboard is now connected to real Supabase data and Vercel AI SDK.
        </span>
      </div>
    </div>
  );
}

