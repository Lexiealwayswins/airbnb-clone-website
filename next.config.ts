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
      }, // Allow Cloudinary image src
      // {
      //   protocol: 'https',
      //   hostname:'ui-avatars.com',
      //   pathname: '/**',
      // }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // 构建时忽略 ESLint 错误
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

export default nextConfig;
