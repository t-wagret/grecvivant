import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Données des dictionnaires (data/dictionnaires, ~23 Mo compressés) lues par la recherche côté serveur.
  outputFileTracingIncludes: {
    "/api/dictionnaires": ["./data/dictionnaires/**/*"],
  },
  async headers() {
    const securityHeaders = [
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      },
    ];
    const noIndexHeaders = [
      {
        key: "X-Robots-Tag",
        value: "noindex, nofollow, noarchive",
      },
    ];

    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/connexion", headers: noIndexHeaders },
      { source: "/communaute/:path*", headers: noIndexHeaders },
      { source: "/auth/:path*", headers: noIndexHeaders },
      { source: "/admin/:path*", headers: noIndexHeaders },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.grecvivant.fr" }],
        destination: "https://grecvivant.fr/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "grecvivant.vercel.app" }],
        destination: "https://grecvivant.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
