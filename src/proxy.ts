import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/session";

// Next.js 16 renamed `middleware` to `proxy`. This refreshes the Supabase
// auth session and protects /communaute and /admin.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // La session n'est nécessaire que pour l'espace membre et la connexion.
  // Les pages publiques et les endpoints SEO restent statiques et sans cookie.
  matcher: ["/connexion", "/communaute/:path*", "/admin/:path*"],
};
