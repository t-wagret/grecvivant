import { readFileSync } from "node:fs";
import path from "node:path";
import { gunzipSync } from "node:zlib";

// Recherche dans les dictionnaires français-grec océrisés (Courtaud-Diverneresse,
// Alexandre, Feuillet) et dans le Bailly 2020 « inversé ». Les données sont produites
// par frequentiel-grec (scripts/dico_export_web.py) dans data/dictionnaires/.

export type Mode = "h" | "t" | "g";

export type FrEntry = { d: string; v: number; f: number; h: string; t: string; b: number[][] };
export type BaEntry = { h: string; t: string; n: number };

type FrIndexed = FrEntry & { k: string; tf: string; o: number };
type BaIndexed = BaEntry & { k: string; tf: string };

const DATA = path.join(process.cwd(), "data", "dictionnaires");
const PAGE = 50;

export function fold(s: string): string {
  return s
    .replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/Œ/g, "OE").replace(/Æ/g, "AE")
    .normalize("NFD")
    .replace(/[̀-ͯ͂-᷀ͅ-᷿]/g, "")
    .toLowerCase()
    .replace(/ς/g, "σ")
    .replace(/[’‘`´΄]/g, "'");
}

let FR: FrIndexed[] | null = null;
let BA: BaIndexed[] | null = null;
const ORDER: Record<string, number> = { cd: 0, al: 1, fe: 2 };

function loadGz<T>(name: string): T {
  return JSON.parse(gunzipSync(readFileSync(path.join(DATA, name))).toString("utf8")) as T;
}

function fr(): FrIndexed[] {
  if (!FR) {
    const rows = loadGz<[string, number, number, string, string, number[][]][]>("fr-grc.json.gz");
    FR = rows.map(([d, v, f, h, t, b]) => ({ d, v, f, h, t, b, k: fold(h), tf: fold(t), o: ORDER[d] ?? 9 }));
  }
  return FR;
}

function ba(): BaIndexed[] {
  if (!BA) {
    const data = loadGz<{ entries: [string, string, number][] }>("bailly.json.gz");
    BA = data.entries.map(([h, t, n]) => ({ h, t, n, k: fold(h), tf: fold(t) }));
  }
  return BA;
}

function lev(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  let cur = new Array<number>(b.length + 1);
  for (let i = 1; i <= a.length; i++) {
    cur[0] = i;
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (cur[j] < best) best = cur[j];
    }
    if (best > max) return max + 1;
    [prev, cur] = [cur, prev];
  }
  return prev[b.length];
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export type SearchResult = {
  q: string;
  total: number;
  fuzzy: boolean;
  hits: FrEntry[];
  baTotal: number;
  ba: BaEntry[];
};

export function search(raw: string, mode: Mode, exact: boolean, dicts: Set<string>, offset = 0, baOffset = 0): SearchResult {
  const q = fold(raw.trim()).slice(0, 80);
  const empty: SearchResult = { q, total: 0, fuzzy: false, hits: [], baTotal: 0, ba: [] };
  if (!q) return empty;
  const pool = fr().filter((e) => dicts.has(e.d));
  let hits: FrIndexed[] = [];
  let fuzzy = false;
  if (mode === "h") {
    hits = pool.filter((e) => (exact ? e.k === q || e.k.split(/[ ,]/).includes(q) : e.k.startsWith(q)));
    if (!hits.length && q.length >= 4) {
      const max = q.length >= 8 ? 2 : 1;
      hits = pool
        .map((e) => [lev(q, e.k, max), e] as const)
        .filter((x) => x[0] <= max)
        .sort((a, b) => a[0] - b[0])
        .map((x) => x[1]);
      fuzzy = true;
    } else {
      hits = hits.slice().sort((a, b) => (a.k < b.k ? -1 : a.k > b.k ? 1 : a.o - b.o));
    }
  } else {
    const wordRe = exact ? new RegExp(`(^|[^a-z0-9\\u0370-\\u03ff\\u1f00-\\u1fff])${escapeRe(q)}($|[^a-z0-9\\u0370-\\u03ff\\u1f00-\\u1fff])`) : null;
    hits = pool.filter((e) => (wordRe ? wordRe.test(e.tf) || wordRe.test(e.k) : e.tf.includes(q) || e.k.includes(q)));
  }
  const strip = ({ d, v, f, h, t, b }: FrIndexed): FrEntry => ({ d, v, f, h, t, b });
  const res: SearchResult = { q, total: hits.length, fuzzy, hits: hits.slice(offset, offset + PAGE).map(strip), baTotal: 0, ba: [] };

  if (dicts.has("ba") && q.length >= 2) {
    let bh: BaIndexed[];
    if (mode === "g") {
      bh = ba().filter((e) => (exact ? e.k === q : e.k.startsWith(q))).sort((a, b) => b.n - a.n || a.k.length - b.k.length);
    } else {
      const re = new RegExp(`(^|[^a-z0-9\\u0370-\\u03ff\\u1f00-\\u1fff])${escapeRe(q)}${exact ? "($|[^a-z0-9])" : ""}`);
      const scored: [number, number, BaIndexed][] = [];
      for (const e of ba()) {
        const m = re.exec(e.tf);
        if (!m) continue;
        // sens principal : le mot figure dans la traduction en tête d'article (avant les citations)
        scored.push([re.test(e.tf.slice(0, 140)) ? 0 : 1, m.index, e]);
      }
      bh = scored.sort((a, b) => a[0] - b[0] || b[2].n - a[2].n || a[1] - b[1]).map((x) => x[2]);
    }
    res.baTotal = bh.length;
    res.ba = bh.slice(baOffset, baOffset + PAGE).map(({ h, t, n }) => ({ h, t, n }));
  }
  return res;
}
