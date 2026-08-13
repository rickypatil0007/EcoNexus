/**
 * Root Providers — EcoNexus
 *
 * Single wrapper component that mounts all React context providers.
 * Keeps app/layout.tsx clean and providers easily composable.
 *
 * Current providers:
 *   - Toaster (toast notifications)
 *
 * Future providers (added as features are implemented):
 *   - SupabaseProvider (Session context)
 *   - ThemeProvider (if dark/light toggle is needed)
 *   - QueryClientProvider (React Query, if adopted)
 */

"use client";

import { Toaster } from "@/components/ui/toaster";

interface RootProvidersProps {
  readonly children: React.ReactNode;
}

export function RootProviders({ children }: RootProvidersProps) {
  return (
    <>
      {children}
      {/* Toast notifications — accessible, non-blocking */}
      <Toaster />
    </>
  );
}
