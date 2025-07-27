/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.10minuteschool.com', 's3.ap-southeast-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.10minuteschool.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 's3.ap-southeast-1.amazonaws.com',
        pathname: '**',
      }
    ],
  },
};

module.exports = nextConfig; 