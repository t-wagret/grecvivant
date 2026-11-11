import { type NextRequest } from "next/server";
import { search, type Mode } from "@/lib/dictionnaires/search";

// GET /api/dictionnaires?q=maison&m=h&x=0&d=cd,al,fe,ba&o=0&bo=0
export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams;
  const q = (p.get("q") || "").slice(0, 100);
  const m = (["h", "t", "g"].includes(p.get("m") || "") ? p.get("m") : "h") as Mode;
  const exact = p.get("x") === "1";
  const dicts = new Set((p.get("d") || "cd,al,fe,ba").split(",").filter((d) => ["cd", "al", "fe", "ba"].includes(d)));
  const offset = Math.max(0, Math.min(100000, Number(p.get("o")) || 0));
  const baOffset = Math.max(0, Math.min(200000, Number(p.get("bo")) || 0));
  const res = search(q, m, exact, dicts, offset, baOffset);
  return Response.json(res, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=604800, stale-while-revalidate=86400" },
  });
}
