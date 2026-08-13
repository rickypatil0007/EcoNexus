"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const preferencesSchema = z.object({
  language: z.string(),
  communicationStyle: z.string(),
  challengeDifficulty: z.string(),
  notificationTime: z.string().optional(),
});

export async function savePreferencesAction(data: {
  language: string;
  communicationStyle: string;
  challengeDifficulty: string;
  notificationTime?: string;
}) {
  const validation = preferencesSchema.safeParse(data);
  if (!validation.success) {
    return { error: "Invalid preferences data" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const validData = validation.data;

  // Upsert preferences
  const { error } = await (supabase as any)
    .from("preferences")
    .upsert({
      user_id: user.id,
      preferred_language: validData.language,
      communication_style: validData.communicationStyle,
      challenge_difficulty: validData.challengeDifficulty,
      notification_time: validData.notificationTime,
    }, { onConflict: "user_id" });

  if (error) {
    console.error("Error saving preferences:", error);
    return { error: "Failed to save preferences" };
  }

  revalidatePath("/settings");
  revalidatePath("/coach");
  return { success: true };
}

export async function getPreferencesAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: prefs } = await (supabase as any)
    .from("preferences")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return prefs || null;
}
