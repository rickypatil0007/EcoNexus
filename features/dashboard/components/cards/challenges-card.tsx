/**
 * Eco Challenges Card — EcoNexus Dashboard
 *
 * Uses Lucide icons throughout — no emoji overflow issues.
 */

"use client";

import { motion } from "framer-motion";
import { Trophy, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// ── Difficulty badge colors ───────────────────────────────────────────────────

const difficultyColors: Record<string, { bg: string; text: string }> = {
  easy:   { bg: "rgba(46,212,122,0.10)",  text: "#2ED47A" },
  medium: { bg: "rgba(255,213,74,0.10)",  text: "#FFD54A" },
  hard:   { bg: "rgba(255,93,115,0.10)",  text: "#FF5D73" },
};

// ── Component ─────────────────────────────────────────────────────────────────

export function ChallengesCard({ activeChallenges }: { activeChallenges: any[] }) {
  const challenges = activeChallenges?.map((uc) => uc.challenges).filter(Boolean) ?? [];

  return (
    <motion.div
      className="glass-card p-5 flex flex-col gap-4"
      style={{ border: "1px solid rgba(255,213,74,0.10)" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      whileHover={{ borderColor: "rgba(255,213,74,0.18)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center"
            style={{ background: "rgba(255,213,74,0.10)", border: "1px solid rgba(255,213,74,0.20)" }}
          >
            <Trophy size={16} style={{ color: "#FFD54A" }} strokeWidth={1.75} />
          </div>
          <span className="text-sm font-semibold text-white">Eco Challenges</span>
        </div>
        <span
          className="px-2 py-0.5 text-[11px] font-medium shrink-0"
          style={{ background: "rgba(255,213,74,0.08)", color: "#FFD54A" }}
        >
          {challenges.length} active
        </span>
      </div>

      {/* Challenge list */}
      <div className="flex flex-col gap-2 flex-1">
        {challenges.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-6 gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center"
              style={{ background: "rgba(255,213,74,0.08)", border: "1px solid rgba(255,213,74,0.12)" }}
            >
              <Trophy size={22} style={{ color: "#FFD54A", opacity: 0.5 }} strokeWidth={1.5} />
            </div>
            <p className="text-xs text-eco-text-muted">No active challenges.</p>
          </div>
        ) : (
          challenges.map((c, i) => {
            const diffKey = (c.difficulty ?? "medium").toLowerCase();
            const diff = difficultyColors[diffKey] ?? difficultyColors.medium;
            return (
              <motion.div
                key={c.id}
                className="p-3 transition-colors"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <p className="text-[13px] font-medium text-white truncate">{c.title}</p>
                  <span
                    className="shrink-0 px-1.5 py-0.5 text-[10px] font-medium capitalize"
                    style={{ background: diff.bg, color: diff.text }}
                  >
                    {c.difficulty}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1 w-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    className="h-full"
                    style={{ background: "#4FA9FF" }}
                    initial={{ width: 0 }}
                    animate={{ width: "30%" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 + i * 0.08 }}
                  />
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* CTA */}
      <Link
        href="/challenges"
        className="flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-70"
        style={{ color: "#FFD54A" }}
      >
        View all challenges
        <ArrowRight size={13} strokeWidth={2} />
      </Link>
    </motion.div>
  );
}
