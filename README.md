# Palms Place Condos

Real estate marketing site for **Palms Place** (Las Vegas). This repository is set up for local development and [GitHub Codespaces](https://github.com/features/codespaces).

## Prerequisites

- **Node.js** 24.x (see `engines` in [`package.json`](package.json); Vercel project is Node 24)
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

- Add a **URL-prefix** property for **`https://www.palmsplacecondos.com`** (same host as `NEXT_PUBLIC_SITE_URL` and the app’s apex → `www` redirect). A **Domain** property (`sc-domain:palmsplacecondos.com`) will also list HTTP and apex variants.
- **Page indexing → Page with redirect** is **not an error** for these homepage variants (they must stay redirected):
  - `http://www.palmsplacecondos.com/`
  - `https://palmsplacecondos.com/`
  - `http://palmsplacecondos.com/`
  Live checks (2026-08-20): each returns a **single 301** to **`https://www.palmsplacecondos.com/`**. Sitemap and `robots.txt` already list only the `https://www` origin.
- **Do not click Validate Fix** on that report. Google recrawls the same URLs, still sees a redirect, and marks validation **Failed**. That is the correct outcome. Validate Fix is only for *accidental* redirects you removed.
- Confirm the destination instead: **URL Inspection** on **`https://www.palmsplacecondos.com/`** (expect **Indexed** / 200, `index, follow`). Do not try to get the HTTP or apex URLs indexed.
- After deploy, submit **`https://www.palmsplacecondos.com/sitemap.xml`** in GSC. Search Console Sitemaps export (2026-08-20): that URL is **Success**, **33 URLs discovered**, last processed **2026-08-18** (last *submitted* **2026-04-16** — **resubmit after this content wave**). This repo’s marketing catalog is **37 URLs** after adding `/guide/palms-place-strip-view-condos` and `/guide/palms-place-short-term-rentals`. Live `robots.txt` on **www** still points at the same sitemap origin.
- **robots.txt warnings:** GSC lists `http`/`https` and apex/`www` copies of `/robots.txt`. One warning on each was the unsupported `Host:` line (Yandex-only). Google only uses User-agent, Allow, Disallow, and Sitemap — that line is omitted in [`src/app/robots.ts`](src/app/robots.ts). Recrawl after deploy; do not treat the four URLs as four different files.
- **Verification:** DNS **TXT** at the apex (as in your Cloudflare zone) **or** set `GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` per [`.env.example`](.env.example) for the HTML-tag method.

### IndexNow (Bing and other participating engines)

IndexNow is a URL-change ping so Bing, Yandex, Naver, Seznam.cz, and Yep can prioritize recrawl instead of waiting on organic discovery. It does **not** replace [`sitemap.xml`](src/app/sitemap.ts): sitemaps remain the full inventory; IndexNow notifies engines about **recent** adds, updates, and deletes ([IndexNow FAQ](https://www.indexnow.org/faq)).

This Next.js app is not on a CMS with a native IndexNow plugin, so the site implements the protocol directly:

1. **API key + verification (Option 1, site root).** The key lives in [`src/lib/indexnow-key.ts`](src/lib/indexnow-key.ts) (override with `INDEXNOW_KEY`) and is served at `https://www.palmsplacecondos.com/{key}.txt` by [`src/middleware.ts`](src/middleware.ts). The response body is the key only (UTF-8, no HTML). After deploy, open that URL and confirm it shows the key.
2. **URL submission.** Production POST to `https://api.indexnow.org/indexnow` (global endpoint; engines share submissions). Batch limit is **10,000 URLs** per POST. Run `npm run notify:indexnow` ([`scripts/ping-search-engines.mjs`](scripts/ping-search-engines.mjs)) using the marketing routes in [`src/lib/marketing-routes.ts`](src/lib/marketing-routes.ts).
3. **When we notify.** After content changes (deploy / lastmod bump), not for cosmetic-only edits. IndexNow is not a retroactive dump of history — keep [`sitemap.xml`](src/app/sitemap.ts) for the full catalog.
4. **HTTP responses:** `200` received, `202` accepted (key validation pending on first use), `400` bad request, `403` key file invalid, `422` host/payload mismatch, `429` rate limit. Submissions **count toward crawl quota**.

Optional: set `BING_SITE_VERIFICATION` from Bing Webmaster Tools (HTML `msvalidate.01` tag) so the Bing property matches this host. Cloudflare orange-cloud proxy is still **not** used in front of Vercel; Cloudflare’s native IndexNow feature is unused because DNS is gray-cloud / DNS-only.

### Bing Webmaster Tools backlinks (inbound links)

Backlinks are links **from other sites** to this site. Bing Webmaster Tools can review yours and **compare** them to any other website. IndexNow only tells Bing that **our** URLs changed; it does not create inbound links.

**Always compare the canonical host:** `https://www.palmsplacecondos.com/` (same as `NEXT_PUBLIC_SITE_URL` and the sitemap). Apex `https://palmsplacecondos.com/` 308s to **www**, so Bing’s backlink index for the apex host is often empty even when **www** has (or will have) data.

Bing Webmaster Tools Backlinks compare, **2026-08-20** (UI paste):

| Metric | `https://palmsplacecondos.com/` (apex) | `https://www.palms.com` |
|---|---|---|
| Total referring domains | No data (`-`) | 2.4K |
| Anchor texts | No data (`-`) | 1.1K |
| Top referring domains / top anchors | No data available | Casino/entertainment profile (see below) |

`palms.com` top referring domains in that sample included blogspot.com, themogh.org, trazeetravel.com, uvtix.com, axs.com, vegasfamilyinsider.com, fodors.com, vegasnearme.com, yogonet.com, and boxofficehero.com. Top anchors were Palms / Palms Casino Resort / palms.com / Scotch 80 Prime / Press / tickets / a pool-opening press URL. That is a **hotel-casino and ticketing** link graph, not a Palms Place **resale condo** peer. Do not chase those domains or copy those anchors for this site.

Re-run the same Bing compare with **`https://www.palmsplacecondos.com/`** as “your site.” If **www** is also “No data,” Bing has not sampled inbound links yet (new property, or none discovered)—that is not a robots/sitemap bug. First-party citations that can earn real links: Google Business Profile website field, the Palms Place Facebook page, BHHS Nevada Properties agent profile, and RealScout—keep NAP identical to [`src/lib/site-contact.ts`](src/lib/site-contact.ts). Do not invent review counts or “#1” claims.

### After content deploy (A + B — operator clicks)

Code cannot click Bing or Google Search Console. After Vercel production deploys this wave:

1. **A — Bing www.** Open Bing Webmaster Tools on **`https://www.palmsplacecondos.com/`** (not apex). Confirm the IndexNow key file `/{key}.txt` returns 200. Run `npm run notify:indexnow` against production. Point GBP website, YouTube About, BHHS agent profile, and RealScout website fields at **www**. Re-run Backlinks compare on **www**.
2. **B — GSC.** On the **www** URL-prefix property, **resubmit** `https://www.palmsplacecondos.com/sitemap.xml`. URL Inspection a few new guides (`/guide/palms-place-strip-view-condos`, `/guide/palms-place-short-term-rentals`). Do **not** Validate Fix on apex/HTTP “Page with redirect.”
3. **Do not** copy competitor phones (e.g. 702-810-6039), competitor listing portals, HOA dollar figures from YouTube, or “Airbnb approved” claims into this site.

### SERP query map (first-party pages)

Competitor YouTube/Instagram titles for Palms Place are indexed; this site answers the same intents on canonical pages (no competitor embeds):

| Query cluster | Canonical on this site |
|---|---|
| Palms Place Strip view / Strip View Las Vegas Real Estate | `/guide/palms-place-strip-view-condos` |
| High-rise condo tour | `/photos`, `/photos/unit-8322` |
| Studio mountain view / 1BR full Strip view / ~615 SF | `/guide/palms-place-unit-types` |
| HOA costs 2026 | `/guide/palms-place-hoa-and-monthly-costs` (no invented dues) |
| Condo hotel / condotel / investors | `/guide/palms-place-condos-vs-hotel` |
| Airbnb / legally short-term rent | `/guide/palms-place-short-term-rentals` |
| Penthouse / 57th floor | `/guide/palms-place-unit-types` + live search |
| Gym / amenities | `/guide/palms-place-amenities-and-resort-access` |
| 4381 W Flamingo | `/area/palms-place-las-vegas` |

The FAQ query map ([`src/lib/content/aeo-query-map.ts`](src/lib/content/aeo-query-map.ts)) is the AEO index for these questions.

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
