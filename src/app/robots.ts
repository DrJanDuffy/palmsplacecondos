import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Google honors User-agent, Allow, Disallow, and Sitemap only.
 * Do not emit `Host:` — it is a Yandex leftover and Search Console flags it as
 * the robots.txt warning on every protocol/host variant it fetches.
 * Canonical host is https://www via redirects + sitemap URLs, not this file.
 *
 * @see https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
 */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl().replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
