/**
 * Palms Place tower facts cited on /palms-place, /faq, and JSON-LD — building address
 * (not the team office). Office NAP lives in site-contact.ts and must match GBP.
 *
 * Geo: latitude/longitude from public MLS listing map pins for 4381 W Flamingo Rd
 * (e.g. Compass listing records). Re-verify if the pin drifts.
 */
export const palmsPlaceTower = {
  name: "Palms Place",
  streetAddress: "4381 W Flamingo Road",
  addressLocality: "Las Vegas",
  addressRegion: "NV",
  postalCode: "89103",
  addressCountry: "US",
  floors: 47,
  openedYear: 2008,
  /** Public listing map pin for the tower address. */
  latitude: 36.114111,
  longitude: -115.198705,
  /** Canonical building page on this site. */
  pagePath: "/palms-place",
  /**
   * Official resort hotel page (stays / suites) — cite for the tower entity, not as this site’s purpose.
   * This brokerage site is Palms Place condos for sale, not hotel reservations.
   */
  officialResortUrl: "https://www.palms.com/palms-place",
  /** Citable encyclopedia entity for GEO — do not copy hotel OTA copy. */
  wikipediaUrl: "https://en.wikipedia.org/wiki/Palms_Place",
} as const;

export function formatPalmsPlaceTowerAddressLine(): string {
  const t = palmsPlaceTower;
  return `${t.streetAddress}, ${t.addressLocality}, ${t.addressRegion} ${t.postalCode}`;
}

/** Shape for siteContact.palmsPlaceBuilding / schema emitters. */
export function getPalmsPlaceBuildingForSchema(): {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  latitude: number;
  longitude: number;
} {
  const t = palmsPlaceTower;
  return {
    streetAddress: t.streetAddress,
    addressLocality: t.addressLocality,
    addressRegion: t.addressRegion,
    postalCode: t.postalCode,
    latitude: t.latitude,
    longitude: t.longitude,
  };
}
