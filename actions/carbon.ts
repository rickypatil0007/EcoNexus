"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type CarbonRecordResult = {
  success?: boolean;
  error?: string;
  record?: any;
};

const carbonRecordSchema = z.object({
  total_kg_co2e: z.number().nonnegative(),
  breakdown: z.object({
    transportation: z.number().nonnegative(),
    energy: z.number().nonnegative(),
    food: z.number().nonnegative(),
    waste: z.number().nonnegative(),
    shopping: z.number().nonnegative(),
    other: z.number().nonnegative(),
  }),
  score: z.number().int().min(0).max(1000),
});

export async function submitCarbonRecordAction(
  data: {
    total_kg_co2e: number;
    breakdown: {
      transportation: number;
      energy: number;
      food: number;
      waste: number;
      shopping: number;
      other: number;
    };
    score: number;
  }
): Promise<CarbonRecordResult> {
  try {
    const validation = carbonRecordSchema.safeParse(data);
    if (!validation.success) {
      return { error: "Invalid carbon data submitted" };
    }
    
    const validData = validation.data;

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { error: "User not authenticated" };
    }

    const currentMonth = new Date().toISOString().slice(0, 7); // e.g. "2026-08"

    const { data: record, error } = await (supabase as any)
      .from("carbon_records")
      .insert({
        user_id: user.id,
        total_kg_co2e: validData.total_kg_co2e,
        breakdown: validData.breakdown,
        score: validData.score,
        month: currentMonth
      })
      .select()
      .single();

    if (error) {
      console.error("REAL BLUEPRINT SUPABASE ERROR:", error);
      return { error: "Failed to save carbon blueprint" };
    }

    // Award green points to the user for completing the assessment
    // 50 points for doing an assessment
    try {
      const { data: profile } = await (supabase as any)
        .from("profiles")
        .select("green_points")
        .eq("user_id", user.id)
        .single();

      if (profile) {
        await (supabase as any)
          .from("profiles")
          .update({ green_points: (profile.green_points || 0) + 50 })
          .eq("user_id", user.id);
      }
    } catch (profileErr) {
      console.warn("Could not update green_points (schema may not be migrated yet).");
    }

    revalidatePath("/dashboard");
    revalidatePath("/blueprint");
    
    return { success: true, record };
  } catch (err) {
    console.error("Carbon Action Error:", err);
    return { error: "An unexpected error occurred" };
  }
}
