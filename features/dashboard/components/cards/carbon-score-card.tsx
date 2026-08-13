/**
 * Carbon Score Card — EcoNexus Dashboard
 * 
 * Shows carbon footprint with circular progress ring.
 * Uses Lucide icons exclusively — no emoji overflow issues.
 */

"use client";

import { motion } from "framer-motion";
import { Globe, TrendingDown, ArrowRight } from "lucide-react";
import Link from "next/link";

// ── Circular Ring ─────────────────────────────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const radius        = 40;
  const circumference = 2 * Math.PI * radius;
  const progress      = circumference - (score / 100) * circumference;
  const color         = score >= 70 ? "#2ED47A" : score >= 40 ? "#FFD54A" : "#FF5D73";

  return (
    <div className="relative flex items-center justify-center shrink-0">
      <svg width={100} height={100} className="-rotate-90">
        {/* Track */}
        <circle
          cx={50} cy={50} r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={7}
        />
        {/* Progress */}
        <motion.circle
          cx={50} cy={50} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
        />
      </svg>
      {/* Score label */}
      <div className="absolute flex flex-col items-center leading-none">
        <motion.span
          className="text-2xl font-bold text-white tabular-nums"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-[10px] text-eco-text-muted mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CarbonScoreCard({ record }: { record: any }) {
  const score = record?.score ?? record?.total_emission ?? 0;
  const kgCo2 = record?.total_kg_co2e ?? record?.total_emission ?? 0;

  return (
    <motion.div
      className="glass-card p-5 flex flex-col gap-4"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      whileHover={{ borderColor: "rgba(255,255,255,0.13)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center"
            style={{ background: "rgba(46,212,122,0.12)", border: "1px solid rgba(46,212,122,0.20)" }}
          >
            <Globe size={16} style={{ color: "#2ED47A" }} strokeWidth={1.75} />
          </div>
          <span className="text-sm font-semibold text-white">Carbon Score</span>
        </div>
        {record && (
          <span
            className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium shrink-0"
            style={{ background: "rgba(46,212,122,0.10)", color: "#2ED47A" }}
          >
            <TrendingDown size={10} strokeWidth={2} />
            {new Date(record.calculated_at).toLocaleDateString()}
          </span>
        )}
      </div>

      {/* Score Ring + Stats */}
      <div className="flex items-center gap-5">
        <ScoreRing score={score > 0 ? Math.round(score / 10) : 0} />
        <div className="flex flex-col gap-3 min-w-0">
          <div>
            <p className="text-[11px] font-medium text-eco-text-muted mb-0.5">Monthly CO₂</p>
            <p className="text-xl font-bold text-white tabular-nums">
              {kgCo2}{" "}
              <span className="text-sm font-normal text-eco-text-muted">kg</span>
            </p>
          </div>
          {record && (
            <div>
              <p className="text-[11px] font-medium text-eco-text-muted mb-0.5">Eco Score</p>
              <p className="text-sm font-semibold" style={{ color: "#2ED47A" }}>
                {score} / 1000
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/blueprint"
        className="flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-70"
        style={{ color: "#4FA9FF" }}
      >
        {record ? "Recalculate carbon" : "Calculate carbon"}
        <ArrowRight size={13} strokeWidth={2} />
      </Link>
    </motion.div>
  );
}
