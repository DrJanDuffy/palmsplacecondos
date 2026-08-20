import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/shared/button-link";
import { CalendlyButton } from "@/components/shared/calendly-link";
import { SectionEyebrow } from "@/components/shared/section-heading";
import { getGbpDescription, getTelHref, siteContact } from "@/lib/site-contact";
import heroTowerDusk from "../../../public/images/hero-tower-dusk.webp";

export function HeroPalmsPlace() {
  const phone = siteContact.phone;
  const tel = phone ? getTelHref(phone) : undefined;
  const description = getGbpDescription();

  return (
    <section aria-labelledby="hero-heading" className="relative isolate min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          alt="Palms Place condo tower at dusk on the Las Vegas Strip — real building photo"
          className="object-cover"
          fetchPriority="high"
          fill
          placeholder="blur"
          priority
          quality={65}
          sizes="100vw"
          src={heroTowerDusk}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-palms-charcoal via-palms-charcoal/75 to-palms-charcoal/20"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(197,163,90,0.12),transparent)]"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-5xl flex-col justify-end px-6 pb-20 pt-32 md:pb-28 md:pt-36">
        <div className="palms-reveal">
          <SectionEyebrow>Las Vegas Strip high-rise residences</SectionEyebrow>

          <h1
            className="font-display mt-8 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-palms-cream md:text-5xl lg:text-6xl"
            id="hero-heading"
          >
            Palms Place Condos for Sale in Las Vegas
          </h1>

          <p className="palms-reveal-delay-1 mt-6 max-w-2xl text-base leading-relaxed text-palms-cream/90 md:text-lg">
            {siteContact.gbpBusinessName} is a high-rise at 4381 W Flamingo Road, west of the Las
            Vegas Strip. {description ?? "Browse studio and one-bedroom inventory with Dr. Jan Duffy."}
          </p>

          {phone && tel ? (
            <p className="palms-reveal-delay-2 mt-4 text-sm text-palms-cream/75 md:text-base">
              Call{" "}
              <a className="font-medium text-palms-gold underline-offset-4 hover:underline" href={tel}>
                {phone}
              </a>
              {" · "}
              {siteContact.primaryServiceArea}
            </p>
          ) : null}

          <div className="palms-reveal-delay-2 mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <ButtonLink href="/search" variant="primary">
              Browse listings
            </ButtonLink>
            <CalendlyButton variant="secondary">Schedule an appointment</CalendlyButton>
            <Link
              className="text-sm font-medium text-palms-gold/90 underline-offset-4 transition-colors hover:text-palms-gold hover:underline"
              href="#listings"
            >
              View live listings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
