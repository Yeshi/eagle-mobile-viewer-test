import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/eagle/:path*',
        destination: 'http://192.168.1.38:41595/api/:path*' // EagleのAPI
      }
    ];
  }
};