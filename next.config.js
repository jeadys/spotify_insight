/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // experimental: {
  //   images: {
  //     allowFutureImage: true,
  //     remotePatterns: [
  //       {
  //         protocol: "https",
  //         hostname: "**.scdn.co",
  //         hostname: "**.spotifycdn.com",
  //       },
  //     ],
  //   },
  // },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: [
      'i.scdn.co',
      't.scdn.co',
      'newjams-images.scdn.co',
      'dailymix-images.scdn.co',
      'seed-mix-image.spotifycdn.com',
      'charts-images.scdn.co',
      'daily-mix.scdn.co',
      'mixed-media-images.spotifycdn.com',
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
