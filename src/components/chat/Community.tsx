"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Channel, Message, MessageWithAuthor } from "@/lib/supabase/types";

type Me = { id: string; displayName: string; isAdmin: boolean };

const dayFmt = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
const timeFmt = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
});
const MAX_LEN = 4000;

function initials(name: string) {
  return name.trim().slice(0, 2).toUpperCase();
}
function sortByDate(a: MessageWithAuthor, b: MessageWithAuthor) {
  return a.created_at.localeCompare(b.created_at);
}

export function Community({ me, channels }: { me: Me; channels: Channel[] }) {
  const supabase = useMemo(() => createClient(), []);
  const [currentId, setCurrentId] = useState<string>(channels[0]?.id ?? "");
  const [messages, setMessages] = useState<MessageWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const profileCache = useRef<Map<string, { name: string; admin: boolean }>>(
    new Map(),
  );
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);

  const current = channels.find((c) => c.id === currentId);
  const canPost = !current?.admin_only_post || me.isAdmin;

  const upsertMessage = useCallback((msg: MessageWithAuthor) => {
    setMessages((prev) => {
      const idx = prev.findIndex((m) => m.id === msg.id);
      if (idx === -1) return [...prev, msg].sort(sortByDate);
      const copy = prev.slice();
      copy[idx] = msg;
      return copy;
    });
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const resolveAuthor = useCallback(
    async (userId: string) => {
      if (userId === me.id) return { name: me.displayName, admin: me.isAdmin };
      const cached = profileCache.current.get(userId);
      if (cached) return cached;
      const { data } = await supabase
        .from("profiles")
        .select("display_name, is_admin")
        .eq("id", userId)
        .maybeSingle();
      const resolved = {
        name: data?.display_name ?? "Membre",
        admin: data?.is_admin ?? false,
      };
      profileCache.current.set(userId, resolved);
      return resolved;
    },
    [supabase, me.id, me.displayName, me.isAdmin],
  );

  // Chargement des messages + abonnement temps réel au changement de salon
  useEffect(() => {
    if (!currentId) return;
    let active = true;
    setLoading(true);
    setError(null);
    setMessages([]);
    profileCache.current.clear(); // évite des infos d'auteur périmées

    (async () => {
      const { data, error } = await supabase
        .from("messages_with_author")
        .select("*")
        .eq("channel_id", currentId)
        .order("created_at", { ascending: true })
        .limit(400);
      if (!active) return;
      if (error) {
        setError(
          "Impossible de charger les messages. Vérifiez la configuration Supabase.",
        );
      } else {
        // Fusion (et non écrasement) : préserve les messages déjà reçus en
        // temps réel pendant le chargement initial.
        const rows = (data as MessageWithAuthor[]) ?? [];
        setMessages((prev) => {
          const map = new Map(prev.map((m) => [m.id, m]));
          for (const r of rows) map.set(r.id, r);
          return [...map.values()].sort(sortByDate);
        });
      }
      setLoading(false);
    })();

    const channel = supabase
      .channel(`room:${currentId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `channel_id=eq.${currentId}`,
        },
        async (payload) => {
          if (payload.eventType === "DELETE") {
            removeMessage((payload.old as { id: string }).id);
            return;
          }
          const row = payload.new as Message;
          const author = await resolveAuthor(row.user_id);
          if (!active) return;
          upsertMessage({
            ...row,
            author_name: author.name,
            author_is_admin: author.admin,
          });
        },
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [currentId, supabase, resolveAuthor, upsertMessage, removeMessage]);

  // Défilement automatique vers le bas
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, loading]);

  // Le composeur grandit avec le texte (jusqu'à une hauteur max)
  useEffect(() => {
    const el = composerRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  }, [text]);

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    const content = text.trim();
    if (!content || sending || !canPost) return;
    setSending(true);
    setError(null);
    const { data, error } = await supabase
      .from("messages")
      .insert({ channel_id: currentId, user_id: me.id, content })
      .select("*")
      .single();
    if (error) {
      setError("Votre message n'a pas pu être envoyé.");
    } else if (data) {
      // `data` vient de la table `messages` (sans l'auteur) : on complète.
      upsertMessage({
        ...(data as Message),
        author_name: me.displayName,
        author_is_admin: me.isAdmin,
      });
      setText("");
    }
    setSending(false);
  }

  async function handleDelete(id: string) {
    const toRestore = messages.find((m) => m.id === id);
    removeMessage(id); // optimiste
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) {
      if (toRestore) upsertMessage(toRestore); // rollback
      setError("Suppression impossible.");
    }
  }

  async function handleTogglePin(msg: MessageWithAuthor) {
    const original = msg.is_pinned;
    upsertMessage({ ...msg, is_pinned: !original }); // optimiste
    const { error } = await supabase
      .from("messages")
      .update({ is_pinned: !original })
      .eq("id", msg.id);
    if (error) {
      upsertMessage({ ...msg, is_pinned: original }); // rollback
      setError("Action impossible.");
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  const pinned = messages.filter((m) => m.is_pinned);

  if (channels.length === 0) {
    return (
      <div
        className="flex-1 flex items-center justify-center px-6"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="text-center">
          <p className="grec" style={{ color: "var(--color-accent-dark)", fontSize: "2rem" }} lang="grc">
            Οὐδέν
          </p>
          <p className="mt-2" style={{ color: "var(--color-ink-soft)" }}>
            Aucun salon n'est disponible pour le moment.
          </p>
          <Link href="/" className="btn btn-ghost mt-5">
            Retour au site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex-1 grid lg:grid-cols-[270px_1fr]"
      style={{ background: "var(--color-bg)", minHeight: 0 }}
    >
      {/* ---------- Barre latérale ---------- */}
      <aside
        className="hidden lg:flex flex-col"
        style={{
          background: "var(--color-aegean)",
          color: "var(--color-aegean-ink)",
        }}
      >
        <div className="p-5" style={{ borderBottom: "1px solid rgba(176,138,56,0.25)" }}>
          <Link href="/" className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-flex items-center justify-center rounded-full"
              style={{
                width: "2.1rem",
                height: "2.1rem",
                border: "1px solid var(--color-gold)",
                color: "var(--color-gold)",
                fontFamily: "var(--font-greek)",
                fontSize: "0.95rem",
              }}
            >
              ΓΖ
            </span>
            <span className="font-display" style={{ fontWeight: 600, fontSize: "1.2rem" }}>
              Le Grec Vivant
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <p className="eyebrow px-2 mb-2" style={{ color: "var(--color-gold)" }}>
            Salons
          </p>
          <ChannelList channels={channels} currentId={currentId} onSelect={setCurrentId} />
        </nav>

        <div className="p-4" style={{ borderTop: "1px solid rgba(176,138,56,0.25)" }}>
          <div className="flex items-center gap-3">
            <Avatar name={me.displayName} admin={me.isAdmin} />
            <div className="min-w-0">
              <p className="truncate" style={{ fontWeight: 600 }}>
                {me.displayName}
              </p>
              <p className="text-[0.8rem]" style={{ color: "rgba(251,245,230,0.6)" }}>
                {me.isAdmin ? "Professeur · admin" : "Membre"}
              </p>
            </div>
          </div>
          <form action="/auth/signout" method="post" className="mt-3">
            <button
              type="submit"
              className="w-full text-[0.85rem] py-2 rounded-[3px]"
              style={{
                border: "1px solid rgba(176,138,56,0.4)",
                color: "rgba(251,245,230,0.85)",
                fontFamily: "var(--font-ui)",
              }}
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      {/* ---------- Zone principale ---------- */}
      <section className="flex flex-col" style={{ minHeight: 0, height: "100%" }}>
        {/* En-tête du salon */}
        <header
          className="px-5 py-3.5 flex items-center justify-between gap-3"
          style={{
            background: "var(--color-surface)",
            borderBottom: "1px solid var(--color-line)",
          }}
        >
          <div className="min-w-0">
            <h1
              className="truncate"
              style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600, color: "var(--color-ink)" }}
            >
              {current?.name ?? "Communauté"}
            </h1>
            {current?.description && (
              <p className="truncate text-[0.85rem]" style={{ color: "var(--color-ink-soft)" }}>
                {current.description}
              </p>
            )}
          </div>
          {/* Sélecteur mobile + déconnexion mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <label htmlFor="mobile-channel-select" className="sr-only">
              Choisir un salon
            </label>
            <select
              id="mobile-channel-select"
              value={currentId}
              onChange={(e) => setCurrentId(e.target.value)}
              className="rounded-[3px] px-3 py-2.5 text-[0.9rem]"
              style={{ border: "1px solid var(--color-line)", background: "white", color: "var(--color-ink)" }}
            >
              {channels.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                aria-label="Se déconnecter"
                className="text-[0.8rem] px-3 py-2.5 rounded-[3px]"
                style={{ border: "1px solid var(--color-line)", color: "var(--color-accent-dark)" }}
              >
                Quitter
              </button>
            </form>
          </div>
        </header>

        {/* Messages épinglés */}
        {pinned.length > 0 && (
          <div
            className="px-5 py-3.5"
            style={{
              background: "rgba(176,138,56,0.15)",
              borderBottom: "1px solid var(--color-line)",
              borderLeft: "3px solid var(--color-gold)",
            }}
          >
            <p className="eyebrow mb-1">📌 Messages épinglés</p>
            {pinned.map((m) => (
              <p key={m.id} className="text-[0.92rem] truncate" style={{ color: "var(--color-ink)" }}>
                <strong style={{ fontFamily: "var(--font-display)" }}>{m.author_name} : </strong>
                {m.content}
              </p>
            ))}
          </div>
        )}

        {/* Liste des messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5" style={{ minHeight: 0 }}>
          {loading ? (
            <p className="text-center mt-10" style={{ color: "var(--color-ink-soft)" }}>
              Chargement des messages…
            </p>
          ) : error ? (
            <p
              className="mx-auto max-w-md text-center mt-10 rounded-[4px] p-4"
              style={{ color: "var(--color-accent-dark)", background: "rgba(158,43,37,0.06)", border: "1px solid rgba(158,43,37,0.25)" }}
            >
              {error}
            </p>
          ) : messages.length === 0 ? (
            <EmptyState greek="Ἄρξαι" gloss="Lancez la conversation : soyez le premier à écrire." />
          ) : (
            <ul className="flex flex-col gap-1 max-w-3xl mx-auto">
              {messages.map((m, i) => {
                const prev = messages[i - 1];
                const sameDay =
                  prev &&
                  new Date(prev.created_at).toDateString() ===
                    new Date(m.created_at).toDateString();
                return (
                  <li key={m.id}>
                    {!sameDay && (
                      <div className="flex items-center gap-3 my-4">
                        <hr className="rule-gold flex-1" />
                        <span className="eyebrow">{dayFmt.format(new Date(m.created_at))}</span>
                        <hr className="rule-gold flex-1" />
                      </div>
                    )}
                    <MessageRow
                      m={m}
                      me={me}
                      onDelete={handleDelete}
                      onTogglePin={handleTogglePin}
                    />
                  </li>
                );
              })}
            </ul>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Composeur */}
        <div
          className="px-4 sm:px-6 py-3"
          style={{ background: "var(--color-surface)", borderTop: "1px solid var(--color-line)" }}
        >
          {canPost ? (
            <form onSubmit={handleSend} className="max-w-3xl mx-auto flex items-end gap-3">
              <textarea
                ref={composerRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                maxLength={MAX_LEN}
                aria-label={`Écrire dans ${current?.name ?? "le salon"}`}
                placeholder={`Écrire dans « ${current?.name ?? ""} »…`}
                className="flex-1 rounded-[4px] px-3.5 py-2.5 text-[1rem] resize-none"
                style={{
                  border: "1px solid var(--color-line)",
                  background: "white",
                  color: "var(--color-ink)",
                  fontFamily: "var(--font-body)",
                  maxHeight: "8rem",
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={sending || !text.trim()}
                style={{ padding: "0.7rem 1.2rem" }}
              >
                Envoyer
              </button>
            </form>
          ) : (
            <p className="max-w-3xl mx-auto text-center text-[0.92rem] py-2" style={{ color: "var(--color-ink-soft)" }}>
              Ce salon est réservé aux annonces du professeur.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

/* ----------------------- sous-composants ----------------------- */

function ChannelList({
  channels,
  currentId,
  onSelect,
}: {
  channels: Channel[];
  currentId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="flex flex-col gap-0.5">
      {channels.map((c) => {
        const active = c.id === currentId;
        return (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => onSelect(c.id)}
              className="w-full text-left px-3 py-2 rounded-[4px] transition-colors"
              style={{
                background: active ? "rgba(176,138,56,0.18)" : "transparent",
                color: active ? "#fff" : "rgba(251,245,230,0.82)",
                fontFamily: "var(--font-ui)",
                fontSize: "0.95rem",
                fontWeight: active ? 600 : 400,
                borderLeft: active
                  ? "2px solid var(--color-gold)"
                  : "2px solid transparent",
              }}
            >
              {c.admin_only_post ? "📣 " : "# "}
              {c.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Avatar({ name, admin }: { name: string; admin: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{
        width: "2.3rem",
        height: "2.3rem",
        background: admin ? "var(--color-accent)" : "rgba(176,138,56,0.25)",
        color: admin ? "var(--color-surface)" : "var(--color-aegean-ink)",
        fontFamily: "var(--font-ui)",
        fontSize: "0.82rem",
        fontWeight: 600,
        border: "1px solid rgba(176,138,56,0.4)",
      }}
    >
      {initials(name)}
    </span>
  );
}

function MessageRow({
  m,
  me,
  onDelete,
  onTogglePin,
}: {
  m: MessageWithAuthor;
  me: Me;
  onDelete: (id: string) => void;
  onTogglePin: (m: MessageWithAuthor) => void;
}) {
  const canDelete = me.isAdmin || m.user_id === me.id;
  const showActions = canDelete || me.isAdmin;
  return (
    <div
      className="group flex gap-3 px-2 py-2 rounded-[6px]"
      style={
        m.is_pinned
          ? { background: "rgba(176,138,56,0.1)", borderLeft: "2px solid var(--color-gold)" }
          : undefined
      }
    >
      <div className="pt-0.5">
        <span
          aria-hidden
          className="inline-flex items-center justify-center rounded-full shrink-0"
          style={{
            width: "2.3rem",
            height: "2.3rem",
            background: m.author_is_admin ? "var(--color-accent)" : "var(--color-surface)",
            color: m.author_is_admin ? "var(--color-surface)" : "var(--color-ink)",
            fontFamily: "var(--font-ui)",
            fontSize: "0.8rem",
            fontWeight: 600,
            border: "1px solid var(--color-line)",
          }}
        >
          {initials(m.author_name)}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--color-ink)" }}>
            {m.author_name}
          </span>
          {m.author_is_admin && (
            <span
              className="text-[0.68rem] px-1.5 py-0.5 rounded-full"
              style={{
                background: "rgba(158,43,37,0.12)",
                color: "var(--color-accent-dark)",
                fontFamily: "var(--font-ui)",
                fontWeight: 600,
                letterSpacing: "0.03em",
              }}
            >
              PROFESSEUR
            </span>
          )}
          <span className="text-[0.78rem]" style={{ color: "var(--color-ink-soft)" }}>
            {timeFmt.format(new Date(m.created_at))}
          </span>
          {m.is_pinned && (
            <span className="text-[0.78rem]" title="Épinglé" aria-label="Épinglé">
              📌
            </span>
          )}
        </div>
        <p
          className="mt-0.5"
          style={{ color: "var(--color-ink)", whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
        >
          {m.content}
        </p>
      </div>
      {/* Actions — visibles au survol sur grand écran, toujours sur mobile */}
      {showActions && (
        <div className="flex items-start gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-within:opacity-100 transition-opacity">
          {me.isAdmin && (
            <button
              type="button"
              onClick={() => onTogglePin(m)}
              className="text-[0.75rem] px-2.5 py-2 rounded"
              style={{ color: "var(--color-ink-soft)" }}
              aria-label={m.is_pinned ? "Détacher le message" : "Épingler le message"}
            >
              {m.is_pinned ? "Détacher" : "Épingler"}
            </button>
          )}
          {canDelete && (
            <button
              type="button"
              onClick={() => onDelete(m.id)}
              className="text-[0.75rem] px-2.5 py-2 rounded"
              style={{ color: "var(--color-accent-dark)" }}
              aria-label="Supprimer le message"
            >
              Supprimer
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function EmptyState({ greek, gloss }: { greek: string; gloss: string }) {
  return (
    <div className="text-center mt-16">
      <p className="grec" style={{ color: "var(--color-accent-dark)", fontSize: "2rem" }} lang="grc">
        {greek}
      </p>
      <p className="mt-2" style={{ color: "var(--color-ink-soft)" }}>
        {gloss}
      </p>
    </div>
  );
}
