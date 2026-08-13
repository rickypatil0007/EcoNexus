"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { joinChallengeAction, completeChallengeAction } from "@/actions/challenges";
import { Trophy, CheckCircle2, Clock, Zap, Leaf, Loader2 } from "lucide-react";

// Use a flexible type that works with the MVP DB schema
type Challenge = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  // MVP schema uses 'points', design spec uses 'points_reward'
  points?: number;
  points_reward?: number;
  created_at: string;
};

type UserChallenge = {
  id: string;
  user_id: string;
  challenge_id: string;
  status: string;
  completed_at: string | null;
  created_at: string;
};

export function ChallengesList({
  initialChallenges,
  initialUserChallenges,
}: {
  initialChallenges: Challenge[];
  initialUserChallenges: UserChallenge[];
}) {
  const [challenges] = useState<Challenge[]>(initialChallenges);
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>(initialUserChallenges);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleJoin = async (id: string) => {
    setLoadingId(id);
    const res = await joinChallengeAction(id);
    if (res.success) {
      setUserChallenges((prev) => [
        ...prev,
        {
          id: `temp-${id}`,
          user_id: "temp",
          challenge_id: id,
          status: "active",
          completed_at: null,
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setLoadingId(null);
  };

  const handleComplete = async (challenge: Challenge) => {
    const pts = challenge.points_reward ?? challenge.points ?? 10;
    setLoadingId(challenge.id);
    const res = await completeChallengeAction(challenge.id, pts);
    if (res.success) {
      setUserChallenges((prev) =>
        prev.map((uc) =>
          uc.challenge_id === challenge.id
            ? { ...uc, status: "completed", completed_at: new Date().toISOString() }
            : uc
        )
      );
    }
    setLoadingId(null);
  };

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "energy": return <Zap size={18} className="text-[#FFD54A]" />;
      case "food": return <Leaf size={18} className="text-[#2ED47A]" />;
      case "waste": return <CheckCircle2 size={18} className="text-[#4FA9FF]" />;
      default: return <Clock size={18} className="text-[#B7BDC6]" />;
    }
  };

  if (challenges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center" style={{ background: "rgba(255,213,74,0.08)", border: "1px solid rgba(255,213,74,0.15)" }}>
          <Trophy size={28} color="#FFD54A" strokeWidth={1.5} />
        </div>
        <p className="text-white font-semibold">No challenges available</p>
        <p className="text-sm" style={{ color: "#7C8794" }}>
          Run the SQL migration in Supabase to seed challenges, or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AnimatePresence>
        {challenges.map((challenge, i) => {
          const userStatus = userChallenges.find((uc) => uc.challenge_id === challenge.id);
          const isActive = userStatus?.status === "active";
          const isCompleted = userStatus?.status === "completed";
          const isLoading = loadingId === challenge.id;
          const pts = challenge.points_reward ?? challenge.points ?? 10;

          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-6 flex flex-col justify-between"
              style={{
                border: isCompleted
                  ? "1px solid rgba(46,212,122,0.3)"
                  : isActive
                    ? "1px solid rgba(105,229,255,0.3)"
                    : "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center" style={{ background: "rgba(255,255,255,0.04)" }}>
                      {getIcon(challenge.category)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{challenge.title}</h3>
                      <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">{challenge.difficulty}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1" style={{ background: "rgba(255,213,74,0.15)" }}>
                    <Trophy size={12} color="#FFD54A" />
                    <span className="text-xs font-bold" style={{ color: "#FFD54A" }}>{pts}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                  {challenge.description}
                </p>
              </div>

              <div className="mt-auto">
                {isCompleted ? (
                  <div className="w-full py-2.5 px-4 flex items-center justify-center gap-2" style={{ background: "rgba(46,212,122,0.1)" }}>
                    <CheckCircle2 size={16} color="#2ED47A" />
                    <span className="text-sm font-medium" style={{ color: "#2ED47A" }}>Completed</span>
                  </div>
                ) : isActive ? (
                  <button
                    onClick={() => handleComplete(challenge)}
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ background: "#69E5FF", color: "#000" }}
                  >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                    <span className="text-sm font-medium">Mark as Complete</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoin(challenge.id)}
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 flex items-center justify-center gap-2 transition-all hover:bg-white/10 disabled:opacity-50"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#FFF" }}
                  >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                    <span className="text-sm font-medium">Join Challenge</span>
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
