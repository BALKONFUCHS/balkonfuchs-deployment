/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // output: 'export' entfernt für Dev-Server
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Minimale Konfiguration ohne problematische Features
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(tsx|ts|js)$/,
      exclude: [
        /balkonfuchs-kalkulator-funnel\.tsx$/,
        /pages\/partner\.tsx$/,
        /pages\/bauzeit-planung\.tsx$/,
        /pages\/api\.disabled\//,
        /pages\/\[funnel\]\//
      ],
    });
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Deaktiviere alle problematischen Features
  experimental: {
    esmExternals: false,
  },
  // Minimale Head-Konfiguration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
