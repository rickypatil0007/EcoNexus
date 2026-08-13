import { createClient } from "@/lib/supabase/server";
import { EcoForestSceneWrapper as EcoForestScene } from "@/features/ecoforest/components/EcoForestSceneWrapper";
export const metadata = {
  title: "Living EcoForest | EcoNexus",
  description: "Your personalized virtual sustainability environment.",
};

export default async function EcoForestPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let greenPoints = 0;

  if (user) {
    try {
      const { data: profile } = await (supabase as any)
        .from("profiles")
        .select("green_points")
        .eq("user_id", user.id)
        .single();
      
      greenPoints = profile?.green_points || 0;
    } catch (err) {
      console.warn("Could not fetch green_points (schema may not be migrated yet). Defaulting to 150 points for demo.");
      // Fallback for demo purposes if the schema hasn't been updated
      greenPoints = 150; 
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Living EcoForest
        </h1>
        <p className="text-xs text-[#7C8794]">
          This island grows as you complete challenges and improve your Carbon Blueprint.
        </p>
      </div>

      <div style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
        <EcoForestScene greenPoints={greenPoints} />
      </div>
    </div>
  );
}

