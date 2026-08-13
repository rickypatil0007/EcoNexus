/**
 * Root Layout — EcoNexus
 *
 * The single root layout that wraps every page in the application.
 * Responsibilities:
 *  - Load Inter font (primary font per design.md)
 *  - Apply global metadata (SEO)
 *  - Mount root providers (theme, toast, supabase session)
 *  - Apply dark-first body styles
 */

import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { RootProviders } from "@/providers/root-providers";
import "./globals.css";

// ── Inter — body font (readable, universal) ───────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// ── Sora — heading font (geometric, premium, distinctive) ─────────────────────
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// ── Global SEO Metadata ───────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "EcoNexus — AI-Powered Sustainability Platform",
    template: "%s | EcoNexus",
  },
  description:
    "Transform your environmental impact with AI-powered carbon intelligence, personalized sustainability coaching, and a living virtual ecosystem that grows with every action you take.",
  keywords: [
    "sustainability",
    "carbon footprint",
    "AI sustainability",
    "eco challenges",
    "carbon calculator",
    "green points",
    "environmental impact",
    "eco coach",
  ],
  authors: [{ name: "EcoNexus Team" }],
  creator: "EcoNexus",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://econexus.app",
    siteName: "EcoNexus",
    title: "EcoNexus — AI-Powered Sustainability Platform",
    description:
      "Understand your environmental impact, complete eco-challenges, and watch a living virtual forest grow with every sustainable action.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EcoNexus — AI-Powered Sustainability Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoNexus — AI-Powered Sustainability Platform",
    description:
      "Understand your environmental impact with AI-powered carbon intelligence.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// ── Viewport Configuration ────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: "#05070A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// ── Root Layout Component ─────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${sora.variable}`}
    >
      <body className="bg-eco-bg-primary text-eco-text-primary antialiased">
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
