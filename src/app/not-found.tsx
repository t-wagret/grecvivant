import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: { absolute: "Page introuvable — Le Grec Vivant" },
  description: "Cette page n'existe pas ou a été déplacée.",
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Page introuvable — Le Grec Vivant",
    description: "Cette page n'existe pas ou a été déplacée.",
  },
  twitter: {
    card: "summary",
    title: "Page introuvable — Le Grec Vivant",
    description: "Cette page n'existe pas ou a été déplacée.",
  },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="contenu" className="flex-1">
        <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-6 lg:py-32">
          <p className="grec text-4xl" lang="grc" style={{ color: "var(--color-accent-dark)" }}>
            οὐδὲν ἐνθάδε
          </p>
          <p className="eyebrow mt-4">Erreur 404</p>
          <h1 className="h-section mt-3">Cette page demeure introuvable.</h1>
          <p className="mx-auto mt-5 max-w-xl" style={{ color: "var(--color-ink-soft)" }}>
            Le chemin a peut-être changé. Retrouvez la méthode, le programme ou
            les ressources depuis les pages principales.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn btn-primary">
              Revenir à l&apos;accueil
            </Link>
            <Link href="/methode-active-grec-ancien" className="btn btn-ghost">
              Lire le guide de la méthode
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
