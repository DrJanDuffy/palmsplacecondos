import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { SourcesVerification } from "@/components/seo/sources-verification";
import { StructuredData } from "@/components/seo/structured-data";
import { ButtonAnchor } from "@/components/shared/button-link";
import { palmsPlacePageFaq } from "@/lib/content/discoverability-page-faqs";
import { formatPalmsPlaceTowerAddressLine, palmsPlaceTower } from "@/lib/content/palms-place-building";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

const pageMeta = {
  name: "Palms Place Las Vegas — building guide & condos for sale",
  description:
    "Palms Place is a 47-story tower west of the Las Vegas Strip at 4381 W Flamingo Road. Guide to location, residences, amenities, and buying with the Palms Place real estate team.",
};

export function PalmsPlacePageBody() {
  const related = relatedLinksForPath("/palms-place");
  const searchUrl = getRealScoutSharedSearchUrl();
  const towerLine = formatPalmsPlaceTowerAddressLine();
  const webPageJsonLd = getWebPageJsonLdForPath("/palms-place", pageMeta, {
    aboutPalmsPlace: true,
    mainEntity: "palms-place",
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/palms-place", [
    { name: "Home", path: "/" },
    { name: "Palms Place", path: "/palms-place" },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Palms Place Las Vegas — building guide &amp; condos for sale
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        <strong className="font-semibold text-palms-cream">Palms Place</strong> is a{" "}
        {palmsPlaceTower.floors}-story residential tower at {towerLine}, connected to Palms Casino
        Resort and west of the Las Vegas Strip. This page summarizes location, residences, and how to
        buy or sell with {siteContact.teamBrandName} at {siteContact.brokerage}.
      </p>

      <section className="mt-12" aria-labelledby="palms-place-location-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="palms-place-location-heading"
        >
          Where is Palms Place on the Las Vegas Strip?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Palms Place is <strong className="font-semibold text-palms-cream">near the Strip, not on</strong>{" "}
          Las Vegas Boulevard. The tower sits on West Flamingo Road in Paradise, Nevada—typically a
          short drive to resort corridors without sitting in the center of Strip traffic. See the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/area/palms-place-las-vegas">
            Palms Place location page
          </Link>{" "}
          for a map and directions; confirm parking and guest-access rules with your agent and current
          HOA or management materials.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="palms-place-building-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="palms-place-building-heading"
        >
          What is the Palms Place building?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Palms Place opened in {palmsPlaceTower.openedYear} as part of the broader Palms resort
          expansion. The tower offers condo ownership with resort-adjacent access; many units are
          individually owned, so finishes, rental arrangements, and guest experience can vary by
          residence. Public building address: {towerLine}.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="palms-place-floor-plans-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="palms-place-floor-plans-heading"
        >
          What Palms Place floor plans and unit types are for sale?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Active inventory often includes efficient studios and larger one-bedroom layouts, with
          select upper-floor and penthouse-style residences when listed. Palms Place floor plans,
          views, and HOA assessments change by unit—compare live listings and official disclosures
          with {siteContact.agentName}.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="palms-place-amenities-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="palms-place-amenities-heading"
        >
          What amenities does Palms Place offer?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Owners and guests typically reference pool and outdoor living, concierge-style services, and
          proximity to Palms Casino Resort dining and entertainment. Pool hours, shuttles, resort
          fees, and on-property dining change with season and operations—confirm current details with
          the property, your host, or your agent before you travel or close. See the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/faq">
            Palms Place Las Vegas FAQ
          </Link>{" "}
          for planning-oriented answers.
        </p>
      </section>

      <section
        className="mt-12 rounded-xl border border-palms-gold/15 bg-palms-charcoal-muted/30 p-6"
        aria-labelledby="palms-place-team-guide-heading"
      >
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="palms-place-team-guide-heading">
          Why is this Palms Place guide different from a tower brochure?
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          Competitor pages often repeat the same pool-and-penthouse script. Our{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/guide/buying-palms-place">
            buying field guide
          </Link>{" "}
          explains how we run tours, which HOA documents we request, and why hotel stays feel
          different from owning a unit—written for buyers working with {siteContact.buyerSpecialistName}.
          Also see{" "}
          <Link
            className="text-palms-gold underline-offset-4 hover:underline"
            href="/guide/palms-place-amenities-and-resort-access"
          >
            amenities &amp; resort access
          </Link>
          ,{" "}
          <Link
            className="text-palms-gold underline-offset-4 hover:underline"
            href="/guide/palms-place-hoa-and-monthly-costs"
          >
            HOA &amp; monthly costs
          </Link>
          , and{" "}
          <Link
            className="text-palms-gold underline-offset-4 hover:underline"
            href="/guide/furnished-palms-place-condos"
          >
            furnished resales
          </Link>
          .
        </p>
      </section>

      <section className="mt-12" aria-labelledby="palms-place-buy-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="palms-place-buy-heading"
        >
          How do I buy or sell a Palms Place condo?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Start with live Palms Place condos for sale via the curated search, then tour with{" "}
          {siteContact.agentName}—listing specialist and Palms Place Buyers Specialist. Thinking
          about selling? See{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/sell">
            sell your Palms Place condo
          </Link>
          .
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <ButtonAnchor href={searchUrl} variant="primary">
            Search Palms Place listings
          </ButtonAnchor>
          <Link
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-palms-gold/45 px-6 py-3 text-sm font-semibold text-palms-cream transition-colors hover:border-palms-gold hover:bg-palms-gold/10"
            href="/contact"
          >
            Contact the Palms Place team
          </Link>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-palms-gold/15 bg-palms-charcoal-muted/30 p-6" aria-labelledby="palms-place-disclaimer-heading">
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="palms-place-disclaimer-heading">
          How should you treat Palms Place listing and amenity summaries?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-palms-cream/70">
          Building facts and amenities summaries are for orientation only. Verify price, square
          footage, HOA fees, and status with your agent and official sources—not intended as legal or
          tax advice.
        </p>
      </section>

      <PageFaqSection
        pathname="/palms-place"
        headingId="palms-place-faq-heading"
        heading="What should you know about Palms Place before you tour?"
        intro="Tower address, unit types, and how to buy or sell with this team."
        items={palmsPlacePageFaq}
      />

      <SourcesVerification />
      <RelatedPages links={related} />
    </article>
  );
}
