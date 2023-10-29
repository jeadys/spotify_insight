/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.spotifycdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.scdn.co',
      },
    ],
    unoptimized: true,
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/profile?timeRange=short',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
