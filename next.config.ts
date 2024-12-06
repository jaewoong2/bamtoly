import type { NextConfig } from 'next';
import { Rewrite } from 'next/dist/lib/load-custom-routes';

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination:
        process.env.NODE_ENV === 'development'
          ? `http://localhost:3001/api/:path*`
          : 'https://api.bamtoly.com/api/:path*',
    },
  ],
  output: 'standalone',
  images: {
    remotePatterns: [{ hostname: 'd3t7exr31xs1l7.cloudfront.net' }, { hostname: 'images.bamtoly.com' }],
  },
  reactStrictMode: true,
};

export default nextConfig;
