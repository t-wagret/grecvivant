import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Community } from "@/components/chat/Community";
import type { Channel } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Communauté",
  description:
    "L'espace d'échange des élèves du Grec Vivant : salons de grec, de latin et annonces.",
  robots: { index: false },
};

export default async function CommunautePage() {
  // Robustesse : sans clés Supabase, on évite un crash serveur (500).
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/connexion?suite=/communaute");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion?suite=/communaute");

  // Profil de l'utilisateur (auto-réparation si le trigger n'a pas tourné)
  let { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name, is_admin")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    const fallbackName =
      (user.user_metadata?.display_name as string | undefined)?.trim() ||
      user.email?.split("@")[0] ||
      "Membre";
    await supabase
      .from("profiles")
      .insert({ id: user.id, email: user.email, display_name: fallbackName });
    profile = { id: user.id, display_name: fallbackName, is_admin: false };
  }

  const { data: channels } = await supabase
    .from("channels")
    .select("*")
    .order("position", { ascending: true });

  return (
    <div className="flex flex-col" style={{ height: "100dvh" }}>
      <Community
        me={{
          id: user.id,
          displayName: profile.display_name,
          isAdmin: profile.is_admin,
        }}
        channels={(channels ?? []) as Channel[]}
      />
    </div>
  );
}
