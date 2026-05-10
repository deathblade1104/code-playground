import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "i.ibb.co", pathname: "/**" },
      { hostname: "images.unsplash.com", pathname: "/**" },
      { hostname: "media.istockphoto.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
