import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Google honors User-agent, Allow, Disallow, and Sitemap only.
 * Do not emit `Host:` — it is a Yandex leftover and Search Console flags it as
 * the robots.txt warning on every protocol/host variant it fetches.
 * Canonical host is https://www via redirects + sitemap URLs, not this file.
 *
 * Extra AI crawler groups use the same Allow/Disallow as `*` so answer engines
 * can fetch marketing HTML. Do not add unsupported fields.
 *
 * @see https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
 */
const AI_CRAWLER_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl().replace(/\/$/, "");

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
