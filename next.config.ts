import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["ui-avatars.com"], 
    remotePatterns: [
      {
        protocol: 'https',
        hostname:'res.cloudinary.com',
        pathname: '/**',
      } // Allow Cloudinary image src
    ],
  },
};

export default nextConfig;
