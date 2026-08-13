"use client";

import { motion } from "framer-motion";
import { EarthCanvas } from "@/components/canvas/earth";
import { EcoButton } from "@/components/ui/eco-button";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { Shield, Zap, Globe2, ArrowDown } from "lucide-react";

const trustIndicators = [
  { icon: Zap, label: "AI Powered" },
  { icon: Shield, label: "Carbon Verified" },
  { icon: Globe2, label: "Community Driven" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-eco-bg-primary via-[#080d16] to-eco-bg-primary z-0" />
      
      {/* Earth Canvas (Full screen to allow stars everywhere) */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <EarthCanvas />
      </div>

      <div className="container-eco relative z-20 w-full">
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-tight mb-6">
              Measure.<br />
              Understand.<br />
              <span className="text-gradient-eco">Restore.</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white mb-2">
              The Future of Sustainability Starts With You.
            </p>
          </motion.div>

          <motion.p
            className="text-base md:text-lg text-eco-text-secondary mb-10 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            EcoNexus is an AI-powered sustainability ecosystem. Track your carbon footprint, complete community challenges, and receive personalized coaching to improve your environmental impact.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={ROUTES.AUTH.REGISTER} className="w-full sm:w-auto">
              <EcoButton size="lg" variant="primary" className="w-full sm:w-auto group">
                Create Free Account
              </EcoButton>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <EcoButton size="lg" variant="secondary" className="w-full sm:w-auto">
                Explore Platform
              </EcoButton>
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center md:justify-start gap-6 border-t border-white/10 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2 text-eco-text-muted hover:text-eco-text-secondary transition-colors group cursor-default">
                <indicator.icon size={16} className="text-eco-green/70 group-hover:text-eco-green transition-colors" />
                <span className="text-sm font-medium">{indicator.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs font-medium text-eco-text-muted uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-eco-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
