import { MarketingGuidePageShell } from "@/components/marketing/marketing-guide-page-shell";
import { hoaGuidePageFaq } from "@/lib/content/discoverability-page-faqs";
import {
  palmsPlaceHoaGuideMeta,
  palmsPlaceHoaIntro,
  palmsPlaceHoaSections,
} from "@/lib/content/palms-place-hoa-guide";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { siteContact } from "@/lib/site-contact";

const path = "/guide/palms-place-hoa-and-monthly-costs";

export function GuidePalmsPlaceHoaPageBody() {
  return (
    <MarketingGuidePageShell
      path={path}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Buyers", path: "/buyers" },
        { name: "HOA & monthly costs", path },
      ]}
      eyebrow="Buyer due diligence"
      headline={palmsPlaceHoaIntro.headline}
      lede={palmsPlaceHoaIntro.lede}
      meta={palmsPlaceHoaGuideMeta}
      authorName={siteContact.buyerSpecialistName}
      authorJobTitle={siteContact.buyerSpecialistTitle}
      related={relatedLinksForPath(path)}
      searchUrl={getRealScoutSharedSearchUrl()}
      sections={palmsPlaceHoaSections}
      faqItems={hoaGuidePageFaq}
      faqHeading="What should Palms Place buyers know about HOA fees?"
      footerCtas={[
        { href: "/buyers/calculators", label: "Buyer payment planning" },
        { href: "/guide/buying-palms-place", label: "Buying field guide" },
      ]}
    />
  );
}
