import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required so PostHog capture endpoints like /ph/e/ are not redirected.
  skipTrailingSlashRedirect: true,
  // Reverse proxy — serve PostHog under /ph to reduce ad-blocker drops.
  async rewrites() {
    return [
      {
        source: "/ph/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ph/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ph/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
};

export default nextConfig;
