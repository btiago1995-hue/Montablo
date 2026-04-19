/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/api/loyalty/**': ['./src/lib/loyalty/apple-wallet-model/**'],
  },
};

export default nextConfig;
