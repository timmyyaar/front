/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  serverRuntimeConfig: {
    apiTimeout: 120000,
  },
};

module.exports = nextConfig;
