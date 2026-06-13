import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { GreekExergue } from "@/components/site/GreekExergue";
import { BookingCTA } from "@/components/site/BookingCTA";
import { Testimonials } from "@/components/site/Testimonials";
import { MobileCTA } from "@/components/site/MobileCTA";
import { MediaSample } from "@/components/site/MediaSample";
import {
  site,
  hero,
  probleme,
  solution,
  methode,
  programme,
  inclus,
  resultats,
  apropos,
  publicCible,
  temoignages,
  latin,
  faq,
  tarif,
  reservation,
  media,
  logistique,
  greekTitles,
} from "@/content/site";

function Fleuron() {
  return (
    <div className="reveal py-10 text-center">
      <span className="fleuron">❧</span>
    </div>
  );
}

const AUTHORS = [
  { g: "Ὅμηρος", f: "Homère", lang: "grc" },
  { g: "Πλάτων", f: "Platon", lang: "grc" },
  { g: "Σοφοκλῆς", f: "Sophocle", lang: "grc" },
  { g: "Εὐαγγέλιον", f: "le Nouveau Testament", lang: "grc" },
  { g: "Cicero", f: "Cicéron", lang: "la" },
  { g: "Vergilius", f: "Virgile", lang: "la" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <ScrollReveal />
      <MobileCTA />
      <main id="accueil">
        {/* ===================== HÉROS ===================== */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
            <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div className="reveal">
                <p className="eyebrow flex items-center gap-3">
                  <span aria-hidden className="inline-block h-px w-6" style={{ background: "var(--color-gold)" }} />
                  {hero.eyebrow}
                </p>
                <h1 className="h-hero mt-5" style={{ color: "var(--color-ink)" }}>
                  {hero.heading}
                </h1>
                <p className="mt-6 text-[1.2rem] leading-relaxed" style={{ color: "var(--color-ink-soft)", maxWidth: "34rem" }}>
                  {hero.subheading}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href="#reservation" className="btn btn-primary">
                    {hero.ctaPrimary}
                  </Link>
                  <Link href="#methode" className="btn btn-ghost">
                    {hero.ctaSecondary}
                  </Link>
                </div>
                <div className="mt-10">
                  <hr className="rule-gold" style={{ maxWidth: "8rem" }} />
                  <GreekExergue greek={hero.greek} gloss={hero.greekGloss} className="mt-4" />
                </div>
              </div>

              {/* Frontispice : photographie du Parthénon */}
              <aside className="reveal">
                <figure
                  className="card"
                  style={{ padding: 0, overflow: "hidden", borderColor: "var(--color-gold)", position: "relative", aspectRatio: "4 / 5" }}
                >
                  <img
                    src="/images/parthenon-colonnes.webp"
                    alt="Les colonnes du Parthénon, sur l'Acropole d'Athènes"
                    width={1000}
                    height={1250}
                    fetchPriority="high"
                    className="img-warm"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <figcaption
                    style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "2rem 1.5rem 1.25rem", background: "linear-gradient(to top, rgba(20,16,12,0.88), rgba(20,16,12,0))" }}
                  >
                    <p className="eyebrow" style={{ color: "var(--color-gold)" }}>
                      Lire dans le texte
                    </p>
                    <p className="grec" style={{ color: "var(--color-aegean-ink)", fontSize: "1.4rem", marginTop: "0.25rem" }} lang="grc">
                      Ὅμηρος · Πλάτων · Σοφοκλῆς
                    </p>
                    <p className="italic" style={{ color: "rgba(251,245,230,0.85)", fontSize: "0.95rem" }}>
                      Homère, Platon, les tragiques — sans traduction.
                    </p>
                  </figcaption>
                </figure>
              </aside>
            </div>
          </div>
        </section>

        {/* ===================== BANDE AUTEURS ===================== */}
        <section
          className="reveal"
          aria-label="Les auteurs que vous lirez"
          style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)" }}
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6 py-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            <span className="eyebrow">Vous lirez</span>
            {AUTHORS.map((a) => (
              <span
                key={a.f}
                lang={a.lang}
                className={a.lang === "grc" ? "grec" : "italic"}
                style={{ color: "var(--color-ink)", fontSize: "1.2rem", fontFamily: a.lang === "grc" ? undefined : "var(--font-display)" }}
              >
                {a.g}
              </span>
            ))}
          </div>
        </section>

        {/* ============ BANDE ATMOSPHÈRE : l'Acropole ============ */}
        <section
          className="reveal"
          aria-label="L'Acropole d'Athènes"
          style={{ backgroundImage: "linear-gradient(rgba(36,59,69,0.7), rgba(20,16,12,0.8)), url('/images/acropole.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <div className="mx-auto max-w-3xl px-5 sm:px-6 py-24 lg:py-32 text-center">
            <p className="grec" style={{ color: "var(--color-aegean-ink)", fontSize: "clamp(1.5rem,3.4vw,2.3rem)", lineHeight: 1.35 }} lang="grc">
              Μῆνιν ἄειδε, θεά, Πηληϊάδεω Ἀχιλῆος
            </p>
            <p className="italic mt-3" style={{ color: "var(--color-gold)", fontSize: "1.05rem" }}>
              « Chante, déesse, la colère d&apos;Achille, fils de Pélée… »
            </p>
            <p className="eyebrow mt-4" style={{ color: "rgba(251,245,230,0.7)" }}>
              Homère, Iliade, chant I
            </p>
          </div>
        </section>

        {/* ===================== LE CONSTAT ===================== */}
        <section id={probleme.id} className="reveal">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 py-20 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
              <div>
                <SectionHeading eyebrow={probleme.eyebrow} title={probleme.heading} />
                <div className="mt-6 prose-measure">
                  <p className="lettrine text-[1.08rem] leading-relaxed" style={{ color: "var(--color-ink)" }}>
                    {probleme.body[0]}
                  </p>
                  <p className="mt-5 text-[1.08rem] leading-relaxed" style={{ color: "var(--color-ink)" }}>
                    {probleme.body[1]}
                  </p>
                </div>
              </div>
              <ul className="flex flex-col gap-4 lg:mt-20">
                {probleme.bullets.map((b, i) => (
                  <li key={i} className="card p-6">
                    <h3 className="manicule" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 600, color: "var(--color-accent-dark)" }}>
                      {b.title}
                    </h3>
                    <p className="mt-2" style={{ color: "var(--color-ink-soft)" }}>
                      {b.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ============ LA MÉTHODE — bloc d'autorité (Égée) ============ */}
        <section id={solution.id} className="reveal" style={{ background: "var(--color-aegean)", color: "var(--color-aegean-ink)" }}>
          <div className="mx-auto max-w-3xl px-5 sm:px-6 py-20 lg:py-28 text-center">
            <p className="eyebrow" style={{ color: "var(--color-gold)" }}>
              {solution.eyebrow}
            </p>
            <h2 className="h-section mt-4" style={{ color: "var(--color-aegean-ink)" }}>
              {solution.heading}
            </h2>
            <p className="grec mt-6" style={{ color: "var(--color-gold)", fontSize: "clamp(1.4rem,3vw,2rem)" }} lang="grc">
              {solution.greek}
            </p>
            <p className="italic" style={{ color: "rgba(251,245,230,0.72)" }}>
              {solution.greekGloss}
            </p>
            <p className="mt-8 text-[1.15rem] leading-relaxed" style={{ color: "rgba(251,245,230,0.92)" }}>
              {solution.body[0]}
            </p>
            <p className="mt-5 text-[1.15rem] leading-relaxed" style={{ color: "rgba(251,245,230,0.92)" }}>
              {solution.body[1]}
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-3 text-left">
              {solution.bullets.map((b, i) => (
                <div key={i} className="p-5 rounded" style={{ border: "1px solid rgba(176,138,56,0.3)" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-gold)" }}>
                    {b.title}
                  </h3>
                  <p className="mt-2 text-[0.98rem]" style={{ color: "rgba(251,245,230,0.82)" }}>
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ La démarche en 4 temps ============ */}
        <section id={methode.id} className="reveal">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 py-20 lg:py-24">
            <SectionHeading
              greek={greekTitles.methode.greek}
              gloss={greekTitles.methode.gloss}
              eyebrow={methode.eyebrow}
              title={methode.heading}
              subheading={methode.subheading}
            />
            <ol className="mt-12 flex flex-col gap-px" style={{ background: "var(--color-line)" }}>
              {methode.steps.map((s, i) => (
                <li key={i} className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-start p-7" style={{ background: "var(--color-bg)" }}>
                  <span aria-hidden style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", lineHeight: 1, color: "var(--color-accent)", fontWeight: 600, minWidth: "2.5rem" }}>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="h-card" style={{ color: "var(--color-ink)" }}>
                      {s.title}
                    </h3>
                    <p className="mt-2" style={{ color: "var(--color-ink-soft)" }}>
                      {s.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ Extrait média (input compréhensible) ============ */}
        <MediaSample media={media} />

        <Fleuron />

        {/* ===================== PROGRAMME ===================== */}
        <section
          id={programme.id}
          className="reveal"
          style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-line)", borderBottom: "1px solid var(--color-line)" }}
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6 py-20 lg:py-24">
            <SectionHeading
              greek={greekTitles.programme.greek}
              gloss={greekTitles.programme.gloss}
              eyebrow={programme.eyebrow}
              title={programme.heading}
              subheading={programme.subheading}
              align="center"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {programme.levels.map((lv) => (
                <div key={lv.numeral} className="card p-7 text-center">
                  <span aria-hidden className="inline-flex items-center justify-center rounded-full mx-auto" style={{ width: "3.4rem", height: "3.4rem", border: "1px solid var(--color-gold)", color: "var(--color-accent-dark)", fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 600 }}>
                    {lv.numeral}
                  </span>
                  <h3 className="h-card mt-4" style={{ color: "var(--color-ink)" }}>
                    {lv.title}
                  </h3>
                  <p className="mt-3 text-left" style={{ color: "var(--color-ink-soft)" }}>
                    {lv.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14">
              <div className="flex items-center gap-4">
                <hr className="rule-gold flex-1" />
                <span className="eyebrow">Chaque semaine</span>
                <hr className="rule-gold flex-1" />
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {programme.format.map((f, i) => (
                  <div key={i}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-accent-dark)" }}>
                      {f.title}
                    </h3>
                    <p className="mt-2" style={{ color: "var(--color-ink-soft)" }}>
                      {f.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistique — badges scannables */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {logistique.map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-baseline gap-2 rounded-full px-4 py-2"
                  style={{ border: "1px solid var(--color-line)", background: "var(--color-bg)" }}
                >
                  <span className="eyebrow" style={{ fontSize: "0.64rem" }}>
                    {b.label}
                  </span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--color-ink)" }}>
                    {b.value}
                  </span>
                </span>
              ))}
            </div>

            <p className="mt-10 mx-auto text-center italic" style={{ color: "var(--color-ink-soft)", maxWidth: "44rem" }}>
              {programme.note}
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="#reservation" className="btn btn-primary">
                Réserver un appel découverte
              </Link>
            </div>
          </div>
        </section>

        {/* ===================== CE QUI EST INCLUS ===================== */}
        <section id={inclus.id} className="reveal">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 py-20 lg:py-24">
            <SectionHeading eyebrow={inclus.eyebrow} title={inclus.heading} subheading={inclus.subheading} />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {inclus.bullets.map((b, i) => (
                <div key={i} className="card p-6">
                  <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", fontSize: "1.25rem", fontWeight: 600 }}>
                    {b.title}
                  </h3>
                  <p className="mt-2" style={{ color: "var(--color-ink-soft)" }}>
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== RÉSULTATS ===================== */}
        <section
          id={resultats.id}
          className="reveal"
          style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-line)" }}
        >
          <div className="mx-auto max-w-5xl px-5 sm:px-6 py-20 lg:py-24">
            <SectionHeading eyebrow={resultats.eyebrow} title={resultats.heading} subheading={resultats.lead} />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2">
              {resultats.items.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <span aria-hidden style={{ color: "var(--color-accent)", fontSize: "1.4rem", lineHeight: 1.2 }}>
                    ❧
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 600, color: "var(--color-ink)" }}>
                      {b.title}
                    </h3>
                    <p className="mt-1.5" style={{ color: "var(--color-ink-soft)" }}>
                      {b.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <GreekExergue greek={resultats.greek} gloss={resultats.greekGloss} align="center" />
            </div>
          </div>
        </section>

        {/* ======== LE PROFESSEUR — bloc d'autorité (Égée) ======== */}
        <section id={apropos.id} className="reveal" style={{ background: "var(--color-aegean)", color: "var(--color-aegean-ink)" }}>
          <div className="mx-auto max-w-6xl px-5 sm:px-6 py-20 lg:py-28">
            <div className="max-w-3xl">
              <p className="grec" lang="grc" style={{ color: "var(--color-gold)", fontSize: "1.5rem" }}>
                {greekTitles.professeur.greek}
                <span className="italic" style={{ color: "rgba(251,245,230,0.7)", fontFamily: "var(--font-body)", fontSize: "0.95rem" }}>
                  {"  · "}
                  {greekTitles.professeur.gloss}
                </span>
              </p>
              <p className="eyebrow mt-2" style={{ color: "var(--color-gold)" }}>
                {apropos.eyebrow}
              </p>
              <h2 className="h-section mt-3" style={{ color: "var(--color-aegean-ink)" }}>
                {apropos.heading}
              </h2>
              <p className="mt-5 italic" style={{ color: "rgba(251,245,230,0.8)" }}>
                {apropos.subheading}
              </p>
            </div>

            <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div>
                <figure
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "50%",
                    border: "2px solid var(--color-gold)",
                    width: "clamp(180px, 42vw, 236px)",
                    aspectRatio: "1 / 1",
                    boxShadow: "0 18px 44px -20px rgba(0,0,0,0.65), inset 0 0 0 6px rgba(36,59,69,0.55)",
                  }}
                >
                  <img
                    src="/images/thibault.webp"
                    alt="Portrait de Thibault Wagret"
                    width={640}
                    height={640}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </figure>
                <p className="mt-4 italic text-[0.9rem]" style={{ color: "rgba(251,245,230,0.7)" }}>
                  Thibault Wagret — agrégé de Lettres classiques, doctorant à l&apos;ENS de Lyon.
                </p>
                <ul className="mt-7 flex flex-col gap-4">
                  {apropos.bullets.map((b, i) => (
                    <li key={i} style={{ borderLeft: "2px solid var(--color-gold)", paddingLeft: "1rem" }}>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-gold)" }}>
                        {b.title}
                      </p>
                      <p className="text-[0.95rem] mt-0.5" style={{ color: "rgba(251,245,230,0.8)" }}>
                        {b.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                {apropos.body.map((p, i) => (
                  <p key={i} className="text-[1.12rem] leading-relaxed" style={{ color: "rgba(251,245,230,0.92)", marginTop: i === 0 ? 0 : "1.25rem" }}>
                    {p}
                  </p>
                ))}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <span className="grec" style={{ color: "var(--color-gold)", fontSize: "1.5rem" }} lang="grc">
                    {apropos.greek}
                  </span>
                  <span className="italic" style={{ color: "rgba(251,245,230,0.7)" }}>
                    — {apropos.greekGloss}
                  </span>
                </div>
                <Link href="#reservation" className="btn btn-on-dark mt-8">
                  {reservation.ctaPrimary}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== POUR QUI ===================== */}
        <section id={publicCible.id} className="reveal">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 py-20 lg:py-24">
            <SectionHeading eyebrow={publicCible.eyebrow} title={publicCible.heading} subheading={publicCible.subheading} align="center" />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {publicCible.bullets.map((b, i) => (
                <div key={i} className="card p-6">
                  <h3 style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)", fontSize: "1.2rem", fontWeight: 600 }}>
                    {b.title}
                  </h3>
                  <p className="mt-2" style={{ color: "var(--color-ink-soft)" }}>
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center italic" style={{ color: "var(--color-ink-soft)" }}>
              {publicCible.note}
            </p>
          </div>
        </section>

        {/* ===================== TÉMOIGNAGES (masqués tant qu'il n'y a pas de vrais avis) ===================== */}
        <Testimonials id={temoignages.id} eyebrow={temoignages.eyebrow} heading={temoignages.heading} quotes={temoignages.quotes} />

        {/* ===================== LATIN ===================== */}
        <section id={latin.id} className="reveal">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 py-20 lg:py-24 text-center">
            <p className="eyebrow">{latin.eyebrow}</p>
            <h2 className="h-section mt-4" style={{ color: "var(--color-ink)" }}>
              {latin.heading}
            </h2>
            <p className="mt-5 italic" style={{ fontFamily: "var(--font-display)", color: "var(--color-accent-dark)", fontSize: "1.6rem" }} lang="la">
              {latin.greek}
            </p>
            <p className="italic" style={{ color: "var(--color-ink-soft)" }}>
              {latin.greekGloss}
            </p>
            <p className="mt-6 mx-auto text-[1.1rem] leading-relaxed" style={{ color: "var(--color-ink)", maxWidth: "44rem" }}>
              {latin.body[0]}
            </p>
            <p className="mt-5 mx-auto italic" style={{ color: "var(--color-ink-soft)", maxWidth: "40rem" }}>
              {latin.note}
            </p>
          </div>
        </section>

        {/* ===================== FAQ ===================== */}
        <section id={faq.id} className="reveal" style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-line)" }}>
          <div className="mx-auto max-w-3xl px-5 sm:px-6 py-20 lg:py-24">
            <SectionHeading eyebrow={faq.eyebrow} title={faq.heading} align="center" />
            <div className="mt-10 flex flex-col">
              {faq.items.map((item, i) => (
                <details key={i} className="group" style={{ borderTop: i === 0 ? "1px solid var(--color-line)" : undefined, borderBottom: "1px solid var(--color-line)" }}>
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-ink)" }}>
                    {item.title}
                    <span aria-hidden className="shrink-0 transition-transform group-open:rotate-45" style={{ color: "var(--color-accent)", fontSize: "1.5rem", lineHeight: 1 }}>
                      +
                    </span>
                  </summary>
                  <p className="pb-5 -mt-1" style={{ color: "var(--color-ink-soft)" }}>
                    {item.text}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== TARIF (discret, fin de tunnel) ===================== */}
        <section id={tarif.id} className="reveal" style={{ borderTop: "1px solid var(--color-line)" }}>
          <div className="mx-auto max-w-2xl px-5 sm:px-6 py-14 text-center">
            <p className="grec" lang="grc" style={{ color: "var(--color-accent-dark)", fontSize: "1.3rem" }}>
              {greekTitles.tarif.greek}
              <span className="italic" style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-body)", fontSize: "0.95rem" }}>
                {"  · "}
                {greekTitles.tarif.gloss}
              </span>
            </p>
            <p className="eyebrow mt-2">{tarif.eyebrow}</p>
            <p className="mt-3">
              <span style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 600, color: "var(--color-ink)" }}>
                {tarif.price}
              </span>
              <span style={{ color: "var(--color-ink-soft)", fontSize: "1.05rem" }}> {tarif.period}</span>
            </p>
            <ul className="mt-5 inline-flex flex-col gap-1.5 text-left" style={{ maxWidth: "30rem" }}>
              {tarif.includes.map((inc, i) => (
                <li key={i} className="manicule text-[0.97rem]" style={{ color: "var(--color-ink-soft)" }}>
                  {inc}
                </li>
              ))}
            </ul>
            <p className="mt-5 mx-auto italic text-[0.92rem]" style={{ color: "var(--color-ink-soft)", maxWidth: "34rem" }}>
              {tarif.note}
            </p>
            <div className="mt-6">
              <Link href="#reservation" className="btn btn-ghost">
                Réserver un appel découverte
              </Link>
            </div>
          </div>
        </section>

        {/* ============ RÉSERVATION — bloc final (Égée + Sounion) ============ */}
        <section
          id={reservation.id}
          className="reveal"
          style={{ backgroundImage: "linear-gradient(rgba(36,59,69,0.9), rgba(36,59,69,0.92)), url('/images/sounion-coucher.webp')", backgroundSize: "cover", backgroundPosition: "center", color: "var(--color-aegean-ink)" }}
        >
          <div className="mx-auto max-w-5xl px-5 sm:px-6 py-20 lg:py-28">
            <div className="text-center">
              <p className="grec" lang="grc" style={{ color: "var(--color-gold)", fontSize: "1.5rem" }}>
                {greekTitles.reservation.greek}
                <span className="italic" style={{ color: "rgba(251,245,230,0.72)", fontFamily: "var(--font-body)", fontSize: "0.95rem" }}>
                  {"  · "}
                  {greekTitles.reservation.gloss}
                </span>
              </p>
              <p className="eyebrow mt-2" style={{ color: "var(--color-gold)" }}>
                {reservation.eyebrow}
              </p>
              <h2 className="h-section mt-3" style={{ color: "var(--color-aegean-ink)" }}>
                {reservation.heading}
              </h2>
              <p className="mt-5 mx-auto text-[1.15rem] leading-relaxed" style={{ color: "rgba(251,245,230,0.9)", maxWidth: "42rem" }}>
                {reservation.subheading}
              </p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <ol className="flex flex-col gap-6">
                {reservation.steps.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span aria-hidden className="inline-flex items-center justify-center rounded-full shrink-0" style={{ width: "2.4rem", height: "2.4rem", border: "1px solid var(--color-gold)", color: "var(--color-gold)", fontFamily: "var(--font-display)", fontWeight: 600 }}>
                      {i + 1}
                    </span>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-aegean-ink)" }}>
                        {s.title}
                      </h3>
                      <p className="mt-1 text-[0.98rem]" style={{ color: "rgba(251,245,230,0.78)" }}>
                        {s.text}
                      </p>
                    </div>
                  </li>
                ))}
                <li className="mt-2 italic text-[0.95rem]" style={{ color: "rgba(251,245,230,0.7)" }}>
                  {reservation.note}
                </li>
              </ol>

              <div>
                <p
                  className="mb-4 flex items-start gap-2 text-[0.95rem]"
                  style={{ color: "rgba(251,245,230,0.9)" }}
                >
                  <span aria-hidden style={{ color: "var(--color-gold)" }}>
                    ✓
                  </span>
                  {reservation.reassurance}
                </p>
                <BookingCTA bookingUrl={site.bookingUrl || undefined} email={site.email} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
