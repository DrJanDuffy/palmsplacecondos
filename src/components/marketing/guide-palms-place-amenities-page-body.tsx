import { MarketingGuidePageShell } from "@/components/marketing/marketing-guide-page-shell";
import { amenitiesGuidePageFaq } from "@/lib/content/discoverability-page-faqs";
import {
  palmsPlaceAmenitiesGuideMeta,
  palmsPlaceAmenitiesIntro,
  palmsPlaceAmenitiesSections,
} from "@/lib/content/palms-place-amenities-guide";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { siteContact } from "@/lib/site-contact";

const path = "/guide/palms-place-amenities-and-resort-access";

export function GuidePalmsPlaceAmenitiesPageBody() {
  return (
    <MarketingGuidePageShell
      path={path}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Palms Place", path: "/palms-place" },
        { name: "Amenities", path },
      ]}
      eyebrow="Building & resort context"
      headline={palmsPlaceAmenitiesIntro.headline}
      lede={palmsPlaceAmenitiesIntro.lede}
      meta={palmsPlaceAmenitiesGuideMeta}
      authorName={siteContact.agentName}
      authorJobTitle={siteContact.agentTitle}
      related={relatedLinksForPath(path)}
      searchUrl={getRealScoutSharedSearchUrl()}
      sections={palmsPlaceAmenitiesSections}
      faqItems={amenitiesGuidePageFaq}
      faqHeading="What Palms Place amenities should owners verify?"
      footerCtas={[
        { href: "/faq", label: "Full Palms Place FAQ" },
        { href: "/area/palms-place-las-vegas", label: "Location & directions" },
      ]}
    />
  );
}
