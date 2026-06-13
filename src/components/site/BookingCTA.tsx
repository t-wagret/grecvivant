"use client";

import { useState } from "react";

type Props = {
  bookingUrl?: string;
  email: string;
};

const LANGUES = ["Grec ancien", "Latin", "Les deux"] as const;
const NIVEAUX = [
  "Grand débutant",
  "Notions / lycée",
  "Intermédiaire",
  "Avancé / agrégation",
] as const;

/**
 * Réservation d'appel découverte.
 * - Si `bookingUrl` est défini (Cal.com / Calendly / Google Agenda), on l'intègre.
 * - Sinon, formulaire de demande qui ouvre l'e-mail pré-rempli (fonctionne sans backend).
 */
export function BookingCTA({ bookingUrl, email }: Props) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    email: "",
    langue: LANGUES[0] as string,
    niveau: NIVEAUX[0] as string,
    message: "",
  });

  if (bookingUrl) {
    return (
      <div className="card overflow-hidden" style={{ padding: 0 }}>
        <iframe
          src={bookingUrl}
          title="Réserver un appel découverte"
          loading="lazy"
          style={{
            width: "100%",
            height: "70vh",
            minHeight: "clamp(460px, 100vh - 200px, 640px)",
            border: 0,
          }}
        />
      </div>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Appel découverte — ${form.langue} (${form.nom || "sans nom"})`,
    );
    const body = encodeURIComponent(
      [
        "Bonjour Thibault,",
        "",
        "Je souhaite réserver un appel découverte.",
        "",
        `Nom : ${form.nom}`,
        `E-mail : ${form.email}`,
        `Langue souhaitée : ${form.langue}`,
        `Niveau : ${form.niveau}`,
        "",
        "Message :",
        form.message || "(aucun)",
      ].join("\n"),
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "w-full rounded-[3px] px-3.5 py-2.5 text-[1rem] bg-white outline-none transition-colors";
  const fieldStyle = {
    border: "1px solid var(--color-line)",
    color: "var(--color-ink)",
    fontFamily: "var(--font-body)",
  } as const;
  const labelCls = "eyebrow block mb-1.5";

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <p className="grec" style={{ color: "var(--color-accent-dark)", fontSize: "1.6rem" }} lang="grc">
          Εὖγε !
        </p>
        <h3 className="h-card mt-3">Votre message est prêt à partir</h3>
        <p className="mt-2" style={{ color: "var(--color-ink-soft)" }}>
          Votre logiciel de messagerie vient de s'ouvrir avec une demande
          pré-remplie. Si rien ne s'est passé, écrivez directement à{" "}
          <a
            href={`mailto:${email}`}
            style={{ color: "var(--color-accent-dark)", textDecoration: "underline" }}
          >
            {email}
          </a>
          . Thibault vous répondra pour fixer le créneau.
        </p>
        <button
          type="button"
          className="btn btn-ghost mt-5"
          onClick={() => setSent(false)}
        >
          Modifier ma demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="bk-nom">
            Votre nom
          </label>
          <input
            id="bk-nom"
            className={field}
            style={fieldStyle}
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            placeholder="Prénom Nom"
            required
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="bk-email">
            Votre e-mail
          </label>
          <input
            id="bk-email"
            type="email"
            className={field}
            style={fieldStyle}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="vous@exemple.fr"
            required
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="bk-langue">
            Langue
          </label>
          <select
            id="bk-langue"
            className={field}
            style={fieldStyle}
            value={form.langue}
            onChange={(e) => setForm({ ...form, langue: e.target.value })}
          >
            {LANGUES.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="bk-niveau">
            Votre niveau
          </label>
          <select
            id="bk-niveau"
            className={field}
            style={fieldStyle}
            value={form.niveau}
            onChange={(e) => setForm({ ...form, niveau: e.target.value })}
          >
            {NIVEAUX.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className={labelCls} htmlFor="bk-msg">
          Un mot sur votre projet (facultatif)
        </label>
        <textarea
          id="bk-msg"
          className={field}
          style={{ ...fieldStyle, resize: "vertical" }}
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Ce que vous aimeriez lire, vos disponibilités…"
        />
      </div>
      <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">
        Envoyer ma demande d'appel
      </button>
      <p className="mt-3 text-[0.85rem]" style={{ color: "var(--color-ink-soft)" }}>
        Gratuit et sans engagement. Réponse sous 48&nbsp;h pour fixer le créneau.
      </p>
    </form>
  );
}
