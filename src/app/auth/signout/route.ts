import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  // Protection CSRF basique : la requête doit provenir du même site.
  const origin = request.headers.get("origin");
  const requestOrigin = new URL(request.url).origin;
  if (origin && origin !== requestOrigin) {
    return NextResponse.json({ error: "Origine invalide" }, { status: 403 });
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  // 303 : transforme le POST en GET pour la redirection
  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
