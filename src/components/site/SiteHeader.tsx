"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Monogram } from "./Monogram";
import { site, nav } from "@/content/site";
import { createClient } from "@/lib/supabase/client";

export function SiteHeader({ isAuthed: initialAuthed = false }: { isAuthed?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthed, setIsAuthed] = useState(initialAuthed);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Détection de session côté client : garde les pages vitrines statiques.
  // Robustesse : si Supabase n'est pas configuré, on n'essaie même pas
  // (sinon createClient lèverait une erreur et blanchirait la page).
  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return;
    }
    try {
      const supabase = createClient();
      supabase.auth
        .getSession()
        .then(({ data }) => setIsAuthed(!!data.session))
        .catch(() => {});
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_e, session) =>
        setIsAuthed(!!session),
      );
      return () => subscription.unsubscribe();
    } catch {
      // Supabase mal configuré : la vitrine reste pleinement fonctionnelle.
    }
  }, []);

  // Empêche le défilement du corps quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: scrolled
          ? "rgba(244,235,215,0.92)"
          : "rgba(244,235,215,0.6)",
        backdropFilter: "saturate(140%) blur(8px)",
        WebkitBackdropFilter: "saturate(140%) blur(8px)",
        borderBottom: scrolled
          ? "1px solid var(--color-line)"
          : "1px solid transparent",
        transition: "background-color .25s ease, border-color .25s ease",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex h-[4.75rem] items-center justify-between gap-4">
          {/* Identité */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0"
            onClick={() => setOpen(false)}
          >
            <Monogram />
            <span
              className="font-display leading-none"
              style={{
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "var(--color-ink)",
              }}
            >
              {site.shortTitle}
            </span>
          </Link>

          {/* Navigation bureau */}
          <nav
            className="hidden lg:flex items-center gap-7"
            aria-label="Navigation principale"
          >
            {nav.map((l) => (
              <Link
                key={l.href}
                href={`/${l.href}`}
                className="text-[0.98rem] transition-colors"
                style={{ color: "var(--color-ink)" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/communaute"
              className="text-[0.98rem] transition-colors"
              style={{ color: "var(--color-ink)" }}
            >
              Communauté
            </Link>
          </nav>

          {/* Actions bureau */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              href={isAuthed ? "/communaute" : "/connexion"}
              className="text-[0.95rem]"
              style={{ color: "var(--color-accent-dark)" }}
            >
              {isAuthed ? "Espace membre" : "Connexion"}
            </Link>
            <Link href="/#reservation" className="btn btn-primary">
              Réserver un appel
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{ width: "2.75rem", height: "2.75rem", color: "var(--color-ink)" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Panneau mobile */}
      {open && (
        <div
          className="lg:hidden"
          style={{
            background: "var(--color-bg)",
            borderTop: "1px solid var(--color-line)",
            borderBottom: "1px solid var(--color-line)",
          }}
        >
          <nav
            className="mx-auto max-w-6xl px-5 py-5 flex flex-col gap-1"
            aria-label="Navigation mobile"
          >
            {nav.map((l) => (
              <Link
                key={l.href}
                href={`/${l.href}`}
                onClick={() => setOpen(false)}
                className="py-3 text-[1.1rem]"
                style={{
                  color: "var(--color-ink)",
                  borderBottom: "1px solid var(--color-line)",
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/communaute"
              onClick={() => setOpen(false)}
              className="py-3 text-[1.1rem]"
              style={{
                color: "var(--color-ink)",
                borderBottom: "1px solid var(--color-line)",
              }}
            >
              Communauté
            </Link>
            <Link
              href={isAuthed ? "/communaute" : "/connexion"}
              onClick={() => setOpen(false)}
              className="py-3 text-[1.1rem]"
              style={{ color: "var(--color-accent-dark)" }}
            >
              {isAuthed ? "Espace membre" : "Connexion"}
            </Link>
            <Link
              href="/#reservation"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-3"
            >
              Réserver un appel découverte
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
