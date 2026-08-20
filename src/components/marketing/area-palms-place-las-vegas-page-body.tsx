import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { areaPalmsPlacePageFaq } from "@/lib/content/discoverability-page-faqs";
import { formatPalmsPlaceTowerAddressLine, palmsPlaceTower } from "@/lib/content/palms-place-building";
import { relatedLinksForPath } from "@/lib/internal-links";
import { resolveMapEmbedSrc } from "@/lib/maps-embed";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { CalendlyLink } from "@/components/shared/calendly-link";

const path = "/area/palms-place-las-vegas";

const pageMeta = {
  name: "Palms Place location — West Flamingo & Paradise, Las Vegas NV",
  description:
    "Where Palms Place sits on the Las Vegas Strip corridor—4381 W Flamingo Rd, Paradise 89103, directions, and how the tower relates to resort and high-rise living.",
};

const mapsEmbedSrc = resolveMapEmbedSrc({
  query: formatPalmsPlaceTowerAddressLine(),
  coords: {
    latitude: palmsPlaceTower.latitude,
    longitude: palmsPlaceTower.longitude,
  },
  embedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY?.trim(),
});

/** GEO / entity page for the Palms Place tower — building address, not team office. */
export function AreaPalmsPlaceLasVegasPageBody() {
  const related = relatedLinksForPath(path);
  const webPageJsonLd = getWebPageJsonLdForPath(path, pageMeta, {
    aboutPalmsPlace: true,
    mainEntity: "palms-place",
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd(path, [
    { name: "Home", path: "/" },
    { name: "Palms Place area", path },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Palms Place location — West Flamingo &amp; Paradise, Las Vegas
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        Palms Place is a {palmsPlaceTower.floors}-story residential tower at{" "}
        <strong className="font-semibold text-palms-cream">{formatPalmsPlaceTowerAddressLine()}</strong>
        , west of the Las Vegas Strip in the Paradise area (ZIP {palmsPlaceTower.postalCode}). This page
        orients buyers and sellers on geography and access. Book office tours on{" "}
        <CalendlyLink>Calendly</CalendlyLink>
        ; NAP for the {siteContact.teamBrandName} is on the{" "}
        <Link className="text-palms-gold underline-offset-4 hover:underline" href="/contact">
          contact page
        </Link>
        .
      </p>

      <section className="mt-12" aria-labelledby="area-strip-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="area-strip-heading">
          Is Palms Place on the Las Vegas Strip?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Palms Place is Strip-adjacent on West Flamingo Road—close to resort and entertainment
          corridors without being the same product as a hotel room on Las Vegas Boulevard. Commute,
          noise, and walk time depend on which venue you visit most; tour at the hours you expect to
          use the home.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="area-paradise-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="area-paradise-heading"
        >
          What is the Paradise / 89103 context for buyers?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Paradise is the broader Las Vegas valley address many Strip-adjacent towers use. Buyers
          comparing lot size, commute, or single-family neighborhoods should also review{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/communities">
            Las Vegas communities
          </Link>{" "}
          and{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/homes">
            valley homes for sale
          </Link>{" "}
          before assuming a high-rise fits daily life.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="area-map-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="area-map-heading">
          Where is Palms Place on the map at 4381 W Flamingo Road?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Use the map for directions to the building. Listing tours and office meetings may use
          different addresses—confirm with your agent which pin applies to your appointment.
        </p>
        <div className="mt-6 overflow-hidden rounded-xl border border-palms-gold/20">
          <iframe
            allowFullScreen
            className="aspect-[4/3] w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={mapsEmbedSrc}
            title={`Map of Palms Place at ${formatPalmsPlaceTowerAddressLine()}`}
          />
        </div>
        <p className="mt-4 text-sm text-palms-cream/70">
          <a
            className="text-palms-gold underline-offset-4 hover:underline"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatPalmsPlaceTowerAddressLine())}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Open directions in Google Maps
          </a>
        </p>
      </section>

      <section className="mt-12" aria-labelledby="area-guides-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="area-guides-heading">
          What should you read after the location page?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            Palms Place building guide
          </Link>
          ,{" "}
          <Link
            className="text-palms-gold underline-offset-4 hover:underline"
            href="/guide/palms-place-amenities-and-resort-access"
          >
            amenities &amp; resort access
          </Link>
          , and{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/guide/buying-palms-place">
            buying field guide
          </Link>{" "}
          go deeper than geography alone.
        </p>
      </section>

      <PageFaqSection
        pathname={path}
        headingId="area-palms-place-faq-heading"
        heading="Where is Palms Place in Las Vegas, and how do I get there?"
        intro="Building address, Strip adjacency, and how this differs from the team office."
        items={areaPalmsPlacePageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
