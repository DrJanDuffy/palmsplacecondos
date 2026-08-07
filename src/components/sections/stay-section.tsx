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
      aria-label="Studio and one-bedroom condos for sale at Palms Place"
      className="border-t border-palms-gold/15 bg-palms-charcoal-elevated px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionEyebrow>Stay</SectionEyebrow>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-palms-cream/85">
          Palms Place condos for sale include studio and one-bedroom Las Vegas high-rise condos near
          the Palms Casino Resort. Compare Strip-adjacent residences below, then search live
          inventory or ask {siteContact.agentName} for Palms Place floor plans and HOA details.
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
                      <h2 className="font-display text-2xl font-semibold text-palms-cream md:text-3xl">
                        Studio Condos for Sale at Palms Place
                      </h2>
                      <h3 className="font-display mt-4 text-xl font-semibold text-palms-cream">
                        Studio Floor Plans &amp; Pricing
                      </h3>
                      <p className="mt-3 text-palms-cream/80">
                        Efficient layouts suit many lock-and-leave Las Vegas condo buyers. Pricing
                        and availability for Palms Place condos for sale change with the market—
                        verify with your agent and the official listing information before you offer.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          className="text-sm font-semibold text-palms-gold underline-offset-4 hover:underline"
                          href="/condos"
                        >
                          Browse all Las Vegas high-rise condos
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
                      <h2 className="font-display text-2xl font-semibold text-palms-cream md:text-3xl">
                        One-Bedroom Condos for Sale at Palms Place
                      </h2>
                      <h3 className="font-display mt-4 text-xl font-semibold text-palms-cream">
                        One-Bedroom Floor Plans &amp; Pricing
                      </h3>
                      <p className="mt-3 text-palms-cream/80">
                        Extra space supports work-from-home and hosting. Compare HOA amenities
                        Palms Place disclosures describe for one-bedroom homes, and use your
                        agent for condo investment Las Vegas questions that depend on rent rules and
                        fees.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          className="text-sm font-semibold text-palms-gold underline-offset-4 hover:underline"
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
