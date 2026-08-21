import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/**
 * GEO/AEO: explicit allow rules for AI answer-engine crawlers.
 * This is a lead-gen local business site, not a content publisher protecting paywalled
 * work — maximizing AI citation surface (Google AI Overviews/Gemini, ChatGPT, Claude,
 * Perplexity) outweighs any training-data concern, so every named bot is allowed rather
 * than opted out. The wildcard rule below already covers unnamed bots; naming these
 * explicitly documents intent and survives future default-policy changes upstream.
 */
const AI_CRAWLER_USER_AGENTS = [
  "GPTBot", // OpenAI training crawler
  "OAI-SearchBot", // OpenAI ChatGPT search
  "ChatGPT-User", // ChatGPT browsing/plugins
  "ClaudeBot", // Anthropic training crawler
  "Claude-SearchBot", // Anthropic Claude search
  "Claude-User", // Anthropic Claude browsing
  "Google-Extended", // Gemini / AI Overviews training
  "PerplexityBot", // Perplexity search
  "Perplexity-User", // Perplexity browsing
  "Applebot-Extended", // Apple Intelligence / Siri
  "Bingbot", // Copilot / Bing AI answers
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
