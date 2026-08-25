import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${SITE_URL}/images/parthenon-colonnes.webp`,
        `${SITE_URL}/images/acropole.webp`,
        `${SITE_URL}/images/thibault.webp`,
        `${SITE_URL}/images/sounion-coucher.webp`,
      ],
    },
  ];
}
