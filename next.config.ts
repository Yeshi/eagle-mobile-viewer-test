import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/eagle/:path*",
        destination: `${process.env.EAGLE_API_PATH}/api/:path*`, // EagleのAPI
      },
    ];
  },
};
