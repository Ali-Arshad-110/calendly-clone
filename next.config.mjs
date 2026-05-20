/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
  // Optimize for production builds
  compress: true,
  // Enable SWR caching
  swcMinify: true,
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
