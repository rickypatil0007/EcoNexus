/**
 * Recent Activity Card — EcoNexus Dashboard
 *
 * Chronological feed of recent eco actions.
 * Uses Lucide icons exclusively — no emoji, no overflow.
 */

"use client";

import { motion } from "framer-motion";
import { Clock, Trophy, Activity, Bot, Target, Sprout } from "lucide-react";
import { useEffect, useState } from "react";

// Fallback data if DB is empty
const defaultActivities = [
  {
    id:    "1",
    activity_type: "challenge",
    title: "Joined EcoNexus",
    description: "Welcome to your eco journey!",
    created_at: new Date().toISOString(),
  }
];

const getIconAndColor = (type: string) => {
  switch (type) {
    case "challenge": return { icon: Trophy, color: "#FFD54A" };
    case "carbon": return { icon: Activity, color: "#4FA9FF" };
    case "coach": return { icon: Bot, color: "#69E5FF" };
    case "achievement": return { icon: Target, color: "#FFD54A" };
    default: return { icon: Sprout, color: "#2ED47A" };
  }
};

const formatTime = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  const diffHours = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffHours < 48) return "Yesterday";
  return `${Math.floor(diffHours / 24)} days ago`;
};

export function ActivityCard({ activities = [] }: { activities?: any[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const displayActivities = activities.length > 0 ? activities : defaultActivities;

  return (
    <motion.div
      className="glass-card p-5 flex flex-col gap-4"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      whileHover={{ borderColor: "rgba(255,255,255,0.13)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center"
            style={{ background: "rgba(183,189,198,0.08)", border: "1px solid rgba(183,189,198,0.14)" }}
          >
            <Clock size={16} style={{ color: "#B7BDC6" }} strokeWidth={1.75} />
          </div>
          <span className="text-sm font-semibold text-white">Recent Activity</span>
        </div>
        <button
          type="button"
          className="text-[13px] font-medium transition-opacity hover:opacity-70"
          style={{ color: "#4FA9FF" }}
        >
          View all
        </button>
      </div>

      {/* Activity Feed */}
      <div className="flex flex-col">
        {displayActivities.map((item, i) => {
          const { icon: Icon, color } = getIconAndColor(item.activity_type);
          const isLast = i === displayActivities.length - 1;
          return (
            <motion.div
              key={item.id}
              className="flex gap-3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.05 }}
            >
              {/* Timeline icon + line */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className="flex h-9 w-9 items-center justify-center"
                  style={{
                    background: `${color}12`,
                    border: `1px solid ${color}22`,
                  }}
                >
                  <Icon size={15} style={{ color: color }} strokeWidth={1.75} />
                </div>
                {!isLast && (
                  <div
                    className="mt-1 w-px flex-1 min-h-[18px]"
                    style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, transparent 100%)" }}
                  />
                )}
              </div>

              {/* Content */}
              <div className={`flex flex-col gap-0.5 pb-4 ${isLast ? "pb-0" : ""} min-w-0`}>
                <p className="text-[13px] font-medium text-white leading-snug truncate">{item.title}</p>
                <p className="text-xs text-eco-text-muted">{item.description || item.sub}</p>
                <p className="text-[11px]" style={{ color: "#4A5568" }} suppressHydrationWarning>
                  {mounted ? formatTime(item.created_at) : ""}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
