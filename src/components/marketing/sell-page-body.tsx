import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { SourcesVerification } from "@/components/seo/sources-verification";
import { StructuredData } from "@/components/seo/structured-data";
import { sellPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { CalendlyLink } from "@/components/shared/calendly-link";

const pageMeta = {
  name: "Sell your Palms Place or Las Vegas condo",
  description:
    "Request a free seller valuation conversation with Dr. Jan Duffy—pricing strategy and marketing for Palms Place listings. Not an automated appraisal.",
};

/**
 * Expanded /sell — seller journey; complements homepage CTA.
 */
export function SellPageBody() {
  const related = relatedLinksForPath("/sell");
  const phone = siteContact.phone;
  const tel = phone ? `tel:${phone.replace(/\D/g, "")}` : undefined;
  const webPageJsonLd = getWebPageJsonLdForPath("/sell", pageMeta, {
    aboutListingAgent: true,
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/sell", [
    { name: "Home", path: "/" },
    { name: "Sell", path: "/sell" },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Sell your Palms Place or Las Vegas condo
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        Listing conversations with {siteContact.agentName}, {siteContact.agentTitle}, and{" "}
        {siteContact.brokerage} focus on pricing strategy, presentation, and exposure—not a
        guaranteed sale price.
      </p>

      <section className="mt-12" aria-labelledby="sell-valuation-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="sell-valuation-heading">
          Is the free valuation conversation an appraisal?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          No. Sellers often begin with a free valuation conversation: we review recent comps, active
          competition, and how Palms Place condos for sale are positioned. This is not an automated
          appraisal—your agent explains methodology and limitations.
        </p>
        {phone && tel ? (
          <p className="mt-4 text-palms-cream/85">
            Call or text{" "}
            <a className="font-medium text-palms-gold underline-offset-4 hover:underline" href={tel}>
              {phone}
            </a>{" "}
            to schedule.
          </p>
        ) : null}
      </section>

      <section className="mt-12" aria-labelledby="sell-prep-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="sell-prep-heading">
          What listing prep do Palms Place sellers need?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          {siteContact.agentName} approaches Palms Place listings as a building-specific campaign—not
          a template upload. That usually means clarifying how the unit is used today, aligning
          remarks with furniture and parking included, and timing photography when the residence shows
          the view buyers expect.
        </p>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Start with our{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/guide/selling-palms-place">
            Palms Place selling field guide
          </Link>{" "}
          for the listing prep checklist.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="sell-marketing-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="sell-marketing-heading">
          How does Palms Place listing marketing work in Las Vegas?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Plans can include professional media, syndication to major listing sites, and targeted
          outreach appropriate to your building and price band. HOA rules and tenant-occupied units
          add steps—your listing team coordinates timelines with disclosures.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="sell-crosslinks-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="sell-crosslinks-heading">
          Which pages should co-buyers read while you list?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Share{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/condos">
            Las Vegas high-rise &amp; Palms Place condos
          </Link>{" "}
          or{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/homes">
            Las Vegas homes for sale
          </Link>{" "}
          with co-buyers who need market context.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="sell-next-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="sell-next-heading">
          How do you start a Palms Place listing conversation?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          <CalendlyLink>Schedule a seller consult</CalendlyLink>
          , or return to the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/">
            homepage
          </Link>
          .
        </p>
      </section>

      <PageFaqSection
        pathname="/sell"
        headingId="sell-faq-heading"
        heading="What do Palms Place sellers ask about valuation and listing?"
        intro="Valuation vs appraisal, listing prep, and where sellers start."
        items={sellPageFaq}
      />

      <SourcesVerification />
      <RelatedPages pathname="/sell" links={related} />
    </article>
  );
}
