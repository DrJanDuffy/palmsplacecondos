import Image from "next/image";
import Link from "next/link";
import {
  featuredListing,
  getFeaturedListingDetailsUrl,
  isFeaturedListingExternalUrl,
} from "@/lib/content/featured-listing";
import {
  getFeaturedListingHeroPhoto,
  getGalleryPhotoSrc,
} from "@/lib/content/media-gallery";
import { getTelHref, siteContact } from "@/lib/site-contact";

function StarIcon() {
  return (
    <svg aria-hidden className="size-4 shrink-0 fill-current" viewBox="0 0 24 24">
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
    </svg>
  );
}

export function FeaturedListingBanner() {
  const detailsUrl = getFeaturedListingDetailsUrl();
  const external = isFeaturedListingExternalUrl();
  const phone = siteContact.phone;
  const tel = phone ? getTelHref(phone) : undefined;
  const heroPhoto = getFeaturedListingHeroPhoto();
  const heroSrc = getGalleryPhotoSrc(heroPhoto);

  const ctaClassName =
    "inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-lg bg-palms-gold px-5 py-3 text-sm font-semibold text-palms-charcoal shadow-lg shadow-palms-gold/25 transition-colors hover:bg-palms-gold-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palms-gold";
  const secondaryCtaClassName =
    "inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-lg border border-palms-gold/50 bg-transparent px-5 py-3 text-sm font-semibold text-palms-gold transition-colors hover:bg-palms-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palms-gold";

  return (
    <section
      aria-labelledby="featured-listing-heading"
      className="relative z-20 border-t border-palms-gold/25 bg-palms-charcoal px-4 py-8 md:px-6 md:py-10"
    >
      <div className="mx-auto max-w-6xl">
        <article className="overflow-hidden rounded-xl border border-palms-gold/35 shadow-2xl shadow-black/50">
          <div className="flex items-center justify-center gap-2 bg-palms-gold px-4 py-2.5 text-center text-palms-charcoal">
            <StarIcon />
            <h2
              className="text-xs font-bold tracking-[0.2em] uppercase md:text-sm"
              id="featured-listing-heading"
            >
              Which Palms Place condo is featured right now?
            </h2>
            <StarIcon />
          </div>

          <div className="relative aspect-[21/9] w-full min-h-[180px] bg-palms-charcoal-muted md:min-h-[240px]">
            <Image
              alt={heroPhoto.alt}
              className="object-cover"
              fetchPriority="low"
              fill
              sizes="(max-width: 1280px) 100vw, 1152px"
              src={heroSrc}
              title={heroPhoto.title}
            />
          </div>

          <div className="bg-[#1a2744] px-4 py-6 md:px-8 md:py-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
              <div className="shrink-0 space-y-1">
                <p className="font-display text-4xl font-bold tracking-tight text-palms-cream md:text-5xl">
                  {featuredListing.price}
                </p>
                <p className="text-sm font-medium text-palms-gold">{featuredListing.status}</p>
              </div>

              <div className="min-w-0 flex-1 space-y-3">
                <p className="text-sm leading-snug text-palms-cream/95 md:text-base">
                  {featuredListing.addressLine}
                </p>
                <ul className="flex flex-wrap gap-2" aria-label="Property facts">
                  <li>
                    <span className="inline-flex rounded-md border border-palms-gold/50 bg-palms-charcoal/40 px-2.5 py-1 text-xs font-medium text-palms-gold md:text-sm">
                      {featuredListing.beds}
                    </span>
                  </li>
                  <li>
                    <span className="inline-flex rounded-md border border-palms-gold/50 bg-palms-charcoal/40 px-2.5 py-1 text-xs font-medium text-palms-gold md:text-sm">
                      {featuredListing.baths}
                    </span>
                  </li>
                  <li>
                    <span className="inline-flex rounded-md border border-palms-gold/50 bg-palms-charcoal/40 px-2.5 py-1 text-xs font-medium text-palms-gold md:text-sm">
                      {featuredListing.squareFeet}
                    </span>
                  </li>
                  <li>
                    <span className="inline-flex rounded-md border border-palms-gold/50 bg-palms-charcoal/40 px-2.5 py-1 text-xs font-medium text-palms-gold md:text-sm">
                      {featuredListing.entryLevel}
                    </span>
                  </li>
                  <li>
                    <span className="inline-flex rounded-md border border-palms-gold/50 bg-palms-charcoal/40 px-2.5 py-1 text-xs font-medium text-palms-gold md:text-sm">
                      {featuredListing.hoaMonthly}
                    </span>
                  </li>
                </ul>
                <ul className="flex flex-wrap gap-2" aria-label="Property highlights">
                  {featuredListing.badges.map((badge) => (
                    <li key={badge}>
                      <span className="inline-flex items-center gap-1 rounded-md border border-palms-gold/50 bg-palms-charcoal/40 px-2.5 py-1 text-xs font-medium text-palms-gold md:text-sm">
                        <span aria-hidden>✓</span> {badge}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="max-w-3xl text-sm leading-relaxed text-palms-cream/80">
                  {featuredListing.overview}
                </p>
                <p className="text-sm text-palms-cream/80">
                  <Link
                    className="font-medium text-palms-gold underline-offset-4 hover:underline"
                    href="/video"
                  >
                    Watch the Palms Place listing specialist video
                  </Link>
                  {" — first-party tower and #8322 photography."}
                </p>
                <p className="text-xs text-palms-cream/55">
                  MLS #{featuredListing.mlsNumber} · {featuredListing.annualTax} · Source: GLVAR ·
                  Listing offered by {siteContact.brokerage}
                </p>
              </div>

              <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row lg:w-auto lg:flex-col">
                <Link className={ctaClassName} href="/photos/unit-8322">
                  View photo gallery →
                </Link>
                <a
                  className={secondaryCtaClassName}
                  href={featuredListing.virtualTourUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {featuredListing.tourLabel} →
                </a>
                {external ? (
                  <a
                    className={secondaryCtaClassName}
                    href={detailsUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {featuredListing.ctaLabel} →
                  </a>
                ) : (
                  <Link className={secondaryCtaClassName} href={detailsUrl}>
                    {featuredListing.ctaLabel} →
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-palms-gold/15 bg-palms-charcoal-muted/80 px-4 py-3 text-xs text-palms-cream/70 sm:flex-row sm:items-center sm:justify-between md:px-6">
            <p>
              {siteContact.agentName} • {siteContact.brokerage} • NV Lic #{siteContact.license}
            </p>
            {phone && tel ? (
              <p className="sm:text-right">
                <span className="sr-only">Call </span>
                <a
                  className="font-semibold text-palms-gold underline-offset-4 hover:underline"
                  href={tel}
                >
                  {phone}
                </a>
              </p>
            ) : null}
          </div>
        </article>

        <p className="mt-3 text-center text-xs text-palms-cream/55">
          Listing price and status change without notice. Verify all fields with your agent and
          official listing records before you make an offer.
        </p>
      </div>
    </section>
  );
}
