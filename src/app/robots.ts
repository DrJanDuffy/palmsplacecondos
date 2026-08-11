import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/**
 * AI answer-engine crawlers (2026 GEO/AEO) — explicitly allowed so citation/training bots
 * never get caught by a future host-level or CDN default-deny. robots.txt is allow-by-default,
 * but this small marketing site wants maximum inclusion in AI answers, so every major crawler
 * (training + live-search fleets) gets an explicit `Allow: /` entry rather than relying on the
 * wildcard rule alone.
 */
const AI_CRAWLER_USER_AGENTS = [
  "GPTBot", // OpenAI — training
  "OAI-SearchBot", // OpenAI — ChatGPT live search/citations
  "ChatGPT-User", // OpenAI — ChatGPT browsing on a user's behalf
  "ClaudeBot", // Anthropic — training
  "Claude-SearchBot", // Anthropic — Claude live search/citations
  "Claude-User", // Anthropic — Claude browsing on a user's behalf
  "PerplexityBot", // Perplexity — indexing/answers
  "Perplexity-User", // Perplexity — user-triggered fetch
  "Google-Extended", // Gemini + AI Overviews training use of content
  "Applebot-Extended", // Apple Intelligence training use of content
  "meta-externalagent", // Meta AI
  "Amazonbot", // Alexa+ / Amazon AI
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
      ...AI_CRAWLER_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
