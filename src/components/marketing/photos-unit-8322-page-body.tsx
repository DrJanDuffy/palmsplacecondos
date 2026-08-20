import Link from "next/link";
import { PhotoGalleryGrid } from "@/components/seo/photo-gallery-grid";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { ButtonAnchor, ButtonLink } from "@/components/shared/button-link";
import { CalendlyButton } from "@/components/shared/calendly-link";
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
    { aboutPalmsPlace: true, mainEntity: "featured-listing" },
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

      <section className="mt-12" aria-labelledby="unit-photos-faq-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="unit-photos-faq-heading"
        >
          What should buyers know about these photos?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          These are professional listing photos for MLS #{featuredListing.mlsNumber}. Furnishings,
          art, and electronics convey only as stated in the inventory exhibit—not by photo alone.
          Views, light, and sound vary by time of day; tour the unit before you write an offer.
        </p>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Represented by {siteContact.agentName}, {siteContact.brokerage}. Service area:{" "}
          {siteContact.primaryServiceArea}.
        </p>
      </section>

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
