import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance: React strict mode for catching subtle bugs early
  reactStrictMode: true,

  // Image optimization — allow Supabase storage domain and local assets
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  // Enforce TypeScript errors fail the build (production quality)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
