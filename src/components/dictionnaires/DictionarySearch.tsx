"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Dict = { id: string; name: string; short: string };
type Vol = { d: string; tome?: number; src: "gallica" | "ia"; id: string; file?: string; off?: number };
type FrEntry = { d: string; v: number; f: number; h: string; t: string; b: number[][] };
type BaEntry = { h: string; t: string; n: number };
type Result = { q: string; total: number; fuzzy: boolean; hits: FrEntry[]; baTotal: number; ba: BaEntry[] };

const COLORS: Record<string, string> = { cd: "#7a1e1a", al: "#2f5d4f", fe: "#243b45", ba: "#6b2a5e" };

function fold(s: string) {
  return s
    .replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/Œ/g, "OE").replace(/Æ/g, "AE")
    .normalize("NFD").replace(/[̀-ͯ͂-᷀ͅ-᷿]/g, "")
    .toLowerCase().replace(/ς/g, "σ").replace(/[’‘`´΄]/g, "'");
}

// Surligne q (replié) dans s, en gardant le texte d'origine
function Highlight({ s, q }: { s: string; q: string }) {
  if (!q) return <>{s}</>;
  const f = fold(s);
  if (f.length !== s.length) return <>{s}</>;
  const parts: React.ReactNode[] = [];
  let i = 0;
  while (i < s.length) {
    const j = f.indexOf(q, i);
    if (j < 0) { parts.push(s.slice(i)); break; }
    parts.push(s.slice(i, j), <mark key={j} style={{ background: "#f3dc8f", color: "inherit", padding: "0 1px", borderRadius: 2 }}>{s.slice(j, j + q.length)}</mark>);
    i = j + q.length;
  }
  return <>{parts}</>;
}

function Badge({ id, label }: { id: string; label: string }) {
  return (
    <span className="text-[0.7rem] px-2 py-0.5 rounded-full text-white" style={{ background: COLORS[id], fontFamily: "var(--font-ui)", fontWeight: 600, letterSpacing: "0.04em" }}>
      {label}
    </span>
  );
}

export function DictionarySearch({ dicts, vols, counts }: { dicts: Dict[]; vols: Record<string, Vol>; counts: Record<string, number> }) {
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<"h" | "t" | "g">("h");
  const [exact, setExact] = useState(false);
  const [chosen, setChosen] = useState<string[]>(["cd", "al", "fe", "ba"]);
  const [res, setRes] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const reqId = useRef(0);
  const short = Object.fromEntries(dicts.map((d) => [d.id, d.short]));

  const params = useCallback(
    (o = 0, bo = 0) => new URLSearchParams({ q, m: mode, x: exact ? "1" : "0", d: chosen.join(","), o: String(o), bo: String(bo) }),
    [q, mode, exact, chosen],
  );

  // état initial depuis l'adresse (#q=…&m=…)
  useEffect(() => {
    // lu après l'hydratation (la page est pré-rendue sans connaître l'adresse)
    const t = setTimeout(() => {
      const h = new URLSearchParams(window.location.hash.slice(1));
      if (h.get("q")) setQ(h.get("q") || "");
      if (["h", "t", "g"].includes(h.get("m") || "")) setMode(h.get("m") as "h" | "t" | "g");
      if (h.get("x") === "1") setExact(true);
      if (h.get("d")) setChosen(h.get("d")!.split(",").filter(Boolean));
    }, 0);
    return () => clearTimeout(t);
  }, []);
  // lien partagé ou bouton « précédent » : relire l'adresse
  useEffect(() => {
    const onHash = () => {
      const h = new URLSearchParams(window.location.hash.slice(1));
      setQ(h.get("q") || "");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const id = ++reqId.current;
    if (!q.trim()) return;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const r = await fetch(`/api/dictionnaires?${params()}`);
        if (!r.ok) throw new Error(String(r.status));
        const data: Result = await r.json();
        if (id === reqId.current) { setRes(data); setError(""); }
      } catch {
        if (id === reqId.current) setError("La recherche n'a pas abouti. Réessayez dans un instant.");
      } finally {
        if (id === reqId.current) setLoading(false);
      }
      const p = params(); p.delete("o"); p.delete("bo");
      history.replaceState(null, "", "#" + p.toString());
    }, 250);
    return () => clearTimeout(timer);
  }, [q, mode, exact, chosen, params]);

  async function more(kind: "fr" | "ba") {
    if (!res) return;
    const r = await fetch(`/api/dictionnaires?${kind === "fr" ? params(res.hits.length, 0) : params(0, res.ba.length)}`);
    const data: Result = await r.json();
    setRes(kind === "fr" ? { ...res, hits: [...res.hits, ...data.hits] } : { ...res, ba: [...res.ba, ...data.ba] });
  }

  const shown = q.trim() ? res : null; // résultats masqués quand le champ est vide
  const toggle = (id: string) => setChosen((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const fq = shown?.q || "";

  return (
    <div>
      <form className="sm:sticky top-0 z-10 py-4 -mx-5 px-5 sm:-mx-6 sm:px-6" style={{ background: "var(--color-bg)", borderBottom: "1px solid var(--color-line)" }} onSubmit={(e) => e.preventDefault()}>
        <input
          type="search" value={q} onChange={(e) => setQ(e.target.value)} autoFocus autoComplete="off" spellCheck={false}
          placeholder="Un mot français (ou grec)…" aria-label="Mot à chercher"
          className="w-full rounded-lg px-4 py-3 text-lg outline-none"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)", fontFamily: "var(--font-body)" }}
        />
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm" style={{ fontFamily: "var(--font-ui)", color: "var(--color-ink-soft)" }}>
          {([["h", "mot-vedette"], ["t", "texte intégral"], ["g", "grec"]] as const).map(([v, l]) => (
            <label key={v} className="cursor-pointer"><input type="radio" name="m" checked={mode === v} onChange={() => setMode(v)} /> {l}</label>
          ))}
          <label className="cursor-pointer"><input type="checkbox" checked={exact} onChange={(e) => setExact(e.target.checked)} /> mot entier</label>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm" style={{ fontFamily: "var(--font-ui)", color: "var(--color-ink-soft)" }}>
          {[...dicts, { id: "ba", name: "Bailly 2020, recherche inversée", short: "Bailly inversé" }].map((d) => (
            <label key={d.id} className="cursor-pointer" title={d.name}>
              <input type="checkbox" checked={chosen.includes(d.id)} onChange={() => toggle(d.id)} /> <Badge id={d.id} label={d.short} />{" "}
              {counts[d.id]?.toLocaleString("fr")} articles
            </label>
          ))}
        </div>
      </form>

      <p className="mt-4 text-sm" style={{ fontFamily: "var(--font-ui)", color: "var(--color-ink-soft)" }} aria-live="polite">
        {error ||
          (loading && !shown ? "Recherche…" : shown
            ? `${shown.total.toLocaleString("fr")} article${shown.total > 1 ? "s" : ""}${shown.fuzzy ? " (vedettes proches)" : ""}${shown.baTotal ? ` · Bailly inversé : ${shown.baTotal.toLocaleString("fr")}` : ""}`
            : "")}
      </p>

      {!q.trim() && (
        <p className="mt-6 prose-measure" style={{ color: "var(--color-ink-soft)" }}>
          Tapez un mot français : la recherche porte sur les mots-vedettes (début de mot, sans tenir compte des accents). « Texte intégral » cherche dans
          tout le corps des articles, utile quand une vedette a été mal lue ; « grec » cherche un mot grec. Pour une même vedette, les articles des
          différents dictionnaires se suivent, et le bouton « image » montre la page imprimée. Le Bailly inversé donne les mots grecs dont la définition
          contient le mot cherché, ceux qui le traduisent en tête d&apos;article d&apos;abord, puis les plus fréquents en grec.
        </p>
      )}

      <div className="mt-2 space-y-3">
        {shown?.hits.map((e, i) => <FrArticle key={`${e.v}-${e.f}-${i}`} e={e} q={fq} vol={vols[String(e.v)]} label={short[e.d] || e.d} />)}
      </div>
      {shown && shown.hits.length < shown.total && (
        <button type="button" onClick={() => more("fr")} className="mt-4 block mx-auto rounded-md px-4 py-2 text-sm" style={{ border: "1px solid var(--color-line)", fontFamily: "var(--font-ui)" }}>
          Afficher la suite ({(shown.total - shown.hits.length).toLocaleString("fr")} restants)
        </button>
      )}

      {shown && shown.baTotal > 0 && (
        <section className="mt-10 pt-6" style={{ borderTop: "1px solid var(--color-line)" }}>
          <h2 className="text-lg" style={{ fontFamily: "var(--font-ui)", color: "var(--color-ink-soft)" }}>
            <Badge id="ba" label="Bailly inversé" /> {shown.baTotal.toLocaleString("fr")} mot{shown.baTotal > 1 ? "s" : ""} grec{shown.baTotal > 1 ? "s" : ""} dont la
            définition contient « {q.trim()} »
          </h2>
          <div className="mt-3 space-y-3">
            {shown.ba.map((e, i) => <BaArticle key={`${e.h}-${i}`} e={e} q={fq} />)}
          </div>
          {shown.ba.length < shown.baTotal && (
            <button type="button" onClick={() => more("ba")} className="mt-4 block mx-auto rounded-md px-4 py-2 text-sm" style={{ border: "1px solid var(--color-line)", fontFamily: "var(--font-ui)" }}>
              Afficher la suite du Bailly ({(shown.baTotal - shown.ba.length).toLocaleString("fr")} restants)
            </button>
          )}
        </section>
      )}
    </div>
  );
}

function iaFile(V: Vol, f: number) {
  return `${V.id}/${(V.file || "").replace("{n:04d}", String(f + (V.off || 0)).padStart(4, "0"))}`;
}
function cropUrl(V: Vol, b: number[]) {
  const [, f, x0, y0, x1, y1] = b, pad = 14;
  const x = Math.max(0, x0 - pad), y = Math.max(0, y0 - pad), w = x1 - x0 + 2 * pad, h = y1 - y0 + 2 * pad;
  if (V.src === "ia") return `https://iiif.archive.org/image/iiif/3/${encodeURIComponent(iaFile(V, f))}/${x},${y},${w},${h}/${Math.min(w, 900)},/0/default.jpg`;
  return `https://gallica.bnf.fr/iiif/ark:/12148/${V.id}/f${f}/${x},${y},${w},${h}/${Math.min(w, 900)},/0/native.jpg`;
}
function pageUrl(V: Vol, f: number) {
  if (V.src === "ia") return `https://archive.org/details/${V.id}/page/n${f + (V.off || 0)}/mode/1up`;
  return `https://gallica.bnf.fr/ark:/12148/${V.id}/f${f}.item`;
}

function FrArticle({ e, q, vol, label }: { e: FrEntry; q: string; vol: Vol; label: string }) {
  const [img, setImg] = useState(false);
  return (
    <article className="rounded-lg px-4 py-3" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}>
      <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span style={{ fontVariant: "small-caps", fontSize: "1.15rem", letterSpacing: "0.03em" }}><Highlight s={e.h} q={q} /></span>
        <span className="text-xs" style={{ fontFamily: "var(--font-ui)", color: "var(--color-ink-soft)" }}>
          <Badge id={e.d} label={label} /> {vol.tome ? `t. ${vol.tome}, ` : ""}vue {e.f} ·{" "}
          <a href={pageUrl(vol, e.f)} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent-dark)" }}>
            voir sur {vol.src === "ia" ? "Internet Archive" : "Gallica"}
          </a>
        </span>
      </h3>
      <p className="mt-1 grec-inline" lang="fr"><Highlight s={e.t} q={q} /></p>
      <button type="button" onClick={() => setImg(!img)} className="mt-2 rounded px-2 py-0.5 text-xs" style={{ border: "1px solid var(--color-line)", fontFamily: "var(--font-ui)" }}>
        {img ? "masquer" : "image"}
      </button>
      {img && (
        <div className="mt-2 flex flex-col gap-2">
          {e.b.map((b, i) => (
            <img key={i} src={cropUrl(vol, b)} alt="Extrait de la page imprimée" loading="lazy" className="max-w-full rounded" style={{ border: "1px solid var(--color-line)", background: "#fff" }} />
          ))}
        </div>
      )}
    </article>
  );
}

function BaArticle({ e, q }: { e: BaEntry; q: string }) {
  const [full, setFull] = useState(false);
  const long = e.t.length > 420;
  const text = full || !long ? e.t : e.t.slice(0, 420) + "…";
  return (
    <article className="rounded-lg px-4 py-3" style={{ background: "var(--color-surface)", border: "1px solid var(--color-line)" }}>
      <h3 className="flex flex-wrap items-baseline gap-x-3">
        <span className="grec" lang="grc" style={{ fontSize: "1.25rem" }}><Highlight s={e.h} q={q} /></span>
        {e.n > 0 && <span className="text-xs" style={{ fontFamily: "var(--font-ui)", color: "var(--color-ink-soft)" }}>{e.n.toLocaleString("fr")} occurrences en grec</span>}
      </h3>
      <p className="mt-1 whitespace-pre-line text-[0.95rem]"><Highlight s={text} q={q} /></p>
      {long && (
        <button type="button" onClick={() => setFull(!full)} className="mt-2 rounded px-2 py-0.5 text-xs" style={{ border: "1px solid var(--color-line)", fontFamily: "var(--font-ui)" }}>
          {full ? "réduire" : "article complet"}
        </button>
      )}
    </article>
  );
}
