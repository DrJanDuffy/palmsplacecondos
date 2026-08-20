import Link from "next/link";
import { CalendlyLink } from "@/components/shared/calendly-link";
import { SectionRelatedLinks } from "@/components/seo/section-related-links";
import { SectionEyebrow } from "@/components/shared/section-heading";
import { siteContact } from "@/lib/site-contact";

/**
 * Commercial-intent section — avoid fabricated stats; align with listing/brokerage disclaimers.
 */
export function WhyBuySection() {
  return (
    <section
      aria-labelledby="why-buy-heading"
      className="border-t border-palms-gold/15 bg-palms-charcoal-muted/30 px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>Why buy</SectionEyebrow>
        <h2
          className="font-display mt-6 text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl"
          id="why-buy-heading"
        >
          Why buy a Palms Place condo in Las Vegas?
        </h2>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-palms-cream/88">
          <p>
            <strong className="font-semibold text-palms-cream">Buyers choose Palms Place</strong> for
            Strip-adjacent high-rise living with HOA amenities such as pool and outdoor space,
            concierge-style convenience, and a lock-and-leave lifestyle—often as a primary home,
            second home, or long-term hold. Confirm HOA rules, fees, and rental restrictions with your
            agent and official disclosures before you write an offer.
          </p>
          <p>
            Palms Place floor plans range from efficient studios to larger one-bedroom layouts. Work
            with {siteContact.agentName} ({siteContact.agentTitle}) and{" "}
            {siteContact.buyerSpecialistName}, {siteContact.buyerSpecialistTitle}, at{" "}
            {siteContact.brokerage} to compare Las Vegas high-rise condos, review disclosures, and
            tour Palms Casino Resort residences access and HOA rules before you write an offer.
          </p>
          <p>
            <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/condos">
              Browse all Las Vegas high-rise condos
            </Link>{" "}
            to compare inventory, review{" "}
            <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/luxury-homes">
              Luxury homes in Summerlin and Henderson
            </Link>{" "}
            for contrast, and read the{" "}
            <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/communities">
              Las Vegas condo communities overview
            </Link>
            , or jump to{" "}
            <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/popular-searches">
              popular Palms Place &amp; Las Vegas searches
            </Link>
            ,{" "}
            <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/featured">
              featured listings
            </Link>
            , and{" "}
            <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/under-500k">
              homes under $500K
            </Link>
            . When you are ready to tour,{" "}
            <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/guide/buying-palms-place">
              Palms Place buying field guide
            </Link>
            , or{" "}
            <CalendlyLink>schedule a showing</CalendlyLink>
            . Thinking about selling? See{" "}
            <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/sell">
              Sell your Palms Place condo — free valuation
            </Link>
            .
          </p>
        </div>
        <SectionRelatedLinks pathname="/" sectionId="why-buy-heading" />
      </div>
    </section>
  );
}
