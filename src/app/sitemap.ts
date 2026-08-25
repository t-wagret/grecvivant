import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: "2026-08-25",
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${SITE_URL}/images/parthenon-colonnes.webp`,
        `${SITE_URL}/images/acropole.webp`,
        `${SITE_URL}/images/thibault.webp`,
        `${SITE_URL}/images/sounion-coucher.webp`,
      ],
    },
    {
      url: `${SITE_URL}/methode-active-grec-ancien`,
      lastModified: "2026-08-25",
      changeFrequency: "monthly",
      priority: 0.85,
      images: [`${SITE_URL}/images/parthenon-colonnes.webp`],
    },
    {
      url: `${SITE_URL}/thibault-wagret`,
      lastModified: "2026-08-25",
      changeFrequency: "yearly",
      priority: 0.7,
      images: [`${SITE_URL}/images/thibault.webp`],
    },
  ];
}
