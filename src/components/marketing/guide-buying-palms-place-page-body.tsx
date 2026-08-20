import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { buyingGuidePageFaq } from "@/lib/content/discoverability-page-faqs";
import { StructuredData } from "@/components/seo/structured-data";
import { ButtonAnchor } from "@/components/shared/button-link";
import { CalendlyButton } from "@/components/shared/calendly-link";
import { SectionEyebrow } from "@/components/shared/section-heading";
import {
  palmsPlaceBuyerGuideIntro,
  palmsPlaceBuyerGuideMeta,
  palmsPlaceBuyerGuideSections,
  palmsPlaceTourChecklist,
} from "@/lib/content/palms-place-buyer-guide";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import {
  getArticleJsonLdForPath,
  getBreadcrumbListJsonLd,
  getHowToJsonLdForPath,
  getWebPageJsonLdForPath,
} from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

const path = "/guide/buying-palms-place";

export function GuideBuyingPalmsPlacePageBody() {
  const related = relatedLinksForPath(path);
  const searchUrl = getRealScoutSharedSearchUrl();
  const webPageJsonLd = getWebPageJsonLdForPath(
    path,
    {
      name: palmsPlaceBuyerGuideMeta.title,
      description: palmsPlaceBuyerGuideMeta.description,
    },
    { aboutPalmsPlace: true },
  );
  const breadcrumbJsonLd = getBreadcrumbListJsonLd(path, [
    { name: "Home", path: "/" },
    { name: "Buyers", path: "/buyers" },
    { name: "Buying guide", path },
  ]);
  const articleJsonLd = getArticleJsonLdForPath({
    pathname: path,
    headline: palmsPlaceBuyerGuideIntro.headline,
    description: palmsPlaceBuyerGuideMeta.description,
    datePublished: palmsPlaceBuyerGuideMeta.datePublished,
    dateModified: palmsPlaceBuyerGuideMeta.dateModified,
    authorName: siteContact.agentName,
    authorJobTitle: siteContact.agentTitle,
    aboutPalmsPlace: true,
  });
  const howToJsonLd = getHowToJsonLdForPath(path, {
    name: "What should you ask on a Palms Place condo tour?",
    description:
      "Use this checklist on every Palms Place showing—especially furnished or rental-history units.",
    steps: palmsPlaceTourChecklist,
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={articleJsonLd} />
      <StructuredData data={howToJsonLd} />
      <SectionEyebrow>Field guide</SectionEyebrow>
      <h1 className="font-display mt-6 text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        {palmsPlaceBuyerGuideIntro.headline}
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">{palmsPlaceBuyerGuideIntro.lede}</p>
      <p className="mt-4 text-sm text-palms-cream/60">
        Last updated {palmsPlaceBuyerGuideMeta.dateModified}. General real estate guidance—not legal,
        tax, or HOA interpretation. Confirm all rules with official documents and licensed
        professionals.
      </p>

      <section className="mt-14" aria-labelledby="tour-checklist-heading">
        <h2
          className="font-display text-2xl font-semibold tracking-tight text-palms-cream"
          id="tour-checklist-heading"
        >
          What should you ask on a Palms Place condo tour?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Use this checklist on every Palms Place showing—especially furnished or rental-history
          units. {siteContact.buyerSpecialistName} typically walks buyers through it before an offer
          deadline.
        </p>
        <ol className="mt-6 list-decimal space-y-4 pl-6 text-palms-cream/85 marker:text-palms-gold">
          {palmsPlaceTourChecklist.map((item) => (
            <li key={item} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      </section>

      {palmsPlaceBuyerGuideSections.map((section) => (
        <section className="mt-14" aria-labelledby={section.id} key={section.id}>
          <h2
            className="font-display text-2xl font-semibold tracking-tight text-palms-cream"
            id={section.id}
          >
            {section.question}
          </h2>
          <p className="mt-4 leading-relaxed text-palms-cream/85">{section.answer}</p>
        </section>
      ))}

      <section
        className="mt-14 rounded-xl border border-palms-gold/20 bg-palms-charcoal-muted/40 p-6 md:p-8"
        aria-labelledby="guide-next-steps-heading"
      >
        <h2
          className="font-display text-xl font-semibold text-palms-cream"
          id="guide-next-steps-heading"
        >
          Next steps with the Palms Place team
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          Search live inventory, read{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/insights">
            field notes from recent tours
          </Link>
          , the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            Palms Place building overview
          </Link>
          , or meet{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/team">
            Dr. Jan Duffy
          </Link>{" "}
          before you write. Listing questions: {siteContact.emailListings ?? "contact page"}.
          Buyer tours: {siteContact.emailBuyers ?? "contact page"}.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <ButtonAnchor href={searchUrl} variant="primary">
            Open curated search
          </ButtonAnchor>
          <CalendlyButton variant="secondary">Schedule a tour</CalendlyButton>
        </div>
      </section>

      <PageFaqSection
        pathname={path}
        headingId="buying-guide-faq-heading"
        heading="Buying guide FAQ"
        intro="Field-guide scope, HOA documents, and team roles—not official HOA materials."
        items={buyingGuidePageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
