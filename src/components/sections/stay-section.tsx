import Link from "next/link";
import { StayCarousel } from "@/components/sections/stay-carousel";
import { LuxuryPlaceholder } from "@/components/sections/luxury-placeholder";
import { SectionEyebrow } from "@/components/shared/section-heading";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { siteContact } from "@/lib/site-contact";

export function StaySection() {
  const sharedSearchUrl = getRealScoutSharedSearchUrl();

  return (
    <section
      aria-labelledby="stay-heading"
      className="border-t border-palms-gold/15 bg-palms-charcoal-elevated px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionEyebrow>Stay</SectionEyebrow>
        <h2
          className="font-display mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl"
          id="stay-heading"
        >
          Which Palms Place condos are for sale near the Las Vegas Strip?
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-palms-cream/85">
          Palms Place inventory at 4381 W Flamingo Road typically includes studio and one-bedroom Las
          Vegas high-rise condos near Palms Casino Resort. Compare floor plans below, then search live
          listings or ask {siteContact.agentName} for current HOA details.
        </p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-palms-gold/15 shadow-2xl shadow-black/40">
          <StayCarousel
            autoplayMs={7500}
            label="Studio and one-bedroom residence highlights"
            slides={[
              {
                id: "studio",
                content: (
                  <div className="grid gap-0 md:grid-cols-2">
                    <LuxuryPlaceholder
                      alt="Palms Place studio condo interior with city view — real building photo"
                      className="min-h-[220px] md:min-h-[280px]"
                      variant="stay"
                    />
                    <div className="flex flex-col justify-center bg-palms-charcoal-muted p-8 md:p-10">
                      <h3
                        className="font-display text-2xl font-semibold text-palms-cream md:text-3xl"
                        id="stay-studio-heading"
                      >
                        Are studio condos for sale at Palms Place?
                      </h3>
                      <p className="mt-4 text-palms-cream/80">
                        Yes, when they are actively listed. Efficient studio layouts suit many
                        lock-and-leave Las Vegas condo buyers. Pricing and availability change with
                        the market—verify with your agent and official listing information before you
                        offer.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          className="text-sm font-semibold text-palms-gold underline-offset-4 hover:underline"
                          href="/guide/palms-place-unit-types"
                        >
                          Palms Place studios vs one-bedroom guide
                        </Link>
                        <Link
                          className="text-sm font-semibold text-palms-cream/80 underline-offset-4 hover:text-palms-gold hover:underline"
                          href="/condos"
                        >
                          Browse Las Vegas high-rise condos
                        </Link>
                        <a
                          className="text-sm font-semibold text-palms-cream/80 underline-offset-4 hover:text-palms-gold hover:underline"
                          href={sharedSearchUrl}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Search inventory
                        </a>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                id: "one-bed",
                content: (
                  <div className="grid gap-0 md:grid-cols-2">
                    <LuxuryPlaceholder
                      alt="Palms Place one-bedroom condo living room at twilight — real building photo"
                      className="min-h-[220px] md:min-h-[280px]"
                      src="/images/stay-one-bedroom-interior.webp"
                      variant="stay"
                    />
                    <div className="flex flex-col justify-center bg-palms-charcoal-muted p-8 md:p-10">
                      <h3
                        className="font-display text-2xl font-semibold text-palms-cream md:text-3xl"
                        id="stay-one-bed-heading"
                      >
                        Are one-bedroom condos for sale at Palms Place?
                      </h3>
                      <p className="mt-4 text-palms-cream/80">
                        Yes, when they are on the market. Extra space supports work-from-home and
                        hosting. Compare HOA amenities Palms Place disclosures describe for
                        one-bedroom homes, and use your agent for questions that depend on rent rules
                        and fees.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          className="text-sm font-semibold text-palms-gold underline-offset-4 hover:underline"
                          href="/guide/palms-place-unit-types"
                        >
                          Compare Palms Place floor plans
                        </Link>
                        <Link
                          className="text-sm font-semibold text-palms-cream/80 underline-offset-4 hover:text-palms-gold hover:underline"
                          href="/high-rises"
                        >
                          Las Vegas high-rises
                        </Link>
                        <Link
                          className="text-sm font-semibold text-palms-cream/80 underline-offset-4 hover:text-palms-gold hover:underline"
                          href="/luxury-homes"
                        >
                          Luxury homes in Summerlin and Henderson
                        </Link>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
            className="p-1 md:p-2"
          />
        </div>
      </div>
    </section>
  );
}
