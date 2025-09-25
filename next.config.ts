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
      'drvyn-backend.onrender.com',
      'i.ibb.co'   
    ],
  },
}

export default nextConfig