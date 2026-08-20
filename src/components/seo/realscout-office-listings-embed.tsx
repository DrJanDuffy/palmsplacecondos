/**
 * RealScout office listings section. Script + custom element mount are deferred
 * until near the viewport (see RealScoutOfficeListingsMount).
 * @see https://support.realscout.com — widget and agent ID configuration.
 */
import Link from "next/link";
import { headers } from "next/headers";
import { RealScoutOfficeListingsMount } from "@/components/seo/realscout-office-listings-mount";
import { SectionRelatedLinks } from "@/components/seo/section-related-links";
import { ButtonAnchor } from "@/components/shared/button-link";
import { SectionEyebrow } from "@/components/shared/section-heading";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { siteContact } from "@/lib/site-contact";
import { cn } from "@/lib/utils";

function telHref(phone: string): string {
  return `tel:${phone.replace(/\D/g, "")}`;
}

const DEFAULT_AGENT = "QWdlbnQtMjI1MDUw";

function safeAgentEncodedId(value: string): string {
  return value.replace(/["'<>]/g, "").trim() || DEFAULT_AGENT;
}

export async function RealScoutOfficeListingsEmbed() {
  const pathname = (await headers()).get("x-pathname") ?? "/";
  const sharedSearchUrl = getRealScoutSharedSearchUrl();
  const agentId = safeAgentEncodedId(
    process.env.NEXT_PUBLIC_REALSCOUT_AGENT_ENCODED_ID ?? DEFAULT_AGENT,
  );

  const markup = `<realscout-office-listings agent-encoded-id="${agentId}" sort-order="PRICE_HIGH" listing-status="For Sale" property-types=",TC"></realscout-office-listings>`;

  return (
    <section
      aria-labelledby="listings-heading"
      className="scroll-mt-20 border-t border-palms-gold/15 bg-linear-to-b from-palms-charcoal via-palms-charcoal to-palms-charcoal-elevated py-16 md:py-20"
      id="listings"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionEyebrow>Office listings</SectionEyebrow>
        <h2
          className="font-display mt-6 text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl"
          id="listings-heading"
        >
          Which Palms Place listings are for sale right now?
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-palms-cream/70">
          Browse Palms Place condos for sale and nearby Las Vegas high-rise listings shown here.
          Availability and details are provided by the listing service. For filters and saved
          criteria, use the curated RealScout search ({siteContact.agentName}, listing specialist and
          team leader for Palms Place). Also see{" "}
          <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/search">
            Search Palms Place and Las Vegas listings
          </Link>
          ,{" "}
          <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/condos">
            Las Vegas Strip high-rise condos for sale
          </Link>
          , and{" "}
          <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/photos">
            Palms Place condo photo galleries
          </Link>
          .
        </p>
        <SectionRelatedLinks pathname={pathname} sectionId="listings-heading" />

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <ButtonAnchor href={sharedSearchUrl} variant="primary">
              Open curated home search
            </ButtonAnchor>
            <Link
              className={cn(
                "inline-flex min-h-[44px] items-center justify-center rounded-lg border border-palms-gold/45 px-4 py-3 text-sm font-semibold text-palms-cream backdrop-blur-sm transition hover:border-palms-gold hover:bg-palms-gold/10",
              )}
              href="/contact"
            >
              Ask about a listing
            </Link>
            {siteContact.phone ? (
              <a
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-palms-gold/35 px-4 py-3 text-sm font-semibold text-palms-cream hover:border-palms-gold hover:bg-palms-gold/10"
                href={telHref(siteContact.phone)}
              >
                Call {siteContact.phone}
              </a>
            ) : null}
          </div>
          <p className="text-xs text-palms-cream/50 sm:max-w-xl">
            Full property search opens RealScout in a new tab. Same URL is linked from the footer as &quot;Search
            homes.&quot;
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-palms-gold/10 bg-palms-charcoal-muted/40 p-4 shadow-inner shadow-black/20 backdrop-blur-sm md:p-6">
          <RealScoutOfficeListingsMount markup={markup} />
        </div>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-palms-cream/55">
          Listing disclaimer: Information deemed reliable but not guaranteed. Listing details (price,
          status, HOA, square footage) must be verified with your agent and official sources. Not
          intended as legal or tax advice.
        </p>
      </div>
    </section>
  );
}
