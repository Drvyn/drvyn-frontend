import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
   images: {
    domains: [
      'localhost',
      'www.drvyn.in',      
      'drvyn-frontend.vercel.app', 
      'drvyn-backend.onrender.com'   
    ],
  },
}

export default nextConfig