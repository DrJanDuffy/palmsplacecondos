import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { featuredPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import {
  getBreadcrumbListJsonLd,
  getCurrentFeaturedListingJsonLd,
  getWebPageJsonLdForPath,
} from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { CalendlyLink } from "@/components/shared/calendly-link";

const pageMeta = {
  name: "Featured Palms Place & Las Vegas listings — spotlight inventory",
  description:
    "Spotlight Palms Place and Las Vegas high-rise listings curated by the local team—live RealScout search, new inventory highlights, and private tour lists.",
};

/** Expanded /featured — spotlight inventory without fabricating listing rows. */
export function FeaturedPageBody() {
  const related = relatedLinksForPath("/featured");
  const searchUrl = getRealScoutSharedSearchUrl();
  const webPageJsonLd = getWebPageJsonLdForPath("/featured", pageMeta, {
    aboutPalmsPlace: true,
    pageType: "CollectionPage",
    hasFaq: true,
    mentionsFeaturedListing: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/featured", [
    { name: "Home", path: "/" },
    { name: "Featured listings", path: "/featured" },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={getCurrentFeaturedListingJsonLd()} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Featured Palms Place &amp; Las Vegas listings
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        Highlights rotate with market activity—{siteContact.agentName} curates search experiences and
        tour lists for {siteContact.primaryServiceArea}. See the live{" "}
        <Link className="text-palms-gold underline-offset-4 hover:underline" href="/photos/unit-8322">
          Palms Place #8322 photo gallery
        </Link>{" "}
        for the current featured unit, then use RealScout for full inventory.
      </p>

      <section className="mt-12" aria-labelledby="featured-palms-place-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="featured-palms-place-heading"
        >
          What counts as a featured Palms Place listing?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Featured inventory can include new-to-market studios and one-bedrooms at{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            Palms Place on Flamingo Road
          </Link>
          , furnished resales, and comparable Strip-adjacent towers when buyers want side-by-side tours.
          Before you prioritize a unit, read the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/guide/buying-palms-place">
            Palms Place buying field guide
          </Link>{" "}
          for HOA packet timing and tour red flags from recent field notes.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="featured-search-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="featured-search-heading">
          How do I see current featured inventory?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Open{" "}
          <a
            className="font-medium text-palms-gold underline-offset-4 hover:underline"
            href={searchUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Dr. Jan Duffy&apos;s RealScout search
          </a>{" "}
          for live Palms Place and Las Vegas listings with filters you control, or start from the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/search">
            on-site search page
          </Link>
          . For building context first, see{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/condos">
            Las Vegas high-rise &amp; Palms Place condos
          </Link>
          .
        </p>
      </section>

      <section className="mt-12" aria-labelledby="featured-private-list-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="featured-private-list-heading"
        >
          Can I get a private featured list for my price band?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          <CalendlyLink>Schedule a tour or call</CalendlyLink>
          {" "}
          for conversations appropriate to your timeline. If you are shopping under $500K,
          also review{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/under-500k">
            homes and condos under $500K
          </Link>{" "}
          for HOA carry context before you tour high-rises.
        </p>
      </section>

      <PageFaqSection
        pathname="/featured"
        headingId="featured-faq-heading"
        heading="How do featured Palms Place listings work on this site?"
        intro="Quick answers about how spotlight inventory works on this Palms Place marketing site."
        items={featuredPageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
