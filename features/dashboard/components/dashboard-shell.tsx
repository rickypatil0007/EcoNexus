/**
 * Dashboard Shell — EcoNexus
 *
 * Client-side shell that wires together the Sidebar, Topbar,
 * and MobileNav with shared mobile state.
 *
 * This is a client component so it can manage the mobile menu open state.
 * The outer DashboardLayout is a Server Component that fetches the user.
 *
 * Reference: 02-structure.md, 04-design.md
 */

"use client";

import { useState } from "react";
import { Sidebar }   from "./sidebar";
import { Topbar }    from "./topbar";
import { MobileNav } from "./mobile-nav";

// ── Props ─────────────────────────────────────────────────────────────────────

interface DashboardShellProps {
  children:     React.ReactNode;
  userEmail?:   string;
  displayName?: string;
  pageTitle?:   string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function DashboardShell({
  children,
  userEmail,
  displayName,
  pageTitle,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#05070A" }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden w-64 flex-shrink-0 flex-col p-4 lg:flex"
        style={{
          background:   "rgba(13,17,23,0.97)",
          borderRight:  "1px solid rgba(255,255,255,0.06)",
          minHeight:    "100vh",
          position:     "sticky",
          top:          0,
          alignSelf:    "flex-start",
          height:       "100vh",
        }}
      >
        <Sidebar userEmail={userEmail} displayName={displayName} />
      </aside>

      {/* Mobile Navigation Overlay */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        userEmail={userEmail}
        displayName={displayName}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          pageTitle={pageTitle}
          userEmail={userEmail}
          displayName={displayName}
          onMenuToggle={() => setMobileOpen((p) => !p)}
          isMobileMenuOpen={mobileOpen}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
