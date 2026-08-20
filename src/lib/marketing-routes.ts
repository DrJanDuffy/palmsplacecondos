/**
 * Canonical marketing routes for sitemap, llms.txt, IndexNow, and internal SEO tooling.
 * Keep in sync with public App Router page.tsx routes under src/app.
 *
 * GSC Sitemaps (2026-08-20): 33 URLs discovered on
 * `https://www.palmsplacecondos.com/sitemap.xml` (Success). Count must stay
 * aligned with this array.
 */

export type MarketingRoute = {
  path: string;
  /** One-line summary for llms.txt / AEO indexes */
  summary: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

export const MARKETING_ROUTES: MarketingRoute[] = [
  {
    path: "",
    summary: "Palms Place condos for sale — Las Vegas Strip high-rise overview and live search.",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/palms-place",
    summary: "Building guide: address, tower facts, amenities, buying and selling at Palms Place.",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    path: "/buyers",
    summary: "Buyer hub for Palms Place and Las Vegas high-rise condo tours and due diligence.",
    changeFrequency: "monthly",
    priority: 0.88,
  },
  {
    path: "/sellers",
    summary: "Seller hub for Palms Place listing prep, valuation conversations, and marketing.",
    changeFrequency: "monthly",
    priority: 0.88,
  },
  {
    path: "/guide/buying-palms-place",
    summary: "Field guide: buying a Palms Place condo — tours, HOA packets, and offer readiness.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/guide/selling-palms-place",
    summary: "Field guide: selling a Palms Place condo — HOA packets, furnished resale, prep.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/guide/palms-place-unit-types",
    summary: "Studios vs one-bedroom Palms Place floor plans — decision framework for buyers.",
    changeFrequency: "monthly",
    priority: 0.86,
  },
  {
    path: "/guide/compare-strip-high-rises",
    summary: "Compare Palms Place with other Strip-adjacent high-rises before you tour.",
    changeFrequency: "monthly",
    priority: 0.86,
  },
  {
    path: "/guide/palms-place-hoa-and-monthly-costs",
    summary: "Palms Place HOA fees, assessments, and true monthly carry — verify in disclosures.",
    changeFrequency: "monthly",
    priority: 0.87,
  },
  {
    path: "/guide/furnished-palms-place-condos",
    summary: "Furnished Palms Place resales — what conveys and rental-rule checks.",
    changeFrequency: "monthly",
    priority: 0.86,
  },
  {
    path: "/guide/palms-place-amenities-and-resort-access",
    summary: "Amenities and resort access at Palms Place — owner verification before you buy.",
    changeFrequency: "monthly",
    priority: 0.86,
  },
  {
    path: "/area/palms-place-las-vegas",
    summary: "Location page: West Flamingo / Paradise map context for Palms Place.",
    changeFrequency: "monthly",
    priority: 0.88,
  },
  {
    path: "/insights",
    summary: "Field notes hub — first-hand Palms Place tour and listing insights.",
    changeFrequency: "monthly",
    priority: 0.84,
  },
  {
    path: "/insights/palms-place-tour-red-flags",
    summary: "Field note: tour red flags buyers miss at Palms Place.",
    changeFrequency: "monthly",
    priority: 0.82,
  },
  {
    path: "/insights/why-we-request-hoa-packets-early",
    summary: "Field note: why the team requests HOA packets early in Palms Place deals.",
    changeFrequency: "monthly",
    priority: 0.82,
  },
  {
    path: "/insights/furnished-resale-inventory-surprises",
    summary: "Field note: furnished resale inventory surprises at Palms Place.",
    changeFrequency: "monthly",
    priority: 0.82,
  },
  {
    path: "/team",
    summary: "Dr. Jan Duffy — Palms Place listing lead and buyers specialist NAP.",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/homes",
    summary: "Las Vegas homes for sale hub — compare with high-rise condo options.",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/condos",
    summary: "Las Vegas high-rise and Palms Place condos hub with live search paths.",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/search",
    summary: "Curated RealScout search for Palms Place and Las Vegas-area listings.",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/sell",
    summary: "Sell your Palms Place or Las Vegas condo — valuation conversation and listing prep.",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/contact",
    summary: "Contact the Palms Place team — office NAP, hours, map, call and directions.",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    path: "/connect",
    summary: "Connect — social channels, office NAP, and follow-up paths.",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/faq",
    summary: "Palms Place FAQ — amenities, buying, selling, and tower questions.",
    changeFrequency: "monthly",
    priority: 0.78,
  },
  {
    path: "/communities",
    summary: "Las Vegas communities hub for buyers comparing areas with Palms Place.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/featured",
    summary: "Featured and spotlight inventory paths via live RealScout search.",
    changeFrequency: "weekly",
    priority: 0.75,
  },
  {
    path: "/photos",
    summary: "Palms Place condo photo galleries — Strip-view listing photography hub.",
    changeFrequency: "weekly",
    priority: 0.86,
  },
  {
    path: "/photos/unit-8322",
    summary: "Photos of Palms Place #8322 for sale — living room and balcony Strip views.",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/high-rises",
    summary: "Las Vegas high-rise condo hub — towers buyers cross-shop with Palms Place.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/luxury-homes",
    summary: "Luxury homes hub — estates vs Strip high-rise lifestyle tradeoffs.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/popular-searches",
    summary: "Popular Palms Place and Las Vegas search shortcuts plus live inventory links.",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/under-500k",
    summary: "Under $500K Las Vegas and Palms Place price-band search guidance.",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/buyers/calculators",
    summary: "Buyer calculators hub — prepare questions; confirm rates with a licensed lender.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

export function marketingPathHref(path: string): string {
  return path === "" ? "/" : path;
}
