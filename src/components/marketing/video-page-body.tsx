import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { ButtonAnchor, ButtonLink } from "@/components/shared/button-link";
import { CalendlyButton } from "@/components/shared/calendly-link";
import { relatedLinksForPath } from "@/lib/internal-links";
import {
  getAgentVideoObjectJsonLd,
  getBreadcrumbListJsonLd,
  getWebPageJsonLdForPath,
} from "@/lib/schema";
import {
  formatOfficeAddressLine,
  formatOfficeHoursWithSpecial,
  getTelHref,
  siteContact,
} from "@/lib/site-contact";

const PATH = "/video";
const YOUTUBE_SRC = "/videos/dr-jan-duffy-palms-place-listing-specialist-youtube.mp4";
const SHORTS_SRC = "/videos/dr-jan-duffy-palms-place-listing-specialist-shorts.mp4";

const pageMeta = {
  name: "Dr. Jan Duffy Palms Place listing specialist video",
  description:
    "First-party Palms Place video: Dr. Jan Duffy, listing specialist and team leader, with tower and unit #8322 photography at 4381 W Flamingo Road.",
};

const videoFaq = [
  {
    question: "Who is the Palms Place realtor in this video?",
    answer:
      "Dr. Jan Duffy, Realtor, is the listing specialist, team leader, and Palms Place Buyers Specialist at Berkshire Hathaway HomeServices Nevada Properties (Nevada license S.0197614.LLC). Buyers and sellers in this tower work with her first. This is not a citywide ranking badge.",
  },
  {
    question: "Is this Palms Place hotel booking or condos for sale?",
    answer:
      "Condos for sale. The video uses this brokerage’s tower and listing photos. Hotel stays belong on the official Palms Place resort site. Ownership, HOA packets, and tours stay with Dr. Jan Duffy.",
  },
  {
    question: "How do I tour Palms Place after watching?",
    answer:
      "Call the office number on this page or schedule on Calendly. Tours are at 4381 W Flamingo Road. Confirm price and HOA documents for any unit, including featured #8322, before you offer.",
  },
];

export function VideoPageBody() {
  const related = relatedLinksForPath(PATH);
  const officeLine = formatOfficeAddressLine();
  const phone = siteContact.phone ?? "";
  const tel = phone ? getTelHref(phone) : undefined;
  const webPageJsonLd = getWebPageJsonLdForPath(PATH, pageMeta, {
    aboutListingAgent: true,
    aboutPalmsPlace: true,
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd(PATH, [
    { name: "Home", path: "/" },
    { name: "Video", path: PATH },
  ]);
  const videoJsonLd = getAgentVideoObjectJsonLd(PATH);

  return (
    <>
      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <StructuredData data={webPageJsonLd} />
        <StructuredData data={breadcrumbJsonLd} />
        <StructuredData data={videoJsonLd} />
        <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
          Dr. Jan Duffy Palms Place listing specialist — Las Vegas video
        </h1>
        <AgentHeroBadge className="mt-6" />
        <p className="mt-6 text-lg leading-relaxed text-palms-cream/85">
          {siteContact.agentName} is the listing specialist for Palms Place at 4381 W Flamingo Road.
          This 48-second cut uses first-party building and listing photos. Call {phone} to tour.
        </p>

        <figure className="mt-10 overflow-hidden rounded-2xl border border-palms-gold/20 bg-black">
          <video
            aria-label="Dr. Jan Duffy Palms Place listing specialist — 16 by 9"
            className="aspect-video w-full bg-black"
            controls
            playsInline
            poster="/images/hero-tower-dusk.webp"
            preload="metadata"
          >
            <source src={YOUTUBE_SRC} type="video/mp4" />
          </video>
          <figcaption className="border-t border-palms-gold/15 px-4 py-3 text-sm text-palms-cream/70">
            16:9 cut for YouTube and this page. Captions on screen. Add live VO before posting to
            Reels if you want her voice on the file.
          </figcaption>
        </figure>

        <div className="mt-6 flex flex-wrap gap-3">
          {tel ? (
            <ButtonAnchor href={tel} rel="noopener" target="_self">
              Call {phone}
            </ButtonAnchor>
          ) : (
            <ButtonLink href="/contact">Contact the office</ButtonLink>
          )}
          <CalendlyButton variant="secondary">Schedule a Palms Place showing</CalendlyButton>
        </div>

        <section className="mt-12" aria-labelledby="video-vertical-heading">
          <h2
            className="font-display text-2xl font-semibold text-palms-cream"
            id="video-vertical-heading"
          >
            Where is the vertical Reels cut?
          </h2>
          <p className="mt-4 leading-relaxed text-palms-cream/85">
            Use the 9:16 file for Google Business Profile, Instagram Reels, and YouTube Shorts. Same
            captions. Same first-party photos.
          </p>
          <figure className="mx-auto mt-6 max-w-xs overflow-hidden rounded-2xl border border-palms-gold/20 bg-black">
            <video
              aria-label="Dr. Jan Duffy Palms Place listing specialist — vertical 9 by 16"
              className="aspect-[9/16] w-full bg-black"
              controls
              playsInline
              poster="/images/hero-tower-dusk.webp"
              preload="metadata"
            >
              <source src={SHORTS_SRC} type="video/mp4" />
            </video>
          </figure>
          <p className="mt-4 text-sm text-palms-cream/70">
            Download:{" "}
            <a
              className="text-palms-gold underline-offset-4 hover:underline"
              download
              href={YOUTUBE_SRC}
            >
              16:9 MP4
            </a>
            {" · "}
            <a
              className="text-palms-gold underline-offset-4 hover:underline"
              download
              href={SHORTS_SRC}
            >
              9:16 MP4
            </a>
          </p>
        </section>

        <section
          className="mt-12 rounded-xl border border-palms-gold/15 bg-palms-charcoal-muted/30 p-6"
          aria-labelledby="video-nap-heading"
        >
          <h2 className="font-display text-xl font-semibold text-palms-cream" id="video-nap-heading">
            Palms Place Condos — name, address, and phone
          </h2>
          <ul className="mt-4 space-y-2 text-palms-cream/85">
            <li>{siteContact.gbpBusinessName}</li>
            <li>{officeLine}</li>
            <li>
              {tel ? (
                <a className="text-palms-gold underline-offset-4 hover:underline" href={tel}>
                  {phone}
                </a>
              ) : null}
            </li>
            <li>{formatOfficeHoursWithSpecial()}</li>
            <li>
              Tower tours: 4381 W Flamingo Road, Las Vegas, NV 89103 — not the Lindell office walk.
            </li>
          </ul>
        </section>

        <p className="mt-8 leading-relaxed text-palms-cream/85">
          Next:{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/photos/unit-8322">
            Palms Place #8322 photo gallery
          </Link>
          , the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/team">
            Palms Place listing specialist team page
          </Link>
          , or{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            the Palms Place building guide
          </Link>
          .
        </p>

        <PageFaqSection
          heading="Video questions"
          headingId="video-faq-heading"
          items={videoFaq}
          pathname={PATH}
        />
        <RelatedPages className="mt-14" links={related} />
      </article>
    </>
  );
}
