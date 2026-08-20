import type { MetadataRoute } from "next";
import { MARKETING_ROUTES } from "@/lib/marketing-routes";
import { absoluteUrlForSitemap, getPublicSiteOrigin } from "@/lib/public-site-origin";
import {
  assertMarketingRoutesHaveLastModified,
  getSitemapLastModified,
} from "@/lib/sitemap-last-modified";

/**
 * Per-request URLs so sitemap matches the host Google fetches (www vs deployment URL).
 *
 * Google Search Console Sitemaps export (2026-08-20):
 * `https://www.palmsplacecondos.com/sitemap.xml` — Type Sitemap, Source Discovered,
 * last submitted 2026-04-16, last processed 2026-08-18, Status Success, 33 URLs.
 * This repo’s `MARKETING_ROUTES` catalog is larger (37 URLs after Strip-view and
 * short-term rental guides). Resubmit the sitemap in GSC after deploy so the
 * report catches up. Live fetch should return the current `<loc>` set, all `https://www…`,
 * matching `MARKETING_ROUTES`. IndexNow pings recent changes from this same list;
 * do not treat IndexNow as a second sitemap.
 */
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await getPublicSiteOrigin();
  assertMarketingRoutesHaveLastModified();

  return MARKETING_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrlForSitemap(base, path),
    lastModified: getSitemapLastModified(path),
    changeFrequency,
    priority,
  }));
}
