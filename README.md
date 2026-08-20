# Palms Place Condos

Real estate marketing site for **Palms Place** (Las Vegas). This repository is set up for local development and [GitHub Codespaces](https://github.com/features/codespaces).

## Prerequisites

- **Node.js** 20+ (see `engines` in [`package.json`](package.json))
- **npm** (lockfile: [`package-lock.json`](package-lock.json))
- **Git**
- A GitHub account with access to this repository

## Quick start (local)

```bash
git clone git@github.com:DrJanDuffy/palmsplacecondos.git
cd palmsplacecondos
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Production build check (aligned with Vercel): `npm run build` or `vercel build` from the project root.

Copy [`.env.example`](.env.example) to `.env.local` and set `NEXT_PUBLIC_SITE_URL` when testing canonical URLs locally. Production should use **`https://www.palmsplacecondos.com`** (no trailing slash; apex redirects to `www` when that env uses a `www` hostname).

## Deployment (Vercel)

This site is built for **[Vercel](https://vercel.com)** (recommended production host for this Next.js app).

1. Import the GitHub repository in the Vercel dashboard and keep the default **Next.js** settings.
2. Under **Settings → Environment Variables**, add the values from [`.env.example`](.env.example) for **Production** (at minimum **`NEXT_PUBLIC_SITE_URL`** = `https://www.palmsplacecondos.com`).
3. Under **Settings → Domains**, assign the production domain and prefer **`www`** as described in [AGENTS.md](AGENTS.md).
4. Preview deployments use **`VERCEL_URL`** automatically for `metadataBase` when `NEXT_PUBLIC_SITE_URL` is unset; production should always set `NEXT_PUBLIC_SITE_URL` to the public `www` URL.

### DNS (Cloudflare nameservers + Vercel)

Keep **apex** (`palmsplacecondos.com`) and **`www`** on **DNS only** (gray cloud in Cloudflare), not proxied, so traffic terminates TLS at Vercel and you avoid SSL/origin conflicts ([AGENTS.md](AGENTS.md)).

**Vercel → Project → Settings → Domains** is the source of truth for values: open each hostname and copy the recommended **A** record (apex) and **CNAME** (`www`) into Cloudflare. Project-specific targets (for example `*.vercel-dns-*.com`) can differ from generic documentation; if Vercel shows a different IP or hostname than your zone, update Cloudflare to match.

### Google Search Console

- Add a **URL-prefix** property for **`https://www.palmsplacecondos.com`** (same host as `NEXT_PUBLIC_SITE_URL` and the app’s apex → `www` redirect).
- **Page indexing → Page with redirect** for `http://palmsplacecondos.com/` or `http://www.palmsplacecondos.com/` is **expected**: those URLs 301/308 to `https://www.palmsplacecondos.com/`. Do not try to get the HTTP or apex URLs indexed—use **URL Inspection** on the **https www** homepage instead. The redirect report may keep listing legacy URLs while Google recrawls.
- After deploy, submit **`https://www.palmsplacecondos.com/sitemap.xml`** in GSC.
- **robots.txt warnings:** GSC lists `http`/`https` and apex/`www` copies of `/robots.txt`. One warning on each was the unsupported `Host:` line (Yandex-only). Google only uses User-agent, Allow, Disallow, and Sitemap — that line is omitted in [`src/app/robots.ts`](src/app/robots.ts). Recrawl after deploy; do not treat the four URLs as four different files.
- **Verification:** DNS **TXT** at the apex (as in your Cloudflare zone) **or** set `GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` per [`.env.example`](.env.example) for the HTML-tag method.

### Optional: DMARC (email only)

If you use **Cloudflare Email Routing** (MX on the zone), run Cloudflare’s **DMARC** wizard to add a `_dmarc` TXT record. This does not affect the Next.js site; it helps mail authentication and reporting.

## Project structure

| Path | Purpose |
|------|---------|
| [`src/app/`](src/app/) | Next.js App Router routes, layouts, and global styles |
| [`src/components/ui/`](src/components/ui/) | Reusable UI primitives (e.g. shadcn-style components) |
| [`src/components/layouts/`](src/components/layouts/) | Header, footer, shell layouts |
| [`src/components/sections/`](src/components/sections/) | Page sections (hero, FAQ, CTA) |
| [`src/components/forms/`](src/components/forms/) | Lead and contact forms |
| [`src/components/tools/`](src/components/tools/) | Interactive tools (search widgets, valuation) |
| [`src/components/shared/`](src/components/shared/) | Cross-cutting UI helpers |
| [`src/components/seo/`](src/components/seo/) | JSON-LD and SEO-specific components |
| [`src/components/idx/`](src/components/idx/) | MLS/IDX widgets (see folder README; changes need approval) |
| [`src/lib/`](src/lib/) | Server-safe utilities, schema, and `site-contact` |
| [`src/hooks/`](src/hooks/) | Client-side React hooks |
| [`src/types/`](src/types/) | Shared TypeScript types |
| [`public/images/`](public/images/) | Static images referenced from pages |
| [`docs/v0-prompt.md`](docs/v0-prompt.md) | Copy-paste prompt for [v0.dev](https://v0.dev) UI iterations (dark luxury + gold) |

Site navigation labels and routes are defined in [`src/lib/navigation.ts`](src/lib/navigation.ts) and rendered in the **footer** ([`src/components/layouts/site-footer.tsx`](src/components/layouts/site-footer.tsx)). The header shows the **Palms Place Condos** site title only. Set `NEXT_PUBLIC_YOUTUBE_URL` in `.env.local` for the YouTube link.

## Git remote (existing repo)

If this folder was cloned without `origin`, or you are pushing from a machine that has not added the remote:

```bash
git remote add origin git@github.com:DrJanDuffy/palmsplacecondos.git
git branch -M main
git push -u origin main
```

## GitHub Codespaces

Open the repo on GitHub and choose **Code → Codespaces → Create codespace on main**. The included dev container installs Node and useful editor defaults so the environment is consistent for collaborators.

To adjust tooling (Node version, extensions, post-create commands), edit [`.devcontainer/devcontainer.json`](.devcontainer/devcontainer.json).

**Validate the dev container (after the codespace opens):**

1. In the integrated terminal, run `node --version` — expect **v20.x** (matches the dev container image).
2. When you run a dev server on port **3000**, GitHub should offer to forward the port; accept it to open the app in the browser.
3. If the container fails to build, check the **Codespaces** log in the Command Palette (`Codespaces: View Creation Log`).

## Collaborators

Repository owners can add collaborators under **Settings → Collaborators** on GitHub and invite people by username or email.

Quick link (this repository): [github.com/DrJanDuffy/palmsplacecondos/settings/access](https://github.com/DrJanDuffy/palmsplacecondos/settings/access). Organization-owned repos may use **Settings → Collaborators and teams** instead.

## Cursor rules and AGENTS.md

Shared **Cursor** rule files live in [`.cursor/rules/`](.cursor/rules/) (copied from the team standard so Codespaces and collaborators get the same SEO, Next.js, and real-estate conventions).

Repository-specific instructions for AI assistants and contributors: **[AGENTS.md](AGENTS.md)** (Dr. Jan Duffy branding, RealScout/IDX boundaries, Vercel/Cloudflare, NAP/schema).

## Security

- Do not commit secrets, API keys, or `.env` files with live credentials. Use `.env.example` for documented placeholders and platform environment variables for production.
- Keep dependencies updated and review pull requests before merging.

## License

See [LICENSE](LICENSE). All rights reserved unless you have a separate written agreement with the copyright holder.
