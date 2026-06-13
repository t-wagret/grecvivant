type Props = {
  greek: string;
  gloss?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Exergue grec dans un cartouche ivoire bordé d'un filet d'or :
 * la citation en GFS Neohellenic (.grec), la glose française en italique.
 */
export function GreekExergue({
  greek,
  gloss,
  align = "left",
  className = "",
}: Props) {
  const centered = align === "center";
  return (
    <figure
      className={`${centered ? "text-center mx-auto" : ""} ${className}`}
      style={{ maxWidth: "36rem" }}
    >
      <p
        className="grec"
        style={{
          color: "var(--color-accent-dark)",
          fontSize: "clamp(1.35rem, 2.6vw, 1.8rem)",
          lineHeight: 1.3,
        }}
        lang="grc"
      >
        {greek}
      </p>
      {gloss && (
        <figcaption
          className="mt-1 italic"
          style={{ color: "var(--color-ink-soft)", fontSize: "1rem" }}
        >
          {gloss}
        </figcaption>
      )}
    </figure>
  );
}
