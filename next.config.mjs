/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [
      {
        source: "/:lang/industry-field/:id",
        destination: "/:lang/industry-field/[id]",
      },
      // ... other rewrites
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/**`,
      },
    ],
  },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' data: https:; style-src 'unsafe-inline';",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
