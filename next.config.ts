import type { NextConfig } from "next";

const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["mean-weasel-homepage.127.0.0.1.nip.io"],
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: `${posthogHost}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/pricing/", destination: "/pricing", permanent: true },
      { source: "/services/", destination: "/services", permanent: true },
      { source: "/use-cases/", destination: "/use-cases", permanent: true },
      { source: "/services/web-design-phoenix/", destination: "/services/web-design-phoenix", permanent: true },
      {
        source: "/gallery/",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/projects/:slug/",
        destination: "/projects/:slug",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.mean-weasel.com",
          },
        ],
        destination: "https://mean-weasel.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
