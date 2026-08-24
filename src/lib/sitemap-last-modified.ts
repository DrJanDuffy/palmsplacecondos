/**
 * Per-URL sitemap lastmod values for GEO / AI retrieval freshness.
 *
 * Prefer editorial `dateModified` from content modules (guides, field notes).
 * Other marketing routes use stable YYYY-MM-DD stamps — bump when page copy
 * meaningfully changes. Never stamp every URL with `new Date()` at request time.
 */

import { compareStripHighRisesGuideMeta } from "@/lib/content/compare-strip-high-rises-guide";
import { fieldNotes } from "@/lib/content/field-notes";
import { palmsPlaceAmenitiesGuideMeta } from "@/lib/content/palms-place-amenities-guide";
import { palmsPlaceBuyerGuideMeta } from "@/lib/content/palms-place-buyer-guide";
import { palmsPlaceCondosVsHotelGuideMeta } from "@/lib/content/palms-place-condos-vs-hotel-guide";
import { palmsPlaceFurnishedGuideMeta } from "@/lib/content/palms-place-furnished-guide";
import { palmsPlaceHoaGuideMeta } from "@/lib/content/palms-place-hoa-guide";
import { palmsPlaceSellerGuideMeta } from "@/lib/content/palms-place-seller-guide";
import { palmsPlaceShortTermRentalGuideMeta } from "@/lib/content/palms-place-short-term-rental-guide";
import { palmsPlaceStripViewGuideMeta } from "@/lib/content/palms-place-strip-view-guide";
import { palmsPlaceUnitTypesGuideMeta } from "@/lib/content/palms-place-unit-types-guide";
import { MARKETING_ROUTES } from "@/lib/marketing-routes";

/** YYYY-MM-DD (UTC calendar day) for sitemap lastmod. */
type IsoDate = `${number}-${number}-${number}`;

function maxIsoDate(dates: readonly string[]): string {
  if (dates.length === 0) {
    throw new Error("maxIsoDate requires at least one date");
  }
  return dates.reduce((latest, next) => (next > latest ? next : latest));
}

function editorialContentLastModified(): Record<string, string> {
  const byPath: Record<string, string> = {
    "/guide/buying-palms-place": palmsPlaceBuyerGuideMeta.dateModified,
    "/guide/selling-palms-place": palmsPlaceSellerGuideMeta.dateModified,
    "/guide/palms-place-unit-types": palmsPlaceUnitTypesGuideMeta.dateModified,
    "/guide/compare-strip-high-rises": compareStripHighRisesGuideMeta.dateModified,
    "/guide/palms-place-hoa-and-monthly-costs": palmsPlaceHoaGuideMeta.dateModified,
    "/guide/furnished-palms-place-condos": palmsPlaceFurnishedGuideMeta.dateModified,
    "/guide/palms-place-amenities-and-resort-access":
      palmsPlaceAmenitiesGuideMeta.dateModified,
    "/guide/palms-place-condos-vs-hotel": palmsPlaceCondosVsHotelGuideMeta.dateModified,
    "/guide/palms-place-strip-view-condos": palmsPlaceStripViewGuideMeta.dateModified,
    "/guide/palms-place-short-term-rentals": palmsPlaceShortTermRentalGuideMeta.dateModified,
    "/insights": maxIsoDate(fieldNotes.map((note) => note.dateModified)),
  };

  for (const note of fieldNotes) {
    byPath[`/insights/${note.slug}`] = note.dateModified;
  }

  return byPath;
}

/**
 * Stable lastmod for routes without editorial dateModified.
 * Seeded from source git history; bump when that route’s copy or NAP changes.
 */
const MARKETING_PAGE_LAST_MODIFIED: Record<string, IsoDate> = {
  "": "2026-08-24",
  "/palms-place": "2026-08-20",
  "/buyers": "2026-08-20",
  "/sellers": "2026-08-20",
  "/area/palms-place-las-vegas": "2026-08-20",
  "/team": "2026-08-20",
  "/homes": "2026-08-20",
  "/condos": "2026-08-20",
  "/search": "2026-08-20",
  "/sell": "2026-08-20",
  "/contact": "2026-08-24",
  "/maps": "2026-08-24",
  "/photo-use": "2026-08-24",
  "/connect": "2026-08-20",
  "/faq": "2026-08-21",
  "/communities": "2026-08-20",
  "/featured": "2026-08-24",
  "/photos": "2026-08-24",
  "/photos/unit-8322": "2026-08-24",
  "/video": "2026-08-24",
  "/high-rises": "2026-08-20",
  "/luxury-homes": "2026-08-20",
  "/popular-searches": "2026-08-20",
  "/under-500k": "2026-08-20",
  "/buyers/calculators": "2026-08-20",
};

function toUtcDate(isoDayOrTimestamp: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoDayOrTimestamp)) {
    return new Date(`${isoDayOrTimestamp}T12:00:00.000Z`);
  }
  return new Date(isoDayOrTimestamp);
}

/** Resolve honest lastModified for a marketing path (`""` = home). */
export function getSitemapLastModified(path: string): Date {
  const editorial = editorialContentLastModified()[path];
  if (editorial) {
    return toUtcDate(editorial);
  }

  const page = MARKETING_PAGE_LAST_MODIFIED[path];
  if (page) {
    return toUtcDate(page);
  }

  throw new Error(
    `Missing sitemap lastModified for path "${path || "/"}". Add editorial dateModified or MARKETING_PAGE_LAST_MODIFIED.`,
  );
}

/** Ensures every MARKETING_ROUTES entry has a resolvable lastmod (call from sitemap). */
export function assertMarketingRoutesHaveLastModified(): void {
  for (const route of MARKETING_ROUTES) {
    getSitemapLastModified(route.path);
  }
}
