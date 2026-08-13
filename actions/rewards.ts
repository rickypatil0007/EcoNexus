"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const redeemRewardSchema = z.object({
  rewardName: z.string().min(1),
  pointsCost: z.number().int().positive(),
});

export async function getRewardsAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated", rewards: [] };

  const { data: rewards, error } = await (supabase as any)
    .from("user_rewards")
    .select("*")
    .eq("user_id", user.id)
    .order("redeemed_at", { ascending: false });

  if (error) {
    console.error("Error fetching rewards:", error);
    return { error: "Failed to fetch rewards", rewards: [] };
  }

  return { rewards: rewards || [] };
}

export async function redeemRewardAction(rewardName: string, pointsCost: number) {
  const validation = redeemRewardSchema.safeParse({ rewardName, pointsCost });
  if (!validation.success) {
    return { error: "Invalid input" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // 1. Fetch user profile to check points
  const { data: profile, error: profileErr } = await (supabase as any)
    .from("profiles")
    .select("green_points")
    .eq("user_id", user.id)
    .single();

  if (profileErr || !profile) {
    return { error: "Failed to fetch user profile" };
  }

  if ((profile.green_points || 0) < validation.data.pointsCost) {
    return { error: "Not enough green points" };
  }

  // 2. Deduct points
  const { error: updateErr } = await (supabase as any)
    .from("profiles")
    .update({ green_points: profile.green_points - validation.data.pointsCost })
    .eq("user_id", user.id);

  if (updateErr) {
    console.error("Error deducting points:", updateErr);
    return { error: "Failed to deduct points" };
  }

  // 3. Record reward redemption
  const { error: insertErr } = await (supabase as any)
    .from("user_rewards")
    .insert({
      user_id: user.id,
      reward_name: validation.data.rewardName,
      points_cost: validation.data.pointsCost,
    });

  if (insertErr) {
    console.error("Error inserting reward record:", insertErr);
    // Ideally we would rollback the point deduction here, or use a Postgres function
    return { error: "Failed to record reward redemption" };
  }

  revalidatePath("/rewards");
  revalidatePath("/dashboard");
  return { success: true };
}
