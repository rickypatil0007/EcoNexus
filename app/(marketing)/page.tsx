"use client";

import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { Journey } from "@/components/marketing/journey";
import { CTA } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.2 }}
    >
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <Hero />
      </motion.div>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <Features />
      </motion.div>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
        <Journey />
      </motion.div>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}>
        <CTA />
      </motion.div>
      <Footer />
    </motion.main>
  );
}
