/**
 * AI Eco Coach Card — EcoNexus Dashboard
 *
 * Uses Lucide icons throughout — consistent sizing, no emoji overflow.
 */

"use client";

import { motion } from "framer-motion";
import { Bot, Sparkles, ArrowRight, Bike, Salad, Thermometer } from "lucide-react";
import Link from "next/link";

// ── Mock Suggestions ──────────────────────────────────────────────────────────

const suggestions = [
  {
    icon:  Bike,
    text:  "Cycling for short commutes saves ~1.2 kg CO₂ per trip",
    tag:   "Transport",
    color: "#4FA9FF",
  },
  {
    icon:  Salad,
    text:  "Plant-based Mondays reduce weekly food emissions by 15%",
    tag:   "Food",
    color: "#2ED47A",
  },
  {
    icon:  Thermometer,
    text:  "1°C lower thermostat saves ~330 kg CO₂ per year",
    tag:   "Energy",
    color: "#FFD54A",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function EcoCoachCard() {
  return (
    <motion.div
      className="glass-card p-5 flex flex-col gap-4"
      style={{ border: "1px solid rgba(105,229,255,0.10)" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.10 }}
      whileHover={{ borderColor: "rgba(105,229,255,0.18)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center"
            style={{ background: "rgba(105,229,255,0.10)", border: "1px solid rgba(105,229,255,0.20)" }}
          >
            <Bot size={16} style={{ color: "#69E5FF" }} strokeWidth={1.75} />
          </div>
          <span className="text-sm font-semibold text-white">AI Eco Coach</span>
        </div>
        <span
          className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium shrink-0"
          style={{ background: "rgba(105,229,255,0.08)", color: "#69E5FF" }}
        >
          <Sparkles size={10} strokeWidth={2} />
          AI Powered
        </span>
      </div>

      {/* Suggestions */}
      <div className="flex flex-col gap-2 flex-1">
        {suggestions.slice(0, 2).map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              className="flex items-start gap-3 p-3 transition-colors"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center mt-0.5"
                style={{ background: `${s.color}14`, border: `1px solid ${s.color}25` }}
              >
                <Icon size={13} style={{ color: s.color }} strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs leading-relaxed text-eco-text-secondary">{s.text}</p>
                <span
                  className="mt-1 inline-block px-1.5 py-0.5 text-[10px] font-medium"
                  style={{ background: `${s.color}12`, color: s.color }}
                >
                  {s.tag}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <Link
        href="/coach"
        className="flex items-center gap-2 px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 hover:brightness-110"
        style={{
          background: "rgba(105,229,255,0.08)",
          border: "1px solid rgba(105,229,255,0.15)",
          color: "#69E5FF",
        }}
      >
        <Sparkles size={13} strokeWidth={2} />
        Ask your Eco Coach
        <ArrowRight size={13} strokeWidth={2} className="ml-auto" />
      </Link>
    </motion.div>
  );
}
