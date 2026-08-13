import { getChallengesAction } from "@/actions/challenges";
import { ChallengesList } from "@/features/challenges/components/challenges-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eco Challenges | EcoNexus",
  description: "Join challenges to reduce your carbon footprint and earn points.",
};

export default async function ChallengesPage() {
  const { challenges, userChallenges, error } = await getChallengesAction();

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-400">Failed to load challenges.</p>
      </div>
    );
  }

  // Sort challenges: Active first, then inactive, then completed
  const sortedChallenges = [...(challenges || [])].sort((a, b) => {
    const aStatus = userChallenges?.find((uc: any) => uc.challenge_id === a.id)?.status;
    const bStatus = userChallenges?.find((uc: any) => uc.challenge_id === b.id)?.status;
    
    if (aStatus === "active" && bStatus !== "active") return -1;
    if (aStatus !== "active" && bStatus === "active") return 1;
    if (aStatus !== "completed" && bStatus === "completed") return -1;
    if (aStatus === "completed" && bStatus !== "completed") return 1;
    return 0;
  });

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto py-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Eco Challenges
        </h1>
        <p className="text-sm" style={{ color: "#7C8794" }}>
          Adopt sustainable habits and earn green points by completing environmental challenges.
        </p>
      </div>

      <ChallengesList 
        initialChallenges={sortedChallenges} 
        initialUserChallenges={userChallenges || []} 
      />
    </div>
  );
}

