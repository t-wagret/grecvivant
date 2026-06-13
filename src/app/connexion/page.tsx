import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { Monogram } from "@/components/site/Monogram";
import { createClient } from "@/lib/supabase/server";
import { safeSuite } from "@/lib/safe-path";

export const metadata: Metadata = {
  title: "Connexion",
  description:
    "Connectez-vous à la communauté du Grec Vivant pour échanger, pratiquer et progresser ensemble.",
  robots: { index: false },
};

export default async function ConnexionPage({
  searchParams,
}: {
  searchParams: Promise<{ suite?: string | string[] }>;
}) {
  const sp = await searchParams;
  const suite = safeSuite(sp.suite);

  // Déjà connecté ? On file directement à destination.
  // NB : redirect() fonctionne en LANÇANT une exception — il doit donc rester
  // HORS du try/catch, sinon le catch l'avalerait et la redirection échouerait.
  let alreadyLoggedIn = false;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      alreadyLoggedIn = !!user;
    } catch {
      // Supabase indisponible : on laisse afficher le formulaire.
    }
  }
  if (alreadyLoggedIn) redirect(suite);

  return (
    <main
      className="flex-1 flex flex-col"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="mx-auto w-full max-w-md px-5 py-10 sm:py-16 flex-1 flex flex-col">
        <Link href="/" className="inline-flex items-center gap-3 self-center">
          <Monogram />
          <span
            className="font-display"
            style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--color-ink)" }}
          >
            Le Grec Vivant
          </span>
        </Link>

        <div className="mt-10 text-center">
          <p className="grec" style={{ color: "var(--color-accent-dark)", fontSize: "2rem" }} lang="grc">
            Χαῖρε !
          </p>
          <h1 className="h-card mt-2" style={{ color: "var(--color-ink)", fontSize: "1.7rem" }}>
            La communauté du Grec Vivant
          </h1>
          <p className="mt-2" style={{ color: "var(--color-ink-soft)" }}>
            Connectez-vous pour rejoindre les salons d'échange, ou créez votre
            compte en quelques secondes.
          </p>
        </div>

        <div className="mt-8">
          <AuthForm suite={suite} />
        </div>

        <p className="mt-6 text-center text-[0.9rem]" style={{ color: "var(--color-ink-soft)" }}>
          <Link href="/" style={{ color: "var(--color-accent-dark)", textDecoration: "underline" }}>
            ← Retour au site
          </Link>
        </p>
      </div>
    </main>
  );
}
