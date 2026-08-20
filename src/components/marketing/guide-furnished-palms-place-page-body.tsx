import { MarketingGuidePageShell } from "@/components/marketing/marketing-guide-page-shell";
import { furnishedGuidePageFaq } from "@/lib/content/discoverability-page-faqs";
import {
  palmsPlaceFurnishedGuideMeta,
  palmsPlaceFurnishedIntro,
  palmsPlaceFurnishedSections,
} from "@/lib/content/palms-place-furnished-guide";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { siteContact } from "@/lib/site-contact";

const path = "/guide/furnished-palms-place-condos";

export function GuideFurnishedPalmsPlacePageBody() {
  return (
    <MarketingGuidePageShell
      path={path}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Buyers", path: "/buyers" },
        { name: "Furnished condos", path },
      ]}
      eyebrow="Furnished resale guide"
      headline={palmsPlaceFurnishedIntro.headline}
      lede={palmsPlaceFurnishedIntro.lede}
      meta={palmsPlaceFurnishedGuideMeta}
      authorName={siteContact.buyerSpecialistName}
      authorJobTitle={siteContact.buyerSpecialistTitle}
      related={relatedLinksForPath(path)}
      searchUrl={getRealScoutSharedSearchUrl()}
      sections={palmsPlaceFurnishedSections}
      faqItems={furnishedGuidePageFaq}
      faqHeading="What should you verify on a furnished Palms Place condo?"
      footerCtas={[
        { href: "/insights/furnished-resale-inventory-surprises", label: "Furnished field note" },
        { href: "/palms-place", label: "Palms Place building guide" },
      ]}
    />
  );
}
