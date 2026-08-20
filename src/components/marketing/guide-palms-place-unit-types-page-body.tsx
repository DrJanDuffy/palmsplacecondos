import { MarketingGuidePageShell } from "@/components/marketing/marketing-guide-page-shell";
import { unitTypesGuidePageFaq } from "@/lib/content/discoverability-page-faqs";
import {
  palmsPlaceUnitSizeNotes,
  palmsPlaceUnitTypesGuideMeta,
  palmsPlaceUnitTypesIntro,
  palmsPlaceUnitTypesSections,
} from "@/lib/content/palms-place-unit-types-guide";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { siteContact } from "@/lib/site-contact";

const path = "/guide/palms-place-unit-types";

const sizeContextSection = {
  id: "size-ranges",
  question: "What square footage should you verify on each listing?",
  answer: `Public marketing often cites studios around ${palmsPlaceUnitSizeNotes.studioApproxSqFt} sq ft and one-bedroom layouts in the ${palmsPlaceUnitSizeNotes.oneBedApproxSqFt} sq ft range, but ${palmsPlaceUnitSizeNotes.penthouseNote} Always confirm on the listing record and during your tour—do not rely on building averages alone.`,
};

export function GuidePalmsPlaceUnitTypesPageBody() {
  return (
    <MarketingGuidePageShell
      path={path}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Buyers", path: "/buyers" },
        { name: "Unit types", path },
      ]}
      eyebrow="Buyer decision guide"
      headline={palmsPlaceUnitTypesIntro.headline}
      lede={palmsPlaceUnitTypesIntro.lede}
      meta={palmsPlaceUnitTypesGuideMeta}
      authorName={siteContact.buyerSpecialistName}
      authorJobTitle={siteContact.buyerSpecialistTitle}
      related={relatedLinksForPath(path)}
      searchUrl={getRealScoutSharedSearchUrl()}
      sections={[sizeContextSection, ...palmsPlaceUnitTypesSections]}
      faqItems={unitTypesGuidePageFaq}
      faqHeading="How do you choose a Palms Place studio vs one-bedroom?"
      footerCtas={[
        { href: "/guide/buying-palms-place", label: "Buying field guide" },
        { href: "/buyers", label: "Buyer hub" },
      ]}
    />
  );
}
