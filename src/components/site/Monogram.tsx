import { site } from "@/content/site";

/** Sceau-monogramme circulaire « ΓΖ » (Grec Vivant), cerclé d'un filet d'or. */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-full ${className}`}
      style={{
        width: "2.4rem",
        height: "2.4rem",
        border: "1px solid var(--color-gold)",
        color: "var(--color-accent-dark)",
        fontFamily: "var(--font-greek)",
        fontSize: "1.05rem",
        letterSpacing: "0.02em",
        lineHeight: 1,
        boxShadow: "inset 0 0 0 3px rgba(176,138,56,0.12)",
      }}
    >
      {site.monogram}
    </span>
  );
}
