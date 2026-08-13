"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Bot, Activity, Globe, Trophy, Building2, Star, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Eco Coach",
    description: "Personalized sustainability guidance based on your habits and goals.",
    metric: "18kg CO₂ saved/mo",
    color: "#2ED47A",
    moreInfo: "Get 24/7 access to actionable tips, recipe substitutions, and personalized commute route optimization based on real-time data.",
  },
  {
    icon: Activity,
    title: "Carbon Blueprint",
    description: "Detailed analysis of your environmental impact across all lifestyle categories.",
    metric: "Real-time tracking",
    color: "#4FA9FF",
    moreInfo: "Powered by Climatiq API, this tool analyzes your travel, diet, and energy usage to calculate your exact carbon equivalent emissions.",
  },
  {
    icon: Globe,
    title: "Interactive Earth",
    description: "Visualize global sustainability data through an immersive 3D experience.",
    metric: "Global overview",
    color: "#69E5FF",
    moreInfo: "Watch your virtual EcoForest grow dynamically. Every sustainable action you log plants new procedurally-generated trees and wildlife.",
  },
  {
    icon: Trophy,
    title: "Community Challenges",
    description: "Join local and global initiatives to multiply your environmental impact.",
    metric: "10k+ active users",
    color: "#FFD54A",
    moreInfo: "Compete with friends or collaborate with global users in weekly eco-challenges. Earn badges and climb the public leaderboards.",
  },
  {
    icon: Building2,
    title: "Organization Dashboard",
    description: "Tools for businesses and universities to track collective CSR achievements.",
    metric: "Enterprise ready",
    color: "#FF9D42",
    moreInfo: "Export ESG compliance reports in one click. Set org-wide reduction goals and track cumulative member contributions automatically.",
  },
  {
    icon: Star,
    title: "Rewards Ecosystem",
    description: "Earn points for sustainable actions and redeem them for eco-friendly perks.",
    metric: "Green Points",
    color: "#2ED47A",
    moreInfo: "Convert your saved carbon emissions into Green Points. Redeem them for discounts at our partner eco-conscious brands and sustainable stores.",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export function Features() {
  return (
    <section id="features" className="relative py-32 bg-eco-bg-primary overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-eco-green/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-eco relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Everything You Need <br />
            <span className="text-eco-text-secondary">To Build A Sustainable Future</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-eco-text-muted"
          >
            EcoNexus provides a complete ecosystem of tools to help you measure, understand, and reduce your environmental footprint.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="group h-full">
                <GlassCard 
                  variant="elevated" 
                  className="h-full flex flex-col p-8 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-glow-soft min-h-[320px]"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg relative overflow-hidden"
                      style={{ 
                        background: `${feature.color}15`,
                        border: `1px solid ${feature.color}30`,
                        boxShadow: `0 4px 12px ${feature.color}15, inset 0 1px 1px rgba(255,255,255,0.1)`
                      }}
                    >
                      <Icon size={22} style={{ color: feature.color }} strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-eco-text-muted bg-white/5 px-3 py-1.5 rounded-full border border-white/5 whitespace-nowrap">
                      {feature.metric}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-eco-green transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-eco-text-secondary leading-relaxed flex-grow text-sm">
                    {feature.description}
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3 text-[13px] font-medium text-white/50 group-hover:text-white transition-colors">
                    <p className="text-eco-text-muted leading-relaxed opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 ease-in-out">
                      {feature.moreInfo}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-eco-green group-hover:text-white transition-colors">Learn more</span>
                      <motion.span
                        className="inline-block text-eco-green group-hover:text-white transition-colors"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        <ArrowRight size={14} />
                      </motion.span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
