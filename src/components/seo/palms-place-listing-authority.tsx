import Link from "next/link";
import { CalendlyLink } from "@/components/shared/calendly-link";
import { getListingAuthoritySection } from "@/lib/content/palms-place-listing-authority";
import { getTelHref, siteContact } from "@/lib/site-contact";

type PalmsPlaceListingAuthorityProps = {
  pathname: string;
};

/**
 * Unique per-route proof section: Dr. Jan Duffy as Palms Place listing specialist
 * and team leader. First-party listing work only — no fabricated rankings.
 */
export function PalmsPlaceListingAuthority({ pathname }: PalmsPlaceListingAuthorityProps) {
  const section = getListingAuthoritySection(pathname);
  if (!section) return null;

  const phone = siteContact.phone;
  const tel = phone ? getTelHref(phone) : undefined;

  return (
    <section
      aria-labelledby="listing-authority-heading"
      className="border-t border-palms-gold/20 bg-palms-gold/5"
      id="listing-authority"
    >
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-palms-gold-muted">
          Palms Place listing specialist
        </p>
        <h2
          className="font-display mt-3 text-2xl font-semibold tracking-tight text-palms-cream md:text-3xl"
          id="listing-authority-heading"
        >
          {section.heading}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">{section.answer}</p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-palms-cream/85">
          {section.proofs.map((proof) => (
            <li key={proof} className="leading-relaxed">
              {proof}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-palms-cream/60">
          First-party Palms Place listing work—not a purchased ranking, review-count badge, or invented
          award. {siteContact.brokerage} · Nevada license {siteContact.license}.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link
            className="font-medium text-palms-gold underline-offset-4 hover:underline"
            href={section.ctaHref}
          >
            {section.ctaLabel}
          </Link>
          {phone && tel ? (
            <a className="font-medium text-palms-gold underline-offset-4 hover:underline" href={tel}>
              Call {phone}
            </a>
          ) : null}
          <CalendlyLink>Schedule a Palms Place consult</CalendlyLink>
        </div>
      </div>
    </section>
  );
}
