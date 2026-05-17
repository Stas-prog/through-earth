import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},

  async headers() {
    return [
      {
        source: "/cesium/:path*",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;