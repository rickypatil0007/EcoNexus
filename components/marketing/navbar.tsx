"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { NAV_LINKS } from "@/config/site";
import { ROUTES } from "@/constants/routes";
import { EcoButton } from "@/components/ui/eco-button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Framer Motion scroll values for dynamic background styling
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.8]);
  const blurValue = useTransform(scrollY, [0, 50], [0, 12]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      style={{
        backgroundColor: useTransform(bgOpacity, (op) => `rgba(5, 7, 10, ${op})`),
        backdropFilter: useTransform(blurValue, (blur) => `blur(${blur}px)`),
        borderBottom: useTransform(borderOpacity, (op) => `1px solid rgba(255, 255, 255, ${op})`),
      }}
      className="fixed top-0 left-0 right-0 z-[200] flex h-20 items-center transition-shadow duration-300"
      animate={{
        boxShadow: isScrolled ? "0 4px 24px rgba(0, 0, 0, 0.2)" : "none",
      }}
    >
      <div className="container-eco flex w-full items-center justify-between">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-eco-green to-eco-blue shadow-glow-soft transition-transform group-hover:scale-105">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" fill="rgba(255,255,255,0.15)" />
              <path d="M16 8C11.582 8 8 11.582 8 16c0 2.804 1.372 5.29 3.49 6.835C12.558 20.102 14.13 18 16 18s3.442 2.102 4.51 4.835A7.965 7.965 0 0024 16c0-4.418-3.582-8-8-8z" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Eco<span className="text-eco-green">Nexus</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium text-eco-text-secondary">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4 border-l border-white/10 pl-8">
            <Link href={ROUTES.AUTH.LOGIN} className="text-sm font-medium text-eco-text-secondary transition-colors hover:text-white">
              Sign In
            </Link>
            <Link href={ROUTES.AUTH.REGISTER} tabIndex={-1}>
              <EcoButton size="sm" variant="primary">Get Started</EcoButton>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl text-eco-text-secondary hover:bg-white/5 hover:text-white md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-20 flex flex-col bg-eco-bg-surface/95 backdrop-blur-xl border-b border-white/10 p-4 md:hidden">
          <ul className="flex flex-col gap-4 text-base font-medium text-eco-text-secondary p-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="block transition-colors hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 mt-4 border-t border-white/10">
              <Link 
                href={ROUTES.AUTH.LOGIN} 
                className="block mb-4 transition-colors hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link href={ROUTES.AUTH.REGISTER} onClick={() => setIsMobileMenuOpen(false)} className="block">
                <EcoButton className="w-full" size="md" variant="primary">Get Started</EcoButton>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  );
}
