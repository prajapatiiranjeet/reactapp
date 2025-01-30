/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'tile.openstreetmap.org',
      'a.tile.openstreetmap.org',
      'b.tile.openstreetmap.org',
      'c.tile.openstreetmap.org',
      'localhost',  // Add this for local profile image
      'photos.app.goo.gl',
      'lh3.googleusercontent.com',
      'static.vecteezy.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'photos.app.goo.gl',
        pathname: '/**',
      },
    ],
    unoptimized: true
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      canvas: false
    };
    return config;
  },
  reactStrictMode: true,
}

module.exports = nextConfig