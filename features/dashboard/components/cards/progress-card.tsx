/**
 * Sustainability Progress Card — EcoNexus Dashboard
 *
 * Shows green points, streak, and animated sparkline.
 * Uses Lucide icons — no emoji overflow.
 */

"use client";

import { motion } from "framer-motion";
import { TrendingDown, Star, Flame } from "lucide-react";

// ── Monthly CO₂ kg (last 6 months, newest last) ───────────────────────────────

const MOCK_MONTHLY = [420, 395, 370, 340, 315, 284];

// ── Sparkline ─────────────────────────────────────────────────────────────────

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const W = 220, H = 52;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / (max - min + 1)) * (H * 0.8) - H * 0.1;
    return `${x},${y}`;
  });
  const pathD = `M ${pts.join(" L ")}`;
  const fillD = `${pathD} L ${W},${H} L 0,${H} Z`;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible w-full">
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#2ED47A" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#2ED47A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={fillD}
        fill="url(#spark-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke="#2ED47A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
      />
      <motion.circle
        cx={W}
        cy={parseFloat(pts[pts.length - 1]?.split(",")[1] ?? "0")}
        r={3.5}
        fill="#2ED47A"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4 }}
      />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ProgressCard({ profile }: { profile: any }) {
  const points = profile?.green_points ?? 0;
  const streak = profile?.streak_days ?? 0;

  return (
    <motion.div
      className="glass-card p-5 flex flex-col gap-4"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.20 }}
      whileHover={{ borderColor: "rgba(255,255,255,0.13)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center"
          style={{ background: "rgba(58,227,116,0.10)", border: "1px solid rgba(58,227,116,0.20)" }}
        >
          <TrendingDown size={16} style={{ color: "#3AE374" }} strokeWidth={1.75} />
        </div>
        <span className="text-sm font-semibold text-white">Sustainability Progress</span>
      </div>

      {/* Stats row */}
      <div className="flex gap-3">
        {/* Green Points */}
        <div
          className="flex flex-1 flex-col gap-1 p-3"
          style={{ background: "rgba(46,212,122,0.06)", border: "1px solid rgba(46,212,122,0.12)" }}
        >
          <div className="flex items-center gap-1.5">
            <Star size={11} style={{ color: "#2ED47A" }} strokeWidth={2} />
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#2ED47A" }}>
              Green Points
            </span>
          </div>
          <motion.span
            className="text-2xl font-bold text-white tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {points.toLocaleString()}
          </motion.span>
        </div>

        {/* Day Streak */}
        <div
          className="flex flex-1 flex-col gap-1 p-3"
          style={{ background: "rgba(255,157,66,0.06)", border: "1px solid rgba(255,157,66,0.12)" }}
        >
          <div className="flex items-center gap-1.5">
            <Flame size={11} style={{ color: "#FF9D42" }} strokeWidth={2} />
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#FF9D42" }}>
              Day Streak
            </span>
          </div>
          <motion.span
            className="text-2xl font-bold text-white tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {streak}
            <span className="text-sm font-normal text-eco-text-muted"> days</span>
          </motion.span>
        </div>
      </div>

      {/* Sparkline */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-medium text-eco-text-muted">6-month CO₂ trend</span>
          <span className="text-[11px] font-semibold" style={{ color: "#2ED47A" }}>▼ 32% reduced</span>
        </div>
        <Sparkline data={MOCK_MONTHLY} />
      </div>
    </motion.div>
  );
}
