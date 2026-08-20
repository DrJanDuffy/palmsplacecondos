import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { ButtonAnchor } from "@/components/shared/button-link";
import { CalendlyButton } from "@/components/shared/calendly-link";
import { condosPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

const pageMeta = {
  name: "Las Vegas high-rise & Palms Place condos for sale",
  description:
    "Strip and west-of-Strip high-rise condos for sale—including Palms Place—with HOA context, building guides, and live listing search with the local team.",
};

/**
 * Expanded /condos — unique copy (not a duplicate of the homepage FAQ block).
 */
export function CondosPageBody() {
  const related = relatedLinksForPath("/condos");
  const searchUrl = getRealScoutSharedSearchUrl();
  const webPageJsonLd = getWebPageJsonLdForPath("/condos", pageMeta, {
    aboutPalmsPlace: true,
    pageType: "CollectionPage",
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/condos", [
    { name: "Home", path: "/" },
    { name: "Condos", path: "/condos" },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Las Vegas high-rise &amp; Palms Place condos for sale
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        If you are searching for condos for sale on the Las Vegas Strip or a luxury condo in Las
        Vegas, start here—Palms Place for sale and comparable high-rise inventory with{" "}
        {siteContact.agentName}—{siteContact.brokerage}.
      </p>

      <section className="mt-12" aria-labelledby="condos-corridors-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="condos-corridors-heading"
        >
          How do Strip and downtown Las Vegas condo corridors differ?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Downtown Las Vegas condos cluster near the Fremont and Arts District vibe, while Strip and
          west-of-Strip towers (including Palms Place) emphasize resort proximity and vertical
          amenities. HOA fees, parking, views, and rental rules vary sharply by building—compare
          disclosures side by side, not just listing photos.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="condos-luxury-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="condos-luxury-heading"
        >
          Where do luxury penthouses and large high-rise plans fit?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Las Vegas luxury penthouses for sale and large high-rise floor plans trade on view, ceiling
          height, outdoor space, and building services. Inventory changes often—use live search and
          verify every material fact with your agent before you write an offer.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="condos-palms-place-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="condos-palms-place-heading"
        >
          What should Palms Place buyers read before they tour?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Start with the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            Palms Place building guide
          </Link>
          ,{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/area/palms-place-las-vegas">
            location &amp; directions
          </Link>
          , and{" "}
          <Link
            className="text-palms-gold underline-offset-4 hover:underline"
            href="/guide/palms-place-hoa-and-monthly-costs"
          >
            HOA &amp; monthly cost guide
          </Link>
          . For furnished inventory, see{" "}
          <Link
            className="text-palms-gold underline-offset-4 hover:underline"
            href="/guide/furnished-palms-place-condos"
          >
            furnished Palms Place condos
          </Link>
          .
        </p>
      </section>

      <section className="mt-12" aria-labelledby="condos-search-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="condos-search-heading">
          How do I search live high-rise listings?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Run the team&apos;s curated search, jump to the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/search">
            search page
          </Link>
          , or compare{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/high-rises">
            Strip high-rise condos
          </Link>{" "}
          and{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/luxury-homes">
            luxury homes
          </Link>{" "}
          if you are cross-shopping product types.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <ButtonAnchor href={searchUrl} variant="primary">
            Open curated home search
          </ButtonAnchor>
          <CalendlyButton variant="secondary">Schedule a Palms Place showing</CalendlyButton>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-palms-gold/15 bg-palms-charcoal-muted/30 p-6">
        <h2 className="font-display text-xl font-semibold text-palms-cream">Listing data disclaimer</h2>
        <p className="mt-3 text-sm leading-relaxed text-palms-cream/70">
          Information is deemed reliable but not guaranteed. Verify price, square footage, HOA
          fees, and status with your agent and official sources—not intended as legal or tax advice.
        </p>
      </section>

      <PageFaqSection
        pathname="/condos"
        headingId="condos-faq-heading"
        heading="Las Vegas condos FAQ"
        intro="High-rise search, Palms Place context, and HOA planning."
        items={condosPageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
