import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  EB_Garamond,
  GFS_Neohellenic,
  Inter,
} from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

// Titres display (latin/français uniquement — pas de glyphes grecs)
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

// Corps de texte ET grec inline (polytonique complet : greek + greek-ext)
const ebGaramond = EB_Garamond({
  subsets: ["latin", "latin-ext", "greek", "greek-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

// Grec de mise en valeur (citations en exergue)
const gfsNeohellenic = GFS_Neohellenic({
  subsets: ["greek", "latin"],
  weight: ["400", "700"],
  variable: "--font-gfs-neohellenic",
  display: "swap",
});

// Interface uniquement (sur-titres, navigation, libellés)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://grecvivant.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: "%s — Le Grec Vivant",
  },
  description: site.metaDescription,
  applicationName: site.shortTitle,
  authors: [{ name: "Thibault Wagret" }],
  keywords: [
    "grec ancien",
    "latin",
    "méthode active",
    "langue vivante",
    "input compréhensible",
    "Homère",
    "Platon",
    "cours de grec",
    "Thibault Wagret",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: site.shortTitle,
    title: site.ogTitle,
    description: site.metaDescription,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: site.ogTitle,
    description: site.metaDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${ebGaramond.variable} ${gfsNeohellenic.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
