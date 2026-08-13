/**
 * Marketing Layout — (marketing) Route Group
 *
 * Wraps all public-facing pages: landing, about, features, pricing.
 * Does NOT include the dashboard navigation sidebar.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "EcoNexus — AI-Powered Sustainability Platform",
    template: "%s | EcoNexus",
  },
};

import { Navbar } from "@/components/marketing/navbar";
import { MouseGlow } from "@/components/ui/mouse-glow";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-eco-bg-primary text-white">
      <MouseGlow />
      <Navbar />
      <main className="relative z-10 flex flex-col min-h-screen">
        {children}
      </main>
    </div>
  );
}
