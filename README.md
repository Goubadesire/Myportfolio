# Portfolio de Désiré Gouba

Portfolio fullstack construit avec Next.js : le site public, le formulaire de contact et l'espace admin de lecture des messages sont dans la même application. Aucun backend séparé.

## Stack

- Next.js 16 (App Router, Server Actions), React 19, TypeScript
- Prisma 7 + PostgreSQL
- Tailwind CSS 4, Motion (animations), Lenis (défilement fluide)
- Zod (validation), bcryptjs + jose (session admin)

## Architecture

```text
Formulaire de contact ──▶ Server Action sendMessage ──▶ Zod ──▶ Prisma ──▶ PostgreSQL
/admin (Server Component) ──▶ requireAdmin() ──▶ Prisma ──▶ liste des messages
```

```text
src/
├── app/
│   ├── (site)/          → pages publiques (navbar, footer, smooth scroll)
│   └── admin/           → login + boîte de réception
├── components/
│   ├── effects/         → éclairs, bordure électrique, révélations au scroll
│   └── site/            → sections de la page d'accueil
├── data/                → contenu : projets, compétences, liens
├── features/            → Server Actions (contact, admin)
├── lib/                 → prisma.ts, session.ts
└── proxy.ts             → redirige /admin vers /admin/login sans session
```

## Lancer en local

```bash
cp .env.example .env    # puis remplir les valeurs
npm install             # génère aussi le client Prisma
npm run db:deploy       # applique les migrations
npm run db:seed         # crée/met à jour le compte admin depuis ADMIN_EMAIL / ADMIN_PASSWORD
npm run dev
```

## Scripts

| Script | Rôle |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run db:migrate` | Créer une migration (dev) |
| `npm run db:deploy` | Appliquer les migrations (prod) |
| `npm run db:seed` | Créer le compte admin |
| `npm run db:studio` | Explorer la base |

## Déploiement sur Vercel

1. Créer une base PostgreSQL (Neon ou Supabase) et récupérer son URL.
2. En local, avec `DATABASE_URL` pointant vers cette base : `npm run db:deploy` puis `npm run db:seed`.
3. Sur Vercel, importer le dépôt et définir `DATABASE_URL` et `SESSION_SECRET`.
4. Déployer. Le client Prisma est généré au `postinstall`.

## Modifier le contenu

- Projets : `src/data/projects.ts`
- Compétences : `src/data/skills.ts`
- Liens, e-mail, CV : `src/data/site.ts`
