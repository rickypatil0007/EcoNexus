import { SupabaseClient } from "@supabase/supabase-js";

export interface UserContext {
  userId: string;
  name: string;
  role: string;
  ecoScore: number;
  latestCarbonFootprint: number;
  highestEmissionSource: string;
  activeChallengeTitles: string[];
  preferences: {
    language: string;
    communicationStyle: string;
    challengeDifficulty: string;
  };
}

export async function buildUserContext(supabase: SupabaseClient, userId: string): Promise<UserContext> {
  // 1. Fetch Profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, role, green_points")
    .eq("user_id", userId)
    .single();

  // 2. Fetch Latest Carbon Record
  const { data: latestRecord } = await supabase
    .from("carbon_records")
    .select("total_kg_co2e, score, breakdown")
    .eq("user_id", userId)
    .order("calculated_at", { ascending: false })
    .limit(1)
    .single();

  // 3. Fetch Active Challenges
  const { data: userChallenges } = await supabase
    .from("user_challenges")
    .select("*, challenges(title)")
    .eq("user_id", userId)
    .eq("status", "active");

  const activeChallengeTitles = userChallenges
    ?.map((uc: any) => uc.challenges?.title)
    .filter(Boolean) || [];

  // 4. Fetch Preferences
  const { data: prefs } = await supabase
    .from("preferences")
    .select("*")
    .eq("user_id", userId)
    .single();

  // Process Highest Emission Source
  let highestEmissionSource = "Unknown";
  if (latestRecord?.breakdown) {
    const entries = Object.entries(latestRecord.breakdown as Record<string, number>);
    if (entries.length > 0) {
      highestEmissionSource = entries.sort((a, b) => b[1] - a[1])[0][0];
    }
  }

  return {
    userId,
    name: profile?.display_name || "User",
    role: profile?.role || "individual",
    ecoScore: profile?.green_points || latestRecord?.score || 0,
    latestCarbonFootprint: latestRecord?.total_kg_co2e || 0,
    highestEmissionSource,
    activeChallengeTitles,
    preferences: {
      language: prefs?.preferred_language || "en",
      communicationStyle: prefs?.communication_style || "casual",
      challengeDifficulty: prefs?.challenge_difficulty || "medium",
    },
  };
}
