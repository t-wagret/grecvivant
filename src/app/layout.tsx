import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, EB_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE_URL } from "@/lib/site-url";

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

// Interface uniquement (sur-titres, navigation, libellés)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.title,
    template: "%s — Le Grec Vivant",
  },
  description: site.metaDescription,
  applicationName: site.shortTitle,
  authors: [{ name: "Thibault Wagret", url: "https://thibaultwagret.fr" }],
  creator: "Thibault Wagret",
  publisher: "Le Grec Vivant",
  category: "education",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: site.ogTitle,
    description: site.metaDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#f4ebd7",
  colorScheme: "light",
};

const identityJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.shortTitle,
      description: site.metaDescription,
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Thibault Wagret",
      url: "https://thibaultwagret.fr",
      image: `${SITE_URL}/images/thibault.webp`,
      jobTitle: "Agrégé de Lettres classiques et doctorant",
      affiliation: {
        "@type": "Organization",
        name: "ENS de Lyon — laboratoire HiSoMA",
        url: "https://www.hisoma.mom.fr",
      },
      sameAs: ["https://thibaultwagret.fr"],
      knowsAbout: [
        "grec ancien",
        "latin",
        "didactique des langues anciennes",
        "méthode active",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${ebGaramond.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <StructuredData data={identityJsonLd} />
        {children}
      </body>
    </html>
  );
}
