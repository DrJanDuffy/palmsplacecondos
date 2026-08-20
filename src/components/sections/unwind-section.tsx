import Link from "next/link";
import { ButtonAnchor } from "@/components/shared/button-link";
import { CalendlyLink } from "@/components/shared/calendly-link";
import { LuxuryPlaceholder } from "@/components/sections/luxury-placeholder";
import { SectionEyebrow } from "@/components/shared/section-heading";

/**
 * Amenities + resort proximity (merged former PalmsBridgeSection as h3 for valid outline).
 */
export function UnwindSection() {
  return (
    <section
      aria-labelledby="unwind-heading"
      className="border-t border-palms-gold/15 bg-palms-charcoal px-6 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <LuxuryPlaceholder
          alt="Palms Place pool deck with cabanas at golden hour — real building photo"
          className="min-h-[280px] w-full rounded-2xl shadow-2xl shadow-black/30 md:min-h-[340px]"
          variant="unwind"
        />
        <div>
          <SectionEyebrow>Unwind</SectionEyebrow>
          <h2
            className="font-display mt-6 text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl"
            id="unwind-heading"
          >
            Which Palms Place amenities do Las Vegas owners actually get?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-palms-cream/85">
            HOA amenities Palms Place documents describe can include resort-style pool and outdoor
            spaces. Strip-adjacent residences do not automatically include every hotel pool
            program—verify hours, guest policies, and fees with disclosures and your agent.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
            Read the{" "}
            <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/guide/palms-place-amenities-and-resort-access">
              Palms Place amenities and resort access guide
            </Link>
            , the{" "}
            <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/communities">
              Las Vegas condo communities overview
            </Link>
            , or{" "}
            <CalendlyLink>Schedule a Palms Place showing with Dr. Jan</CalendlyLink>
            .
          </p>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-5xl rounded-2xl border border-palms-gold/15 bg-palms-charcoal-elevated/80 p-8 shadow-xl shadow-black/20 backdrop-blur-sm md:mt-20 md:p-10">
        <h3
          className="font-display text-xl font-semibold text-palms-cream md:text-2xl"
          id="unwind-pool-heading"
        >
          Do Palms Place owners get the same pool and cabana access as hotel guests?
        </h3>
        <p className="mt-3 text-palms-cream/80">
          Hotel-adjacent pool experiences may be available through the resort; ownership benefits
          differ. Ask your agent what applies to residents versus hotel guests for Palms Casino
          Resort residences access.
        </p>
        <p className="mt-4 text-sm text-palms-cream/65">
          For resort pool and cabana programs operated by the Palms, see the official resort site.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-palms-gold/15 bg-palms-charcoal-elevated/80 p-8 shadow-xl shadow-black/20 backdrop-blur-sm md:p-10">
        <h3
          className="font-display text-xl font-semibold text-palms-cream md:text-2xl"
          id="unwind-hoa-heading"
        >
          What do Palms Place HOA fees cover in Las Vegas?
        </h3>
        <p className="mt-3 text-palms-cream/80">
          HOA fees, special assessments, rental caps, and parking rules change. Review the latest
          HOA packet and resale package with your agent and a qualified professional before you
          rely on any summary. Start with the{" "}
          <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/guide/palms-place-hoa-and-monthly-costs">
            Palms Place HOA fees and monthly costs guide
          </Link>
          .
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-palms-gold/15 bg-palms-charcoal-muted/60 px-6 py-12 md:flex md:items-center md:justify-between md:gap-14 md:py-16">
        <div>
          <h3
            className="font-display text-xl font-semibold text-palms-cream md:text-2xl"
            id="unwind-resort-heading"
          >
            How close is Palms Place to Palms Casino Resort?
          </h3>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-palms-cream/85">
            Gaming, dining, and entertainment are steps away at Palms Casino Resort—separate from
            condominium ownership and HOA rules. Explore{" "}
            <Link
              className="font-medium text-palms-gold underline-offset-4 hover:underline"
              href="/homes"
            >
              Las Vegas homes for sale
            </Link>
            ,{" "}
            <Link
              className="font-medium text-palms-gold underline-offset-4 hover:underline"
              href="/sell"
            >
              Sell your Palms Place condo — free valuation
            </Link>
            , or{" "}
            <Link
              className="font-medium text-palms-gold underline-offset-4 hover:underline"
              href="/contact"
            >
              contact the team
            </Link>{" "}
            for Palms Place market questions.
          </p>
        </div>
        <div className="mt-8 shrink-0 md:mt-0">
          <ButtonAnchor href="https://www.palms.com/stay/" variant="primary">
            Palms resort stays
          </ButtonAnchor>
        </div>
      </div>
    </section>
  );
}
