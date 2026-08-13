"use client";

import { motion } from "framer-motion";
import { UserPlus, Activity, Bot, Trophy, Globe } from "lucide-react";

const journeySteps = [
  {
    icon: UserPlus,
    title: "Join EcoNexus",
    description: "Create your free account and set your initial sustainability goals.",
  },
  {
    icon: Activity,
    title: "Measure Impact",
    description: "Calculate your baseline carbon footprint across lifestyle categories.",
  },
  {
    icon: Bot,
    title: "Receive AI Guidance",
    description: "Get personalized, actionable recommendations from your AI Eco Coach.",
  },
  {
    icon: Trophy,
    title: "Complete Challenges",
    description: "Participate in local and global initiatives to reduce emissions.",
  },
  {
    icon: Globe,
    title: "Create Environmental Impact",
    description: "Track your long-term progress and contribute to a healthier planet.",
  }
];

export function Journey() {
  return (
    <section className="relative py-32 bg-eco-bg-secondary">
      <div className="container-eco">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            The Sustainability <span className="text-gradient-eco">Journey</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-eco-text-muted"
          >
            Sustainability is not a one-time calculation. It is a continuous process of awareness, action, and impact.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-eco-green/10 via-eco-blue/30 to-eco-green/10 md:-translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-12 md:space-y-24">
            {journeySteps.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col md:flex-row items-start md:items-center justify-between group"
                >
                  {/* Left Side (Desktop) */}
                  <div className={`hidden md:block w-[45%] text-right pr-12 ${!isEven ? 'md:order-1 text-left pl-12 pr-0' : ''}`}>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-eco-green transition-colors">{step.title}</h3>
                    <p className="text-eco-text-secondary">{step.description}</p>
                  </div>

                  {/* Center Node */}
                  <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-2xl bg-eco-bg-surface border border-white/20 flex items-center justify-center z-10 shadow-glow-soft transition-all duration-500 group-hover:border-eco-green group-hover:scale-110 ${!isEven ? 'md:order-2' : ''}`}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-eco-green/20 to-eco-blue/20 flex items-center justify-center text-eco-green">
                      {<step.icon size={20} strokeWidth={1.5} />}
                    </div>
                  </div>

                  {/* Right Side (Desktop) / Full content (Mobile) */}
                  <div className={`pl-20 md:pl-0 w-full md:w-[45%] ${!isEven ? 'md:order-3 md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className="md:hidden">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-eco-green transition-colors">{step.title}</h3>
                      <p className="text-eco-text-secondary">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
