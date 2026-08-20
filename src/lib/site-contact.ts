/**
 * Single source of truth for agent/brokerage facts shown on pages and JSON-LD.
 * Add phone, full street address, and hours from Google Business Profile when verified for this domain.
 * Optional NAP fields must match visible on-page copy and GBP before use in schema.
 */

import { getPalmsPlaceBuildingForSchema } from "@/lib/content/palms-place-building";

/** Verified tower facts for schema.org `ApartmentComplex` — do not fabricate. */
export type PalmsPlaceBuilding = {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  latitude: number;
  longitude: number;
};

export type SiteContact = {
  /**
   * Google Business Profile business name — must match GBP exactly for LocalBusiness JSON-LD
   * and primary on-page brand (header/footer).
   */
  gbpBusinessName: string;
  /**
   * Public-facing team name for marketing (who clients work with—not the GBP listing name alone).
   */
  teamBrandName: string;
  /** Primary licensee — listing lead and Palms Place buyers specialist. */
  agentName: string;
  agentTitle: string;
  license: string;
  brokerage: string;
  /** GBP service area — keep aligned with profile “Service area”. */
  primaryServiceArea: string;
  /**
   * Buyers-specialist display name/title/license — same person as `agentName` (Dr. Jan Duffy).
   * Kept as fields so buyer-facing pages can emphasize the buyers role without a second agent.
   */
  buyerSpecialistName: string;
  buyerSpecialistTitle: string;
  buyerSpecialistLicense: string;
  /** Office phone — single NAP line for this site; must match GBP. */
  phone?: string;
  /** General office / agent inquiries — must match visible copy and GBP. */
  emailGeneral?: string;
  /** Listing-focused inbox (Dr. Jan). */
  emailListings?: string;
  /** Buyer inquiries (Dr. Jan). */
  emailBuyers?: string;
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
  /**
   * Visible office hours — must match Google Business Profile (pending/live).
   * Keep in sync with `officeHoursDays` / opens / closes used by JSON-LD.
   */
  officeHoursLine?: string;
  /**
   * Schema.org `dayOfWeek` values for regular hours (must match GBP + `officeHoursLine`).
   */
  officeHoursDays?: readonly string[];
  /** Regular open time (24h) for JSON-LD OpeningHoursSpecification. */
  officeHoursOpens?: string;
  /** Regular close time (24h) for JSON-LD OpeningHoursSpecification. */
  officeHoursCloses?: string;
  /** Visible special hours (e.g. holiday closures) — must match GBP special hours. */
  officeSpecialHoursLine?: string;
  /**
   * Schema.org specialOpeningHoursSpecification entries (closed holidays, etc.).
   * `opens`/`closes` omitted means closed that calendar day.
   */
  officeSpecialHours?: readonly {
    validFrom: string;
    validThrough: string;
    /** When set with opens/closes, those hours apply; when both omitted, closed. */
    opens?: string;
    closes?: string;
  }[];
  /** Optional override for JSON-LD `RealEstateAgent` / `LocalBusiness` description (must match GBP + on-site). */
  schemaAgentDescription?: string;
  /** Optional `priceRange` for LocalBusiness JSON-LD (e.g. "$$$$"). */
  schemaPriceRange?: string;
  /** Office latitude for JSON-LD `geo` — must match Google Maps / GBP pin for the office address. */
  officeLatitude?: number;
  /** Office longitude for JSON-LD `geo` — must match Google Maps / GBP pin. */
  officeLongitude?: number;
  /**
   * Palms Place tower address + coordinates for JSON-LD `ApartmentComplex`.
   * Sourced from palms-place-building.ts (public tower address + listing map pin).
   */
  palmsPlaceBuilding?: PalmsPlaceBuilding;
  /**
   * Google My Maps (or Maps) iframe embed URL for the contact page.
   * Example: https://www.google.com/maps/d/embed?mid=...
   */
  contactMapEmbedUrl?: string;
  /** Palms Place building/resort Facebook — cite on the tower Place entity, not as the listing agent’s profile. */
  facebookUrl?: string;
  /** Dr. Jan Duffy YouTube channel — footer/connect + JSON-LD `sameAs`. */
  youtubeUrl?: string;
  /**
   * Google Business Profile / Maps share URL — profile link and JSON-LD `sameAs`.
   * Prefer the stable share link from GBP (share.google) or a Maps place URL.
   */
  googleBusinessProfileUrl?: string;
  /**
   * Google “Write a review” short link (g.page/r/…/review).
   * Use for Leave-a-review CTAs — do not put in JSON-LD `sameAs`.
   */
  googleWriteReviewUrl?: string;
};

export const siteContact: SiteContact = {
  /** Must match Google Business Profile business name exactly. */
  gbpBusinessName: "Palms Place Condos",
  teamBrandName: "Dr. Jan Duffy Palms Place Team",
  agentName: "Dr. Jan Duffy",
  agentTitle: "Realtor, Listing Specialist, Team Leader & Palms Place Buyers Specialist",
  license: "S.0197614.LLC",
  brokerage: "Berkshire Hathaway HomeServices Nevada Properties",
  /** Must match visible copy, meta descriptions, and GBP — sole office line for this site. */
  phone: "(702) 827-4544",
  emailGeneral: "DrDuffy@PalmsPlaceCondos.com",
  emailListings: "DrDuffySells@PalmsPlaceCondos.com",
  /** Buyer inquiries go to Dr. Jan (same agent). */
  emailBuyers: "DrDuffy@PalmsPlaceCondos.com",
  /** GBP service area — exact profile wording. */
  primaryServiceArea: "Las Vegas Strip, NV, USA",
  buyerSpecialistName: "Dr. Jan Duffy",
  buyerSpecialistTitle: "Palms Place Buyers Specialist",
  buyerSpecialistLicense: "S.0197614.LLC",
  /** Office — must match Google Business Profile (“3651 S Lindell Rd suite d”). */
  streetAddress: "3651 S Lindell Rd suite d",
  addressLocality: "Las Vegas",
  addressRegion: "NV",
  postalCode: "89103",
  addressCountry: "US",
  /**
   * Matches GBP pending main hours (under review): Sunday–Saturday 9:00 AM–5:00 PM.
   * Live GBP may still show “closed” until Google publishes the pending edit.
   */
  officeHoursLine: "Sunday–Saturday, 9:00 AM–5:00 PM",
  officeHoursDays: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  officeHoursOpens: "09:00",
  officeHoursCloses: "17:00",
  /** Matches GBP special hours. */
  officeSpecialHoursLine: "Labor Day (September 7, 2026): closed",
  officeSpecialHours: [
    {
      validFrom: "2026-09-07",
      validThrough: "2026-09-07",
    },
  ],
  // Office pin from Google Maps place result for this address (matches embed).
  officeLatitude: 36.1233904,
  officeLongitude: -115.2171723,
  // contactMapEmbedUrl intentionally unset: Google My Maps `/maps/d/embed?mid=…`
  // URLs 404 with “404. That’s an error” when the map is unpublished. Do not set
  // NEXT_PUBLIC_CONTACT_MAP_EMBED_URL to a My Maps mid. Contact uses the stable
  // Google place embed (or Maps Embed API when NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY
  // is set). See src/lib/maps-embed.ts.
  facebookUrl: "https://www.facebook.com/palmsplace",
  youtubeUrl: "https://www.youtube.com/@DrDuffy",
  /** GBP share link for Palms Place Condos (Maps / knowledge panel). */
  googleBusinessProfileUrl: "https://share.google/6cQL7oQ9T88LIQfbC",
  /** GBP write-a-review link for Palms Place Condos. */
  googleWriteReviewUrl: "https://g.page/r/CQ8Pc6LgsOHoEBM/review",
  /** Tower entity for GEO — address + geo from palms-place-building.ts */
  palmsPlaceBuilding: getPalmsPlaceBuildingForSchema(),
  /**
   * Must match Google Business Profile “Description” exactly
   * (category: Real estate agent).
   */
  schemaAgentDescription:
    "Discover luxury high-rise condos for sale at Palms Place on the Las Vegas Strip. Browse available residences and find your perfect retreat in the heart of Las Vegas.",
};

/** Single-line office address for visible copy (footer, contact). */
export function formatOfficeAddressLine(): string {
  const c = siteContact;
  if (!c.streetAddress || !c.addressLocality || !c.addressRegion || !c.postalCode) {
    return "";
  }
  return `${c.streetAddress}, ${c.addressLocality}, ${c.addressRegion} ${c.postalCode}`;
}

/** Concise team line for meta descriptions (SEO / entity clarity). */
export function formatTeamPhrase(): string {
  const c = siteContact;
  return `${c.agentName}, ${c.agentTitle}`;
}

/** `tel:` href from the display phone (digits only). */
export function getTelHref(phone: string = siteContact.phone ?? ""): string | undefined {
  const digits = phone.replace(/\D/g, "");
  return digits ? `tel:${digits}` : undefined;
}

/** Regular hours plus optional special-hours clause for FAQ / one-line copy. */
export function formatOfficeHoursWithSpecial(): string {
  const regular = siteContact.officeHoursLine?.trim() ?? "";
  const special = siteContact.officeSpecialHoursLine?.trim();
  if (!regular) return special ?? "";
  if (!special) return regular;
  return `${regular}. ${special}`;
}

/** GBP description for visible copy and meta (empty string when unset). */
export function getGbpDescription(): string {
  return siteContact.schemaAgentDescription?.trim() ?? "";
}
