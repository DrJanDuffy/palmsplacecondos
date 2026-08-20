import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { CalendlyLink } from "@/components/shared/calendly-link";
import { photosHubPageFaq } from "@/lib/content/discoverability-page-faqs";
import { photoGalleries } from "@/lib/content/media-gallery";
import { relatedLinksForPath } from "@/lib/internal-links";
import {
  getBreadcrumbListJsonLd,
  getItemListJsonLd,
  getWebPageJsonLdForPath,
} from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

const path = "/photos";

const pageMeta = {
  name: "Palms Place condo photos — Las Vegas Strip high-rise galleries",
  description:
    "Photo galleries for Palms Place condos for sale on the Las Vegas Strip—unit interiors, Strip views, and listing photography with Dr. Jan Duffy.",
};

export function PhotosHubPageBody() {
  const related = relatedLinksForPath(path);
  const webPageJsonLd = getWebPageJsonLdForPath(path, pageMeta, {
    aboutPalmsPlace: true,
    pageType: "CollectionPage",
    hasFaq: true,
    hasItemList: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd(path, [
    { name: "Home", path: "/" },
    { name: "Photos", path },
  ]);
  const itemListJsonLd = getItemListJsonLd(path, {
    name: "Palms Place photo galleries",
    description: pageMeta.description,
    items: photoGalleries.map((gallery) => ({
      name: gallery.h1,
      path: gallery.path,
      description: gallery.lede,
    })),
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={itemListJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
          Palms Place condo photos in Las Vegas
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        Listing photography for Palms Place residences at 4381 W Flamingo Road—Strip views, furnished
        interiors, and balcony context. Galleries support buyers researching {siteContact.gbpBusinessName}{" "}
        inventory before a tour with {siteContact.agentName}.
      </p>

      <section className="mt-12" aria-labelledby="photo-galleries-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="photo-galleries-heading"
        >
          Which Palms Place photo galleries are live?
        </h2>
        <ul className="mt-6 space-y-4">
          {photoGalleries.map((gallery) => (
            <li key={gallery.slug}>
              <Link
                className="font-medium text-palms-gold underline-offset-4 hover:underline"
                href={gallery.path}
              >
                {gallery.h1}
              </Link>
              <p className="mt-1 text-sm leading-relaxed text-palms-cream/70">{gallery.lede}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="photos-next-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="photos-next-heading">
          How do you tour a Palms Place unit you saw in photos?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          <CalendlyLink>Schedule a showing</CalendlyLink>
          {" "}
          or{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/contact">
            contact the office
          </Link>
          . Photos do not replace disclosures—verify HOA, furnishings, and status with your agent.
        </p>
      </section>

      <PageFaqSection
        pathname={path}
        headingId="photos-hub-faq-heading"
        heading="What should buyers know about Palms Place listing photos?"
        items={photosHubPageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
