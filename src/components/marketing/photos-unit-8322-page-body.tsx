import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { PhotoGalleryGrid } from "@/components/seo/photo-gallery-grid";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { ButtonAnchor, ButtonLink } from "@/components/shared/button-link";
import { CalendlyButton } from "@/components/shared/calendly-link";
import { unit8322PhotosPageFaq } from "@/lib/content/discoverability-page-faqs";
import {
  featuredListing,
  getFeaturedListingDetailsUrl,
} from "@/lib/content/featured-listing";
import {
  getGalleryPhotoSrc,
  unit8322Gallery,
} from "@/lib/content/media-gallery";
import { relatedLinksForPath } from "@/lib/internal-links";
import {
  getBreadcrumbListJsonLd,
  getCurrentFeaturedListingJsonLd,
  getImageGalleryJsonLd,
  getWebPageJsonLdForPath,
} from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

const path = unit8322Gallery.path;

export function PhotosUnit8322PageBody() {
  const related = relatedLinksForPath(path);
  const photos = unit8322Gallery.photos;
  const detailsUrl = getFeaturedListingDetailsUrl();

  const webPageJsonLd = getWebPageJsonLdForPath(
    path,
    {
      name: unit8322Gallery.h1,
      description: unit8322Gallery.metaDescription,
    },
    { aboutPalmsPlace: true, mainEntity: "featured-listing", hasFaq: true },
  );
  const breadcrumbJsonLd = getBreadcrumbListJsonLd(path, [
    { name: "Home", path: "/" },
    { name: "Photos", path: "/photos" },
    { name: "Unit #8322", path },
  ]);
  const galleryJsonLd = getImageGalleryJsonLd(path, {
    name: unit8322Gallery.h1,
    description: unit8322Gallery.metaDescription,
    photos: photos.map((p) => ({
      title: p.title,
      description: p.description,
      src: getGalleryPhotoSrc(p),
      width: p.width,
      height: p.height,
    })),
  });
  const listingJsonLd = getCurrentFeaturedListingJsonLd();

  return (
    <article className="mx-auto max-w-4xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={galleryJsonLd} />
      <StructuredData data={listingJsonLd} />

      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        {unit8322Gallery.h1}
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">{unit8322Gallery.lede}</p>

      <section className="mt-10" aria-labelledby="unit-photos-facts-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="unit-photos-facts-heading"
        >
          What are the listing facts for Palms Place #8322?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Price, status, beds, baths, and square footage below are from the current featured listing
          record. Verify every field with {siteContact.agentName} and official sources before you
          offer—photos do not replace disclosures.
        </p>
      </section>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Listing facts">
        {[
          featuredListing.price,
          featuredListing.status,
          featuredListing.beds,
          featuredListing.baths,
          featuredListing.squareFeet,
          featuredListing.entryLevel,
          `MLS #${featuredListing.mlsNumber}`,
        ].map((fact) => (
          <li key={fact}>
            <span className="inline-flex rounded-md border border-palms-gold/40 px-2.5 py-1 text-xs font-medium text-palms-gold md:text-sm">
              {fact}
            </span>
          </li>
        ))}
      </ul>

      <PhotoGalleryGrid photos={photos} />

      <section className="mt-12" aria-labelledby="unit-photos-tour-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="unit-photos-tour-heading"
        >
          How do you tour Palms Place #8322 or see furnishings in person?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Schedule a showing, open the virtual tour, or review the listing record. Furnishings,
          parking, and HOA rights in photos may not match what conveys—confirm in writing with your
          agent.
        </p>
      </section>

      <PageFaqSection
        pathname={path}
        headingId="unit-photos-faq-heading"
        heading="What do Palms Place #8322 photos show versus the listing?"
        intro={`Represented by ${siteContact.agentName}, ${siteContact.brokerage}. Service area: ${siteContact.primaryServiceArea}.`}
        items={unit8322PhotosPageFaq}
      />

      <div className="mt-10 flex flex-wrap gap-4">
        <CalendlyButton variant="primary">Schedule a showing</CalendlyButton>
        <ButtonAnchor href={featuredListing.virtualTourUrl} variant="secondary">
          {featuredListing.tourLabel}
        </ButtonAnchor>
        <ButtonAnchor href={detailsUrl} variant="secondary">
          {featuredListing.ctaLabel}
        </ButtonAnchor>
        <ButtonLink href="/photos" variant="secondary">
          All photo galleries
        </ButtonLink>
      </div>

      <p className="mt-8 text-sm text-palms-cream/60">
        Listing data deemed reliable but not guaranteed. Source: GLVAR. See also the{" "}
        <Link className="text-palms-gold underline-offset-4 hover:underline" href="/featured">
          featured listings hub
        </Link>
        .
      </p>

      <RelatedPages links={related} />
    </article>
  );
}
