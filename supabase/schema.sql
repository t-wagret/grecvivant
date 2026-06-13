-- ============================================================================
--  Le Grec Vivant — schéma Supabase (communauté + chat + admin)
-- ----------------------------------------------------------------------------
--  À exécuter une fois dans l'éditeur SQL de Supabase
--  (Dashboard → SQL Editor → New query → coller → Run).
--
--  Tout est idempotent : on peut le ré-exécuter sans casser l'existant.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 0. Compte administrateur
-- ---------------------------------------------------------------------------
-- L'adresse ci-dessous devient automatiquement administratrice à l'inscription.
-- >>> Remplacez-la par l'adresse réelle de Thibault si besoin. <<<
-- (définie dans la fonction handle_new_user plus bas)

-- ---------------------------------------------------------------------------
-- 1. Profils (1 ligne par utilisateur, liée à auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  email        text,
  display_name text not null,
  is_admin     boolean not null default false,
  created_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Tout membre connecté peut voir les profils (pour afficher les pseudos).
drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated"
  on public.profiles for select
  to authenticated
  using (true);

-- Filet de sécurité : un membre peut créer SON propre profil s'il manquait
-- (le cas normal est géré par le trigger handle_new_user, en SECURITY DEFINER).
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id and is_admin = false);

-- Chacun peut modifier SON profil (son pseudo), sans pouvoir se nommer admin.
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id and is_admin = (select is_admin from public.profiles where id = auth.uid()));

-- ---------------------------------------------------------------------------
-- 2. Salons de discussion
-- ---------------------------------------------------------------------------
create table if not exists public.channels (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  name             text not null,
  description      text,
  position         int not null default 0,
  admin_only_post  boolean not null default false,  -- salon d'annonces : seul l'admin écrit
  created_at       timestamptz not null default now()
);

alter table public.channels enable row level security;

-- Tout membre connecté voit les salons.
drop policy if exists "channels_select_authenticated" on public.channels;
create policy "channels_select_authenticated"
  on public.channels for select
  to authenticated
  using (true);

-- Seul l'admin crée / modifie / supprime des salons.
drop policy if exists "channels_admin_write" on public.channels;
create policy "channels_admin_write"
  on public.channels for all
  to authenticated
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin));

-- ---------------------------------------------------------------------------
-- 3. Messages
-- ---------------------------------------------------------------------------
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  channel_id  uuid not null references public.channels (id) on delete cascade,
  user_id     uuid not null references public.profiles (id) on delete cascade,
  content     text not null check (char_length(content) between 1 and 4000),
  is_pinned   boolean not null default false,
  created_at  timestamptz not null default now(),
  edited_at   timestamptz
);

create index if not exists messages_channel_created_idx
  on public.messages (channel_id, created_at);

alter table public.messages enable row level security;

-- Lecture : tout membre connecté.
drop policy if exists "messages_select_authenticated" on public.messages;
create policy "messages_select_authenticated"
  on public.messages for select
  to authenticated
  using (true);

-- Écriture : l'auteur écrit en son nom. Dans un salon "annonces"
-- (admin_only_post), seul l'admin peut publier.
drop policy if exists "messages_insert_own" on public.messages;
create policy "messages_insert_own"
  on public.messages for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and (
      not (select admin_only_post from public.channels c where c.id = channel_id)
      or exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
    )
  );

-- Modification : l'auteur édite son message ; l'admin peut tout modifier
-- (utile pour épingler / dépingler).
drop policy if exists "messages_update_own_or_admin" on public.messages;
create policy "messages_update_own_or_admin"
  on public.messages for update
  to authenticated
  using (
    auth.uid() = user_id
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
  )
  with check (
    auth.uid() = user_id
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
  );

-- Suppression : l'auteur supprime son message ; l'admin modère tout.
drop policy if exists "messages_delete_own_or_admin" on public.messages;
create policy "messages_delete_own_or_admin"
  on public.messages for delete
  to authenticated
  using (
    auth.uid() = user_id
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
  );

-- ---------------------------------------------------------------------------
-- 4. Création automatique du profil à l'inscription (+ admin par e-mail)
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, is_admin)
  values (
    new.id,
    new.email,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
      split_part(new.email, '@', 1)
    ),
    -- >>> Adresse administratrice : à adapter <<<
    lower(new.email) = lower('thibault.wagret@ens-lyon.fr')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 5. Vue pratique : messages enrichis du pseudo de l'auteur
-- ---------------------------------------------------------------------------
create or replace view public.messages_with_author
with (security_invoker = true) as
  select
    m.id, m.channel_id, m.user_id, m.content, m.is_pinned,
    m.created_at, m.edited_at,
    p.display_name as author_name,
    p.is_admin     as author_is_admin
  from public.messages m
  join public.profiles p on p.id = m.user_id;

-- ---------------------------------------------------------------------------
-- 6. Realtime : diffuser les changements de la table messages
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'messages'
  ) then
    alter publication supabase_realtime add table public.messages;
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- 7. Salons par défaut
-- ---------------------------------------------------------------------------
insert into public.channels (slug, name, description, position, admin_only_post) values
  ('annonces', 'Annonces',        'Informations et nouvelles du programme',          0, true),
  ('agora',    'Ἀγορά — Accueil', 'Présentations et discussions générales',          1, false),
  ('grec',     'Ἑλληνικά — Grec', 'Entraide, lectures et questions de grec ancien',  2, false),
  ('latin',    'Latina — Latin',  'Entraide, lectures et questions de latin',        3, false)
on conflict (slug) do nothing;
