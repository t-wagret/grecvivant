"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "login" | "signup";

const ERRORS: Record<string, string> = {
  "Invalid login credentials": "E-mail ou mot de passe incorrect.",
  "Email not confirmed":
    "Votre e-mail n'est pas encore confirmé. Vérifiez votre boîte de réception.",
  "User already registered": "Un compte existe déjà avec cet e-mail.",
  "Password should be at least 6 characters":
    "Le mot de passe doit contenir au moins 6 caractères.",
};

function frError(message: string): string {
  return ERRORS[message] || message;
}

export function AuthForm({ suite = "/communaute" }: { suite?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const field =
    "w-full rounded-[3px] px-3.5 py-2.5 text-[1rem] bg-white outline-none";
  const fieldStyle = {
    border: "1px solid var(--color-line)",
    color: "var(--color-ink)",
    fontFamily: "var(--font-body)",
  } as const;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return; // garde synchrone contre la double-soumission
    setLoading(true);
    setError(null);
    setInfo(null);
    const supabase = createClient();

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push(suite);
        router.refresh();
      } else {
        const emailRedirectTo =
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback?suite=${encodeURIComponent(
                suite,
              )}`
            : undefined;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: name.trim() },
            emailRedirectTo,
          },
        });
        if (error) throw error;
        if (data.session) {
          // Confirmation d'e-mail désactivée : connexion immédiate.
          router.push(suite);
          router.refresh();
        } else {
          setInfo(
            "Compte créé ! Un e-mail de confirmation vient de vous être envoyé. Cliquez sur le lien pour accéder à la communauté.",
          );
        }
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Une erreur est survenue.";
      setError(frError(message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-7 sm:p-9">
      {/* Onglets */}
      <div
        className="grid grid-cols-2 mb-7 rounded-[4px] p-1"
        style={{ background: "var(--color-bg)", border: "1px solid var(--color-line)" }}
      >
        {(["login", "signup"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
              setInfo(null);
            }}
            className="py-2 text-[0.95rem] rounded-[3px] transition-colors"
            style={{
              fontFamily: "var(--font-ui)",
              fontWeight: 500,
              background: mode === m ? "var(--color-surface)" : "transparent",
              color: mode === m ? "var(--color-accent-dark)" : "var(--color-ink-soft)",
              boxShadow: mode === m ? "0 1px 2px rgba(42,32,24,0.08)" : "none",
            }}
          >
            {m === "login" ? "Se connecter" : "Créer un compte"}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {mode === "signup" && (
          <div>
            <label className="eyebrow block mb-1.5" htmlFor="af-name">
              Votre prénom / pseudo
            </label>
            <input
              id="af-name"
              className={field}
              style={fieldStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Comment vous appeler ?"
              required
              autoComplete="name"
            />
          </div>
        )}
        <div>
          <label className="eyebrow block mb-1.5" htmlFor="af-email">
            E-mail
          </label>
          <input
            id="af-email"
            type="email"
            className={field}
            style={fieldStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@exemple.fr"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label className="eyebrow block mb-1.5" htmlFor="af-password">
            Mot de passe
          </label>
          <input
            id="af-password"
            type="password"
            className={field}
            style={fieldStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "signup" ? "6 caractères minimum" : "••••••••"}
            required
            minLength={6}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />
        </div>

        {error && (
          <p
            className="text-[0.92rem] rounded-[3px] px-3 py-2"
            style={{ color: "var(--color-accent-dark)", background: "rgba(158,43,37,0.08)", border: "1px solid rgba(158,43,37,0.25)" }}
          >
            {error}
          </p>
        )}
        {info && (
          <p
            className="text-[0.92rem] rounded-[3px] px-3 py-2"
            style={{ color: "var(--color-aegean)", background: "rgba(36,59,69,0.08)", border: "1px solid rgba(36,59,69,0.25)" }}
          >
            {info}
          </p>
        )}

        <button type="submit" className="btn btn-primary mt-1" disabled={loading}>
          {loading
            ? "Un instant…"
            : mode === "login"
              ? "Entrer dans la communauté"
              : "Créer mon compte"}
        </button>
      </form>
    </div>
  );
}
