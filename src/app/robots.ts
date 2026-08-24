import type { MetadataRoute } from "next";
import { getPublicSiteOrigin } from "@/lib/public-site-origin";

/**
 * Google honors User-agent, Allow, Disallow, and Sitemap only.
 * Do not emit `Host:` — it is a Yandex leftover and Search Console flags it as
 * the robots.txt warning on every protocol/host variant it fetches.
 * Canonical host is https://www via redirects + sitemap URLs, not this file.
 *
 * Search Console cannot upload this file. Recrawl-from-GSC may fail with a
 * generic retry error; this route is force-dynamic so Google's next fetch is
 * not stuck on a 4-hour CDN copy of an older robots.txt.
 *
 * Extra AI crawler groups use the same Allow/Disallow as `*` so answer engines
 * can fetch marketing HTML. Do not add unsupported fields.
 *
 * Production `https://www.palmsplacecondos.com/robots.txt` (fetched 2026-08-20,
 * before Claude-User/Claude-SearchBot were added below) matched this module:
 * Allow `/`, Disallow `/api/`, AI crawler group, and
 * `Sitemap: https://www.palmsplacecondos.com/sitemap.xml`. That Disallow keeps
 * `/api/indexnow` off crawlers; the IndexNow key file is at `/{key}.txt` (root,
 * allowed). Do not add `Host:`.
 *
 * @see https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
 */
const AI_CRAWLER_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "ClaudeBot",
  // Anthropic's more precise 2026 agents: Claude-User (on-demand fetch for a
  // live Claude conversation) and Claude-SearchBot (index crawler for
  // Claude's answer/citation surface) — both distinct from ClaudeBot
  // (training-data crawler). Allow all three for AEO/GEO citation eligibility.
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
] as const;

/** Match sitemap.ts: live origin, no 4-hour static metadata cache. */
export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = (await getPublicSiteOrigin()).replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [...AI_CRAWLER_USER_AGENTS],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
