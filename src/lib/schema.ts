/**
 * JSON-LD builders for GEO/SEO. NAP fields (telephone, address) are added only when
 * present in siteContact—must match visible copy and GBP (see site-contact.ts).
 */
import { palmsPlaceTower } from "@/lib/content/palms-place-building";
import { formatOfficeAddressLine, siteContact } from "@/lib/site-contact";
import { getSiteUrl } from "@/lib/site-url";

const CONTEXT = "https://schema.org" as const;

export type JsonLdGraph = {
  "@context": typeof CONTEXT;
  "@graph": Record<string, unknown>[];
};

function id(siteUrl: string, fragment: string): string {
  return `${siteUrl.replace(/\/$/, "")}#${fragment}`;
}

function siteOrigin(siteUrl: string): string {
  return siteUrl.replace(/\/$/, "");
}

/** Stable FAQ graph id — homepage and FAQPage JSON-LD must match. */
export function getHomeFaqSchemaId(siteUrl: string): string {
  return `${siteOrigin(siteUrl)}#faq`;
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
    "@type": ["RealEstateAgent", "LocalBusiness"],
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

  listingAgent.knowsAbout = [
    { "@id": placePalmsId },
    { "@type": "Thing", name: "Palms Place condos for sale" },
    { "@type": "Thing", name: "Buying Palms Place condos" },
    { "@type": "Thing", name: "Palms Place unit types" },
    { "@type": "Thing", name: "Palms Place HOA and monthly costs" },
    { "@type": "Thing", name: "Las Vegas Strip high-rise condos" },
    { "@type": "Thing", name: "Furnished Palms Place resales" },
  ];

  const services = buildPalmsPlaceServices(siteUrl, placePalmsId, listingAgentId);
  listingAgent.makesOffer = [
    { "@id": id(siteUrl, "service-buy-palms-place") },
    { "@id": id(siteUrl, "service-sell-palms-place") },
  ];
  const searchTarget = `${siteOrigin(siteUrl)}/search?q={search_term_string}`;

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": webId,
    url: siteUrl,
    name: siteContact.gbpBusinessName,
    description: defaultListingAgentDescription(),
    inLanguage: "en-US",
    publisher: { "@id": listingAgentId },
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
    "@graph": [website, brokerage, listingAgent, palmsPlace, ...services],
  };
}

/** Route-level WebPage JSON-LD (marketing pages). */
export function getWebPageJsonLdForPath(
  pathname: string,
  page: { name: string; description: string },
  options?: { aboutPalmsPlace?: boolean; aboutListingAgent?: boolean },
): JsonLdGraph {
  const siteUrl = getSiteUrl();
  const webId = id(siteUrl, "website");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pageUrl = path === "/" ? `${siteOrigin(siteUrl)}/` : `${siteOrigin(siteUrl)}${path}`;
  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.name,
    description: page.description,
    isPartOf: { "@id": webId },
  };
  if (options?.aboutPalmsPlace) {
    webPage.about = { "@id": id(siteUrl, "place-palms-place") };
  }
  if (options?.aboutListingAgent) {
    webPage.about = { "@id": id(siteUrl, "dr-jan-duffy") };
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
    isPartOf: { "@id": webId },
    about: [
      { "@id": placePalmsId },
      { "@id": listingAgentId },
      { "@id": id(siteUrl, "service-buy-palms-place") },
      { "@id": id(siteUrl, "service-sell-palms-place") },
    ],
    mainEntity: { "@id": getHomeFaqSchemaId(siteUrl) },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#hero-heading", "#home-faq-heading"],
    },
    author: { "@id": listingAgentId },
  };

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
  const article: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      "@type": "Person",
      name: input.authorName,
      jobTitle: input.authorJobTitle,
    },
    publisher: {
      "@type": "Organization",
      name: siteContact.brokerage,
    },
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
    "@type": "Person",
    "@id": `${listingAgentId}-person`,
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

export type ItemListEntry = { name: string; description: string; path: string };

/**
 * ItemList JSON-LD for a hub page that lists other pages (e.g. field notes, guides).
 * Matches the visible list on the page — do not use for unordered/unrelated links.
 */
export function getItemListJsonLd(pathname: string, items: ItemListEntry[]): JsonLdGraph {
  const origin = siteOrigin(getSiteUrl());
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const pageUrl = `${origin}${path}`;
  const itemList: Record<string, unknown> = {
    "@type": "ItemList",
    "@id": `${pageUrl}#item-list`,
    itemListElement: items.map((item, index) => {
      const itemPath = item.path.startsWith("/") ? item.path : `/${item.path}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        url: `${origin}${itemPath}`,
        name: item.name,
      };
    }),
  };

  return {
    "@context": CONTEXT,
    "@graph": [itemList],
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
    datePosted: "2026-07-10",
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

  return {
    "@context": CONTEXT,
    "@graph": [realEstateListing],
  };
}
