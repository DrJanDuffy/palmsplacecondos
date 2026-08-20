import { MarketingGuidePageShell } from "@/components/marketing/marketing-guide-page-shell";
import { PalmsPlaceCondosVsHotelTable } from "@/components/marketing/palms-place-condos-vs-hotel-table";
import { condosVsHotelGuidePageFaq } from "@/lib/content/discoverability-page-faqs";
import {
  palmsPlaceCondosVsHotelGuideMeta,
  palmsPlaceCondosVsHotelIntro,
  palmsPlaceCondosVsHotelSections,
} from "@/lib/content/palms-place-condos-vs-hotel-guide";
import { relatedLinksForPath } from "@/lib/internal-links";
import { siteContact } from "@/lib/site-contact";

const path = "/guide/palms-place-condos-vs-hotel";

export function GuidePalmsPlaceCondosVsHotelPageBody() {
  return (
    <MarketingGuidePageShell
      path={path}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq" },
        { name: "Condos vs hotel", path },
      ]}
      eyebrow="Entity / citations"
      headline={palmsPlaceCondosVsHotelIntro.headline}
      lede={palmsPlaceCondosVsHotelIntro.lede}
      meta={palmsPlaceCondosVsHotelGuideMeta}
      authorName={siteContact.agentName}
      authorJobTitle={siteContact.agentTitle}
      related={relatedLinksForPath(path)}
      sections={palmsPlaceCondosVsHotelSections}
      extraContent={<PalmsPlaceCondosVsHotelTable />}
      faqItems={condosVsHotelGuidePageFaq}
      faqHeading="How do Palms Place condos differ from Palms Place hotel booking?"
      footerCtas={[
        { href: "/palms-place", label: "Palms Place building guide" },
        { href: "/team", label: "Dr. Jan Duffy — listing specialist" },
      ]}
    />
  );
}
