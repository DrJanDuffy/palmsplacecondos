import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { OfficeNap } from "@/components/shared/office-nap";
import { PHOTO_LICENSE_REQUEST_PATH, photoUsePage, photoUsePageFaq } from "@/lib/content/photo-use";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

const path = photoUsePage.path;

export function PhotoUsePageBody() {
  const related = relatedLinksForPath(path);
  const webPageJsonLd = getWebPageJsonLdForPath(
    path,
    { name: photoUsePage.h1, description: photoUsePage.description },
    { aboutListingAgent: true, hasFaq: true },
  );
  const breadcrumbJsonLd = getBreadcrumbListJsonLd(path, [
    { name: "Home", path: "/" },
    { name: "Photo use", path },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />

      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        {photoUsePage.h1}
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        Listing photos on this site market Palms Place condos for sale with {siteContact.agentName}.
        They are not Creative Commons, not a stock catalog, and not free to copy onto another site.
        Credit, copyright, and how to ask for permission are below.
      </p>

      <section className="mt-10" aria-labelledby="photo-credit-heading">
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="photo-credit-heading">
          Who is the creator and copyright holder?
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          <strong className="font-semibold text-palms-cream">Creator / credit:</strong>{" "}
          {siteContact.agentName}.
        </p>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          <strong className="font-semibold text-palms-cream">Copyright notice:</strong>{" "}
          {siteContact.brokerage}.
        </p>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          Gallery pages credit {siteContact.agentName} and {siteContact.brokerage} next to the
          photos. This page is the written license for those images.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="photo-allowed-heading">
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="photo-allowed-heading">
          What use is allowed without asking?
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          Viewing photos on palmsplacecondos.com, sharing a link to a gallery page, and using the
          images in a showing conversation with {siteContact.agentName} are expected listing uses.
          Downloading files for another website, brochure, social ad, or training set needs written
          permission. MLS or brokerage rules can be stricter than this page.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="photo-request-heading">
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="photo-request-heading">
          How do I request permission to reuse a photo?
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          Open the{" "}
          <Link
            className="font-medium text-palms-gold underline-offset-4 hover:underline"
            href={PHOTO_LICENSE_REQUEST_PATH}
          >
            Palms Place Condos contact page
          </Link>
          . Name the unit and file—for example Palms Place #8322 living room with Strip view—and how
          you want to use it. This is not a click-to-buy stock license.
        </p>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          See the photos:{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/photos">
            Palms Place photo galleries
          </Link>{" "}
          and{" "}
          <Link
            className="text-palms-gold underline-offset-4 hover:underline"
            href="/photos/unit-8322"
          >
            Palms Place #8322 listing photos
          </Link>
          .
        </p>
      </section>

      <OfficeNap
        className="mt-10"
        footnote={`NAP matches the Google Business Profile for ${siteContact.gbpBusinessName}.`}
      />

      <PageFaqSection
        pathname={path}
        headingId="photo-use-faq-heading"
        heading="Palms Place listing photo rights — short answers"
        intro={`${siteContact.agentName} · ${siteContact.brokerage} · ${siteContact.primaryServiceArea}.`}
        items={photoUsePageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
