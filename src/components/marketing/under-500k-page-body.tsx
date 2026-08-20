import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { under500kPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

const pageMeta = {
  name: "Las Vegas homes & condos under $500K — price-band search",
  description:
    "Search Las Vegas homes and condos under $500,000 near the Strip and Palms Place—compare HOA carry on high-rises vs single-family with local Realtors.",
};

/** Expanded /under-500k — price band + HOA reality for high-rises. */
export function Under500kPageBody() {
  const related = relatedLinksForPath("/under-500k");
  const searchUrl = getRealScoutSharedSearchUrl();
  const webPageJsonLd = getWebPageJsonLdForPath("/under-500k", pageMeta, {
    pageType: "CollectionPage",
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/under-500k", [
    { name: "Home", path: "/" },
    { name: "Under $500K", path: "/under-500k" },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Las Vegas homes &amp; condos under $500K
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        Starter and move-up inventory in {siteContact.primaryServiceArea}. Use live search to filter by
        price; in high-rises, compare HOA fees and monthly carry with your agent—not list price alone.
      </p>

      <section className="mt-12" aria-labelledby="under-500k-search-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="under-500k-search-heading"
        >
          How do I search Las Vegas listings under $500,000?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Run{" "}
          <a
            className="font-medium text-palms-gold underline-offset-4 hover:underline"
            href={searchUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            RealScout
          </a>{" "}
          and set your max price to match your pre-approval. Inventory changes daily—what you see online
          is a snapshot, not a guarantee of availability. Pair search with{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/buyers/calculators">
            buyer payment planning
          </Link>{" "}
          before you tour.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="under-500k-condos-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="under-500k-condos-heading"
        >
          Are Palms Place condos ever under $500K?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Availability depends on market conditions, floor plan, and furnishing. When units appear in
          this band, model HOA dues, parking, and rental rules—not just list price. Compare{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            Palms Place building context
          </Link>{" "}
          with{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/high-rises">
            other Strip high-rise condos
          </Link>{" "}
          before you schedule tours.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="under-500k-sfh-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="under-500k-sfh-heading">
          Condos vs single-family under $500K in Las Vegas
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Condos and townhomes may cluster in this range in select buildings; single-family homes often
          push to different neighborhoods at similar monthly payments. Compare{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/condos">
            high-rises &amp; Palms Place
          </Link>{" "}
          with{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/homes">
            Las Vegas homes for sale
          </Link>{" "}
          and browse{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/featured">
            featured listings
          </Link>{" "}
          when you want spotlight inventory in your band.
        </p>
      </section>

      <PageFaqSection
        pathname="/under-500k"
        headingId="under-500k-faq-heading"
        heading="Under $500K FAQ"
        intro="Price-band search realities for Palms Place and valley inventory."
        items={under500kPageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
