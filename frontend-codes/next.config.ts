import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // This allows requests from your Cloud Shell preview URL
    allowedDevOrigins: ["https://3001-cs-88a5d951-d78f-4ca5-b4dc-e151e80a6bca.cs-europe-west1-xedi.cloudshell.dev"],
  },
};

export default nextConfig;