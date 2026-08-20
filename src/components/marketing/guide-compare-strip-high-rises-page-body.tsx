import { MarketingGuidePageShell } from "@/components/marketing/marketing-guide-page-shell";
import { compareStripGuidePageFaq } from "@/lib/content/discoverability-page-faqs";
import {
  compareStripHighRisesGuideMeta,
  compareStripHighRisesIntro,
  compareStripHighRisesSections,
} from "@/lib/content/compare-strip-high-rises-guide";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { siteContact } from "@/lib/site-contact";

const path = "/guide/compare-strip-high-rises";

export function GuideCompareStripHighRisesPageBody() {
  return (
    <MarketingGuidePageShell
      path={path}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "High-rises", path: "/high-rises" },
        { name: "Compare towers", path },
      ]}
      eyebrow="Strip high-rise comparison"
      headline={compareStripHighRisesIntro.headline}
      lede={compareStripHighRisesIntro.lede}
      meta={compareStripHighRisesGuideMeta}
      authorName={siteContact.agentName}
      authorJobTitle={siteContact.agentTitle}
      related={relatedLinksForPath(path)}
      searchUrl={getRealScoutSharedSearchUrl()}
      sections={compareStripHighRisesSections}
      footerCtas={[
        { href: "/palms-place", label: "Palms Place building guide" },
        { href: "/guide/palms-place-hoa-and-monthly-costs", label: "Palms Place HOA and monthly costs" },
        { href: "/guide/buying-palms-place", label: "Buying a Palms Place condo" },
        { href: "/high-rises", label: "Las Vegas high-rise condos" },
      ]}
      faqItems={compareStripGuidePageFaq}
      faqHeading="How do you compare Palms Place to other Strip high-rises?"
    />
  );
}
