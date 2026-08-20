import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { popularSearchesPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import {
  getBreadcrumbListJsonLd,
  getItemListJsonLd,
  getWebPageJsonLdForPath,
} from "@/lib/schema";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

type PopularSearchLink = {
  id: string;
  href: string;
  label: string;
  description: string;
  external?: boolean;
};

const staticLinks: PopularSearchLink[] = [
  {
    id: "palms-place-condos",
    href: "/palms-place",
    label: "Palms Place Las Vegas building guide",
    description: "4381 W Flamingo Rd tower context",
  },
  {
    id: "palms-place-location",
    href: "/area/palms-place-las-vegas",
    label: "Palms Place location — West Flamingo & Paradise",
    description: "Map, directions & Strip adjacency",
  },
  {
    id: "palms-place-hoa",
    href: "/guide/palms-place-hoa-and-monthly-costs",
    label: "Palms Place HOA fees & monthly costs",
    description: "True carry before you offer",
  },
  {
    id: "palms-place-furnished",
    href: "/guide/furnished-palms-place-condos",
    label: "Furnished Palms Place condos",
    description: "What conveys & rental rules",
  },
  {
    id: "palms-place-amenities",
    href: "/guide/palms-place-amenities-and-resort-access",
    label: "Palms Place amenities & resort access",
    description: "Owner rights to verify",
  },
  {
    id: "strip-condos",
    href: "/condos",
    label: "Palms Place & Strip high-rise condos for sale",
    description: "Strip-adjacent towers and search entry",
  },
  {
    id: "luxury-homes",
    href: "/luxury-homes",
    label: "Las Vegas luxury homes for sale",
    description: "Summerlin, Henderson & valley estates",
  },
  {
    id: "vegas-high-rises",
    href: "/high-rises",
    label: "Vegas high-rise condos for sale",
    description: "Tower comparison & HOA context",
  },
  {
    id: "downtown-vs-strip",
    href: "/guide/compare-strip-high-rises",
    label: "Palms Place vs other Strip high-rises",
    description: "Tour order & HOA comparison guide",
  },
  {
    id: "luxury-condos-strip",
    href: "/condos",
    label: "Luxury condos on and near the Las Vegas Strip",
    description: "High-rise & penthouse inventory",
  },
  {
    id: "strip-high-rise-condos",
    href: "/high-rises",
    label: "Las Vegas Strip high-rise condos",
    description: "Urban towers & amenities",
  },
  {
    id: "homes-las-vegas",
    href: "/homes",
    label: "Homes for sale in Las Vegas",
    description: "Single-family & attached",
  },
  {
    id: "luxury-summerlin-henderson",
    href: "/luxury-homes",
    label: "Luxury homes in Summerlin & Henderson",
    description: "Estates & luxury single-family",
  },
  {
    id: "under-500k",
    href: "/under-500k",
    label: "Homes & condos under $500K",
    description: "Starter & move-up price band",
  },
  {
    id: "featured",
    href: "/featured",
    label: "Featured Palms Place & Las Vegas listings",
    description: "Spotlight & new inventory",
  },
  {
    id: "buyers-calculators",
    href: "/buyers/calculators",
    label: "Palms Place buyer calculators",
    description: "PITI, HOA & closing-cost planning",
  },
  {
    id: "sell",
    href: "/sell",
    label: "Sell with the Palms Place team",
    description: "Listing specialist",
  },
  {
    id: "communities",
    href: "/communities",
    label: "Las Vegas neighborhoods & communities",
    description: "West side & valley context",
  },
  {
    id: "connect",
    href: "/connect",
    label: "Connect with the Palms Place team",
    description: "Office, social & follow-up",
  },
];

const pageMeta = {
  name: "Popular Palms Place & Las Vegas real estate searches",
  description:
    "Shortcuts to Palms Place condos, Strip high-rises, luxury homes, and price bands—curated links plus live RealScout search with the local team.",
};

/** Expanded /popular-searches — curated internal links + RealScout. */
export function PopularSearchesPageBody() {
  const related = relatedLinksForPath("/popular-searches");
  const searchUrl = getRealScoutSharedSearchUrl();
  const uniqueLinks = staticLinks.filter((link, index, all) =>
    all.findIndex((entry) => entry.href === link.href) === index,
  );
  const webPageJsonLd = getWebPageJsonLdForPath("/popular-searches", pageMeta, {
    aboutPalmsPlace: true,
    pageType: "CollectionPage",
    hasFaq: true,
    hasItemList: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/popular-searches", [
    { name: "Home", path: "/" },
    { name: "Popular searches", path: "/popular-searches" },
  ]);
  const itemListJsonLd = getItemListJsonLd("/popular-searches", {
    name: "Popular Palms Place and Las Vegas searches",
    description: pageMeta.description,
    items: uniqueLinks.map((link) => ({
      name: link.label,
      path: link.href,
      description: link.description,
    })),
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={itemListJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Popular Palms Place &amp; Las Vegas real estate searches
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        High-intent shortcuts to Palms Place, Strip high-rises, and valley homes—each destination page
        adds local context without repeating the homepage FAQ. Use this hub when you know the topic but
        not the best on-site guide yet.
      </p>

      <section className="mt-10" aria-labelledby="popular-on-site-heading">
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="popular-on-site-heading">
          Browse by topic on this site
        </h2>
        <ul className="mt-6 space-y-4">
          {staticLinks.map((item) => (
            <li key={item.id}>
              <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href={item.href}>
                {item.label}
              </Link>
              <span className="text-palms-cream/65"> — {item.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="popular-live-search-heading">
        <h2
          className="font-display text-xl font-semibold text-palms-cream"
          id="popular-live-search-heading"
        >
          When should I open live listing search?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          After you pick a topic above, use{" "}
          <a
            className="font-medium text-palms-gold underline-offset-4 hover:underline"
            href={searchUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            RealScout search
          </a>{" "}
          for filters, saved searches, and alerts managed with your agent. For payment planning first, see{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/buyers/calculators">
            buyer calculators
          </Link>
          .
        </p>
      </section>

      <section className="mt-12" aria-labelledby="popular-guides-heading">
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="popular-guides-heading">
          Palms Place guides buyers search most
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/guide/buying-palms-place">
            Buying a Palms Place condo
          </Link>
          ,{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/guide/selling-palms-place">
            selling a Palms Place condo
          </Link>
          , and{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/insights">
            field notes from recent tours
          </Link>{" "}
          go deeper than this shortcut list.
        </p>
      </section>

      <PageFaqSection
        pathname="/popular-searches"
        headingId="popular-searches-faq-heading"
        heading="Popular searches FAQ"
        intro="How this hub relates to the building guide and live listing search."
        items={popularSearchesPageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
