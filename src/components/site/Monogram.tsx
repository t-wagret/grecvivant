/**
 * Emblème du Grec Vivant, détouré depuis le logo original.
 * Le masque permet de l'accorder aux fonds clairs et foncés sans le déformer.
 */
export function Monogram({
  className = "",
  tone = "accent",
}: {
  className?: string;
  tone?: "accent" | "light";
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 ${className}`}
      style={{
        width: "3.25rem",
        height: "2.16rem",
        backgroundColor:
          tone === "light" ? "var(--color-gold)" : "var(--color-accent-dark)",
        mask: "url('/images/logo-mark.png') center / contain no-repeat",
        WebkitMask: "url('/images/logo-mark.png') center / contain no-repeat",
      }}
    />
  );
}
