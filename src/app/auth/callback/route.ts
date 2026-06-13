import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeSuite } from "@/lib/safe-path";

/**
 * Point de retour après confirmation d'e-mail Supabase :
 * échange le code contre une session (pose les cookies) puis redirige.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const suite = safeSuite(searchParams.get("suite") ?? undefined);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${suite}`);
    }
  }

  return NextResponse.redirect(`${origin}/connexion?erreur=lien`);
}
