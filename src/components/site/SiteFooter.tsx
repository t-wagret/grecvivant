import Link from "next/link";
import { Monogram } from "./Monogram";
import { site, nav } from "@/content/site";

export function SiteFooter() {
  return (
    <footer
      className="mt-auto"
      style={{
        background: "var(--color-aegean)",
        color: "var(--color-aegean-ink)",
      }}
    >
      {/* méandre grec ultra-discret */}
      <div
        aria-hidden
        style={{
          height: "3px",
          background:
            "repeating-linear-gradient(90deg, var(--color-gold) 0 10px, transparent 10px 14px, var(--color-gold) 14px 17px, transparent 17px 27px)",
          opacity: 0.35,
        }}
      />
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div style={{ maxWidth: "30rem" }}>
            <div className="flex items-center gap-3">
              <Monogram />
              <span
                className="font-display"
                style={{ fontSize: "1.4rem", fontWeight: 600 }}
              >
                {site.shortTitle}
              </span>
            </div>
            <p
              className="mt-4 text-[0.98rem] leading-relaxed"
              style={{ color: "rgba(251,245,230,0.78)" }}
            >
              {site.footerBlurb}
            </p>
            <p className="mt-4 text-[0.78rem]" style={{ color: "rgba(251,245,230,0.5)" }}>
              Photographies&nbsp;: Thermos, A.&nbsp;Savin, Petroskaz — Wikimedia
              Commons, CC&nbsp;BY-SA.
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Pied de page">
            <p className="eyebrow" style={{ color: "var(--color-gold)" }}>
              Naviguer
            </p>
            {nav.map((l) => (
              <Link
                key={l.href}
                href={`/${l.href}`}
                className="text-[0.98rem] hover:underline"
                style={{ color: "rgba(251,245,230,0.9)" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/communaute"
              className="text-[0.98rem] hover:underline"
              style={{ color: "rgba(251,245,230,0.9)" }}
            >
              Communauté
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="text-[0.98rem] hover:underline"
              style={{ color: "rgba(251,245,230,0.9)" }}
            >
              {site.email}
            </a>
          </nav>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          style={{ borderTop: "1px solid rgba(176,138,56,0.3)" }}
        >
          <p style={{ color: "rgba(251,245,230,0.6)", fontSize: "0.85rem" }}>
            {site.legal}
          </p>
          <p
            className="grec"
            style={{ color: "var(--color-gold)", fontSize: "1rem" }}
            lang="grc"
          >
            ζῇ καὶ βασιλεύει
          </p>
        </div>
      </div>
    </footer>
  );
}
