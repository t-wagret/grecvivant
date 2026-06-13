# Le Grec Vivant

Site de Thibault Wagret pour l'apprentissage du **grec ancien** (et du **latin**)
par la méthode active. Page de présentation inspirée de l'offre de l'Académie de
Thélème + **communauté privée** (connexion, chat en temps réel, compte
administrateur) + **réservation d'appel découverte**.

- **Front** : Next.js 16 (App Router) · React 19 · Tailwind CSS v4
- **Auth + base de données + temps réel** : Supabase (Postgres, Auth, Realtime)
- **Hébergement** : Vercel
- **Polices** : Cormorant Garamond, EB Garamond (grec polytonique), GFS Neohellenic, Inter

---

## 1. Développement local

Prérequis : **Node.js 20+**.

```bash
npm install
cp .env.local.example .env.local   # puis renseignez vos clés Supabase
npm run dev                         # http://localhost:3000
```

> Sans clés Supabase valides, la page d'accueil fonctionne, mais la connexion et
> la communauté ne sont pas opérationnelles.

Scripts : `npm run dev` · `npm run build` · `npm run start` · `npm run lint`.

---

## 2. Configurer Supabase (auth + chat + admin)

1. Créez un projet sur [supabase.com](https://supabase.com) (offre gratuite suffisante).
2. **SQL Editor → New query** : collez tout le contenu de
   [`supabase/schema.sql`](./supabase/schema.sql) puis **Run**.
   Cela crée les tables (`profiles`, `channels`, `messages`), les politiques de
   sécurité (RLS), le temps réel sur les messages, les salons par défaut et le
   trigger qui crée un profil à chaque inscription.
3. **Compte administrateur** : dans `supabase/schema.sql`, la fonction
   `handle_new_user` rend administratrice l'adresse
   `thibault.wagret@ens-lyon.fr`. **Remplacez-la par votre adresse réelle**
   (endroits commentés `>>> ... <<<`) *avant* d'exécuter le script, puis
   inscrivez-vous avec cette adresse : vous serez automatiquement professeur/admin
   (badge « Professeur », épinglage et modération de tous les messages).
   *(Déjà inscrit ? Exécutez dans le SQL Editor :*
   `update public.profiles set is_admin = true where email = 'votre@email';`*)*
4. **Project Settings → API** : récupérez
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - clé `anon` / `publishable` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. **Authentication → URL Configuration** : ajoutez votre domaine (et
   `http://localhost:3000`) dans *Site URL* et *Redirect URLs*
   (`https://VOTRE-DOMAINE/auth/callback`).
6. *(Optionnel)* **Authentication → Providers → Email** : désactivez « Confirm
   email » pour une connexion immédiate sans validation par e-mail.

---

## 3. Déployer sur Vercel

1. Poussez le dépôt sur GitHub (déjà fait : `t-wagret/grecvivant`).
2. Sur [vercel.com](https://vercel.com) : **Add New → Project → Import** ce dépôt.
   Next.js est détecté automatiquement (aucune config à modifier).
3. **Environment Variables** : ajoutez
   | Nom | Valeur |
   | --- | --- |
   | `NEXT_PUBLIC_SUPABASE_URL` | votre Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | votre clé anon/publishable |
   | `NEXT_PUBLIC_SITE_URL` | `https://votre-domaine` |
4. **Deploy**. Pour un domaine personnalisé (ex. `cours.thibaultwagret.fr`) :
   **Settings → Domains**. Pensez à reporter ce domaine dans les *Redirect URLs*
   de Supabase (étape 2.5).

---

## 4. Personnalisation

| Quoi | Où |
| --- | --- |
| Tous les textes du site | [`src/content/site.ts`](./src/content/site.ts) |
| **Lien de réservation** (Cal.com / Calendly / Google Agenda) | `site.bookingUrl` dans `src/content/site.ts` — s'il est renseigné, l'agenda s'affiche intégré ; sinon un formulaire ouvre un e-mail pré-rempli vers `site.email` |
| Adresse e-mail de contact | `site.email` |
| Témoignages (actuellement des **exemples**) | `temoignages` dans `src/content/site.ts` |
| Couleurs / polices / motifs | `@theme` dans [`src/app/globals.css`](./src/app/globals.css) |
| Salons de la communauté | table `channels` (Supabase) ou la section 7 de `schema.sql` |
| Adresse administratrice | `handle_new_user` dans `supabase/schema.sql` |

---

## 5. Structure

```
src/
  app/
    page.tsx               Page de présentation (vitrine, longue page de vente)
    connexion/             Connexion / inscription
    communaute/            Espace membre (chat temps réel) — protégé
    auth/callback|signout/ Route handlers (confirmation e-mail, déconnexion)
    layout.tsx, globals.css, icon.svg, opengraph-image.tsx
  components/
    site/                  En-tête, pied de page, réservation, héros…
    auth/AuthForm.tsx      Formulaire connexion/inscription
    chat/Community.tsx     Chat temps réel + modération admin
  lib/supabase/            Clients navigateur / serveur, types, session
  content/site.ts          Tout le contenu éditorial (FR)
  proxy.ts                 Rafraîchit la session et protège /communaute (Next 16 « proxy » = ex-middleware)
supabase/schema.sql        Schéma Postgres + RLS + realtime + admin
```

---

© Thibault Wagret — Le Grec Vivant.
