/**
 * JSON-LD builders for GEO/SEO. NAP fields (telephone, address) are added only when
 * present in siteContact—must match visible copy and GBP (see site-contact.ts).
 */
import { featuredListing, getFeaturedListingDetailsUrl } from "@/lib/content/featured-listing";
import { getGalleryPhotoSrc, unit8322Gallery } from "@/lib/content/media-gallery";
import { palmsPlaceTower } from "@/lib/content/palms-place-building";
import { formatOfficeAddressLine, siteContact } from "@/lib/site-contact";
import { getSiteUrl } from "@/lib/site-url";
import { getSitemapLastModified } from "@/lib/sitemap-last-modified";
import { getDefaultOgImageAbsoluteUrl, OG_IMAGE_ALT, OG_IMAGE_SIZE } from "@/lib/social-images";

const CONTEXT = "https://schema.org" as const;

export type JsonLdGraph = {
  "@context": typeof CONTEXT;
  "@graph": Record<string, unknown>[];
};

/**
 * Site-level JSON-LD @id. Use the canonical homepage URL plus fragment so nodes
 * merge (`https://www.example.com/#org`, not `https://www.example.com#org`).
 */
function id(siteUrl: string, fragment: string): string {
  return `${siteUrl.replace(/\/$/, "")}/#${fragment}`;
}

function siteOrigin(siteUrl: string): string {
  return siteUrl.replace(/\/$/, "");
}

/** Public stable entity @id for llms.txt / docs — same string as JSON-LD. */
export function getJsonLdEntityId(fragment: string, siteUrl = getSiteUrl()): string {
  return id(siteUrl, fragment);
}

/** Stable FAQ graph id — homepage and FAQPage JSON-LD must match. */
export function getHomeFaqSchemaId(siteUrl: string): string {
  return id(siteUrl, "faq");
}

function applySitemapDateModified(webPage: Record<string, unknown>, pathname: string): void {
  const sitemapPath = pathname === "/" ? "" : pathname;
  try {
    webPage.dateModified = getSitemapLastModified(sitemapPath).toISOString().slice(0, 10);
  } catch {
    // Omit rather than invent a lastmod for unsitemap'd paths.
  }
}

/** E.164-style telephone for structured data when digits are US-based. */
function toTelE164(phone: string): string {
  const d = phone.replace(/\D/g, "");
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith("1")) return `+${d}`;
  return phone;
}

function googleMapsSearchUrlForAddress(addressLine: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`;
}

/** Absolute agent/team photo URL for JSON-LD — set NEXT_PUBLIC_AGENT_IMAGE_URL in production when ready. */
function getAgentImageUrlForSchema(): string | undefined {
  const env = process.env.NEXT_PUBLIC_AGENT_IMAGE_URL?.trim();
  if (env) return env;
  return undefined;
}

/** Office pin for JSON-LD — site-contact first, then NEXT_PUBLIC_OFFICE_LAT/LNG (must match GBP). */
function getOfficeLatitude(): number | undefined {
  if (siteContact.officeLatitude != null) return siteContact.officeLatitude;
  const e = process.env.NEXT_PUBLIC_OFFICE_LAT?.trim();
  if (e) {
    const n = Number.parseFloat(e);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

function getOfficeLongitude(): number | undefined {
  if (siteContact.officeLongitude != null) return siteContact.officeLongitude;
  const e = process.env.NEXT_PUBLIC_OFFICE_LNG?.trim();
  if (e) {
    const n = Number.parseFloat(e);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

function defaultListingAgentDescription(): string {
  return (
    siteContact.schemaAgentDescription ??
    `Licensed Nevada Realtor specializing in Palms Place and Las Vegas high-rise condos. 35+ years Las Vegas market experience. ${siteContact.brokerage}.`
  );
}

/** Optional profile URLs (Facebook, YouTube, GBP, etc.) — same as visible links only. */
function getSameAs(): string[] | undefined {
  const raw = process.env.NEXT_PUBLIC_SAME_AS_URLS?.trim();
  const fromEnv = raw
    ? raw
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.startsWith("http"))
    : [];
  const fromSite: string[] = [];
  const fb = siteContact.facebookUrl?.trim();
  if (fb?.startsWith("http")) fromSite.push(fb);
  const yt = siteContact.youtubeUrl?.trim();
  if (yt?.startsWith("http")) fromSite.push(yt);
  const gbp = siteContact.googleBusinessProfileUrl?.trim();
  if (gbp?.startsWith("http")) fromSite.push(gbp);
  const merged = [...fromSite, ...fromEnv];
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const u of merged) {
    if (!seen.has(u)) {
      seen.add(u);
      unique.push(u);
    }
  }
  return unique.length > 0 ? unique : undefined;
}

/** Shared brand ImageObject — WebSite/brokerage logo and WebPage primaryImageOfPage. */
function getBrandLogoImageObject(siteUrl: string): Record<string, unknown> {
  const url = getDefaultOgImageAbsoluteUrl(siteUrl);
  return {
    "@type": "ImageObject",
    "@id": id(siteUrl, "logo"),
    url,
    contentUrl: url,
    width: OG_IMAGE_SIZE.width,
    height: OG_IMAGE_SIZE.height,
    caption: OG_IMAGE_ALT,
    name: `${siteContact.gbpBusinessName} logo`,
  };
}

export type WebPageMainEntityKind = "listing-agent" | "palms-place" | "featured-listing" | "faq";

export type WebPageSchemaType =
  | "WebPage"
  | "CollectionPage"
  | "ContactPage"
  | "ProfilePage"
  | "SearchResultsPage";

function webPageSchemaTypes(pageType: WebPageSchemaType | undefined): string | string[] {
  const kind = pageType ?? "WebPage";
  switch (kind) {
    case "WebPage":
      return "WebPage";
    case "CollectionPage":
      return ["WebPage", "CollectionPage"];
    case "ContactPage":
      return ["WebPage", "ContactPage"];
    case "ProfilePage":
      return ["WebPage", "ProfilePage"];
    case "SearchResultsPage":
      return ["WebPage", "SearchResultsPage"];
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

function resolveWebPageMainEntityId(
  kind: WebPageMainEntityKind | undefined,
  siteUrl: string,
  pageUrl: string,
  explicit?: string,
): string | undefined {
  if (explicit) return explicit;
  if (!kind) return undefined;
  switch (kind) {
    case "listing-agent":
      return id(siteUrl, "dr-jan-duffy");
    case "palms-place":
      return id(siteUrl, "place-palms-place");
    case "featured-listing":
      return getFeaturedListingSchemaId(siteUrl);
    case "faq":
      return `${pageUrl}#faq`;
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

function applyOfficeNapAndHours(
  entity: Record<string, unknown>,
  brokerageId: string,
  postalAddress: Record<string, unknown> | undefined,
  hoursSpec: Record<string, unknown> | undefined,
  includePhone: boolean,
): void {
  entity.worksFor = { "@id": brokerageId };
  entity.areaServed = [
    { "@type": "City", name: "Las Vegas", containedInPlace: { "@type": "State", name: "Nevada" } },
    { "@type": "AdministrativeArea", name: "Clark County" },
  ];
  if (includePhone && siteContact.phone) {
    entity.telephone = siteContact.phone;
  }
  if (postalAddress) {
    entity.address = postalAddress;
  }
  if (hoursSpec) {
    entity.openingHoursSpecification = hoursSpec;
  }
}

/**
 * Canonical Palms Place tower entity for GEO.
 * Prefer ApartmentComplex (whole building) over Apartment (single unit).
 */
function buildPalmsPlaceEntity(siteUrl: string): Record<string, unknown> {
  const placePalmsId = id(siteUrl, "place-palms-place");
  const origin = siteOrigin(siteUrl);
  const b = siteContact.palmsPlaceBuilding;
  const towerUrl = `${origin}${palmsPlaceTower.pagePath}`;

  const base: Record<string, unknown> = {
    "@type": ["ApartmentComplex", "Place"],
    "@id": placePalmsId,
    name: palmsPlaceTower.name,
    alternateName: "Palms Place Las Vegas",
    url: towerUrl,
    description:
      "Strip-adjacent high-rise condominium tower at 4381 W Flamingo Road, Las Vegas, connected to Palms Casino Resort. Residences are individually owned—verify HOA rules, fees, and amenities in official disclosures.",
    containedInPlace: {
      "@type": "City",
      name: "Las Vegas",
      containedInPlace: { "@type": "State", name: "Nevada" },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Floors",
        value: String(palmsPlaceTower.floors),
      },
      {
        "@type": "PropertyValue",
        name: "Opened",
        value: String(palmsPlaceTower.openedYear),
      },
    ],
  };

  if (b) {
    base.address = {
      "@type": "PostalAddress",
      streetAddress: b.streetAddress,
      addressLocality: b.addressLocality,
      addressRegion: b.addressRegion,
      postalCode: b.postalCode,
      addressCountry: siteContact.addressCountry ?? "US",
    };
    base.geo = {
      "@type": "GeoCoordinates",
      latitude: b.latitude,
      longitude: b.longitude,
    };
    base.hasMap = googleMapsSearchUrlForAddress(
      `${b.streetAddress}, ${b.addressLocality}, ${b.addressRegion} ${b.postalCode}`,
    );
  }

  return base;
}

/** Hyperlocal realtor services tied to the Palms Place entity. */
function buildPalmsPlaceServices(
  siteUrl: string,
  placePalmsId: string,
  agentId: string,
): Record<string, unknown>[] {
  const origin = siteOrigin(siteUrl);
  return [
    {
      "@type": "Service",
      "@id": id(siteUrl, "service-buy-palms-place"),
      name: "Buy Palms Place Condos",
      serviceType: "Real estate buyer representation",
      description:
        "Buyer representation for Palms Place and comparable Las Vegas Strip-adjacent high-rise condos—tours, HOA due diligence, and offer strategy with Dr. Jan Duffy.",
      provider: { "@id": agentId },
      areaServed: { "@id": placePalmsId },
      url: `${origin}/buyers`,
    },
    {
      "@type": "Service",
      "@id": id(siteUrl, "service-sell-palms-place"),
      name: "Sell Palms Place Condos",
      serviceType: "Real estate listing services",
      description:
        "Listing strategy and marketing for Palms Place condo sellers—pricing, presentation, HOA packets, and exposure with Dr. Jan Duffy.",
      provider: { "@id": agentId },
      areaServed: { "@id": placePalmsId },
      url: `${origin}/sell`,
    },
  ];
}

/**
 * Core entities: WebSite, brokerage RealEstateOffice (+ LocalBusiness), one RealEstateAgent /
 * LocalBusiness profile (Dr. Jan Duffy — listing lead and buyers specialist), Place for Palms Place.
 */
export function getBaseJsonLd(): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const webId = id(siteUrl, "website");
  const brokerageId = id(siteUrl, "brokerage");
  const listingAgentId = id(siteUrl, "dr-jan-duffy");

  const brokerage: Record<string, unknown> = {
    "@type": ["RealEstateOffice", "LocalBusiness"],
    "@id": brokerageId,
    name: siteContact.brokerage,
    url: siteUrl,
    employee: [{ "@id": listingAgentId }],
  };

  const postalAddress =
    siteContact.streetAddress &&
    siteContact.addressLocality &&
    siteContact.addressRegion &&
    siteContact.postalCode
      ? {
          "@type": "PostalAddress",
          streetAddress: siteContact.streetAddress,
          addressLocality: siteContact.addressLocality,
          addressRegion: siteContact.addressRegion,
          postalCode: siteContact.postalCode,
          addressCountry: siteContact.addressCountry ?? "US",
        }
      : undefined;

  const hoursSpec =
    siteContact.officeHoursLine &&
    siteContact.officeHoursDays?.length &&
    siteContact.officeHoursOpens &&
    siteContact.officeHoursCloses
      ? {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [...siteContact.officeHoursDays],
          opens: siteContact.officeHoursOpens,
          closes: siteContact.officeHoursCloses,
        }
      : undefined;

  const specialHoursSpec =
    siteContact.officeSpecialHours && siteContact.officeSpecialHours.length > 0
      ? siteContact.officeSpecialHours.map((entry) => {
          const spec: Record<string, unknown> = {
            "@type": "OpeningHoursSpecification",
            validFrom: entry.validFrom,
            validThrough: entry.validThrough,
          };
          if (entry.opens && entry.closes) {
            spec.opens = entry.opens;
            spec.closes = entry.closes;
          }
          return spec;
        })
      : undefined;

  if (postalAddress) {
    brokerage.address = postalAddress;
  }
  if (hoursSpec) {
    brokerage.openingHoursSpecification = hoursSpec;
  }
  if (specialHoursSpec) {
    brokerage.specialOpeningHoursSpecification = specialHoursSpec;
  }
  if (siteContact.emailGeneral) {
    brokerage.email = siteContact.emailGeneral;
  }
  if (siteContact.phone) {
    brokerage.telephone = toTelE164(siteContact.phone);
  }

  const listingAgent: Record<string, unknown> = {
    "@type": ["RealEstateAgent", "LocalBusiness", "Person"],
    "@id": listingAgentId,
    // LocalBusiness.name must match Google Business Profile business name exactly.
    name: siteContact.gbpBusinessName,
    alternateName: [siteContact.agentName, siteContact.teamBrandName],
    description: defaultListingAgentDescription(),
    jobTitle: siteContact.agentTitle,
    url: siteUrl,
    identifier: siteContact.license,
    priceRange: siteContact.schemaPriceRange ?? "$$$$",
  };

  const officeLine = formatOfficeAddressLine();
  if (officeLine) {
    listingAgent.hasMap = googleMapsSearchUrlForAddress(officeLine);
  }

  const lat = getOfficeLatitude();
  const lng = getOfficeLongitude();
  if (lat != null && lng != null) {
    listingAgent.geo = {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lng,
    };
  }

  const agentImage = getAgentImageUrlForSchema();
  if (agentImage) {
    listingAgent.image = agentImage;
  }

  const sameAs = getSameAs();
  if (sameAs) {
    listingAgent.sameAs = sameAs;
  }

  applyOfficeNapAndHours(listingAgent, brokerageId, postalAddress, hoursSpec, true);
  if (specialHoursSpec) {
    listingAgent.specialOpeningHoursSpecification = specialHoursSpec;
  }
  if (siteContact.emailListings) {
    listingAgent.email = siteContact.emailListings;
  }
  if (siteContact.phone) {
    listingAgent.telephone = toTelE164(siteContact.phone);
  }

  const palmsPlace = buildPalmsPlaceEntity(siteUrl);
  const placePalmsId = id(siteUrl, "place-palms-place");

  listingAgent.areaServed = [
    { "@id": placePalmsId },
    {
      "@type": "Place",
      name: "Las Vegas Strip",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        addressCountry: "US",
      },
    },
    { "@type": "City", name: "Las Vegas", containedInPlace: { "@type": "State", name: "Nevada" } },
    { "@type": "AdministrativeArea", name: "Clark County" },
  ];

  const origin = siteOrigin(siteUrl);
  listingAgent.knowsAbout = [
    { "@id": placePalmsId },
    { "@type": "Thing", name: "Palms Place condos for sale", url: `${origin}/search` },
    { "@type": "Thing", name: "Buying Palms Place condos", url: `${origin}/guide/buying-palms-place` },
    { "@type": "Thing", name: "Selling Palms Place condos", url: `${origin}/guide/selling-palms-place` },
    { "@type": "Thing", name: "Palms Place unit types", url: `${origin}/guide/palms-place-unit-types` },
    { "@type": "Thing", name: "Palms Place HOA and monthly costs", url: `${origin}/guide/palms-place-hoa-and-monthly-costs` },
    { "@type": "Thing", name: "Las Vegas Strip high-rise condos", url: `${origin}/high-rises` },
    { "@type": "Thing", name: "Furnished Palms Place resales", url: `${origin}/guide/furnished-palms-place-condos` },
  ];

  const services = buildPalmsPlaceServices(siteUrl, placePalmsId, listingAgentId);
  listingAgent.makesOffer = [
    { "@id": id(siteUrl, "service-buy-palms-place") },
    { "@id": id(siteUrl, "service-sell-palms-place") },
  ];
  const logo = getBrandLogoImageObject(siteUrl);
  const logoRef = { "@id": id(siteUrl, "logo") };
  brokerage.logo = logoRef;
  listingAgent.logo = logoRef;
  if (!agentImage) {
    listingAgent.image = logoRef;
  }

  const searchTarget = `${origin}/search?q={search_term_string}`;

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": webId,
    url: siteUrl,
    name: siteContact.gbpBusinessName,
    description: defaultListingAgentDescription(),
    inLanguage: "en-US",
    publisher: { "@id": listingAgentId },
    logo: logoRef,
    about: [
      { "@id": placePalmsId },
      { "@id": listingAgentId },
      { "@id": brokerageId },
    ],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: searchTarget,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return {
    "@context": CONTEXT,
    "@graph": [logo, website, brokerage, listingAgent, palmsPlace, ...services],
  };
}

/** Route-level WebPage JSON-LD (marketing pages). */
export function getWebPageJsonLdForPath(
  pathname: string,
  page: { name: string; description: string },
  options?: {
    aboutPalmsPlace?: boolean;
    aboutListingAgent?: boolean;
    mainEntity?: WebPageMainEntityKind;
    mainEntityId?: string;
    speakableSelectors?: string[];
    pageType?: WebPageSchemaType;
    /** When the route emits FAQPage JSON-LD at `{url}#faq`. */
    hasFaq?: boolean;
    /** When the route emits ItemList JSON-LD at `{url}#itemlist`. */
    hasItemList?: boolean;
    /** When the route emits HowTo JSON-LD at `{url}#howto`. */
    hasHowTo?: boolean;
    /** Most marketing routes emit BreadcrumbList at `{url}#breadcrumb`. */
    hasBreadcrumb?: boolean;
    mentionsFeaturedListing?: boolean;
  },
): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const webId = id(siteUrl, "website");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pageUrl = path === "/" ? `${siteOrigin(siteUrl)}/` : `${siteOrigin(siteUrl)}${path}`;
  const placePalmsId = id(siteUrl, "place-palms-place");
  const listingAgentId = id(siteUrl, "dr-jan-duffy");
  const speakableSelectors = options?.speakableSelectors?.length
    ? options.speakableSelectors
    : ["h1"];
  const webPage: Record<string, unknown> = {
    "@type": webPageSchemaTypes(options?.pageType),
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.name,
    description: page.description,
    inLanguage: "en-US",
    isPartOf: { "@id": webId },
    // Always attach both tower and agent so hub pages are not orphaned from the entity graph.
    about: [{ "@id": placePalmsId }, { "@id": listingAgentId }],
    primaryImageOfPage: { "@id": id(siteUrl, "logo") },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: speakableSelectors,
    },
  };
  applySitemapDateModified(webPage, path);
  const mainEntityId = resolveWebPageMainEntityId(
    options?.mainEntity,
    siteUrl,
    pageUrl,
    options?.mainEntityId,
  );
  if (mainEntityId) {
    webPage.mainEntity = { "@id": mainEntityId };
  }
  if (options?.hasBreadcrumb !== false) {
    webPage.breadcrumb = { "@id": `${pageUrl}#breadcrumb` };
  }
  const parts: { "@id": string }[] = [];
  if (options?.hasFaq) {
    parts.push({ "@id": `${pageUrl}#faq` });
  }
  if (options?.hasItemList) {
    parts.push({ "@id": `${pageUrl}#itemlist` });
  }
  if (options?.hasHowTo) {
    parts.push({ "@id": `${pageUrl}#howto` });
  }
  if (parts.length === 1) {
    webPage.hasPart = parts[0];
  } else if (parts.length > 1) {
    webPage.hasPart = parts;
  }
  if (options?.mentionsFeaturedListing) {
    webPage.mentions = { "@id": getFeaturedListingSchemaId(siteUrl) };
  }
  return {
    "@context": CONTEXT,
    "@graph": [webPage],
  };
}

/** Homepage WebPage entity — emit on `/` only. Links to homepage FAQPage for AEO/GEO. */
export function getHomeWebPageJsonLd(): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const webId = id(siteUrl, "website");
  const placePalmsId = id(siteUrl, "place-palms-place");
  const listingAgentId = id(siteUrl, "dr-jan-duffy");
  const pageUrl = `${siteOrigin(siteUrl)}/`;
  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Palms Place Condos for Sale | 4381 W Flamingo | Dr. Jan Duffy",
    description:
      "Browse Palms Place condos for sale at 4381 W Flamingo Road near the Las Vegas Strip. Compare studio and one-bedroom high-rise listings, HOA details, and tours with Dr. Jan Duffy, Realtor.",
    inLanguage: "en-US",
    isPartOf: { "@id": webId },
    about: [
      { "@id": placePalmsId },
      { "@id": listingAgentId },
      { "@id": id(siteUrl, "service-buy-palms-place") },
      { "@id": id(siteUrl, "service-sell-palms-place") },
    ],
    mentions: { "@id": getFeaturedListingSchemaId(siteUrl) },
    mainEntity: { "@id": getHomeFaqSchemaId(siteUrl) },
    primaryImageOfPage: { "@id": id(siteUrl, "logo") },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#hero-heading", "#home-faq-heading"],
    },
    author: { "@id": listingAgentId },
  };
  applySitemapDateModified(webPage, "/");

  return {
    "@context": CONTEXT,
    "@graph": [webPage],
  };
}

export type FaqItem = { question: string; answer: string };

export type BreadcrumbItem = { name: string; path: string };

export type ArticleJsonLdInput = {
  pathname: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorJobTitle: string;
  aboutPalmsPlace?: boolean;
};

/** Article JSON-LD for first-party field guides (author must match visible byline). */
export function getArticleJsonLdForPath(input: ArticleJsonLdInput): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const path = input.pathname.startsWith("/") ? input.pathname : `/${input.pathname}`;
  const pageUrl = `${siteOrigin(siteUrl)}${path}`;
  const listingAgentId = id(siteUrl, "dr-jan-duffy");
  const brokerageId = id(siteUrl, "brokerage");
  const article: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      "@id": listingAgentId,
      "@type": ["Person", "RealEstateAgent"],
      name: input.authorName,
      jobTitle: input.authorJobTitle,
    },
    publisher: {
      "@id": brokerageId,
      "@type": "Organization",
      name: siteContact.brokerage,
      logo: { "@id": id(siteUrl, "logo") },
    },
    image: getDefaultOgImageAbsoluteUrl(siteUrl),
    inLanguage: "en-US",
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
  };
  if (input.aboutPalmsPlace) {
    article.about = { "@id": id(siteUrl, "place-palms-place") };
  }
  return {
    "@context": CONTEXT,
    "@graph": [article],
  };
}

/** Person node for /team — stable @id matching the sitewide agent entity. */
export function getTeamPersonsJsonLd(): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const origin = siteOrigin(siteUrl);
  const listingAgentId = id(siteUrl, "dr-jan-duffy");
  const placePalmsId = id(siteUrl, "place-palms-place");
  const brokerageId = id(siteUrl, "brokerage");

  const jan: Record<string, unknown> = {
    "@type": ["Person", "RealEstateAgent"],
    "@id": listingAgentId,
    name: siteContact.agentName,
    jobTitle: siteContact.agentTitle,
    url: `${origin}/team`,
    worksFor: { "@id": brokerageId },
    knowsAbout: [
      { "@id": placePalmsId },
      { "@type": "Thing", name: "Palms Place listings" },
      { "@type": "Thing", name: "Buying Palms Place condos" },
    ],
    identifier: siteContact.license,
  };
  if (siteContact.emailListings) jan.email = siteContact.emailListings;
  if (siteContact.phone) {
    jan.telephone = toTelE164(siteContact.phone);
  }

  return {
    "@context": CONTEXT,
    "@graph": [jan],
  };
}

/** BreadcrumbList for dedicated routes (absolute URLs, matches canonical host). */
export function getBreadcrumbListJsonLd(pathname: string, items: BreadcrumbItem[]): JsonLdGraph {
  const siteUrl = siteOrigin(getSiteUrl());
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pageUrl = `${siteUrl}${path}`;
  const breadcrumb: Record<string, unknown> = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => {
      const itemPath = item.path === "/" ? "/" : item.path.startsWith("/") ? item.path : `/${item.path}`;
      const itemUrl = itemPath === "/" ? `${siteUrl}/` : `${siteUrl}${itemPath}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    }),
  };

  return {
    "@context": CONTEXT,
    "@graph": [breadcrumb],
  };
}

/**
 * FAQPage for use on the homepage only — must mirror visible FAQ copy.
 * Google sunset FAQ rich results (May 2026); keep markup for AEO/entity understanding
 * when Q&A is visible on-page.
 */
export function getHomeFaqPageJsonLd(items: FaqItem[]): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const faqPage: Record<string, unknown> = {
    "@type": "FAQPage",
    "@id": getHomeFaqSchemaId(siteUrl),
    inLanguage: "en-US",
    isPartOf: { "@id": id(siteUrl, "website") },
    about: { "@id": id(siteUrl, "place-palms-place") },
    mainEntityOfPage: { "@id": `${siteOrigin(siteUrl)}/#webpage` },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return {
    "@context": CONTEXT,
    "@graph": [faqPage],
  };
}

/** FAQPage JSON-LD for a dedicated FAQ route (e.g. `/faq`). Must mirror visible copy on that URL. */
export function getFaqPageJsonLdForPath(pathname: string, items: FaqItem[]): JsonLdGraph {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pageUrl = `${siteUrl}${path}`;
  const faqPage: Record<string, unknown> = {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    inLanguage: "en-US",
    isPartOf: { "@id": id(siteUrl, "website") },
    about: { "@id": id(siteUrl, "place-palms-place") },
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return {
    "@context": CONTEXT,
    "@graph": [faqPage],
  };
}

export type ItemListJsonLdItem = {
  name: string;
  path: string;
  description?: string;
};

/** ItemList for visible hub catalogs (photo galleries, field notes, popular searches). */
export function getItemListJsonLd(
  pathname: string,
  list: { name: string; description?: string; items: ItemListJsonLdItem[] },
): JsonLdGraph {
  const origin = siteOrigin(getSiteUrl());
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pageUrl = `${origin}${path}`;
  const itemList: Record<string, unknown> = {
    "@type": "ItemList",
    "@id": `${pageUrl}#itemlist`,
    name: list.name,
    numberOfItems: list.items.length,
    itemListElement: list.items.map((item, index) => {
      const itemPath = item.path.startsWith("/") ? item.path : `/${item.path}`;
      const itemUrl = item.path.startsWith("http")
        ? item.path
        : itemPath === "/"
          ? `${origin}/`
          : `${origin}${itemPath}`;
      const element: Record<string, unknown> = {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: itemUrl,
      };
      if (item.description) {
        element.description = item.description;
      }
      return element;
    }),
  };
  if (list.description) {
    itemList.description = list.description;
  }

  return {
    "@context": CONTEXT,
    "@graph": [itemList],
  };
}

/** HowTo JSON-LD for visible numbered checklists (AEO). Must match on-page steps. */
export function getHowToJsonLdForPath(
  pathname: string,
  howTo: { name: string; description: string; steps: string[] },
): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pageUrl = `${siteOrigin(siteUrl)}${path}`;
  const howToNode: Record<string, unknown> = {
    "@type": "HowTo",
    "@id": `${pageUrl}#howto`,
    name: howTo.name,
    description: howTo.description,
    url: pageUrl,
    inLanguage: "en-US",
    about: { "@id": id(siteUrl, "place-palms-place") },
    author: { "@id": id(siteUrl, "dr-jan-duffy") },
    step: howTo.steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: text,
      text,
    })),
  };

  return {
    "@context": CONTEXT,
    "@graph": [howToNode],
  };
}

/**
 * ImageGallery + ImageObject JSON-LD for photo pages (GEO/AEO).
 * Absolute contentUrl/thumbnailUrl required for Google.
 */
export function getImageGalleryJsonLd(
  pathname: string,
  gallery: {
    name: string;
    description: string;
    photos: {
      title: string;
      description: string;
      src: string;
      width: number;
      height: number;
    }[];
  },
): JsonLdGraph {
  const origin = siteOrigin(getSiteUrl());
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pageUrl = `${origin}${path}`;

  const imageObjects = gallery.photos.map((photo, index) => {
    const contentUrl = photo.src.startsWith("http")
      ? photo.src
      : `${origin}${photo.src.startsWith("/") ? photo.src : `/${photo.src}`}`;
    return {
      "@type": "ImageObject",
      "@id": `${pageUrl}#image-${index + 1}`,
      contentUrl,
      url: contentUrl,
      name: photo.title,
      description: photo.description,
      width: photo.width,
      height: photo.height,
      creditText: siteContact.agentName,
      copyrightNotice: siteContact.brokerage,
    };
  });

  const imageGallery: Record<string, unknown> = {
    "@type": "ImageGallery",
    "@id": `${pageUrl}#gallery`,
    name: gallery.name,
    description: gallery.description,
    url: pageUrl,
    associatedMedia: imageObjects.map((img) => ({ "@id": img["@id"] })),
  };

  return {
    "@context": CONTEXT,
    "@graph": [imageGallery, ...imageObjects],
  };
}

/** Featured Palms Place unit as RealEstateListing + Offer (photos required). */
export function getFeaturedUnitListingJsonLd(
  pathname: string,
  listing: {
    name: string;
    description: string;
    price: number;
    mlsNumber: string;
    beds: number;
    baths: number;
    squareFeet: number;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    imageUrls: string[];
    detailsUrl: string;
    datePosted?: string;
    virtualTourUrl?: string;
  },
): JsonLdGraph {
  const origin = siteOrigin(getSiteUrl());
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pageUrl = `${origin}${path}`;
  const listingAgentId = id(getSiteUrl(), "dr-jan-duffy");
  const placePalmsId = id(getSiteUrl(), "place-palms-place");

  const images = listing.imageUrls.map((src) =>
    src.startsWith("http") ? src : `${origin}${src.startsWith("/") ? src : `/${src}`}`,
  );

  const realEstateListing: Record<string, unknown> = {
    "@type": "RealEstateListing",
    "@id": `${pageUrl}#listing`,
    name: listing.name,
    description: listing.description,
    url: pageUrl,
    datePosted: listing.datePosted ?? featuredListing.datePosted,
    image: images,
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: listing.detailsUrl,
      seller: { "@id": listingAgentId },
    },
    about: {
      "@type": "Apartment",
      name: listing.name,
      description: listing.description,
      numberOfRooms: listing.beds,
      numberOfBathroomsTotal: listing.baths,
      floorSize: {
        "@type": "QuantitativeValue",
        value: listing.squareFeet,
        unitCode: "FTK",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: listing.streetAddress,
        addressLocality: listing.addressLocality,
        addressRegion: listing.addressRegion,
        postalCode: listing.postalCode,
        addressCountry: "US",
      },
      containedInPlace: { "@id": placePalmsId },
      image: images,
    },
    identifier: listing.mlsNumber,
  };
  if (listing.virtualTourUrl) {
    realEstateListing.potentialAction = {
      "@type": "ViewAction",
      name: featuredListing.tourLabel,
      target: listing.virtualTourUrl,
    };
  }

  return {
    "@context": CONTEXT,
    "@graph": [realEstateListing],
  };
}

/** Stable @id for the current featured Palms Place unit (one listing entity sitewide). */
export function getFeaturedListingSchemaId(siteUrl = getSiteUrl()): string {
  return `${siteOrigin(siteUrl)}${unit8322Gallery.path}#listing`;
}

/** RealEstateListing graph for the current homepage spotlight — same @id as `/photos/unit-8322`. */
export function getCurrentFeaturedListingJsonLd(): JsonLdGraph {
  const imageUrls = unit8322Gallery.photos.map((photo) => getGalleryPhotoSrc(photo));
  return getFeaturedUnitListingJsonLd(unit8322Gallery.path, {
    name: `Palms Place #${featuredListing.unitNumber} — ${palmsPlaceTower.streetAddress}, Las Vegas`,
    description: featuredListing.overview,
    price: featuredListing.priceUsd,
    mlsNumber: featuredListing.mlsNumber,
    beds: featuredListing.bedsCount,
    baths: featuredListing.bathsCount,
    squareFeet: featuredListing.livingAreaSqFt,
    streetAddress: `${palmsPlaceTower.streetAddress} #${featuredListing.unitNumber}`,
    addressLocality: palmsPlaceTower.addressLocality,
    addressRegion: palmsPlaceTower.addressRegion,
    postalCode: palmsPlaceTower.postalCode,
    imageUrls,
    detailsUrl: getFeaturedListingDetailsUrl(),
    datePosted: featuredListing.datePosted,
    virtualTourUrl: featuredListing.virtualTourUrl,
  });
}
