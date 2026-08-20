import { palmsPlaceTower } from "@/lib/content/palms-place-building";

/**
 * Homepage “just listed” spotlight — update when the featured unit changes.
 * Facts below mirror the active RealScout / GLVAR listing (verify before offers).
 * Override with NEXT_PUBLIC_FEATURED_LISTING_URL in Vercel when the listing URL changes.
 */
export const featuredListing = {
  price: "$387,777",
  /** Numeric offer price for RealEstateListing JSON-LD — keep in sync with `price`. */
  priceUsd: 387777,
  status: "For Sale (Active)",
  mlsNumber: "2782527",
  unitNumber: "8322",
  /** GLVAR list date for this spotlight (schema `datePosted`). */
  datePosted: "2026-07-10",
  addressLine: `${palmsPlaceTower.streetAddress} #8322 • Palms Place • ${palmsPlaceTower.addressLocality}, ${palmsPlaceTower.addressRegion} ${palmsPlaceTower.postalCode}`,
  beds: "1 bed",
  baths: "1.5 baths",
  squareFeet: "1,220 SF",
  bedsCount: 1,
  bathsCount: 1.5,
  livingAreaSqFt: 1220,
  lot: "—",
  propertyType: "High Rise",
  entryLevel: "8th floor",
  hoaMonthly: "$1,638 / mo HOA",
  annualTax: "$4,612 taxes / yr",
  badges: [
    "STR Permitted",
    "Fully Furnished",
    "HOA Covers Utilities",
    "8th Floor Corner",
    "Strip Views",
  ] as const,
  overview:
    "Eighth-floor corner unit at Palms Place with two east-facing walls of floor-to-ceiling glass and Strip views. Short-term rentals permitted. 1,220 SF, fully furnished—new carpet, new dryer, Sub-Zero refrigerator, custom kitchenette, marble bath with jetted tub. HOA includes power, water, gas, cable, valet parking, and 24/7 concierge. Sky Tube connects to Palms Casino Resort.",
  ctaLabel: "View Full Details",
  tourLabel: "View Virtual / 3D Tour",
  // PropertyPanorama Instaview for MLS #2782527 (unit #8322).
  virtualTourUrl: "https://www.propertypanorama.com/instaview/las/2782527#tour",
  // RealScout slug uses "822" even though the unit is #8322 — do not "fix" the path.
  detailsUrl:
    "https://drjanduffy.realscout.com/homesearch/listings/p-4381-w-flamingo-road-822-las-vegas-89103-glvartrestle-932",
} as const;

export function getFeaturedListingDetailsUrl(): string {
  const url = process.env.NEXT_PUBLIC_FEATURED_LISTING_URL?.trim();
  if (url) return url;
  return featuredListing.detailsUrl;
}

export function isFeaturedListingExternalUrl(): boolean {
  const url = getFeaturedListingDetailsUrl();
  return url.startsWith("http://") || url.startsWith("https://");
}
