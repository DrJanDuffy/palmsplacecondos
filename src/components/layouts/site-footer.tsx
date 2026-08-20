import Link from "next/link";
import { CalendlyLink } from "@/components/shared/calendly-link";
import { popularNav, primaryNav, utilityNav } from "@/lib/navigation";
import {
  formatOfficeAddressLine,
  formatOfficeHoursWithSpecial,
  getTelHref,
  siteContact,
} from "@/lib/site-contact";
import { cn } from "@/lib/utils";

function FooterLink({
  item,
  className,
}: {
  item: { label: string; href: string; external?: boolean };
  className?: string;
}) {
  const base = cn(
    "rounded-sm text-palms-cream/85 underline-offset-4 transition-colors hover:text-palms-gold hover:underline",
    className,
  );

  if (item.external) {
    return (
      <a className={base} href={item.href} rel="noopener noreferrer" target="_blank">
        {item.label}
      </a>
    );
  }

  return (
    <Link className={base} href={item.href}>
      {item.label}
    </Link>
  );
}

function FooterSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-palms-gold-muted">{children}</p>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const hoursLine = formatOfficeHoursWithSpecial();
  const tel = siteContact.phone ? getTelHref(siteContact.phone) : undefined;

  return (
    <footer
      className="border-t border-palms-gold/20 bg-palms-charcoal-elevated px-6 py-14 text-sm text-palms-cream/85 shadow-[inset_0_1px_0_0_rgba(197,163,90,0.06)]"
      id="site-footer-nav"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-palms-cream">
              {siteContact.gbpBusinessName}
            </p>
            <p className="mt-2 max-w-xs text-palms-cream/75">{siteContact.teamBrandName}</p>
            <p className="mt-1 text-xs text-palms-cream/60">{siteContact.primaryServiceArea}</p>

            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
              <Link
                className="text-sm font-medium text-palms-gold underline-offset-4 hover:underline"
                href="/search"
              >
                Browse listings
              </Link>
              <span className="text-palms-cream/40" aria-hidden>
                ·
              </span>
              <Link
                className="text-sm font-medium text-palms-gold underline-offset-4 hover:underline"
                href="/contact"
              >
                Contact
              </Link>
            </div>

            <nav aria-label="Connect and browse" className="mt-6 flex flex-col gap-2 border-t border-palms-gold/10 pt-6">
              {utilityNav.map((item, index) => (
                <FooterLink item={item} key={`footer-util-${index}-${item.href}`} />
              ))}
              {primaryNav.map((item, index) => (
                <FooterLink item={item} key={`footer-primary-${index}-${item.href}`} />
              ))}
            </nav>
          </div>

          <div>
            <FooterSectionTitle>Popular searches</FooterSectionTitle>
            <nav aria-label="Popular searches" className="mt-4 flex flex-col gap-2">
              {popularNav.map((item, index) => (
                <FooterLink item={item} key={`footer-pop-${index}-${item.href}`} />
              ))}
            </nav>
          </div>

          <div className="md:col-span-2 lg:col-span-1 lg:pl-2">
            <FooterSectionTitle>Team &amp; office</FooterSectionTitle>
            <div className="mt-4 space-y-5">
              <div className="space-y-3 text-palms-cream/90">
                <div>
                  <p className="font-medium text-palms-cream">{siteContact.agentName}</p>
                  <p className="text-palms-cream/80">{siteContact.agentTitle}</p>
                  <p className="text-sm text-palms-cream/70">Nevada license {siteContact.license}</p>
                </div>
                <p className="text-palms-cream/85">{siteContact.brokerage}</p>
                <address className="not-italic text-palms-cream/85">
                  {formatOfficeAddressLine()}
                </address>
                {hoursLine ? <p className="text-palms-cream/80">{hoursLine}</p> : null}
                <p className="text-sm text-palms-cream/65">{siteContact.primaryServiceArea}</p>
              </div>

              <div className="border-t border-palms-gold/10 pt-5">
                <FooterSectionTitle>Reach us</FooterSectionTitle>
                <ul className="mt-3 list-none space-y-2">
                  {siteContact.phone && tel ? (
                    <li>
                      <a
                        className="font-medium text-palms-gold underline-offset-4 hover:underline"
                        href={tel}
                      >
                        {siteContact.phone}
                      </a>
                      <span className="text-palms-cream/55"> — phone</span>
                    </li>
                  ) : (
                    <li className="text-palms-cream/65">Phone: add when it matches your Google Business Profile.</li>
                  )}
                  <li>
                    <CalendlyLink>Schedule an appointment</CalendlyLink>
                  </li>
                  {siteContact.emailGeneral ? (
                    <li>
                      <a
                        className="font-medium text-palms-gold underline-offset-4 hover:underline"
                        href={`mailto:${siteContact.emailGeneral}`}
                      >
                        {siteContact.emailGeneral}
                      </a>
                      <span className="text-palms-cream/55"> — general</span>
                    </li>
                  ) : null}
                  {siteContact.emailListings &&
                  siteContact.emailListings !== siteContact.emailGeneral ? (
                    <li>
                      <a
                        className="font-medium text-palms-gold underline-offset-4 hover:underline"
                        href={`mailto:${siteContact.emailListings}`}
                      >
                        {siteContact.emailListings}
                      </a>
                      <span className="text-palms-cream/55"> — listings</span>
                    </li>
                  ) : null}
                  {siteContact.facebookUrl ? (
                    <li>
                      <a
                        className="font-medium text-palms-gold underline-offset-4 hover:underline"
                        href={siteContact.facebookUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Resort Facebook
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-palms-gold/15 pt-8 text-xs leading-relaxed text-palms-cream/55">
          <p>
            © {year} {siteContact.gbpBusinessName}. {siteContact.brokerage}. All rights reserved.
          </p>
          <p className="mt-2">
            Equal Housing Opportunity. Listing data is deemed reliable but not guaranteed; verify with your
            agent.
          </p>
        </div>
      </div>
    </footer>
  );
}
