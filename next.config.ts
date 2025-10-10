import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kirsch-lms-course-platform.fly.storage.tigris.dev",
        port: "",
      }
    ]
  }
};

export default nextConfig;
