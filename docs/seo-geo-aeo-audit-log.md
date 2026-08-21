# SEO / GEO / AEO improvement loop

This is the running log for the site's self-improving SEO loop. A scheduled
session picks this file up, does one bounded batch of diagnosis + fixes, runs
`npm run audit:seo` (see `scripts/audit-seo.mjs`) to confirm nothing regressed,
commits, and appends an entry below — so the next run knows what's already
done and what's still queued, instead of re-diagnosing from scratch.

## How the loop works

1. **Diagnose** — read the latest entry below for open items; spot-check a
   few pages against current Google/AI-answer-engine best practices (search
   for anything dated after the last entry).
2. **Fix a bounded batch** — small, verifiable, on-brand changes only. Never
   fabricate stats, reviews, or fake freshness (see `AGENTS.md`). A
   `dateModified` bump is only valid alongside a real content or schema
   change to that page.
3. **Verify** — `npm run lint && npm run typecheck && npm run build`, then
   `npm run audit:seo` against the production build. All four must pass
   before committing.
4. **Log** — append a dated entry to the table below (diagnosed / fixed /
   queued for next run), then commit + push + keep the PR for this branch
   up to date.

## Automated regression net

`scripts/audit-seo.mjs` (`npm run audit:seo`) boots the built app and walks
every sitemap URL, asserting: single `<h1>`, title/description length,
canonical matches the sitemap URL, and at least one valid JSON-LD block per
page — plus that `/robots.txt`, `/llms.txt`, and `/llms-full.txt` resolve.
This is the fast, cheap safety net; it is not a substitute for the manual
best-practices research in step 1.

## Log

### 2026-08-21 — initial loop setup + GEO/AEO pass

**Diagnosed** (via local production build + rendered-HTML inspection, since
outbound fetches to the live domain are blocked from this environment):

- `robots.txt` only had a wildcard `*` rule — fine functionally, but current
  (2026) GEO guidance recommends naming AI answer-engine crawlers explicitly
  rather than relying on the wildcard, both for clarity and because upstream
  default policies for unnamed bots can change.
- No `ItemList` JSON-LD on the `/insights` field-notes hub, even though the
  page renders a visible ordered list of notes — a straightforward AEO/entity
  win with no risk of markup/content mismatch.
- Editorial `dateModified` on all guides and field notes is May 2026 (now
  ~3 months stale). Freshness is a real GEO/AEO ranking signal, but per
  `AGENTS.md` a date bump must accompany a genuine content change — flagged
  as **queued**, not fixed blind, this run.
- Root canonical/`og:url` render without a trailing slash while
  `sitemap.xml`'s homepage `<loc>` has one (Next's metadata URL formatting,
  not a bug in `canonicalPath()`). Google treats these as equivalent —
  logged as informational, not fixed.
- Schema coverage (`WebSite`, `LocalBusiness`/`RealEstateAgent`,
  `ApartmentComplex`, `Service`, `FAQPage`, `Article`, `BreadcrumbList`,
  `ImageGallery`, `RealEstateListing`, `speakable`) is already strong —
  confirmed via rendered JSON-LD, not just source reading.

**Fixed this run:**

- `src/app/robots.ts` — explicit `allow: "/"` rules for GPTBot, OAI-SearchBot,
  ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, Google-Extended,
  PerplexityBot, Perplexity-User, Applebot-Extended, Bingbot, in addition to
  the existing wildcard rule.
- `src/lib/schema.ts` — added `getItemListJsonLd()`.
- `src/components/marketing/insights-hub-page-body.tsx` — wired `ItemList`
  JSON-LD for the field-notes list.
- `scripts/audit-seo.mjs` + `npm run audit:seo` — new automated technical-SEO
  regression check (see above). Uses `node:http` directly rather than
  `fetch()`: `NEXT_PUBLIC_SITE_URL` is inlined into the middleware bundle at
  *build* time (standard Next.js behavior for `NEXT_PUBLIC_` vars), so it
  can't be overridden by an env var at `next start` time — if the build's
  canonical host doesn't match the request, middleware 308-redirects to the
  real domain, and `fetch()` forbids setting a custom `Host` header to work
  around that while `node:http` does not.
- `.github/workflows/seo-audit.yml` — runs `audit:seo` weekly and on PRs
  touching SEO-relevant paths.
- Ran the new audit against a real production build — it caught 3 genuine,
  pre-existing meta-description overruns (the fixed "agent name, title —
  brokerage" suffix appended to every field note is ~141 characters, so
  descriptions written without that budget in mind pushed well past 300
  total). Trimmed base copy on `hoa-packet-before-offer.ts`,
  `furnished-inventory-surprises.ts`, and `palms-place-tour-red-flags.ts`
  (meaning preserved, no fabricated content) and bumped their
  `dateModified` to 2026-08-21 alongside the real edit. Also trimmed the
  `title` field on the two field notes whose `<title>` (base title +
  `" | Field note"`) exceeded ~70 characters — `headline`/H1 and the
  `Article` JSON-LD headline were left as-is since Google explicitly allows
  title tag and on-page H1 to differ.

**Queued for the next run:**

- Editorial refresh pass on guides/field notes (May 2026 `dateModified`) —
  needs a real content addition per page (new dated FAQ entry, updated
  checklist item, etc.), not a bare date bump.
- Re-run the AI-crawler-allow research before the next `robots.txt` touch —
  bot list/consensus shifts quickly; verify names/behavior haven't changed.
- Consider `VideoObject`/tour markup for the PropertyPanorama Instaview tour
  on the featured listing — deferred this run because Instaview is an
  interactive 360 embed, not a hosted video file, and forcing `VideoObject`
  risks a Google structured-data mismatch flag. Research the correct
  schema.org fit (if any) before adding.
- Consider whether `/palms-place`'s inline guide links should become a
  visible list block eligible for its own `ItemList` (currently prose links,
  not a list — left alone this run to avoid a content/schema mismatch).
