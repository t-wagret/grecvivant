"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Bouton flottant « Réserver un appel » sur mobile uniquement.
 * (N'utilise PAS la classe .btn : sa règle display écraserait le masquage
 *  desktop. Le masquage ≥1024px est géré par la classe .mobile-cta en CSS.)
 * Apparaît après le héros, se masque quand la réservation est à l'écran.
 */
export function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let io: IntersectionObserver | null = null;
    const target = document.getElementById("reservation");
    if (target && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setVisible(false);
        },
        { rootMargin: "0px 0px -30% 0px" },
      );
      io.observe(target);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <Link
      href="#reservation"
      className="mobile-cta"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      style={{
        position: "fixed",
        left: "1rem",
        right: "1rem",
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        zIndex: 45,
        background: "var(--color-accent)",
        color: "var(--color-surface)",
        fontFamily: "var(--font-ui)",
        fontWeight: 500,
        fontSize: "0.97rem",
        padding: "0.95rem 1.4rem",
        borderRadius: "3px",
        boxShadow: "0 10px 30px -8px rgba(122,30,26,0.55)",
        transition: "opacity .25s ease, transform .25s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(120%)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      Réserver un appel découverte
    </Link>
  );
}
