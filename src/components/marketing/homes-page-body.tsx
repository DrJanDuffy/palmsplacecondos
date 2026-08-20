import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { homesPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

const pageMeta = {
  name: "Homes for sale in Las Vegas",
  description:
    "Browse Las Vegas single-family and attached homes for sale—compare valley neighborhoods with Palms Place high-rise living and live listing search.",
};

/** Expanded /homes — single-family & attached vs high-rise context. */
export function HomesPageBody() {
  const related = relatedLinksForPath("/homes");
  const searchUrl = getRealScoutSharedSearchUrl();
  const webPageJsonLd = getWebPageJsonLdForPath("/homes", pageMeta, {
    pageType: "CollectionPage",
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/homes", [
    { name: "Home", path: "/" },
    { name: "Homes", path: "/homes" },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Homes for sale in Las Vegas
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        Single-family and attached homes across the valley—buyer tours with {siteContact.buyerSpecialistName},{" "}
        {siteContact.buyerSpecialistTitle}, and {siteContact.brokerage}. {siteContact.primaryServiceArea}.
      </p>

      <section className="mt-12" aria-labelledby="homes-vs-palms-place-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="homes-vs-palms-place-heading"
        >
          How do Las Vegas homes compare to Palms Place condos?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Many clients compare single-family product in Summerlin or Henderson with Strip-adjacent
          high-rises. Houses trade on lot size, yards, and commute times; Palms Place emphasizes
          amenities, lock-and-leave living, and Strip proximity. Read the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            Palms Place building guide
          </Link>{" "}
          if a tower might fit better than a house.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="homes-search-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="homes-search-heading">
          How do I search Las Vegas homes for sale?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Browse curated listings on{" "}
          <a
            className="font-medium text-palms-gold underline-offset-4 hover:underline"
            href={searchUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Dr. Jan Duffy&apos;s RealScout search
          </a>
          , explore{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/communities">
            Las Vegas communities
          </Link>{" "}
          for neighborhood context, or use{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/under-500k">
            under $500K shortcuts
          </Link>{" "}
          when you are price-band shopping.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="homes-luxury-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="homes-luxury-heading">
          Where do luxury single-family homes fit?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Estate and luxury single-family inventory often clusters in Summerlin and Henderson—see{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/luxury-homes">
            Las Vegas luxury homes for sale
          </Link>
          . Compare monthly carry and lifestyle with{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/high-rises">
            Strip high-rise condos
          </Link>{" "}
          before you commit to a product type.
        </p>
      </section>

      <PageFaqSection
        pathname="/homes"
        headingId="homes-faq-heading"
        heading="How do Las Vegas homes for sale compare to Palms Place?"
        intro="Single-family search versus Palms Place and high-rise alternatives."
        items={homesPageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
