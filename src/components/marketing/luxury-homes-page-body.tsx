import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { luxuryHomesPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

const pageMeta = {
  name: "Las Vegas luxury homes for sale — Summerlin, Henderson & valley",
  description:
    "Luxury homes and estates in Summerlin, Henderson, and the Las Vegas valley—compare with Palms Place high-rise living and tour with the local team.",
};

/** Expanded /luxury-homes — estates & high-rise contrast. */
export function LuxuryHomesPageBody() {
  const related = relatedLinksForPath("/luxury-homes");
  const webPageJsonLd = getWebPageJsonLdForPath("/luxury-homes", pageMeta, {
    pageType: "CollectionPage",
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/luxury-homes", [
    { name: "Home", path: "/" },
    { name: "Luxury homes", path: "/luxury-homes" },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Las Vegas luxury homes for sale — Summerlin, Henderson &amp; the valley
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        Explore luxury homes for sale in Las Vegas—from Summerlin and Henderson estates to executive
        single-family in the broader valley. Buyer tours with {siteContact.buyerSpecialistName},{" "}
        {siteContact.buyerSpecialistTitle}, and the Palms Place team—{siteContact.brokerage}.
      </p>

      <section className="mt-12" aria-labelledby="luxury-estates-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="luxury-estates-heading"
        >
          What counts as a luxury home in Las Vegas?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          When buyers search for expensive homes in Las Vegas or estate-caliber properties, they
          usually balance schools, lot size, privacy, and commute. Your agent helps you compare
          active luxury inventory against recent sales—not generic online estimates—and aligns
          showings with disclosure review.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="luxury-vs-high-rise-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="luxury-vs-high-rise-heading"
        >
          Should you buy an estate or a Palms Place high-rise?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Luxury single-family in Summerlin or Henderson often trades on land, schools, and outdoor
          space. Palms Place condos emphasize vertical living, HOA amenities, and Strip proximity.
          Many clients tour both—compare{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/condos">
            Las Vegas high-rise &amp; Palms Place condos
          </Link>{" "}
          and the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            building guide
          </Link>{" "}
          before you choose a product type.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="luxury-search-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="luxury-search-heading"
        >
          How do you search luxury homes near Las Vegas?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Start with{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/homes">
            homes for sale in Las Vegas
          </Link>
          , browse{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/communities">
            communities
          </Link>{" "}
          for neighborhood context, or use{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/popular-searches">
            popular searches
          </Link>{" "}
          for topic shortcuts.
        </p>
      </section>

      <PageFaqSection
        pathname="/luxury-homes"
        headingId="luxury-homes-faq-heading"
        heading="Luxury homes FAQ"
        intro="Estates versus Palms Place high-rise living in Las Vegas."
        items={luxuryHomesPageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
