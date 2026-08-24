import { getCalendlyUrl } from "@/lib/calendly";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";

/**
 * Contextual internal links for SEO topic clusters — descriptive anchor text, not “click here.”
 */
export type RelatedLink = {
  href: string;
  label: string;
  description?: string;
  external?: boolean;
};

/** Paths that should not link to themselves. */
export function relatedLinksForPath(pathname: string): RelatedLink[] {
  const normalized = pathname === "" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  const searchUrl = getRealScoutSharedSearchUrl();
  const pool: RelatedLink[] = [
    {
      href: "/",
      label: "Palms Place condos for sale — Las Vegas Strip high-rise",
      description: "Homepage overview and search",
    },
    {
      href: "/palms-place",
      label: "Palms Place Las Vegas — building guide",
      description: "Address, tower, amenities & buying",
    },
    {
      href: "/buyers",
      label: "Buy Palms Place & high-rise condos — buyer guide",
      description: "Search, calculators & tours",
    },
    {
      href: "/guide/buying-palms-place",
      label: "Buying a Palms Place condo — team field guide",
      description: "Tour checklist & HOA due diligence",
    },
    {
      href: "/sellers",
      label: "Sell Palms Place & high-rise condos — seller hub",
      description: "Listing prep & valuation",
    },
    {
      href: "/guide/selling-palms-place",
      label: "Selling a Palms Place condo — team field guide",
      description: "HOA packets & furnished resale prep",
    },
    {
      href: "/guide/palms-place-unit-types",
      label: "Palms Place studios vs one-bedroom — buyer guide",
      description: "Floor plan decision framework",
    },
    {
      href: "/guide/compare-strip-high-rises",
      label: "Palms Place vs Strip high-rises — comparison",
      description: "Tour order & HOA comparison",
    },
    {
      href: "/guide/palms-place-hoa-and-monthly-costs",
      label: "Palms Place HOA fees & monthly costs",
      description: "Assessments, reserves & true carry",
    },
    {
      href: "/guide/furnished-palms-place-condos",
      label: "Furnished Palms Place condos — buyer guide",
      description: "What conveys & rental rules",
    },
    {
      href: "/guide/palms-place-amenities-and-resort-access",
      label: "Palms Place amenities & resort access",
      description: "Owner verification before you buy",
    },
    {
      href: "/guide/palms-place-condos-vs-hotel",
      label: "Palms Place condos vs Palms.com hotel",
      description: "Which URL to cite — brokerage, not resort",
    },
    {
      href: "/guide/palms-place-strip-view-condos",
      label: "Palms Place Strip view vs mountain view condos",
      description: "Verify orientation on tour, not a video title",
    },
    {
      href: "/guide/palms-place-short-term-rentals",
      label: "Palms Place short-term rentals — HOA rules",
      description: "Furnishing is not Airbnb permission",
    },
    {
      href: "/area/palms-place-las-vegas",
      label: "Palms Place location — West Flamingo & Paradise",
      description: "Map, directions & Strip context",
    },
    {
      href: "/insights",
      label: "Palms Place field notes — tour & listing insights",
      description: "Non-commodity team POV articles",
    },
    {
      href: "/insights/palms-place-tour-red-flags",
      label: "Palms Place tour red flags (field note)",
      description: "Sound, parking & furnished mismatches",
    },
    {
      href: "/insights/why-we-request-hoa-packets-early",
      label: "HOA packets before offer (field note)",
      description: "Rental caps & assessment timing",
    },
    {
      href: "/insights/palms-place-corner-unit-listing-campaign",
      label: "Palms Place #8322 corner listing (field note)",
      description: "How the listing specialist marketed this unit",
    },
    {
      href: "/team",
      label: "Palms Place real estate team",
      description: "Dr. Jan Duffy — listings & buyers",
    },
    { href: "/homes", label: "Homes for sale in Las Vegas", description: "Single-family and attached" },
    {
      href: "/condos",
      label: "Las Vegas Strip & high-rise condos for sale",
      description: "Including Palms Place and near-Strip towers",
    },
    {
      href: "/high-rises",
      label: "Strip high-rise condos & tower comparison",
      description: "HOA context and search entry points",
    },
    {
      href: searchUrl,
      label: "Search homes",
      description: "Dr. Jan Duffy’s curated RealScout search",
      external: true,
    },
    { href: "/sell", label: "Sell with the Palms Place team", description: "Listing specialist & marketing" },
    {
      href: getCalendlyUrl(),
      label: "Schedule a conversation",
      description: "Book on Calendly",
      external: true,
    },
    { href: "/contact", label: "Contact the office", description: "Phone, email & map" },
    { href: "/connect", label: "Connect & YouTube", description: "Stay in touch" },
    { href: "/communities", label: "Neighborhoods & communities", description: "Near the Strip" },
    {
      href: "/luxury-homes",
      label: "Las Vegas luxury homes for sale",
      description: "Summerlin, Henderson & valley estates",
    },
    { href: "/featured", label: "Featured listings", description: "Spotlight inventory" },
    {
      href: "/photos",
      label: "Palms Place condo photos",
      description: "Listing photo galleries",
    },
    {
      href: "/photo-use",
      label: "Palms Place listing photo use and credit",
      description: "Copyright, credit, and reuse requests",
    },
    {
      href: "/photos/unit-8322",
      label: "Palms Place #8322 photos — Strip views",
      description: "Living room & balcony",
    },
    {
      href: "/video",
      label: "Dr. Jan Duffy Palms Place listing specialist video",
      description: "First-party tower & #8322 cut",
    },
    { href: "/under-500k", label: "Homes & condos under $500K", description: "Price band shortcut" },
    { href: "/popular-searches", label: "Popular buyer searches", description: "Shortcuts by topic" },
    {
      href: "/faq",
      label: "Palms Place Las Vegas FAQ",
      description: "Building, location, amenities, booking",
    },
    { href: "/buyers/calculators", label: "Buyer calculators", description: "Payments and affordability" },
  ];

  const filtered = pool.filter((item) => {
    if (item.href === normalized) return false;
    if (normalized === "/search" && item.external && item.href === searchUrl) return false;
    return true;
  });

  const byHref = new Map(filtered.map((item) => [item.href, item]));
  const preferred: RelatedLink[] = [];
  const seen = new Set<string>();

  for (const href of preferredHrefsForPath(normalized)) {
    const match =
      href === "__search__"
        ? filtered.find((item) => item.external && item.href === searchUrl)
        : byHref.get(href);
    if (!match || seen.has(match.href)) continue;
    seen.add(match.href);
    preferred.push(match);
  }

  const rest = filtered.filter((item) => !seen.has(item.href));
  return [...preferred, ...rest].slice(0, 6);
}

/**
 * Topic-cluster order so RelatedPages is not the same five hub links on every route.
 * `__search__` resolves to the live RealScout shared-search URL.
 */
function preferredHrefsForPath(pathname: string): string[] {
  if (pathname === "/") {
    return [
      "/palms-place",
      "/guide/buying-palms-place",
      "/guide/palms-place-strip-view-condos",
      "/photos",
      "__search__",
    ];
  }
  if (pathname === "/guide/compare-strip-high-rises" || pathname === "/high-rises") {
    return [
      "/palms-place",
      "/guide/palms-place-hoa-and-monthly-costs",
      "/guide/palms-place-condos-vs-hotel",
      "/guide/palms-place-unit-types",
      "/condos",
    ];
  }
  if (
    pathname === "/sellers" ||
    pathname === "/sell" ||
    pathname === "/guide/selling-palms-place"
  ) {
    return [
      "/guide/selling-palms-place",
      "/guide/furnished-palms-place-condos",
      "/photos",
      "/sell",
      "/contact",
    ];
  }
  if (
    pathname === "/buyers" ||
    pathname === "/buyers/calculators" ||
    pathname === "/guide/buying-palms-place"
  ) {
    return [
      "/guide/palms-place-hoa-and-monthly-costs",
      "/guide/palms-place-strip-view-condos",
      "/photos",
      "__search__",
      "/guide/palms-place-short-term-rentals",
    ];
  }
  if (pathname === "/guide/palms-place-hoa-and-monthly-costs") {
    return [
      "/guide/buying-palms-place",
      "/insights/why-we-request-hoa-packets-early",
      "/guide/palms-place-short-term-rentals",
      "/palms-place",
      "/faq",
    ];
  }
  if (pathname === "/guide/palms-place-amenities-and-resort-access") {
    return [
      "/palms-place",
      "/guide/palms-place-hoa-and-monthly-costs",
      "/area/palms-place-las-vegas",
      "/photos",
      "/faq",
    ];
  }
  if (
    pathname === "/guide/palms-place-unit-types" ||
    pathname === "/guide/furnished-palms-place-condos"
  ) {
    return [
      "/guide/palms-place-strip-view-condos",
      "/guide/palms-place-short-term-rentals",
      "/photos",
      "/condos",
      "/guide/buying-palms-place",
    ];
  }
  if (
    pathname === "/guide/palms-place-strip-view-condos" ||
    pathname === "/guide/palms-place-short-term-rentals" ||
    pathname === "/guide/palms-place-condos-vs-hotel"
  ) {
    return [
      "/guide/palms-place-strip-view-condos",
      "/guide/palms-place-short-term-rentals",
      "/photos",
      "/guide/palms-place-unit-types",
      "/guide/furnished-palms-place-condos",
    ];
  }
  if (pathname.startsWith("/insights")) {
    return [
      "/insights",
      "/guide/buying-palms-place",
      "/photos",
      "/palms-place",
      "/faq",
    ];
  }
  if (pathname.startsWith("/photos") || pathname === "/featured" || pathname === "/video" || pathname === "/photo-use") {
    return [
      "/photos",
      "/photos/unit-8322",
      "/photo-use",
      "/video",
      "/contact",
    ];
  }
  if (
    pathname === "/condos" ||
    pathname === "/luxury-homes" ||
    pathname === "/homes" ||
    pathname === "/under-500k" ||
    pathname === "/popular-searches"
  ) {
    return [
      "/guide/compare-strip-high-rises",
      "/palms-place",
      "/condos",
      "/high-rises",
      "__search__",
    ];
  }
  if (pathname === "/contact" || pathname === "/connect" || pathname === "/team") {
    return ["/contact", "/photo-use", "/team", "/buyers", "/palms-place"];
  }
  if (pathname === "/palms-place" || pathname === "/area/palms-place-las-vegas") {
    return [
      "/guide/palms-place-amenities-and-resort-access",
      "/guide/palms-place-hoa-and-monthly-costs",
      "/guide/buying-palms-place",
      "/photos",
      "/faq",
    ];
  }

  return [
    "/palms-place",
    "/buyers",
    "/guide/compare-strip-high-rises",
    "/photos",
    "/contact",
  ];
}
