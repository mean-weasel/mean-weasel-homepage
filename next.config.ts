import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["mean-weasel-homepage.127.0.0.1.nip.io"],
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
