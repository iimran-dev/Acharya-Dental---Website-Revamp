import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/acharya-dental",

  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
