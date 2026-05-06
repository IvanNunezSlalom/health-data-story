/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['d3', 'recharts', 'framer-motion'],
  },
}

module.exports = nextConfig
