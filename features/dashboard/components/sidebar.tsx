/**
 * Dashboard Sidebar — EcoNexus
 *
 * Full sidebar navigation for the authenticated dashboard.
 * Features:
 *   - Logo + brand
 *   - Main navigation items with icons
 *   - Active state highlighting
 *   - User profile section at bottom
 *   - Logout button
 *   - Collapsible on mobile
 *
 * Reference: 04-design.md, 02-structure.md
 */

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  LayoutDashboard,
  Activity,
  Bot,
  Trophy,
  TreePine,
  Settings,
  LogOut,
  Leaf,
  ChevronRight,
} from "lucide-react";
import { logoutAction } from "@/actions/auth";

// ── Nav Items ─────────────────────────────────────────────────────────────────

const navItems = [
  {
    label:   "Dashboard",
    href:    "/dashboard",
    icon:    LayoutDashboard,
    color:   "#2ED47A",
  },
  {
    label:   "Carbon Blueprint",
    href:    "/blueprint",
    icon:    Activity,
    color:   "#4FA9FF",
  },
  {
    label:   "AI Eco Coach",
    href:    "/coach",
    icon:    Bot,
    color:   "#69E5FF",
  },
  {
    label:   "Eco Challenges",
    href:    "/challenges",
    icon:    Trophy,
    color:   "#FFD54A",
  },
  {
    label:   "EcoForest",
    href:    "/ecoforest",
    icon:    TreePine,
    color:   "#3AE374",
  },
];

const bottomItems = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings, color: "#B7BDC6" },
];

// ── Animation Variants ────────────────────────────────────────────────────────

const sidebarVariants: Variants = {
  hidden:  { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0 },
};

// ── Nav Item Component ────────────────────────────────────────────────────────

function NavItem({
  item,
  isActive,
}: {
  item: (typeof navItems)[number];
  isActive: boolean;
}) {
  const Icon = item.icon;
  return (
    <motion.div variants={itemVariants}>
      <Link
        href={item.href}
        className="group relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200"
        style={{
          color:      isActive ? "#FFFFFF" : "#9BA3AE",
          background: isActive ? "rgba(46,212,122,0.10)" : "transparent",
        }}
        aria-current={isActive ? "page" : undefined}
      >
        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full"
            style={{ background: item.color }}
            layoutId="sidebar-active"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}

        {/* Icon */}
        <span
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-200"
          style={{
            background: isActive
              ? `${item.color}20`
              : "rgba(255,255,255,0.04)",
            color: isActive ? item.color : "#7C8794",
          }}
        >
          <Icon size={16} />
        </span>

        <span className="truncate">{item.label}</span>

        {/* Hover chevron */}
        {!isActive && (
          <ChevronRight
            size={14}
            className="ml-auto opacity-0 transition-opacity duration-200 group-hover:opacity-40"
          />
        )}
      </Link>
    </motion.div>
  );
}

// ── Sidebar Component ─────────────────────────────────────────────────────────

interface SidebarProps {
  userEmail?: string;
  displayName?: string;
}

export function Sidebar({ userEmail, displayName }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      className="flex h-full flex-col"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo */}
      <motion.div className="mb-8 px-3 pt-2" variants={itemVariants}>
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="EcoNexus home">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(46,212,122,0.25), rgba(79,169,255,0.15))",
              border: "1px solid rgba(46,212,122,0.25)",
            }}
          >
            <Leaf size={18} style={{ color: "#2ED47A" }} />
          </div>
          <span className="text-base font-bold tracking-tight" style={{ color: "#FFFFFF" }}>
            Eco<span style={{ color: "#2ED47A" }}>Nexus</span>
          </span>
        </Link>
      </motion.div>

      {/* Nav section label */}
      <motion.p
        className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest"
        style={{ color: "#4A5568" }}
        variants={itemVariants}
      >
        Main Menu
      </motion.p>

      {/* Main nav items */}
      <nav className="flex flex-col gap-0.5" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavItem key={item.href} item={item} isActive={pathname === item.href} />
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Divider */}
      <div className="mx-3 mb-4 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* Bottom nav */}
      <nav className="flex flex-col gap-0.5" aria-label="Secondary navigation">
        {bottomItems.map((item) => (
          <NavItem key={item.href} item={item} isActive={pathname === item.href} />
        ))}
      </nav>

      {/* User profile + logout */}
      <motion.div
        className="mt-3 rounded-2xl p-3"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
        variants={itemVariants}
      >
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl overflow-hidden shadow-sm border border-white/10"
            style={{
              background: "linear-gradient(135deg, #2ED47A, #4FA9FF)",
            }}
          >
            <img src="/icon.png" alt="Profile" className="h-full w-full object-cover" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold" style={{ color: "#FFFFFF" }}>
              {displayName ?? "EcoNexus User"}
            </p>
            <p className="truncate text-[10px]" style={{ color: "#4A5568" }}>
              {userEmail ?? ""}
            </p>
          </div>
        </div>

        {/* Logout */}
        <form action={logoutAction}>
          <button
            type="submit"
            className="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-all duration-200 hover:bg-white/5 hover:text-white"
            style={{ color: "#9BA3AE" }}
          >
            <LogOut size={13} />
            Sign out
          </button>
        </form>
      </motion.div>
    </motion.aside>
  );
}
