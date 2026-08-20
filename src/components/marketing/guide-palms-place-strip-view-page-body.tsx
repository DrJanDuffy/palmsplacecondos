import { MarketingGuidePageShell } from "@/components/marketing/marketing-guide-page-shell";
import { stripViewGuidePageFaq } from "@/lib/content/discoverability-page-faqs";
import {
  palmsPlaceStripViewGuideMeta,
  palmsPlaceStripViewIntro,
  palmsPlaceStripViewSections,
} from "@/lib/content/palms-place-strip-view-guide";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { siteContact } from "@/lib/site-contact";

const path = "/guide/palms-place-strip-view-condos";

export function GuidePalmsPlaceStripViewPageBody() {
  return (
    <MarketingGuidePageShell
      path={path}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Buyers", path: "/buyers" },
        { name: "Strip view condos", path },
      ]}
      eyebrow="Views & orientation"
      headline={palmsPlaceStripViewIntro.headline}
      lede={palmsPlaceStripViewIntro.lede}
      meta={palmsPlaceStripViewGuideMeta}
      authorName={siteContact.buyerSpecialistName}
      authorJobTitle={siteContact.buyerSpecialistTitle}
      related={relatedLinksForPath(path)}
      searchUrl={getRealScoutSharedSearchUrl()}
      sections={palmsPlaceStripViewSections}
      faqItems={stripViewGuidePageFaq}
      faqHeading="How do you confirm a Palms Place Strip view before you buy?"
      footerCtas={[
        { href: "/photos", label: "Palms Place listing photos" },
        { href: "/photos/unit-8322", label: "Palms Place #8322 Strip views" },
        { href: "/guide/palms-place-unit-types", label: "Studios vs one-bedrooms" },
      ]}
    />
  );
}
