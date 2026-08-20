import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { buyersPageFaq } from "@/lib/content/discoverability-page-faqs";
import { ButtonAnchor } from "@/components/shared/button-link";
import { CalendlyLink } from "@/components/shared/calendly-link";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

const pageMeta = {
  name: "Buy Palms Place & Las Vegas high-rise condos — buyer guide",
  description:
    "Buyer guide for Palms Place and Las Vegas Strip high-rise condos: search, tours, calculators, and working with Dr. Jan Duffy, Palms Place Buyers Specialist.",
};

export function BuyersPageBody() {
  const related = relatedLinksForPath("/buyers");
  const searchUrl = getRealScoutSharedSearchUrl();
  const webPageJsonLd = getWebPageJsonLdForPath("/buyers", pageMeta, {
    pageType: "CollectionPage",
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/buyers", [
    { name: "Home", path: "/" },
    { name: "Buyers", path: "/buyers" },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Buy Palms Place &amp; Las Vegas high-rise condos
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        <strong className="font-semibold text-palms-cream">Buyers start here</strong> to search
        Palms Place and comparable Las Vegas high-rise inventory, estimate payments, and schedule tours
        with {siteContact.buyerSpecialistName}, {siteContact.buyerSpecialistTitle}, at{" "}
        {siteContact.brokerage}.
      </p>

      <section
        className="mt-10 rounded-xl border border-palms-gold/20 bg-palms-gold/5 p-6"
        aria-labelledby="buyers-field-guide-heading"
      >
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="buyers-field-guide-heading">
          First-hand Palms Place buyer guide
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          Our team published a field guide—not a recycled amenities brochure—with a tour checklist,
          how listing vs buyer roles split, and which HOA documents to request before you write. For
          specific situations we see on tours, browse{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/insights">
            Palms Place field notes
          </Link>
          .
        </p>
        <p className="mt-4">
          <Link
            className="font-medium text-palms-gold underline-offset-4 hover:underline"
            href="/guide/buying-palms-place"
          >
            Read the Palms Place buying field guide
          </Link>
          {" · "}
          <Link
            className="font-medium text-palms-gold underline-offset-4 hover:underline"
            href="/guide/palms-place-unit-types"
          >
            Studios vs one-bedroom guide
          </Link>
        </p>
      </section>

      <section className="mt-12" aria-labelledby="buyers-search-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="buyers-search-heading"
        >
          How do I search Palms Place condos for sale?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Use the team&apos;s curated RealScout search to filter by price, property type, and status,
          or open the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/search">
            on-site search page
          </Link>
          . For building context before you tour, read the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            Palms Place Las Vegas building guide
          </Link>
          .
        </p>
        <div className="mt-6">
          <ButtonAnchor href={searchUrl} variant="primary">
            Open curated home search
          </ButtonAnchor>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="buyers-tour-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="buyers-tour-heading"
        >
          Who helps Palms Place buyers with showings and offers?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          {siteContact.buyerSpecialistName} is the Palms Place Buyers Specialist—buyers start with
          Dr. Jan for showings, HOA questions, and offer strategy. Listing and marketing conversations
          also route through {siteContact.agentName}, {siteContact.agentTitle}. Meet the team on the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/team">
            Palms Place real estate team
          </Link>{" "}
          page.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="buyers-tools-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="buyers-tools-heading"
        >
          What buyer tools are available on this site?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Run payment and affordability scenarios on the{" "}
          <Link
            className="text-palms-gold underline-offset-4 hover:underline"
            href="/buyers/calculators"
          >
            buyer calculators
          </Link>
          , compare{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/high-rises">
            Las Vegas Strip high-rise condos
          </Link>
          , and browse{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/under-500k">
            homes and condos under $500K
          </Link>
          . Numbers are estimates only—confirm with your lender and agent.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="buyers-next-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="buyers-next-heading"
        >
          Ready to tour or write an offer?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          <CalendlyLink>Schedule a conversation</CalendlyLink>
          {" "}
          with the team, or{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/contact">
            contact the office
          </Link>
          . Review the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/faq">
            Palms Place FAQ
          </Link>{" "}
          for location and building answers before your first visit.
        </p>
      </section>

      <PageFaqSection
        pathname="/buyers"
        headingId="buyers-faq-heading"
        heading="Palms Place buyer FAQ"
        intro="Starting your search, team roles, and live inventory."
        items={buyersPageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
