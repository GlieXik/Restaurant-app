/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
  },
};

module.exports = nextConfig;
