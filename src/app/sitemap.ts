import type { MetadataRoute } from "next";
import { MARKETING_ROUTES } from "@/lib/marketing-routes";
import { absoluteUrlForSitemap, getPublicSiteOrigin } from "@/lib/public-site-origin";
import {
  assertMarketingRoutesHaveLastModified,
  getSitemapLastModified,
} from "@/lib/sitemap-last-modified";

/** Per-request URLs so sitemap matches the host Google fetches (www vs deployment URL). */
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
