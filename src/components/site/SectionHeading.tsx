type Props = {
  eyebrow?: string;
  greek?: string;
  gloss?: string;
  title: string;
  subheading?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
};

/** Sur-titre (eyebrow) + titre + chapeau, dans la hiérarchie de revue savante. */
export function SectionHeading({
  eyebrow,
  greek,
  gloss,
  title,
  subheading,
  align = "left",
  as: Tag = "h2",
}: Props) {
  const centered = align === "center";
  return (
    <header className={centered ? "text-center mx-auto" : ""}>
      {greek && (
        <p
          className={`grec ${centered ? "" : ""}`}
          lang="grc"
          style={{ color: "var(--color-accent-dark)", fontSize: "1.5rem", lineHeight: 1.2 }}
        >
          {greek}
          {gloss && (
            <span
              className="italic"
              style={{ color: "var(--color-ink-soft)", fontSize: "0.95rem", fontFamily: "var(--font-body)" }}
            >
              {"  · "}
              {gloss}
            </span>
          )}
        </p>
      )}
      {eyebrow && (
        <p
          className={`eyebrow flex items-center gap-3 ${
            centered ? "justify-center" : ""
          }`}
        >
          <span
            aria-hidden
            className="inline-block h-px w-6"
            style={{ background: "var(--color-gold)" }}
          />
          {eyebrow}
        </p>
      )}
      <Tag className="h-section mt-4" style={{ color: "var(--color-ink)" }}>
        {title}
      </Tag>
      {subheading && (
        <p
          className={`mt-4 text-[1.15rem] leading-relaxed ${
            centered ? "mx-auto" : ""
          }`}
          style={{ color: "var(--color-ink-soft)", maxWidth: "42rem" }}
        >
          {subheading}
        </p>
      )}
    </header>
  );
}
