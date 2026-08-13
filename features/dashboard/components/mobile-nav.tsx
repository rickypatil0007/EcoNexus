/**
 * Mobile Navigation Overlay — EcoNexus Dashboard
 *
 * Full-screen slide-in navigation panel for mobile devices.
 * Rendered at root layout level with AnimatePresence.
 *
 * Reference: 04-design.md (responsive layout)
 */

"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./sidebar";

// ── Props ─────────────────────────────────────────────────────────────────────

interface MobileNavProps {
  isOpen:       boolean;
  onClose:      () => void;
  userEmail?:   string;
  displayName?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function MobileNav({ isOpen, onClose, userEmail, displayName }: MobileNavProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in panel */}
          <motion.div
            className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col p-4 lg:hidden"
            style={{
              background: "rgba(13,17,23,0.98)",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            aria-label="Mobile navigation"
          >
            <Sidebar userEmail={userEmail} displayName={displayName} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
