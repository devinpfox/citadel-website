import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // These rewrites are checked after all pages/API routes
      fallback: [
        {
          source: "/:path*",
          destination: "https://wp.citadelgold.com/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
