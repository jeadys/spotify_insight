/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/profile",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
