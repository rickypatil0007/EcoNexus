import { NewChatbot } from "@/features/eco-coach/components/new-chatbot";
import { getConversationHistory } from "@/lib/ai/memory-manager";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import type { UIMessage } from "ai";

export const metadata: Metadata = {
  title: "AI Eco Coach | EcoNexus",
  description: "Chat with your personalized sustainability assistant.",
};

const initialGreeting =
  "Hi there! I'm your Nexus AI Coach. I can help you understand your carbon footprint, suggest ways to lower your emissions, or answer any questions you have about sustainability. How can I help you today?";

export default async function CoachPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const history = user ? await getConversationHistory(supabase, user.id) : [];

  const initialMessages: UIMessage[] =
    history.length > 0
      ? history.map((record) => ({
          id: record.id,
          role: record.role,
          parts: [{ type: "text", text: record.content }],
        }))
      : [
          {
            id: "init",
            role: "assistant",
            parts: [{ type: "text", text: initialGreeting }],
          },
        ];

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto py-2 sm:py-4">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
          Nexus AI Coach
        </h1>
        <p className="text-sm" style={{ color: "#7C8794" }}>
          Get personalized advice to reduce your environmental impact.
        </p>
      </div>

      <NewChatbot initialMessages={initialMessages} />
    </div>
  );
}
