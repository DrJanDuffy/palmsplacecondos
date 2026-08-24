import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { OfficeNap } from "@/components/shared/office-nap";
import { getMapsPageFaq } from "@/lib/content/discoverability-page-faqs";
import {
  GOOGLE_SITES_CITATION_PATH,
  getUniqueGoogleMaps,
  mapsPage,
  type UniqueGoogleMap,
} from "@/lib/content/maps-page";
import { relatedLinksForPath } from "@/lib/internal-links";
import { resolveMapEmbedSrc } from "@/lib/maps-embed";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { formatOfficeAddressLine, siteContact } from "@/lib/site-contact";
import { getSiteUrl } from "@/lib/site-url";

const pageMeta = {
  name: mapsPage.h1,
  description: mapsPage.description,
};

function mapEmbedSrc(place: UniqueGoogleMap): string {
  return resolveMapEmbedSrc({
    query: place.query,
    coords: place.coords,
    embedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY?.trim(),
  });
}

function MapLinks({ place }: { place: UniqueGoogleMap }) {
  return (
    <p className="mt-3 text-sm text-palms-cream/80">
      <a
        className="font-medium text-palms-gold underline-offset-4 hover:underline"
        href={place.mapsUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        Open in Google Maps
      </a>
      {" · "}
      <a
        className="font-medium text-palms-gold underline-offset-4 hover:underline"
        href={place.directionsUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        Directions
      </a>
    </p>
  );
}

/** Unique Google Maps, GBP citation, and Google Sites embed kit. */
export function MapsPageBody() {
  const related = relatedLinksForPath(mapsPage.path);
  const origin = getSiteUrl().replace(/\/$/, "");
  const places = getUniqueGoogleMaps();
  const embedPlaces = places.filter((place) => place.embed);
  const nearbyPlaces = places.filter((place) => !place.embed);
  const officeLine = formatOfficeAddressLine();
  const gbpHref = siteContact.googleBusinessProfileUrl?.trim();
  const reviewHref = siteContact.googleWriteReviewUrl?.trim();
  const citationUrl = `${origin}${GOOGLE_SITES_CITATION_PATH}`;

  const webPageJsonLd = getWebPageJsonLdForPath(mapsPage.path, pageMeta, {
    aboutPalmsPlace: true,
    aboutListingAgent: true,
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd(mapsPage.path, [
    { name: "Home", path: "/" },
    { name: "Maps", path: mapsPage.path },
  ]);
  const mapsJsonLd = {
    "@context": "https://schema.org",
    "@graph": embedPlaces.map((place) => ({
      "@type": "Map",
      "@id": `${origin}${mapsPage.path}#${place.id}`,
      name: place.title,
      description: place.description,
      url: place.mapsUrl,
    })),
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={mapsJsonLd} />

      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        {mapsPage.h1}
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        Two pins matter for Palms Place condos: the Google Business Profile office on Lindell, and
        the tower at 4381 W Flamingo Road. This page publishes those maps as unique citations with
        follow backlinks—not 150 duplicate Google Sites sharing one iframe.
      </p>

      <OfficeNap
        className="mt-10"
        footnote={`NAP on this page matches the Google Business Profile for ${siteContact.gbpBusinessName}.`}
      />

      {embedPlaces.map((place) => (
        <section className="mt-10" aria-labelledby={`map-${place.id}-heading`} key={place.id}>
          <h2
            className="font-display text-xl font-semibold text-palms-cream"
            id={`map-${place.id}-heading`}
          >
            {place.id === "gbp-office"
              ? "Where is the Palms Place Condos office on Google Maps?"
              : "Where is the Palms Place tower on Google Maps?"}
          </h2>
          <p className="mt-3 leading-relaxed text-palms-cream/85">{place.description}</p>
          <div className="mt-4 overflow-hidden rounded-lg border border-palms-gold/15">
            <iframe
              allowFullScreen
              className="aspect-[4/3] min-h-[240px] w-full max-w-full border-0 md:aspect-auto md:h-[420px] md:min-h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={mapEmbedSrc(place)}
              title={place.title}
            />
          </div>
          <MapLinks place={place} />
        </section>
      ))}

      <section className="mt-10" aria-labelledby="maps-citation-heading">
        <h2
          className="font-display text-xl font-semibold text-palms-cream"
          id="maps-citation-heading"
        >
          What NAP should a map citation and backlink use?
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          Use the office NAP—not the tower—when you cite {siteContact.gbpBusinessName} on Google
          Maps, Google Sites, or another directory. Name, address, and phone must match the Google
          Business Profile.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-palms-cream/85">
          <li>
            <strong className="font-semibold text-palms-cream">Name:</strong>{" "}
            {siteContact.gbpBusinessName}
          </li>
          <li>
            <strong className="font-semibold text-palms-cream">Address:</strong> {officeLine}
          </li>
          {siteContact.phone ? (
            <li>
              <strong className="font-semibold text-palms-cream">Phone:</strong> {siteContact.phone}
            </li>
          ) : null}
          <li>
            <strong className="font-semibold text-palms-cream">Hours:</strong>{" "}
            {siteContact.officeHoursLine}
          </li>
          <li>
            <strong className="font-semibold text-palms-cream">Website backlink:</strong>{" "}
            <Link className="text-palms-gold underline-offset-4 hover:underline" href="/">
              Palms Place condos for sale — {siteContact.agentName}
            </Link>
          </li>
        </ul>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          {gbpHref ? (
            <>
              Google Business Profile:{" "}
              <a
                className="text-palms-gold underline-offset-4 hover:underline"
                href={gbpHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                open the GBP map listing
              </a>
              {reviewHref ? " · " : ". "}
            </>
          ) : null}
          {reviewHref ? (
            <a
              className="text-palms-gold underline-offset-4 hover:underline"
              href={reviewHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              Write a Google review
            </a>
          ) : null}
          . License {siteContact.license}. {siteContact.brokerage}.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="google-sites-heading">
        <h2
          className="font-display text-xl font-semibold text-palms-cream"
          id="google-sites-heading"
        >
          How do I embed the GBP map on a Google Site?
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          Publish one Google Site (sites.google.com) as a Google-property citation. Do not clone it
          150 times. The embed is the office GBP map, the office NAP, and a follow link back to this
          website.
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-palms-cream/85">
          <li>Create a site at Google Sites.</li>
          <li>
            Insert → Embed → URL, and paste{" "}
            <a
              className="break-all text-palms-gold underline-offset-4 hover:underline"
              href={GOOGLE_SITES_CITATION_PATH}
            >
              {citationUrl}
            </a>
            .
          </li>
          <li>
            Or Insert → Map and search {siteContact.gbpBusinessName}, {officeLine}.
          </li>
          <li>
            Add a text box with the NAP above and a link to{" "}
            <Link className="text-palms-gold underline-offset-4 hover:underline" href="/">
              {origin}/
            </Link>{" "}
            using the anchor “Palms Place condos for sale — {siteContact.agentName}.”
          </li>
          <li>Publish the Google Site and keep NAP identical to this page.</li>
        </ol>
        <p className="mt-4 text-sm leading-relaxed text-palms-cream/70">
          Preview the citation file:{" "}
          <Link
            className="text-palms-gold underline-offset-4 hover:underline"
            href={GOOGLE_SITES_CITATION_PATH}
          >
            GBP map citation for Google Sites
          </Link>
          .
        </p>
      </section>

      <section className="mt-10" aria-labelledby="nearby-maps-heading">
        <h2
          className="font-display text-xl font-semibold text-palms-cream"
          id="nearby-maps-heading"
        >
          Which unique Google Maps sit near Palms Place?
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          Each landmark below is a different Google Maps query—not a second copy of the office pin.
          Use them to explain drive patterns. They are not Palms Place amenities and not extra GBP
          listings.
        </p>
        <ul className="mt-6 space-y-6">
          {nearbyPlaces.map((place) => (
            <li key={place.id}>
              <h3 className="font-display text-lg font-semibold text-palms-cream">{place.title}</h3>
              <p className="mt-2 leading-relaxed text-palms-cream/85">{place.description}</p>
              <MapLinks place={place} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="why-not-150-heading">
        <h2
          className="font-display text-xl font-semibold text-palms-cream"
          id="why-not-150-heading"
        >
          Why not 150 unique Google Sites with the same map?
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          Scaled pages that repeat one Google Map, one NAP, and one backlink are doorway-style
          content. Google can ignore or demote them, and they can put the Business Profile at risk.
          This site ships unique maps (office vs tower vs landmarks) and one Google Sites embed kit
          with a real citation and a follow backlink to palmsplacecondos.com.
        </p>
      </section>

      <PageFaqSection
        pathname={mapsPage.path}
        headingId="maps-faq-heading"
        heading="Palms Place Google Maps and Google Sites — short answers"
        intro={`${siteContact.agentName} · ${siteContact.brokerage} · ${siteContact.primaryServiceArea}.`}
        items={getMapsPageFaq()}
      />

      <RelatedPages links={related} />
    </article>
  );
}
