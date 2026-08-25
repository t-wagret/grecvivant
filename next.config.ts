import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const noIndexHeaders = [
      {
        key: "X-Robots-Tag",
        value: "noindex, nofollow, noarchive",
      },
    ];

    return [
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
    ];
  },
};

export default nextConfig;
