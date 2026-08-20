import { MarketingGuidePageShell } from "@/components/marketing/marketing-guide-page-shell";
import { sellingGuidePageFaq } from "@/lib/content/discoverability-page-faqs";
import {
  palmsPlaceSellerGuideIntro,
  palmsPlaceSellerGuideMeta,
  palmsPlaceSellerGuideSections,
  palmsPlaceSellerPrepChecklist,
} from "@/lib/content/palms-place-seller-guide";
import { getCalendlyUrl } from "@/lib/calendly";
import { relatedLinksForPath } from "@/lib/internal-links";
import { siteContact } from "@/lib/site-contact";

const path = "/guide/selling-palms-place";

export function GuideSellingPalmsPlacePageBody() {
  return (
    <MarketingGuidePageShell
      path={path}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Sellers", path: "/sellers" },
        { name: "Selling guide", path },
      ]}
      eyebrow="Seller field guide"
      headline={palmsPlaceSellerGuideIntro.headline}
      lede={palmsPlaceSellerGuideIntro.lede}
      meta={palmsPlaceSellerGuideMeta}
      authorName={siteContact.agentName}
      authorJobTitle={siteContact.agentTitle}
      related={relatedLinksForPath(path)}
      checklist={{
        title: "What listing prep should Palms Place sellers finish first?",
        items: palmsPlaceSellerPrepChecklist,
      }}
      sections={palmsPlaceSellerGuideSections}
      faqItems={sellingGuidePageFaq}
      faqHeading="What do Palms Place sellers ask in this field guide?"
      footerCtas={[
        { href: "/sell", label: "Sell with the team" },
        {
          href: getCalendlyUrl(),
          label: "Schedule a seller consult",
          external: true,
        },
      ]}
    />
  );
}
