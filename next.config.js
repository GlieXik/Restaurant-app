/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secondSecret: process.env.MONGO_URI,
  },
};

module.exports = nextConfig;
