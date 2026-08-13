"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const joinChallengeSchema = z.object({
  challengeId: z.string().uuid("Invalid challenge ID"),
});

const completeChallengeSchema = z.object({
  challengeId: z.string().uuid("Invalid challenge ID"),
  pointsReward: z.number().int().nonnegative(),
});

export async function getChallengesAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated", challenges: [], userChallenges: [] };

  // Fetch all active challenges
  const { data: challenges } = await (supabase as any)
    .from("challenges")
    .select("*");

  // Fetch user's progress on challenges
  const { data: userChallenges } = await (supabase as any)
    .from("user_challenges")
    .select("*")
    .eq("user_id", user.id);

  return { 
    challenges: challenges || [], 
    userChallenges: userChallenges || [] 
  };
}

export async function joinChallengeAction(challengeId: string) {
  const validation = joinChallengeSchema.safeParse({ challengeId });
  if (!validation.success) {
    return { error: "Invalid input" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await (supabase as any)
    .from("user_challenges")
    .insert({
      user_id: user.id,
      challenge_id: validation.data.challengeId,
      status: "active"
    });

  if (error) {
    console.error("Error joining challenge:", error);
    return { error: "Failed to join challenge" };
  }

  revalidatePath("/challenges");
  revalidatePath("/dashboard");
  return { success: true };
}

export async function completeChallengeAction(challengeId: string, pointsReward: number) {
  const validation = completeChallengeSchema.safeParse({ challengeId, pointsReward });
  if (!validation.success) {
    return { error: "Invalid input" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Update status to completed
  const { error } = await (supabase as any)
    .from("user_challenges")
    .update({ 
      status: "completed",
      completed_at: new Date().toISOString()
    })
    .eq("user_id", user.id)
    .eq("challenge_id", validation.data.challengeId)
    .eq("status", "active");

  if (error) {
    console.error("Error completing challenge:", error);
    return { error: "Failed to complete challenge" };
  }

  // Award points to the user
  try {
    const { data: profile } = await (supabase as any)
      .from("profiles")
      .select("green_points")
      .eq("user_id", user.id)
      .single();

    if (profile) {
      await (supabase as any)
        .from("profiles")
        .update({ green_points: (profile.green_points || 0) + validation.data.pointsReward })
        .eq("user_id", user.id);
    }

    // Award badge for completion
    const { data: challengeData } = await (supabase as any)
      .from("challenges")
      .select("title")
      .eq("id", validation.data.challengeId)
      .single();

    if (challengeData) {
      await (supabase as any)
        .from("user_achievements")
        .insert({
          user_id: user.id,
          achievement_name: `Completed: ${challengeData.title}`,
          description: `Awarded for completing the ${challengeData.title} challenge.`,
        });
    }

  } catch (err) {
    console.warn("Could not update green_points or assign badge (schema may not be migrated yet).");
  }

  revalidatePath("/challenges");
  revalidatePath("/dashboard");
  return { success: true };
}
