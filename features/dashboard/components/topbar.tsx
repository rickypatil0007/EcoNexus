/**
 * Dashboard Topbar — EcoNexus
 *
 * Top navigation bar for authenticated dashboard pages.
 * Features:
 *   - Breadcrumb / page title
 *   - Search button
 *   - Notification bell
 *   - User avatar + quick menu
 *   - Mobile menu toggle
 *
 * Reference: 04-design.md
 */

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, User, Settings, LogOut, Menu, X } from "lucide-react";
import { logoutAction } from "@/actions/auth";

// ── Props ─────────────────────────────────────────────────────────────────────

interface TopbarProps {
  pageTitle?:   string;
  userEmail?:   string;
  displayName?: string;
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Topbar({
  pageTitle = "Dashboard",
  userEmail,
  displayName,
  onMenuToggle,
  isMobileMenuOpen,
}: TopbarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const initials = (displayName?.[0] ?? userEmail?.[0] ?? "E").toUpperCase();

  return (
    <header
      className="flex h-16 items-center justify-between px-4 md:px-6"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Left: Mobile menu toggle + Page title */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-white/5 lg:hidden"
          style={{ color: "#B7BDC6" }}
          aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold truncate" style={{ color: "#FFFFFF" }}>
            {pageTitle}
          </h2>
        </div>
      </div>

      {/* Right: Actions + User */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:bg-white/5"
          style={{ color: "#7C8794" }}
          aria-label="Search"
        >
          <Search size={17} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:bg-white/5"
          style={{ color: "#7C8794" }}
          aria-label="Notifications"
        >
          <Bell size={17} />
          {/* Unread indicator */}
          <span
            className="absolute right-2 top-2 h-2 w-2 rounded-full"
            style={{ background: "#2ED47A", boxShadow: "0 0 6px rgba(46,212,122,0.6)" }}
            aria-hidden="true"
          />
        </button>

        {/* Divider */}
        <div className="mx-1 h-5 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />

        {/* User avatar + dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((p) => !p)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all duration-200 hover:ring-2 hover:ring-[#2ED47A]/30"
            style={{
              background: "linear-gradient(135deg, #2ED47A, #4FA9FF)",
              color: "#05070A",
            }}
            aria-label="User menu"
            aria-expanded={isUserMenuOpen}
          >
            {initials}
          </button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {isUserMenuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsUserMenuOpen(false)}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-2xl py-1"
                  style={{
                    background: "rgba(20,26,34,0.95)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
                  }}
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {/* User info */}
                  <div
                    className="px-4 py-3"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                      {displayName ?? "EcoNexus User"}
                    </p>
                    <p className="truncate text-xs" style={{ color: "#7C8794" }}>
                      {userEmail ?? ""}
                    </p>
                  </div>

                  {/* Menu items */}
                  <div className="py-1">
                    <button
                      type="button"
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-white"
                      style={{ color: "#B7BDC6" }}
                    >
                      <User size={15} />
                      Profile
                    </button>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-white"
                      style={{ color: "#B7BDC6" }}
                    >
                      <Settings size={15} />
                      Settings
                    </button>
                  </div>

                  {/* Logout */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <form action={logoutAction}>
                      <button
                        type="submit"
                        className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                        style={{ color: "#FF5D73" }}
                      >
                        <LogOut size={15} />
                        Sign out
                      </button>
                    </form>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
