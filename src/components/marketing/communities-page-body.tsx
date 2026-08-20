import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { communitiesPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { CalendlyLink } from "@/components/shared/calendly-link";

const pageMeta = {
  name: "Las Vegas communities & guard-gated neighborhoods",
  description:
    "Compare Strip-adjacent corridors, guard-gated neighborhoods, and Summerlin or Henderson with Palms Place high-rise living before you tour.",
};

/**
 * Expanded /communities — neighborhood context without duplicating homepage FAQ JSON-LD.
 */
export function CommunitiesPageBody() {
  const related = relatedLinksForPath("/communities");
  const webPageJsonLd = getWebPageJsonLdForPath("/communities", pageMeta, {
    pageType: "CollectionPage",
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/communities", [
    { name: "Home", path: "/" },
    { name: "Communities", path: "/communities" },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Las Vegas communities &amp; guard-gated neighborhoods
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        Orient your search before you tour. {siteContact.agentName}{" "}
        helps buyers compare corridors across {siteContact.primaryServiceArea}—from Strip-adjacent towers
        to master-planned valleys.
      </p>

      <section className="mt-12" aria-labelledby="communities-strip-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="communities-strip-heading"
        >
          How do Strip-adjacent corridors compare to Palms Place?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Luxury condos west of the Las Vegas Strip can offer shorter drives to entertainment and
          employment—but HOA rules, noise, and parking differ by tower. Start with the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            Palms Place building guide
          </Link>{" "}
          and{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/high-rises">
            Strip high-rise comparison hub
          </Link>{" "}
          before you assume every west-side tower trades like Palms Place.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="communities-gated-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="communities-gated-heading"
        >
          What should you know about guard-gated communities?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Guard-gated communities in Las Vegas and Henderson layer controlled access and often
          stronger amenity packages—but HOA costs and rules vary. Pair community tours with{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/luxury-homes">
            Las Vegas luxury homes for sale
          </Link>{" "}
          and compare against high-rise trade-offs on{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/condos">
            Strip and high-rise condos
          </Link>
          .
        </p>
      </section>

      <section className="mt-12" aria-labelledby="communities-valley-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="communities-valley-heading"
        >
          How do Summerlin and Henderson fit a Palms Place search?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          If you are weighing master-planned communities against high-rise life, browse{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/luxury-homes">
            luxury homes in Summerlin and Henderson
          </Link>
          , then contrast with{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/homes">
            Las Vegas homes for sale
          </Link>{" "}
          and{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/popular-searches">
            popular buyer searches
          </Link>{" "}
          for shortcuts by topic and price band.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="communities-next-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="communities-next-heading"
        >
          What are the next steps with the Palms Place team?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Narrow must-haves, pull comparables with your agent, and{" "}
          <CalendlyLink>schedule showings</CalendlyLink> when you are ready. Start from the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/">
            Palms Place homepage
          </Link>{" "}
          or{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/contact">
            contact the office
          </Link>{" "}
          for phone and email—not legal or tax advice.
        </p>
      </section>

      <PageFaqSection
        pathname="/communities"
        headingId="communities-faq-heading"
        heading="How do Las Vegas communities compare to Palms Place living?"
        intro="Comparing neighborhoods, guard-gated product, and Palms Place high-rise living."
        items={communitiesPageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
