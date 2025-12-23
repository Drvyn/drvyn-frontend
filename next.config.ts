import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
   images: {
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