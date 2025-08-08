import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      new URL("https://ui-avatars.com/api/?name=user&background=#111"),
    ],
  },
};

export default nextConfig;
