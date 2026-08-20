import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { CalendlyLink } from "@/components/shared/calendly-link";
import { connectPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import {
  formatOfficeAddressLine,
  formatOfficeHoursWithSpecial,
  getTelHref,
  siteContact,
} from "@/lib/site-contact";

const pageMeta = {
  name: "Connect with the Palms Place team — Las Vegas Strip condos",
  description:
    "Follow Palms Place updates, office NAP, and social channels for Las Vegas Strip high-rise condos with Dr. Jan Duffy at Berkshire Hathaway.",
};

/** Expanded /connect — stay in touch; aligns with utility nav + social links. */
export function ConnectPageBody() {
  const related = relatedLinksForPath("/connect");
  const phone = siteContact.phone;
  const tel = phone ? getTelHref(phone) : undefined;
  const hoursLine = formatOfficeHoursWithSpecial();
  const facebookHref =
    process.env.NEXT_PUBLIC_FACEBOOK_URL ?? siteContact.facebookUrl ?? "https://www.facebook.com/palmsplace";
  const youtubeHref =
    process.env.NEXT_PUBLIC_YOUTUBE_URL ?? siteContact.youtubeUrl ?? "https://www.youtube.com/";
  const gbpHref = siteContact.googleBusinessProfileUrl?.trim();
  const writeReviewHref = siteContact.googleWriteReviewUrl?.trim();
  const webPageJsonLd = getWebPageJsonLdForPath("/connect", pageMeta, {
    aboutListingAgent: true,
    mainEntity: "listing-agent",
    pageType: "ContactPage",
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/connect", [
    { name: "Home", path: "/" },
    { name: "Connect", path: "/connect" },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Connect with the Palms Place team in Las Vegas
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        Stay in touch with {siteContact.teamBrandName}—{siteContact.brokerage}. Use this page for
        office location, hours, and social follow-ups;{" "}
        <CalendlyLink>schedule a tour or call on Calendly</CalendlyLink>
        ; or use{" "}
        <Link className="text-palms-gold underline-offset-4 hover:underline" href="/contact">
          contact
        </Link>{" "}
        for phone, email, and the office map.
      </p>

      <section className="mt-12" aria-labelledby="connect-office-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="connect-office-heading">
          Where is the Palms Place real estate office?
        </h2>
        <address className="mt-4 not-italic leading-relaxed text-palms-cream/85">
          {formatOfficeAddressLine()}
        </address>
        {hoursLine ? <p className="mt-2 text-palms-cream/80">{hoursLine}</p> : null}
        {phone && tel ? (
          <p className="mt-4">
            <a className="font-medium text-palms-gold underline-offset-4 hover:underline" href={tel}>
              Call {phone}
            </a>
          </p>
        ) : null}
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          NAP here should match your Google Business Profile and the footer on every page. Buying or
          selling at the tower? Start with the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            Palms Place building guide
          </Link>
          .
        </p>
      </section>

      <section className="mt-12" aria-labelledby="connect-social-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="connect-social-heading">
          How do I follow Palms Place on social and video?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Watch{" "}
          <a
            className="text-palms-gold underline-offset-4 hover:underline"
            href={youtubeHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            Dr. Jan Duffy on YouTube
          </a>{" "}
          for tours and listing context
          {gbpHref ? (
            <>
              ; open the{" "}
              <a
                className="text-palms-gold underline-offset-4 hover:underline"
                href={gbpHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Business Profile for Palms Place Condos
              </a>
            </>
          ) : null}
          {writeReviewHref ? (
            <>
              ;{" "}
              <a
                className="text-palms-gold underline-offset-4 hover:underline"
                href={writeReviewHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                leave a Google review
              </a>
            </>
          ) : null}
          . The{" "}
          <a
            className="text-palms-gold underline-offset-4 hover:underline"
            href={facebookHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            Palms Place Facebook page
          </a>{" "}
          is building/resort context—not this brokerage’s listing profile. For topic shortcuts, see{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/popular-searches">
            popular Palms Place &amp; Las Vegas searches
          </Link>
          .
        </p>
      </section>

      <section className="mt-12" aria-labelledby="connect-cite-heading">
        <h2 className="font-display text-2xl font-semibold text-palms-cream" id="connect-cite-heading">
          How should other sites cite Palms Place Condos?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Use <strong className="text-palms-cream">https://www.palmsplacecondos.com</strong> (www). Suggested
          anchor: “Palms Place condos for sale — Dr. Jan Duffy.” Do not cite Palms.com, Booking,
          Tripadvisor, or Zillow as this brokerage. Owned profiles that should point here: Google
          Business Profile website field, YouTube About, and the Berkshire Hathaway agent page. Read{" "}
          <Link
            className="text-palms-gold underline-offset-4 hover:underline"
            href="/guide/palms-place-condos-vs-hotel"
          >
            Palms Place condos vs Palms.com hotel
          </Link>
          .
        </p>
      </section>

      <section className="mt-12" aria-labelledby="connect-next-step-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="connect-next-step-heading"
        >
          What is the best next step after connecting?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          <CalendlyLink>Schedule a call or visit</CalendlyLink>
          , browse{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/buyers">
            the buyer guide
          </Link>
          , or return to{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/">
            the homepage
          </Link>
          .
        </p>
      </section>

      <PageFaqSection
        pathname="/connect"
        headingId="connect-faq-heading"
        heading="How is Connect different from the Palms Place contact page?"
        intro="How this page differs from contact, how office details stay aligned with GBP, and which URL other sites should cite."
        items={connectPageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
