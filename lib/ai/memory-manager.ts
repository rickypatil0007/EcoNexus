import { SupabaseClient } from "@supabase/supabase-js";

export interface ChatHistoryRecord {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export async function getConversationHistory(
  supabase: SupabaseClient,
  userId: string,
  limit = 50
): Promise<ChatHistoryRecord[]> {
  const { data, error } = await supabase
    .from("chat_history")
    .select("id, role, content, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Failed to load conversation history:", error);
    return [];
  }

  return (data ?? []) as ChatHistoryRecord[];
}

export async function saveConversationHistory(
  supabase: SupabaseClient,
  userId: string,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
) {
  if (!messages || messages.length === 0) return;

  const records = messages.map((msg) => ({
    user_id: userId,
    role: msg.role,
    content: msg.content,
  }));

  const { error } = await supabase
    .from("chat_history")
    .insert(records);

  if (error) {
    console.error("Failed to save conversation history:", error);
  }
}
