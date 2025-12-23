import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drvyn-backend.vercel.app',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
    ],
    domains: [
      'localhost',
      'drvyn.in',
      'www.drvyn.in',      
      'drvyn-frontend.vercel.app', 
      'https://drvyn-backend.vercel.app',
      'i.ibb.co'   
    ],
  },
}

export default nextConfig