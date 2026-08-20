import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { OfficeNap } from "@/components/shared/office-nap";
import { getContactPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { resolveMapEmbedSrc } from "@/lib/maps-embed";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import {
  formatOfficeAddressLine,
  formatTeamPhrase,
  getGbpDescription,
  siteContact,
} from "@/lib/site-contact";

const pageMeta = {
  name: `Contact ${siteContact.gbpBusinessName} — Las Vegas office`,
  description:
    "Office NAP, hours, map, and call/directions for Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties.",
};

/** Expanded /contact — NAP, hours, map embed, Call / Directions / Google entry. */
export function ContactPageBody() {
  const related = relatedLinksForPath("/contact");
  const officeLine = formatOfficeAddressLine() || "Las Vegas, NV";
  const officeCoords =
    typeof siteContact.officeLatitude === "number" &&
    typeof siteContact.officeLongitude === "number"
      ? { latitude: siteContact.officeLatitude, longitude: siteContact.officeLongitude }
      : undefined;
  const embedSrc = resolveMapEmbedSrc({
    query: officeLine,
    coords: officeCoords,
    overrideUrl:
      process.env.NEXT_PUBLIC_CONTACT_MAP_EMBED_URL?.trim() ||
      siteContact.contactMapEmbedUrl?.trim(),
    embedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY?.trim(),
  });
  const webPageJsonLd = getWebPageJsonLdForPath("/contact", pageMeta, {
    aboutListingAgent: true,
    mainEntity: "listing-agent",
    pageType: "ContactPage",
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/contact", [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);
  const gbpDescription = getGbpDescription();

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Contact {siteContact.gbpBusinessName} — Las Vegas office
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        {gbpDescription || `${formatTeamPhrase()}. ${siteContact.brokerage}.`}
      </p>

      <OfficeNap
        className="mt-10"
        footnote={`NAP, hours, and service area match the Google Business Profile for ${siteContact.gbpBusinessName}.`}
      />

      <section className="mt-10" aria-labelledby="contact-map-heading">
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="contact-map-heading">
          How do I get directions to the Palms Place Condos office?
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          Use the map for the team office NAP—not the Palms Place tower at 4381 W Flamingo Road.
          Confirm which pin applies to your appointment before you drive.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-palms-gold/15">
          <iframe
            allowFullScreen
            className="aspect-[4/3] min-h-[240px] w-full max-w-full border-0 md:aspect-auto md:h-[480px] md:min-h-[360px]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={embedSrc}
            title={`Map — office at ${officeLine}`}
          />
        </div>
      </section>

      <section className="mt-10" aria-labelledby="contact-browse-heading">
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="contact-browse-heading">
          What can I browse while I contact the Palms Place team?
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/condos">
            Palms Place &amp; high-rise condos
          </Link>{" "}
          ·{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/sell">
            Sell with the team
          </Link>{" "}
          ·{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/search">
            Live listings search
          </Link>
        </p>
      </section>

      <PageFaqSection
        pathname="/contact"
        headingId="contact-faq-heading"
        heading="How do I contact the Palms Place real estate team?"
        intro="Office NAP, hours, and which inbox to use."
        items={getContactPageFaq()}
      />

      <RelatedPages links={related} />
    </article>
  );
}
