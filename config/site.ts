/**
 * Site Configuration — EcoNexus
 *
 * Centralized application metadata and configuration.
 * Used in layout.tsx, og tags, and SEO-related components.
 */

export const SITE_CONFIG = {
  name: "EcoNexus",
  title: "EcoNexus — AI-Powered Sustainability Platform",
  description:
    "Transform your environmental impact with AI-powered carbon intelligence, personalized eco-coaching, and a living virtual ecosystem.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://econexus.app",
  ogImage: "/images/og-image.jpg",
  links: {
    github: "https://github.com/econexus",
  },
} as const;

/**
 * Navigation links for the marketing header.
 */
export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
] as const;

/**
 * Dashboard navigation items per role.
 * Sidebar links rendered in the (dashboard) layout.
 */
export const DASHBOARD_NAV = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "layout-dashboard",
    roles: ["individual", "college", "ngo", "csr"] as const,
  },
  {
    label: "Carbon Blueprint",
    href: "/dashboard/carbon-blueprint",
    icon: "bar-chart-3",
    roles: ["individual", "college", "ngo", "csr"] as const,
  },
  {
    label: "Eco Coach",
    href: "/dashboard/assistant",
    icon: "bot",
    roles: ["individual", "college", "ngo", "csr"] as const,
  },
  {
    label: "Challenges",
    href: "/dashboard/challenges",
    icon: "trophy",
    roles: ["individual", "college", "ngo", "csr"] as const,
  },
  {
    label: "EcoForest",
    href: "/dashboard/ecoforest",
    icon: "trees",
    roles: ["individual"] as const,
  },
  {
    label: "Rewards",
    href: "/dashboard/rewards",
    icon: "gift",
    roles: ["individual"] as const,
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: "file-text",
    roles: ["individual", "college", "ngo", "csr"] as const,
  },
] as const;
