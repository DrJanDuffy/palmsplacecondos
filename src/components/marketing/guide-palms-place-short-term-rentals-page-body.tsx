import { MarketingGuidePageShell } from "@/components/marketing/marketing-guide-page-shell";
import { shortTermRentalGuidePageFaq } from "@/lib/content/discoverability-page-faqs";
import {
  palmsPlaceShortTermRentalGuideMeta,
  palmsPlaceShortTermRentalIntro,
  palmsPlaceShortTermRentalSections,
} from "@/lib/content/palms-place-short-term-rental-guide";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { siteContact } from "@/lib/site-contact";

const path = "/guide/palms-place-short-term-rentals";

export function GuidePalmsPlaceShortTermRentalsPageBody() {
  return (
    <MarketingGuidePageShell
      path={path}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Buyers", path: "/buyers" },
        { name: "Short-term rentals", path },
      ]}
      eyebrow="HOA & use rules"
      headline={palmsPlaceShortTermRentalIntro.headline}
      lede={palmsPlaceShortTermRentalIntro.lede}
      meta={palmsPlaceShortTermRentalGuideMeta}
      authorName={siteContact.buyerSpecialistName}
      authorJobTitle={siteContact.buyerSpecialistTitle}
      related={relatedLinksForPath(path)}
      searchUrl={getRealScoutSharedSearchUrl()}
      sections={palmsPlaceShortTermRentalSections}
      faqItems={shortTermRentalGuidePageFaq}
      faqHeading="What should Palms Place buyers verify about short-term rentals?"
      footerCtas={[
        { href: "/guide/furnished-palms-place-condos", label: "Furnished condos guide" },
        { href: "/guide/palms-place-hoa-and-monthly-costs", label: "HOA & monthly costs" },
        { href: "/guide/palms-place-condos-vs-hotel", label: "Condos vs hotel booking" },
      ]}
    />
  );
}
