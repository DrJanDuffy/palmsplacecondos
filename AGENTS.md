# Agent and contributor instructions (palmsplacecondos)

This file is the **repository-specific** companion to the shared Cursor rules in [`.cursor/rules/`](.cursor/rules/). Follow both when editing this project.

## Business and branding

- **Listing / team lead:** Dr. **Jan** Duffy (never “Janet” or other variants), **Realtor**, listing specialist and team leader for Palms Place.
- **Buyers specialist:** Dr. **Jan** Duffy (same agent as listing lead).
- **License (on-site):** Nevada real estate license **S.0197614.LLC** (Dr. Jan Duffy)—verify in copy, footer, and schema; keep [`site-contact.ts`](src/lib/site-contact.ts) aligned with GBP / REC.
- **Brokerage:** Berkshire Hathaway HomeServices Nevada Properties (use exact approved wording on marketing pages).

## Stack (when the app is scaffolded)

- Prefer **Next.js App Router** (15+), **TypeScript**, **Tailwind**, **server components by default**.
- Match patterns in `.cursor/rules/` for metadata, sitemap, robots, JSON-LD, layouts, and middleware.

## Photos and Cloudflare Images

- Listing photo galleries live under [`/photos`](src/app/photos/page.tsx) and unit pages (e.g. [`/photos/unit-8322`](src/app/photos/unit-8322/page.tsx)).
- Catalog + SEO titles/alts: [`src/lib/content/media-gallery.ts`](src/lib/content/media-gallery.ts). Local files under `public/images/listings/`.
- Optional Cloudflare Images: set `NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH` and per-photo `cloudflareImageId` in the catalog ([`src/lib/cloudflare-images.ts`](src/lib/cloudflare-images.ts)). `next.config.ts` already allows `imagedelivery.net`.
- Homepage hero/amenity images (`hero-tower-dusk`, `stay-*`, `unwind-*`) are **real building photos** — keep alt text and comments labeled that way (not “illustrative” / AI / stock).
- Unit listing photography lives under [`/photos`](src/app/photos/page.tsx) and [`media-gallery.ts`](src/lib/content/media-gallery.ts); do not mix or relabel those catalogs as interchangeable with hero amenity shots.

## RealScout

- Load the RealScout script **once** when the listings widget is about to show ([`src/components/seo/realscout-office-listings-mount.tsx`](src/components/seo/realscout-office-listings-mount.tsx) — IntersectionObserver + `next/script` `lazyOnload`). Do not put the script in the root layout (keeps it off the LCP critical path).
- Section shell: [`src/components/seo/realscout-office-listings-embed.tsx`](src/components/seo/realscout-office-listings-embed.tsx); custom-element HTML mounts via the deferred client component — do not duplicate script tags.
- **CSP:** when you add `Content-Security-Policy`, allow **`em.realscout.com`** and **`www.realscout.com`** in both **`script-src`** and **`connect-src`** (see [`next.config.ts`](next.config.ts) comment). Test embeds after any CSP change.
- **Listing data / MLS:** visible disclaimer must accompany listing widgets (see embed component). Do not remove without broker/MLS compliance review. **Consumer-facing copy** should use plain terms like “listings” and “listing disclaimer,” not “MLS,” unless your broker requires the acronym on-page.

## IDX / MLS

- **Do not** change `components/idx/*` without explicit approval.
- Always show MLS disclaimer and listing attribution on IDX-related UI.

## SEO and local

- **NAP** (name, address, phone) in visible copy and **LocalBusiness** JSON-LD must match the **Google Business Profile** when those pages exist.
- No placeholder phone numbers, fake review counts, or wrong metro/area codes.
- **Structured data** ([`src/lib/schema.ts`](src/lib/schema.ts)): optional `telephone` and `PostalAddress` on `RealEstateAgent` only when the same values are added to [`site-contact.ts`](src/lib/site-contact.ts) and shown on-page. Optional `sameAs` URLs via `NEXT_PUBLIC_SAME_AS_URLS` must match real profile links.
- **LocalBusiness + listing agent:** the primary listing agent node is typed as both `RealEstateAgent` and `LocalBusiness` with a single stable `@id` (`#dr-jan-duffy`). Phone, email, address, hours, description, and optional office `geo` / `hasMap` must match **Google Business Profile** and visible NAP (see [`site-contact.ts`](src/lib/site-contact.ts)). GBP pending hours are Sunday–Saturday 9:00 AM–5:00 PM; keep site + JSON-LD aligned when Google publishes edits.
- **Palms Place tower entity:** `#place-palms-place` is an `ApartmentComplex` + `Place` with the tower address from [`palms-place-building.ts`](src/lib/content/palms-place-building.ts) (wired via `siteContact.palmsPlaceBuilding`). Buy/sell `Service` nodes and agent `areaServed` / `knowsAbout` point at that `@id`. Do not invent unit counts or amenity lists in schema.
- **Agent image URL:** set `NEXT_PUBLIC_AGENT_IMAGE_URL` when a production image URL is ready (see [`.env.example`](.env.example)); omit `image` in JSON-LD until then.
- After deploy, spot-check JSON-LD with Google’s [Rich Results Test](https://search.google.com/test/rich-results) on key URLs (home, `/search`).

## Google Search Console

- **Primary host is `www`.** Set **`NEXT_PUBLIC_SITE_URL`** to `https://www.yourdomain.com` (no trailing slash) and use the **same** URL-prefix property in GSC. Apex traffic is redirected to **`www`** via [`src/middleware.ts`](src/middleware.ts) when the env URL includes `www`.
- **Page with redirect / Validation Failed** for `http://`, apex, or `http://www` URLs is **expected**. Those hosts 301 to `https://www…`. Do **not** click Validate Fix and do **not** remove the redirects so GSC will “pass.” Inspect the **https www** URL instead.
- Submit **`https://www.yourdomain.com/sitemap.xml`** in GSC after deploy; **`robots.txt`** uses the same origin.
- **LLM indexes:** [`/llms.txt`](src/app/llms.txt/route.ts) and [`/llms-full.txt`](src/app/llms-full.txt/route.ts) list public marketing routes (same set as [`src/lib/marketing-routes.ts`](src/lib/marketing-routes.ts)).
- **Sitemap URL errors:** [`sitemap.ts`](src/app/sitemap.ts) and [`robots.ts`](src/app/robots.ts) resolve the public origin per request (so URLs match `www` or your custom domain). Still set **`NEXT_PUBLIC_SITE_URL`** on Vercel so metadata and JSON-LD stay aligned. Vercel also exposes **`VERCEL_PROJECT_PRODUCTION_URL`** as a build-time fallback for [`getSiteUrl()`](src/lib/site-url.ts) when the public env is unset (enable system env vars in the project).
- Add **`GOOGLE_SITE_VERIFICATION`** (or `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) from GSC’s HTML tag method so the site can be verified without extra file deploys.
- **IndexNow** (Bing, Yandex, Naver, Seznam.cz, Yep): ownership key from [`src/lib/indexnow-key.ts`](src/lib/indexnow-key.ts) served at `/{key}.txt` on **www** via [`src/middleware.ts`](src/middleware.ts). Submit marketing URLs with `npm run notify:indexnow` ([`scripts/ping-search-engines.mjs`](scripts/ping-search-engines.mjs)). Keep **sitemaps** as the full URL catalog. Production **www** only.
- **Bing Webmaster Tools backlinks:** review and compare inbound links on **`https://www.palmsplacecondos.com/`**, not apex. Apex 308s to www, so Bing often shows “No data” for `https://palmsplacecondos.com/`. IndexNow does not create backlinks. Do not treat `palms.com` (casino/tickets/press) as a peer link-profile for this condo site.

## Hosting

- **Production is on [Vercel](https://vercel.com)** (Next.js App Router). Connect this GitHub repo, use the default **Next.js** framework preset, and set environment variables in **Project → Settings → Environment Variables** (Production / Preview as needed). Builds use `npm run build` (or `vercel build` from the CLI).
- **Primary domain:** add **`www`** as the production hostname in Vercel; set **`NEXT_PUBLIC_SITE_URL`** to `https://www.yourdomain.com` so metadata, sitemap, and middleware match.
- **Cloudflare (DNS):** use **DNS only** (gray cloud); do not orange-cloud proxy in front of Vercel (avoids SSL conflicts).

### Vercel Toolbar + v0

On a **preview or deployment** with the [Vercel Toolbar](https://vercel.com/docs/workflow-collaboration/vercel-toolbar) enabled:

1. **Tag `@v0`** in a comment or reply to ask UI questions or request changes.
2. **Tag `@v0` again** in a follow-up to continue the same thread.
3. v0 receives **full context**: the conversation, the page, and the elements in focus—use it for layout/components; merge any exported code with this repo’s tokens ([`src/app/globals.css`](src/app/globals.css)) and run lint/typecheck before merging.

Toolbar visibility is controlled in the **Vercel project** (not in this repo by default).

## Security

- No live API keys or secrets in git; use `.env.example` and platform env vars.
- See `security-env.mdc` in `.cursor/rules/` when touching middleware, `next.config`, or `app/**/route.ts`.

## License

- Proprietary; see [LICENSE](LICENSE).
