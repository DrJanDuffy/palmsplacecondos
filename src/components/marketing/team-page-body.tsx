import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { getTeamPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import {
  getBreadcrumbListJsonLd,
  getTeamPersonsJsonLd,
  getWebPageJsonLdForPath,
} from "@/lib/schema";
import {
  formatOfficeAddressLine,
  formatOfficeHoursWithSpecial,
  getTelHref,
  siteContact,
} from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

const pageMeta = {
  name: "Palms Place real estate team — Dr. Jan Duffy",
  description:
    "Meet Dr. Jan Duffy, Realtor — listing specialist, team leader, and Palms Place Buyers Specialist at Berkshire Hathaway HomeServices Nevada Properties.",
};

export function TeamPageBody() {
  const related = relatedLinksForPath("/team");
  const officeLine = formatOfficeAddressLine();
  const phone = siteContact.phone ?? "";
  const webPageJsonLd = getWebPageJsonLdForPath("/team", pageMeta, {
    aboutListingAgent: true,
    mainEntity: "listing-agent",
    pageType: "ProfilePage",
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/team", [
    { name: "Home", path: "/" },
    { name: "Team", path: "/team" },
  ]);
  const personsJsonLd = getTeamPersonsJsonLd();

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={personsJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Palms Place real estate team — Las Vegas Strip high-rises
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        <strong className="font-semibold text-palms-cream">{siteContact.teamBrandName}</strong> helps
        buyers and sellers with Palms Place and Las Vegas high-rise condos at {siteContact.brokerage}.
        Visible contact details below match this site&apos;s Google Business Profile and JSON-LD.
      </p>

      <section className="mt-12" aria-labelledby="team-jan-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="team-jan-heading"
        >
          Who leads Palms Place listings and buyer representation?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          {siteContact.agentName} is the {siteContact.agentTitle}. Nevada license{" "}
          {siteContact.license}. Listing and marketing questions, pricing strategy, seller
          representation, buyer tours, HOA review, and offer strategy for Palms Place start with Dr.
          Jan. Email:{" "}
          {siteContact.emailListings ? (
            <a
              className="text-palms-gold underline-offset-4 hover:underline"
              href={`mailto:${siteContact.emailListings}`}
            >
              {siteContact.emailListings}
            </a>
          ) : (
            "see contact page"
          )}{" "}
          (listings) or{" "}
          {siteContact.emailGeneral ? (
            <a
              className="text-palms-gold underline-offset-4 hover:underline"
              href={`mailto:${siteContact.emailGeneral}`}
            >
              {siteContact.emailGeneral}
            </a>
          ) : (
            "see contact page"
          )}{" "}
          (general &amp; buyers).
        </p>
      </section>

      <section className="mt-12" aria-labelledby="team-buyers-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="team-buyers-heading"
        >
          Who helps Palms Place buyers?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          {siteContact.buyerSpecialistName} is also the {siteContact.buyerSpecialistTitle}. Buyers
          start with Dr. Jan for showings, HOA review, and offer strategy—the same Nevada license{" "}
          {siteContact.buyerSpecialistLicense}.
        </p>
      </section>

      <section
        className="mt-12 rounded-xl border border-palms-gold/15 bg-palms-charcoal-muted/30 p-6"
        aria-labelledby="team-nap-heading"
      >
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="team-nap-heading">
          Where is the Palms Place team office, and what is the NAP?
        </h2>
        <ul className="mt-4 space-y-2 text-palms-cream/85">
          <li>
            <span className="text-palms-cream/60">Team: </span>
            {siteContact.teamBrandName}
          </li>
          <li>
            <span className="text-palms-cream/60">Brokerage: </span>
            {siteContact.brokerage}
          </li>
          {officeLine ? (
            <li>
              <span className="text-palms-cream/60">Address: </span>
              {officeLine}
            </li>
          ) : null}
          {phone && getTelHref(phone) ? (
            <li>
              <span className="text-palms-cream/60">Phone: </span>
              <a
                className="text-palms-gold underline-offset-4 hover:underline"
                href={getTelHref(phone)}
              >
                {phone}
              </a>
            </li>
          ) : null}
          {formatOfficeHoursWithSpecial() ? (
            <li>
              <span className="text-palms-cream/60">Hours: </span>
              {formatOfficeHoursWithSpecial()}
            </li>
          ) : null}
          {siteContact.emailGeneral ? (
            <li>
              <span className="text-palms-cream/60">Email: </span>
              <a
                className="text-palms-gold underline-offset-4 hover:underline"
                href={`mailto:${siteContact.emailGeneral}`}
              >
                {siteContact.emailGeneral}
              </a>
            </li>
          ) : null}
        </ul>
        <p className="mt-4 text-sm text-palms-cream/65">
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/contact">
            Contact page with map and directions
          </Link>
        </p>
      </section>

      <section className="mt-12" aria-labelledby="team-work-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="team-work-heading"
        >
          How do I work with the team on Palms Place?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Explore{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            Palms Place building &amp; condos for sale
          </Link>
          , start on the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/buyers">
            buyer guide
          </Link>
          , or see{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/sell">
            sell your Palms Place condo
          </Link>
          . This is general real estate guidance—not legal or tax advice.
        </p>
      </section>

      <PageFaqSection
        pathname="/team"
        headingId="team-faq-heading"
        heading="Who is on the Palms Place real estate team?"
        intro="Listing and buyer representation with Dr. Jan Duffy, plus NAP alignment with GBP."
        items={getTeamPageFaq()}
      />

      <RelatedPages pathname="/team" links={related} />
    </article>
  );
}
