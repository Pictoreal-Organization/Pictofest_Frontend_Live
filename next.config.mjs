/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  turbopack: {},
  images: {
    unoptimized: true, // Required for Cloudflare
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      }
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'undici': false,
    };
    return config;
  }
};

export default nextConfig;