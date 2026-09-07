import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Izinkan akses HMR dev server dari HP / jaringan lokal
  allowedDevOrigins: [
    '192.168.100.16',
    '192.168.100.16:3000',
    'localhost:3000',
  ],
};

export default nextConfig;