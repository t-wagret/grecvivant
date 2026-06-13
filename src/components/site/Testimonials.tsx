import { SectionHeading } from "./SectionHeading";
import type { Quote } from "@/content/site";

/**
 * Section témoignages RÉUTILISABLE.
 * Ne rend RIEN tant qu'il n'y a pas de vrais avis (quotes vide) — il suffira
 * de remplir `temoignages.quotes` dans src/content/site.ts pour l'afficher.
 */
export function Testimonials({
  id,
  eyebrow,
  heading,
  quotes,
}: {
  id?: string;
  eyebrow?: string;
  heading: string;
  quotes: Quote[];
}) {
  if (!quotes || quotes.length === 0) return null;

  return (
    <section
      id={id}
      className="reveal"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-line)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-20 lg:py-24">
        <SectionHeading eyebrow={eyebrow} title={heading} align="center" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <figure key={i} className="card p-7 flex flex-col">
              <span
                aria-hidden
                style={{ fontFamily: "var(--font-display)", fontSize: "3rem", lineHeight: 0.6, color: "var(--color-gold)" }}
              >
                &ldquo;
              </span>
              <blockquote className="mt-2 italic flex-1" style={{ color: "var(--color-ink)" }}>
                {q.text}
              </blockquote>
              <figcaption className="mt-5">
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--color-accent-dark)" }}>
                  {q.author}
                </p>
                {q.role && (
                  <p className="text-[0.9rem]" style={{ color: "var(--color-ink-soft)" }}>
                    {q.role}
                  </p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
