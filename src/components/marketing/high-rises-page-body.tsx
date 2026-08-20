import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { ButtonAnchor } from "@/components/shared/button-link";
import { highRisesPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

const pageMeta = {
  name: "Las Vegas Strip high-rise condos for sale",
  description:
    "Compare Strip and west-of-Strip towers, HOA context, and Palms Place inventory with live search and field guides from the local team.",
};

/** Expanded /high-rises — Strip towers & Palms Place bridge page. */
export function HighRisesPageBody() {
  const related = relatedLinksForPath("/high-rises");
  const searchUrl = getRealScoutSharedSearchUrl();
  const webPageJsonLd = getWebPageJsonLdForPath("/high-rises", pageMeta, {
    aboutPalmsPlace: true,
    pageType: "CollectionPage",
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/high-rises", [
    { name: "Home", path: "/" },
    { name: "High-rises", path: "/high-rises" },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Las Vegas Strip high-rise condos for sale
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        Condos on the Strip and just west of it—luxury towers where amenities, HOA structures, and
        floor-plan variety differ by building. {siteContact.agentName}{" "}
        helps buyers compare options with {siteContact.brokerage}.
      </p>

      <section className="mt-12" aria-labelledby="high-rises-palms-place-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="high-rises-palms-place-heading"
        >
          Where does Palms Place fit among Strip high-rises?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          For Palms Place–specific context—residences, resort-style amenities, and how listings
          present today—start with the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            Palms Place Las Vegas building guide
          </Link>{" "}
          and{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/condos">
            Las Vegas high-rise &amp; Palms Place condos
          </Link>
          .
        </p>
      </section>

      <section className="mt-12" aria-labelledby="high-rises-compare-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="high-rises-compare-heading"
        >
          What should you compare across towers before you tour?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          HOA fees, parking, rental restrictions, and reserve studies affect value and monthly carry.
          For a Palms Place–first framework, read the{" "}
          <Link
            className="text-palms-gold underline-offset-4 hover:underline"
            href="/guide/compare-strip-high-rises"
          >
            Strip high-rise comparison guide
          </Link>{" "}
          and{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/buyers">
            buyer hub
          </Link>{" "}
          for calculators and tour planning.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="high-rises-other-towers-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="high-rises-other-towers-heading"
        >
          Which other Strip towers do buyers cross-shop?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Depending on budget and lifestyle, buyers often compare multiple towers—examples include
          Panorama Towers, Turnberry Towers, Trump Tower Las Vegas, Veer Towers, Waldorf Astoria
          Residences Las Vegas, The Signature, Metropolis, One Las Vegas, Newport Lofts, Allure, and
          Regency Towers. Rules, fees, and finishes are not interchangeable; align tours and listing
          data with official disclosures—not third-party summaries alone.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <ButtonAnchor href={searchUrl} variant="primary">
            Open curated home search
          </ButtonAnchor>
          <Link
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-palms-gold/45 px-6 py-3 text-sm font-semibold text-palms-cream transition-colors hover:border-palms-gold hover:bg-palms-gold/10"
            href="/contact"
          >
            Ask about Strip high-rises
          </Link>
        </div>
      </section>

      <PageFaqSection
        pathname="/high-rises"
        headingId="high-rises-faq-heading"
        heading="How do you compare Las Vegas Strip high-rise condos?"
        intro="Tower comparisons, Palms Place context, and live search."
        items={highRisesPageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
