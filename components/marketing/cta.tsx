"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { EcoButton } from "@/components/ui/eco-button";
import { ROUTES } from "@/constants/routes";
import { EarthCanvas } from "@/components/canvas/earth";

export function CTA() {
  return (
    <section id="pricing" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-eco-bg-primary">
      {/* Background Earth Canvas for visual connection to Hero */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        <EarthCanvas />
      </div>

      <div className="container-eco relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Your Journey Toward <br />
            <span className="text-gradient-eco">A Sustainable Future</span> <br />
            Starts Today.
          </h2>
          
          <p className="text-xl text-eco-text-secondary mb-12 max-w-2xl mx-auto">
            Join the EcoNexus platform and take control of your environmental impact with AI-powered insights.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={ROUTES.AUTH.REGISTER} className="w-full sm:w-auto">
              <EcoButton size="lg" variant="primary" className="w-full sm:w-auto text-lg px-12">
                Create Free Account
              </EcoButton>
            </Link>
            <Link href={ROUTES.AUTH.LOGIN} className="w-full sm:w-auto">
              <EcoButton size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-12">
                Sign In
              </EcoButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
