import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Google honors User-agent, Allow, Disallow, and Sitemap only.
 * Do not emit `Host:` — Search Console flags it as a robots.txt warning.
 * Canonical host is https://www via redirects + sitemap URLs.
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
