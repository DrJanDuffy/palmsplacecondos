import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { SourcesVerification } from "@/components/seo/sources-verification";
import { StructuredData } from "@/components/seo/structured-data";
import { ButtonLink } from "@/components/shared/button-link";
import { CalendlyButton } from "@/components/shared/calendly-link";
import { sellersPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getBreadcrumbListJsonLd, getItemListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

const pageMeta = {
  name: "Sell Palms Place & Las Vegas condos — seller guide",
  description:
    "Seller hub for Palms Place and Las Vegas high-rise listings: listing prep field guide, valuation conversations, and Dr. Jan Duffy as Palms Place listing specialist.",
};

export function SellersPageBody() {
  const related = relatedLinksForPath("/sellers");
  const webPageJsonLd = getWebPageJsonLdForPath("/sellers", pageMeta, {
    pageType: "CollectionPage",
    hasFaq: true,
    hasItemList: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/sellers", [
    { name: "Home", path: "/" },
    { name: "Sellers", path: "/sellers" },
  ]);
  const itemListJsonLd = getItemListJsonLd("/sellers", {
    name: "Palms Place seller guides",
    description: pageMeta.description,
    items: [
      {
        name: "Selling a Palms Place condo — field guide",
        path: "/guide/selling-palms-place",
        description: "Listing prep checklist and HOA packets",
      },
      {
        name: "Sell page overview",
        path: "/sell",
        description: "Valuation conversation and listing marketing",
      },
      {
        name: "Buying field guide for co-owners",
        path: "/guide/buying-palms-place",
        description: "Tour and HOA notes sellers can share before showings",
      },
    ],
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={itemListJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Sell Palms Place &amp; Las Vegas condos
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        <strong className="font-semibold text-palms-cream">Sellers start here</strong> for listing
        strategy at Palms Place and comparable Las Vegas high-rises with {siteContact.agentName},{" "}
        {siteContact.agentTitle}, at {siteContact.brokerage}.
      </p>

      <section
        className="mt-10 rounded-xl border border-palms-gold/20 bg-palms-gold/5 p-6"
        aria-labelledby="sellers-field-guide-heading"
      >
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="sellers-field-guide-heading">
          How should you prepare to sell a Palms Place condo in Las Vegas?
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          Start with the field guide. HOA packets, furnished inventory, and buyer questions differ at Palms Place. Read the team&apos;s
          listing prep checklist before you price or photograph.
        </p>
        <p className="mt-4">
          <Link
            className="font-medium text-palms-gold underline-offset-4 hover:underline"
            href="/guide/selling-palms-place"
          >
            Selling a Palms Place condo — field guide
          </Link>
        </p>
      </section>

      <section className="mt-10" aria-labelledby="sellers-listing-services-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="sellers-listing-services-heading">
          What listing services does the Palms Place team offer?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          The expanded{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/sell">
            sell page
          </Link>{" "}
          covers valuation conversations, marketing, and cross-links for buyers still searching.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <ButtonLink href="/sell" variant="primary">
            Sell page overview
          </ButtonLink>
          <CalendlyButton variant="secondary">Schedule a seller consult</CalendlyButton>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="sellers-buyer-context-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="sellers-buyer-context-heading">
          How can sellers help Palms Place buyers understand the building?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Share our{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/guide/buying-palms-place">
            buying field guide
          </Link>{" "}
          or{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/guide/palms-place-unit-types">
            studio vs one-bedroom guide
          </Link>{" "}
          with co-owners so showings stay focused on facts—not surprises.
        </p>
      </section>

      <PageFaqSection
        pathname="/sellers"
        headingId="sellers-faq-heading"
        heading="What do Palms Place sellers ask before listing?"
        intro="How this hub differs from /sell and who lists Palms Place."
        items={sellersPageFaq}
      />

      <SourcesVerification />
      <RelatedPages pathname="/sellers" links={related} />
    </article>
  );
}
