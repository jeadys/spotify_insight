/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.spotifycdn.com',
      },
      {
        protocol: 'https',
        hostname: '*.scdn.co',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/profile',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
