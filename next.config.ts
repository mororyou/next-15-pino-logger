import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next 15~
  serverExternalPackages: ['pino'],
  // next ~14
  // experimental: {
  //   serverComponentsExternalPackages: ['pino'],
  // },
};

export default nextConfig;
