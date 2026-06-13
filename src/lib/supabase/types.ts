// Types applicatifs pour les données Supabase.
// (Schéma défini dans supabase/schema.sql.)

export type Profile = {
  id: string;
  email: string | null;
  display_name: string;
  is_admin: boolean;
  created_at: string;
};

export type Channel = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  position: number;
  admin_only_post: boolean;
  created_at: string;
};

export type Message = {
  id: string;
  channel_id: string;
  user_id: string;
  content: string;
  is_pinned: boolean;
  created_at: string;
  edited_at: string | null;
};

// Ligne de la vue public.messages_with_author (message + pseudo de l'auteur).
export type MessageWithAuthor = Message & {
  author_name: string;
  author_is_admin: boolean;
};
