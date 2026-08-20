/**
 * Factual outbound link to the Palms Casino Resort (hotel) site—not affiliated with this brokerage site.
 */
import Link from "next/link";
import { ButtonAnchor } from "@/components/shared/button-link";
import { SectionEyebrow } from "@/components/shared/section-heading";

export function PalmsBridgeSection() {
  return (
    <section
      aria-labelledby="palms-bridge-heading"
      className="border-t border-palms-gold/15 bg-palms-charcoal-muted px-6 py-20 md:py-24"
    >
      <div className="mx-auto max-w-5xl md:flex md:items-center md:justify-between md:gap-14">
        <div>
          <SectionEyebrow>Palms</SectionEyebrow>
          <h2
            className="font-display mt-6 text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl"
            id="palms-bridge-heading"
          >
            How close is Palms Place to Palms Casino Resort?
          </h2>
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
              selling your condo
            </Link>
            , or{" "}
            <Link
              className="font-medium text-palms-gold underline-offset-4 hover:underline"
              href="/contact"
            >
              contact the agent
            </Link>{" "}
            for Palms Place market questions.
          </p>
        </div>
        <div className="mt-10 shrink-0 md:mt-0">
          <ButtonAnchor href="https://www.palms.com/stay/" variant="primary">
            Palms resort stays
          </ButtonAnchor>
        </div>
      </div>
    </section>
  );
}
