import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // output: "standalone", // Disable for dev mode
  serverExternalPackages: ['@prisma/client'],
  // Increase memory limits
  experimental: {
    // Optimize for smaller memory usage
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
