import { getCalendlyUrl } from "@/lib/calendly";
import {
  formatPalmsPlaceTowerAddressLine,
  palmsPlaceTower,
} from "@/lib/content/palms-place-building";
import { MARKETING_ROUTES, marketingPathHref } from "@/lib/marketing-routes";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { formatOfficeAddressLine, siteContact } from "@/lib/site-contact";

/**
 * Contextual internal and GEO citation links — descriptive anchors, not “click here.”
 * Used by related-pages, section see-also, breadcrumbs, and WebPage relatedLink schema.
 */
export type RelatedLink = {
  href: string;
  label: string;
  description?: string;
  external?: boolean;
};

export type BreadcrumbTrailItem = {
  name: string;
  path: string;
};

/** Official Nevada Real Estate Division license lookup (no login). */
export const NEVADA_LICENSE_LOOKUP_URL =
  "https://red.prod.secure.nv.gov/Lookup/LicenseLookup.aspx";

const RELATED_LIMIT = 12;
const SIGNIFICANT_LIMIT = 4;
const SECTION_LINK_COUNT = 2;

type LinkCopy = {
  label: string;
  description: string;
};

/** Canonical GEO/AEO anchors for each marketing path. */
const CATALOG: Record<string, LinkCopy> = {
  "/": {
    label: "Palms Place condos for sale in Las Vegas",
    description: "4381 W Flamingo Road high-rise overview",
  },
  "/palms-place": {
    label: "Palms Place Las Vegas building guide",
    description: "Tower address, amenities, buying and selling",
  },
  "/buyers": {
    label: "Buy a Palms Place condo in Las Vegas",
    description: "Tours, HOA due diligence, and search",
  },
  "/sellers": {
    label: "Sell a Palms Place condo in Las Vegas",
    description: "Listing prep and valuation conversation",
  },
  "/guide/buying-palms-place": {
    label: "Buying a Palms Place condo — field guide",
    description: "Tour checklist and HOA packets",
  },
  "/guide/selling-palms-place": {
    label: "Selling a Palms Place condo — field guide",
    description: "HOA packets and furnished resale prep",
  },
  "/guide/palms-place-unit-types": {
    label: "Palms Place studio vs one-bedroom floor plans",
    description: "Unit-type decision framework",
  },
  "/guide/compare-strip-high-rises": {
    label: "Palms Place vs Strip high-rises",
    description: "Compare towers before you tour",
  },
  "/guide/palms-place-hoa-and-monthly-costs": {
    label: "Palms Place HOA fees and monthly costs",
    description: "Assessments, reserves, and true carry",
  },
  "/guide/furnished-palms-place-condos": {
    label: "Furnished Palms Place condos for sale",
    description: "What conveys and rental-rule checks",
  },
  "/guide/palms-place-amenities-and-resort-access": {
    label: "Palms Place amenities and resort access",
    description: "Owner vs hotel guest verification",
  },
  "/area/palms-place-las-vegas": {
    label: "Palms Place location — West Flamingo and Paradise",
    description: "Map, directions, and Strip context",
  },
  "/insights": {
    label: "Palms Place field notes",
    description: "First-hand tour and listing insights",
  },
  "/insights/palms-place-tour-red-flags": {
    label: "Palms Place tour red flags (field note)",
    description: "Sound, parking, and furnished mismatches",
  },
  "/insights/why-we-request-hoa-packets-early": {
    label: "Why request Palms Place HOA packets early",
    description: "Rental caps and assessment timing",
  },
  "/insights/furnished-resale-inventory-surprises": {
    label: "Furnished Palms Place resale surprises",
    description: "Inventory and conveyance field note",
  },
  "/team": {
    label: "Dr. Jan Duffy — Palms Place listing team",
    description: "Realtor, listing lead, and buyers specialist",
  },
  "/homes": {
    label: "Las Vegas homes for sale",
    description: "Compare houses with Palms Place condos",
  },
  "/condos": {
    label: "Las Vegas Strip high-rise condos for sale",
    description: "Palms Place and nearby towers",
  },
  "/search": {
    label: "Search Palms Place and Las Vegas listings",
    description: "On-site listing search hub",
  },
  "/sell": {
    label: "Sell your Palms Place condo",
    description: "Listing specialist and marketing path",
  },
  "/contact": {
    label: "Contact Palms Place Condos — Las Vegas office",
    description: "Phone, map, hours, and NAP",
  },
  "/connect": {
    label: "Connect with the Palms Place team",
    description: "Social, office, and follow-up",
  },
  "/faq": {
    label: "Palms Place Las Vegas FAQ",
    description: "Location, condos, HOA, and ownership",
  },
  "/communities": {
    label: "Las Vegas condo communities near Palms Place",
    description: "Area comparison for high-rise buyers",
  },
  "/featured": {
    label: "Featured Palms Place listing",
    description: "Spotlight inventory and photo paths",
  },
  "/photos": {
    label: "Palms Place condo photo galleries",
    description: "Listing photography hub",
  },
  "/photos/unit-8322": {
    label: "Palms Place #8322 photos — Strip views",
    description: "Living room and balcony gallery",
  },
  "/high-rises": {
    label: "Las Vegas high-rise condos",
    description: "Towers buyers cross-shop with Palms Place",
  },
  "/luxury-homes": {
    label: "Las Vegas luxury homes vs Palms Place",
    description: "Estates compared with Strip high-rise living",
  },
  "/popular-searches": {
    label: "Popular Palms Place buyer searches",
    description: "Shortcuts by price, type, and tower",
  },
  "/under-500k": {
    label: "Las Vegas condos under $500K",
    description: "Price-band search guidance",
  },
  "/buyers/calculators": {
    label: "Palms Place buyer calculators",
    description: "Prepare questions; confirm rates with a lender",
  },
};

/** Topic-cluster destinations (internal paths). Equity rotation fills the rest. */
const CLUSTER_HREFS: Record<string, readonly string[]> = {
  "/": [
    "/palms-place",
    "/condos",
    "/search",
    "/photos/unit-8322",
    "/guide/buying-palms-place",
    "/area/palms-place-las-vegas",
    "/faq",
    "/contact",
    "/sellers",
    "/insights",
    "/guide/palms-place-hoa-and-monthly-costs",
    "/photos",
  ],
  "/palms-place": [
    "/area/palms-place-las-vegas",
    "/guide/palms-place-amenities-and-resort-access",
    "/guide/palms-place-hoa-and-monthly-costs",
    "/guide/palms-place-unit-types",
    "/condos",
    "/photos",
    "/faq",
    "/buyers",
    "/sellers",
    "/contact",
    "/search",
    "/",
  ],
  "/buyers": [
    "/guide/buying-palms-place",
    "/guide/palms-place-unit-types",
    "/guide/palms-place-hoa-and-monthly-costs",
    "/buyers/calculators",
    "/search",
    "/condos",
    "/photos",
    "/faq",
    "/contact",
    "/insights",
    "/area/palms-place-las-vegas",
    "/team",
  ],
  "/sellers": [
    "/guide/selling-palms-place",
    "/sell",
    "/guide/furnished-palms-place-condos",
    "/guide/palms-place-hoa-and-monthly-costs",
    "/photos",
    "/featured",
    "/contact",
    "/team",
    "/faq",
    "/insights",
    "/palms-place",
    "/",
  ],
  "/sell": [
    "/sellers",
    "/guide/selling-palms-place",
    "/contact",
    "/photos/unit-8322",
    "/guide/furnished-palms-place-condos",
    "/team",
    "/faq",
    "/featured",
    "/palms-place",
    "/",
  ],
  "/search": [
    "/condos",
    "/popular-searches",
    "/featured",
    "/photos",
    "/under-500k",
    "/high-rises",
    "/buyers",
    "/faq",
    "/contact",
    "/palms-place",
    "/",
  ],
  "/condos": [
    "/palms-place",
    "/high-rises",
    "/search",
    "/guide/palms-place-unit-types",
    "/photos",
    "/guide/compare-strip-high-rises",
    "/area/palms-place-las-vegas",
    "/buyers",
    "/faq",
    "/under-500k",
    "/",
  ],
  "/contact": [
    "/connect",
    "/team",
    "/palms-place",
    "/area/palms-place-las-vegas",
    "/search",
    "/faq",
    "/buyers",
    "/sellers",
    "/",
  ],
  "/faq": [
    "/palms-place",
    "/area/palms-place-las-vegas",
    "/guide/palms-place-hoa-and-monthly-costs",
    "/guide/palms-place-amenities-and-resort-access",
    "/buyers",
    "/contact",
    "/search",
    "/insights",
    "/",
  ],
  "/area/palms-place-las-vegas": [
    "/palms-place",
    "/contact",
    "/condos",
    "/communities",
    "/guide/compare-strip-high-rises",
    "/faq",
    "/search",
    "/",
  ],
  "/insights": [
    "/insights/palms-place-tour-red-flags",
    "/insights/why-we-request-hoa-packets-early",
    "/insights/furnished-resale-inventory-surprises",
    "/guide/buying-palms-place",
    "/palms-place",
    "/faq",
    "/contact",
    "/",
  ],
  "/photos": [
    "/photos/unit-8322",
    "/featured",
    "/palms-place",
    "/search",
    "/condos",
    "/contact",
    "/",
  ],
  "/photos/unit-8322": [
    "/photos",
    "/featured",
    "/search",
    "/guide/furnished-palms-place-condos",
    "/contact",
    "/palms-place",
    "/",
  ],
  "/featured": [
    "/photos/unit-8322",
    "/photos",
    "/search",
    "/condos",
    "/contact",
    "/palms-place",
    "/",
  ],
  "/team": [
    "/contact",
    "/connect",
    "/buyers",
    "/sellers",
    "/palms-place",
    "/faq",
    "/",
  ],
  "/guide/buying-palms-place": [
    "/buyers",
    "/guide/palms-place-hoa-and-monthly-costs",
    "/guide/palms-place-unit-types",
    "/insights/palms-place-tour-red-flags",
    "/search",
    "/contact",
    "/faq",
    "/palms-place",
  ],
  "/guide/selling-palms-place": [
    "/sellers",
    "/sell",
    "/guide/furnished-palms-place-condos",
    "/insights/why-we-request-hoa-packets-early",
    "/photos",
    "/contact",
    "/palms-place",
  ],
  "/guide/palms-place-hoa-and-monthly-costs": [
    "/insights/why-we-request-hoa-packets-early",
    "/guide/buying-palms-place",
    "/guide/palms-place-amenities-and-resort-access",
    "/faq",
    "/buyers",
    "/palms-place",
    "/contact",
  ],
  "/guide/furnished-palms-place-condos": [
    "/insights/furnished-resale-inventory-surprises",
    "/photos/unit-8322",
    "/guide/selling-palms-place",
    "/search",
    "/palms-place",
    "/faq",
  ],
  "/guide/palms-place-amenities-and-resort-access": [
    "/palms-place",
    "/guide/palms-place-hoa-and-monthly-costs",
    "/area/palms-place-las-vegas",
    "/faq",
    "/condos",
    "/",
  ],
  "/guide/palms-place-unit-types": [
    "/condos",
    "/guide/buying-palms-place",
    "/photos",
    "/search",
    "/palms-place",
    "/buyers",
  ],
  "/guide/compare-strip-high-rises": [
    "/high-rises",
    "/palms-place",
    "/condos",
    "/area/palms-place-las-vegas",
    "/communities",
    "/buyers",
  ],
};

const DEFAULT_CLUSTER: readonly string[] = [
  "/palms-place",
  "/condos",
  "/search",
  "/faq",
  "/contact",
  "/buyers",
  "/sellers",
  "/area/palms-place-las-vegas",
  "/photos",
  "/",
];

function normalizePath(pathname: string): string {
  if (pathname === "" || pathname === "/") return "/";
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withSlash.length > 1 && withSlash.endsWith("/") ? withSlash.slice(0, -1) : withSlash;
}

function stableHash(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function catalogLink(path: string): RelatedLink | null {
  const href = marketingPathHref(path === "/" ? "" : path);
  const copy = CATALOG[path] ?? CATALOG[href === "/" ? "/" : href];
  if (!copy) return null;
  return { href, label: copy.label, description: copy.description };
}

function allInternalHrefs(): string[] {
  return MARKETING_ROUTES.map((route) => marketingPathHref(route.path));
}

function equityHrefs(pathname: string, exclude: Set<string>, needed: number): string[] {
  const pool = allInternalHrefs().filter((href) => !exclude.has(href));
  if (pool.length === 0 || needed <= 0) return [];
  const start = stableHash(pathname) % pool.length;
  const picked: string[] = [];
  for (let i = 0; i < pool.length && picked.length < needed; i += 1) {
    picked.push(pool[(start + i) % pool.length]);
  }
  return picked;
}

function toRelatedLinks(hrefs: string[]): RelatedLink[] {
  const out: RelatedLink[] = [];
  const seen = new Set<string>();
  for (const href of hrefs) {
    if (seen.has(href)) continue;
    const link = catalogLink(href);
    if (!link) continue;
    seen.add(href);
    out.push(link);
  }
  return out;
}

/** Cluster + rotated equity so every marketing URL receives inbound internal links. */
export function relatedLinksForPath(pathname: string): RelatedLink[] {
  const normalized = normalizePath(pathname);
  const cluster = CLUSTER_HREFS[normalized] ?? DEFAULT_CLUSTER;
  const exclude = new Set<string>([normalized]);
  const thematic = cluster.filter((href) => href !== normalized);
  const picked = [...thematic];
  const need = RELATED_LIMIT - picked.length;
  if (need > 0) {
    picked.push(...equityHrefs(normalized, new Set([...exclude, ...picked]), need));
  }
  return toRelatedLinks(picked).slice(0, RELATED_LIMIT);
}

/** Highest-priority internal destinations for WebPage `significantLink`. */
export function significantLinksForPath(pathname: string): RelatedLink[] {
  return relatedLinksForPath(pathname).slice(0, SIGNIFICANT_LIMIT);
}

/** Two unique see-also links per section so H2 blocks are internally connected. */
export function sectionLinksForPath(pathname: string, sectionId: string): RelatedLink[] {
  const related = relatedLinksForPath(pathname);
  if (related.length === 0) return [];
  const start = stableHash(`${normalizePath(pathname)}#${sectionId}`) % related.length;
  const links: RelatedLink[] = [];
  for (let i = 0; i < related.length && links.length < SECTION_LINK_COUNT; i += 1) {
    links.push(related[(start + i) % related.length]);
  }
  return links;
}

function mapsSearchHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * First-party GEO citations (GBP, maps, license lookup, profiles).
 * These are outbound links — they do not mint GSC “external links” (backlinks).
 */
export function geoCitationLinks(): RelatedLink[] {
  const links: RelatedLink[] = [];
  const gbp = siteContact.googleBusinessProfileUrl?.trim();
  if (gbp) {
    links.push({
      href: gbp,
      label: "Palms Place Condos Google Business Profile",
      description: "Hours, NAP, and map pin matching this site",
      external: true,
    });
  }

  const towerLine = formatPalmsPlaceTowerAddressLine();
  links.push({
    href: mapsSearchHref(towerLine),
    label: `Map Palms Place at ${palmsPlaceTower.streetAddress}`,
    description: `${towerLine} — tower, not the sales office`,
    external: true,
  });

  const officeLine = formatOfficeAddressLine();
  if (officeLine) {
    links.push({
      href: mapsSearchHref(officeLine),
      label: "Map the Palms Place Condos sales office",
      description: officeLine,
      external: true,
    });
  }

  links.push({
    href: NEVADA_LICENSE_LOOKUP_URL,
    label: `Verify Nevada license ${siteContact.license}`,
    description: "Nevada Real Estate Division license lookup",
    external: true,
  });

  const facebook = siteContact.facebookUrl?.trim();
  if (facebook) {
    links.push({
      href: facebook,
      label: "Palms Place on Facebook",
      description: "Official Palms Place Facebook page",
      external: true,
    });
  }

  const youtube = siteContact.youtubeUrl?.trim();
  if (youtube) {
    links.push({
      href: youtube,
      label: "Dr. Jan Duffy on YouTube",
      description: "Palms Place video walkthroughs and market notes",
      external: true,
    });
  }

  links.push({
    href: "https://www.palms.com/stay/",
    label: "Palms Casino Resort stays",
    description: "Hotel programs are separate from condo HOA rights",
    external: true,
  });

  links.push({
    href: getCalendlyUrl(),
    label: "Schedule a Palms Place appointment",
    description: "Calendly booking with Dr. Jan Duffy",
    external: true,
  });

  links.push({
    href: getRealScoutSharedSearchUrl(),
    label: "Curated RealScout home search",
    description: "Live Palms Place and Las Vegas listings",
    external: true,
  });

  return links;
}

/** Visible breadcrumb trail matching JSON-LD (Home omitted as current on `/`). */
export function breadcrumbTrailForPath(pathname: string): BreadcrumbTrailItem[] {
  const normalized = normalizePath(pathname);
  if (normalized === "/") {
    return [{ name: "Palms Place condos for sale", path: "/" }];
  }

  const current = CATALOG[normalized];
  const currentName = current?.label ?? normalized.replace(/^\//, "").replace(/-/g, " ");

  const trail: BreadcrumbTrailItem[] = [{ name: "Palms Place condos for sale", path: "/" }];

  if (normalized.startsWith("/guide/")) {
    trail.push({ name: "Palms Place building guide", path: "/palms-place" });
  } else if (normalized.startsWith("/insights/")) {
    trail.push({ name: "Palms Place field notes", path: "/insights" });
  } else if (normalized === "/photos/unit-8322") {
    trail.push({ name: "Palms Place condo photo galleries", path: "/photos" });
  } else if (normalized === "/buyers/calculators") {
    trail.push({ name: "Buy a Palms Place condo in Las Vegas", path: "/buyers" });
  } else if (normalized === "/area/palms-place-las-vegas") {
    trail.push({ name: "Palms Place Las Vegas building guide", path: "/palms-place" });
  } else if (normalized === "/sell") {
    trail.push({ name: "Sell a Palms Place condo in Las Vegas", path: "/sellers" });
  }

  trail.push({ name: currentName, path: normalized });
  return trail;
}
