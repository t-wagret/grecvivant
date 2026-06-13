import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ressources, site } from "@/content/site";

export const metadata: Metadata = {
  title: ressources.metaTitle,
  description: ressources.metaDescription,
  openGraph: { title: ressources.metaTitle, description: ressources.metaDescription },
};

const KIND_COLOR: Record<string, string> = {
  PDF: "var(--color-accent)",
  Audio: "var(--color-gold)",
  Vidéo: "var(--color-aegean)",
  Lien: "var(--color-ink-soft)",
};

function KindBadge({ kind }: { kind: string }) {
  return (
    <span
      className="text-[0.66rem] px-2 py-0.5 rounded-full"
      style={{
        fontFamily: "var(--font-ui)",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#fff",
        background: KIND_COLOR[kind] || "var(--color-ink-soft)",
      }}
    >
      {kind}
    </span>
  );
}

export default function RessourcesPage() {
  return (
    <>
      <SiteHeader />
      <ScrollReveal />
      <main>
        {/* Hero */}
        <section className="reveal">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 pt-16 pb-10 lg:pt-24 text-center">
            <p className="grec" lang="grc" style={{ color: "var(--color-accent-dark)", fontSize: "1.6rem" }}>
              {ressources.greek}
              <span className="italic" style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-body)", fontSize: "0.95rem" }}>
                {"  · "}
                {ressources.greekGloss}
              </span>
            </p>
            <p className="eyebrow mt-2">{ressources.heroEyebrow}</p>
            <h1 className="h-section mt-3" style={{ color: "var(--color-ink)", fontSize: "clamp(2rem,4vw,3rem)" }}>
              {ressources.heroHeading}
            </h1>
            <p className="mt-5 mx-auto text-[1.12rem] leading-relaxed" style={{ color: "var(--color-ink-soft)", maxWidth: "44rem" }}>
              {ressources.heroIntro}
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <hr className="rule-gold" />
        </div>

        {/* Catégories */}
        {ressources.categories.map((cat, ci) => (
          <section key={ci} className="reveal">
            <div className="mx-auto max-w-5xl px-5 sm:px-6 py-12 lg:py-16">
              <SectionHeading as="h2" title={cat.title} subheading={cat.description} />
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {cat.items.map((item, ii) => (
                  <div key={ii} className="card p-6 flex flex-col">
                    <KindBadge kind={item.kind} />
                    <h3 className="mt-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-ink)" }}>
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1" style={{ color: "var(--color-ink-soft)", fontSize: "0.97rem" }}>
                      {item.note}
                    </p>
                    <span
                      className="mt-4 inline-block text-[0.8rem] italic"
                      style={{ color: "var(--color-ink-soft)" }}
                    >
                      Bientôt disponible
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA contribution */}
        <section
          className="reveal"
          style={{ background: "var(--color-aegean)", color: "var(--color-aegean-ink)" }}
        >
          <div className="mx-auto max-w-3xl px-5 sm:px-6 py-16 lg:py-20 text-center">
            <h2 className="h-section" style={{ color: "var(--color-aegean-ink)" }}>
              {ressources.ctaHeading}
            </h2>
            <p className="mt-4 mx-auto text-[1.08rem] leading-relaxed" style={{ color: "rgba(251,245,230,0.9)", maxWidth: "42rem" }}>
              {ressources.ctaText}
            </p>
            <a href={`mailto:${site.email}`} className="btn btn-on-dark mt-7">
              Écrire à Thibault
            </a>
            <p className="grec mt-8" lang="grc" style={{ color: "var(--color-gold)", fontSize: "1.2rem" }}>
              ἀρχὴ ἥμισυ παντός
            </p>
            <p className="italic" style={{ color: "rgba(251,245,230,0.7)", fontSize: "0.9rem" }}>
              commencer, c&apos;est déjà la moitié du chemin.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
