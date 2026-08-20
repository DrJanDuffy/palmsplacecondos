import { CalendlyButton } from "@/components/shared/calendly-link";
import {
  formatOfficeAddressLine,
  formatOfficeHoursWithSpecial,
  getGbpDescription,
  getTelHref,
  siteContact,
} from "@/lib/site-contact";
import { cn } from "@/lib/utils";

const actionClassName =
  "inline-flex min-h-[44px] items-center justify-center rounded-lg border border-palms-gold/40 bg-palms-gold/10 px-4 py-2 text-sm font-medium text-palms-cream transition-colors hover:border-palms-gold hover:bg-palms-gold/20";

type OfficeNapProps = {
  className?: string;
  /** Show GBP business description under the address block. */
  showDescription?: boolean;
  /** Schedule / Call / Directions / Reviews action row. */
  showActions?: boolean;
  /** Extra note under actions (e.g. GBP confirmation). */
  footnote?: string;
};

/**
 * Visible NAP block aligned with Google Business Profile — reuse on contact/connect.
 */
export function OfficeNap({
  className,
  showDescription = true,
  showActions = true,
  footnote,
}: OfficeNapProps) {
  const officeLine = formatOfficeAddressLine();
  const phone = siteContact.phone;
  const tel = phone ? getTelHref(phone) : undefined;
  const hours = formatOfficeHoursWithSpecial();
  const description = getGbpDescription();
  const mapsQuery = encodeURIComponent(officeLine || "Las Vegas, NV");
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`;
  const placeSearchHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const gbpHref = siteContact.googleBusinessProfileUrl?.trim() || placeSearchHref;
  const writeReviewHref =
    siteContact.googleWriteReviewUrl?.trim() || siteContact.googleBusinessProfileUrl?.trim();
  const facebookHref = siteContact.facebookUrl?.trim();

  return (
    <section
      aria-labelledby="office-nap-heading"
      className={cn(
        "rounded-lg border border-palms-gold/20 bg-palms-charcoal-elevated/80 p-6",
        className,
      )}
    >
      <h2 className="font-display text-xl font-semibold text-palms-cream" id="office-nap-heading">
        Where is the Palms Place Condos office in Las Vegas?
      </h2>
      <p className="mt-3 font-display text-lg font-semibold text-palms-cream">
        {siteContact.gbpBusinessName}
      </p>
      <p className="mt-1 text-sm text-palms-cream/65">Real estate agent · {siteContact.brokerage}</p>
      <p className="mt-4 leading-relaxed text-palms-cream/85">
        The sales office is at {officeLine || "the Las Vegas address on this Google Business Profile"}
        —not the Palms Place tower at 4381 W Flamingo Road. Call, map, and hours below match GBP.
      </p>

      {showDescription && description ? (
        <p className="mt-4 leading-relaxed text-palms-cream/85">{description}</p>
      ) : null}

      <dl className="mt-6 space-y-4 text-palms-cream/90">
        {officeLine ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-palms-gold-muted">
              Office
            </dt>
            <dd className="mt-1">
              <address className="not-italic leading-relaxed">{officeLine}</address>
            </dd>
          </div>
        ) : null}

        {hours ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-palms-gold-muted">
              Hours
            </dt>
            <dd className="mt-1 leading-relaxed">{hours}</dd>
          </div>
        ) : null}

        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-palms-gold-muted">
            Service area
          </dt>
          <dd className="mt-1">{siteContact.primaryServiceArea}</dd>
        </div>

        {phone && tel ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-palms-gold-muted">
              Phone
            </dt>
            <dd className="mt-1">
              <a
                className="font-medium text-palms-gold underline-offset-4 hover:underline"
                href={tel}
              >
                {phone}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-6 space-y-1 border-t border-palms-gold/15 pt-5 text-sm text-palms-cream/70">
        <p>
          {siteContact.agentName} · Nevada license {siteContact.license}
        </p>
        <p>{siteContact.agentTitle}</p>
      </div>

      {(siteContact.emailGeneral || siteContact.emailListings) && (
        <div className="mt-5">
          <h3
            className="text-xs font-semibold uppercase tracking-[0.12em] text-palms-gold-muted"
            id="office-email-heading"
          >
            Which email should Palms Place buyers and sellers use?
          </h3>
          <ul className="mt-2 space-y-2 text-palms-cream/90">
            {siteContact.emailGeneral ? (
              <li>
                General &amp; buyers:{" "}
                <a
                  className="font-medium text-palms-gold underline-offset-4 hover:underline"
                  href={`mailto:${siteContact.emailGeneral}`}
                >
                  {siteContact.emailGeneral}
                </a>
              </li>
            ) : null}
            {siteContact.emailListings &&
            siteContact.emailListings !== siteContact.emailGeneral ? (
              <li>
                Listings:{" "}
                <a
                  className="font-medium text-palms-gold underline-offset-4 hover:underline"
                  href={`mailto:${siteContact.emailListings}`}
                >
                  {siteContact.emailListings}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      )}

      {showActions ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <CalendlyButton variant="primary">Schedule an appointment</CalendlyButton>
          {tel ? (
            <a className={actionClassName} href={tel}>
              Call
            </a>
          ) : null}
          <a
            className={actionClassName}
            href={directionsHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            Directions
          </a>
          {writeReviewHref ? (
            <a
              className={actionClassName}
              href={writeReviewHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              Leave a Google review
            </a>
          ) : null}
          <a
            className={actionClassName}
            href={gbpHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Business Profile
          </a>
          {facebookHref ? (
            <a
              className={actionClassName}
              href={facebookHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              Resort Facebook
            </a>
          ) : null}
        </div>
      ) : null}

      {footnote ? <p className="mt-4 text-xs text-palms-cream/60">{footnote}</p> : null}
    </section>
  );
}
