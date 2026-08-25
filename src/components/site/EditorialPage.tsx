import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

type Props = {
  eyebrow: string;
  breadcrumbLabel: string;
  title: string;
  lead: string;
  published: string;
  updated: string;
  children: ReactNode;
};

export function EditorialPage({
  eyebrow,
  breadcrumbLabel,
  title,
  lead,
  published,
  updated,
  children,
}: Props) {
  return (
    <>
      <SiteHeader />
      <main id="contenu" className="flex-1">
        <article>
          <header
            style={{
              background: "var(--color-surface)",
              borderBottom: "1px solid var(--color-line)",
            }}
          >
            <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 lg:py-24">
              <nav aria-label="Fil d’Ariane" className="text-[0.9rem]">
                <Link href="/" className="underline underline-offset-4">
                  Accueil
                </Link>
                <span aria-hidden className="mx-2">
                  /
                </span>
                <span aria-current="page">{breadcrumbLabel}</span>
              </nav>
              <p className="eyebrow mt-8">{eyebrow}</p>
              <h1 className="h-hero mt-4" style={{ color: "var(--color-ink)" }}>
                {title}
              </h1>
              <p
                className="mt-6 max-w-3xl text-[1.2rem] leading-relaxed"
                style={{ color: "var(--color-ink-soft)" }}
              >
                {lead}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Image
                  src="/images/thibault.webp"
                  alt="Thibault Wagret"
                  width={56}
                  height={56}
                  sizes="56px"
                  className="rounded-full"
                  style={{ border: "1px solid var(--color-gold)" }}
                />
                <p className="text-[0.92rem] leading-snug" style={{ color: "var(--color-ink-soft)" }}>
                  Sous la responsabilité éditoriale de{` `}
                  <Link
                    href="/thibault-wagret"
                    rel="author"
                    className="underline underline-offset-4"
                    style={{ color: "var(--color-accent-dark)" }}
                  >
                    Thibault Wagret
                  </Link>
                  <br />
                  Publié le {published} · mis à jour le {updated}
                </p>
              </div>
            </div>
          </header>

          <div className="article-prose mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:py-20">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
