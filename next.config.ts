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
  eslint: {
    ignoreDuringBuilds: true, // 构建时忽略 ESLint 错误
  },
};

export default nextConfig;
