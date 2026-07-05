import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
