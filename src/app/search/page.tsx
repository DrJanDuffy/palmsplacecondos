import type { Metadata } from "next";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { ButtonAnchor } from "@/components/shared/button-link";
import { SectionEyebrow } from "@/components/shared/section-heading";
import { searchPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { buildPageMetadata } from "@/lib/metadata-helpers";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

const pageMeta = {
  name: "Search Palms Place & Las Vegas listings",
  description: `Search live Palms Place and Las Vegas condo listings. Filter by price and status, then call ${siteContact.phone} — ${siteContact.agentName}.`,
};

export const metadata: Metadata = buildPageMetadata({
  path: "/search",
  title: "Search Palms Place Listings | Live Condo Inventory",
  description: pageMeta.description,
});

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const qRaw = params.q;
  const q = typeof qRaw === "string" ? qRaw.trim() : "";
  const sharedSearchUrl = getRealScoutSharedSearchUrl();
  const related = relatedLinksForPath("/search");
  const webPageJsonLd = getWebPageJsonLdForPath("/search", pageMeta, { aboutPalmsPlace: true });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/search", [
    { name: "Home", path: "/" },
    { name: "Search", path: "/search" },
  ]);

  return (
    <div className="border-b border-palms-gold/10 bg-linear-to-b from-palms-charcoal to-palms-charcoal-muted/30">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <StructuredData data={webPageJsonLd} />
        <StructuredData data={breadcrumbJsonLd} />
        <SectionEyebrow>Property search</SectionEyebrow>
        <h1 className="font-display mt-6 text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
          Search Palms Place &amp; Las Vegas listings
        </h1>
        <AgentHeroBadge className="mt-6" />
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-palms-cream/85">
          Palms Place and Las Vegas high-rise inventory is searched through the team&apos;s curated
          RealScout link. Filter by price, property type, and status
          {q ? (
            <>
              {" "}
              (you searched for <span className="text-palms-cream">{q}</span>)
            </>
          ) : null}
          —questions for buyers and sellers both go to {siteContact.agentName}.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <ButtonAnchor
            aria-label="Open the Palms Place team curated home search on RealScout in a new tab"
            href={sharedSearchUrl}
            variant="primary"
          >
            Open curated home search
          </ButtonAnchor>
          <p className="text-sm text-palms-cream/55">Opens in a new tab · RealScout</p>
        </div>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-palms-cream/60">
          Listing disclaimer: Information deemed reliable but not guaranteed. Verify listing details
          with your agent and official sources. Not intended as legal or tax advice.
        </p>

        <PageFaqSection
          pathname="/search"
          headingId="search-faq-heading"
          heading="Search FAQ"
          intro="How curated search differs from a raw feed and who to call next."
          items={searchPageFaq}
        />

        <RelatedPages links={related} />
      </div>
    </div>
  );
}
