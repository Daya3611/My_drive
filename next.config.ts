import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100MB",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "png.pngtree.com",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
      
    ],
  },
};

  // module.exports = {
  //   typescript: {
  //     ignoreBuildErrors: true,
  //   },
  //   eslint: {
  //     ignoreDuringBuilds: true,
  //   },
  // };

export default nextConfig;
