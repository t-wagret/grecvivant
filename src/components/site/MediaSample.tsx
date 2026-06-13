type Media = {
  eyebrow: string;
  greek?: string;
  greekGloss?: string;
  heading: string;
  caption: string;
  url: string;
  placeholder: string;
};

function embedFor(url: string) {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vim = url.match(/vimeo\.com\/(\d+)/);
  if (vim) return `https://player.vimeo.com/video/${vim[1]}`;
  return null;
}

/** Extrait audio/vidéo d'input compréhensible — lecteur si `url`, sinon encart d'attente. */
export function MediaSample({ media }: { media: Media }) {
  const iframeSrc = media.url ? embedFor(media.url) : null;
  const isMp4 = media.url && /\.mp4($|\?)/.test(media.url);

  return (
    <section id="extrait" className="reveal">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 py-20 lg:py-24">
        <div className="text-center">
          {media.greek && (
            <p className="grec" lang="grc" style={{ color: "var(--color-accent-dark)", fontSize: "1.5rem" }}>
              {media.greek}
              {media.greekGloss && (
                <span className="italic" style={{ color: "var(--color-ink-soft)", fontFamily: "var(--font-body)", fontSize: "0.95rem" }}>
                  {"  · "}
                  {media.greekGloss}
                </span>
              )}
            </p>
          )}
          <p className="eyebrow mt-2">{media.eyebrow}</p>
          <h2 className="h-section mt-3" style={{ color: "var(--color-ink)" }}>
            {media.heading}
          </h2>
          <p className="mt-4 mx-auto" style={{ color: "var(--color-ink-soft)", maxWidth: "40rem" }}>
            {media.caption}
          </p>
        </div>

        <div
          className="card mt-8 overflow-hidden"
          style={{ padding: 0, aspectRatio: "16 / 9", position: "relative" }}
        >
          {iframeSrc ? (
            <iframe
              src={iframeSrc}
              title={media.heading}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          ) : isMp4 ? (
            <video
              src={media.url}
              controls
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-aegean), #1b2c33)",
                color: "var(--color-aegean-ink)",
              }}
            >
              <span
                aria-hidden
                className="inline-flex items-center justify-center rounded-full"
                style={{ width: "4rem", height: "4rem", border: "1px solid var(--color-gold)", color: "var(--color-gold)", fontSize: "1.4rem" }}
              >
                ▶
              </span>
              <p className="mt-4 italic" style={{ color: "rgba(251,245,230,0.85)", maxWidth: "34rem" }}>
                {media.placeholder}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
