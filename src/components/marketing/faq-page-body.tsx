import type { PalmsPlaceFaqEntry } from "@/lib/content/palms-place-faq";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { SectionEyebrow } from "@/components/shared/section-heading";
import {
  palmsPlaceFaqAllAsFaqItems,
  palmsPlaceFaqIntro,
  palmsPlaceFaqPlanningIntro,
  palmsPlaceFaqPlanningStay,
  palmsPlaceFaqPrimary,
} from "@/lib/content/palms-place-faq";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getBreadcrumbListJsonLd, getFaqPageJsonLdForPath, getWebPageJsonLdForPath } from "@/lib/schema";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

function FaqAccordionList({ items }: { items: PalmsPlaceFaqEntry[] }) {
  return (
    <div className="mt-6 space-y-3">
      {items.map((item) => (
        <details
          key={item.slug}
          className="group rounded-lg border border-palms-gold/15 bg-palms-charcoal-muted/30 px-4 open:border-palms-gold/25"
          id={item.slug}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 marker:content-none [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-semibold text-palms-cream">{item.question}</h3>
            <span
              aria-hidden
              className="shrink-0 text-palms-gold transition-transform duration-200 group-open:rotate-180"
            >
              ▼
            </span>
          </summary>
          <div className="border-t border-palms-gold/10 pb-4 pt-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-palms-gold-muted">
              {item.category}
            </p>
            <p className="mt-2 text-base leading-relaxed text-palms-cream/80">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

/** Expanded `/faq` — primary vs planning sections, native details accordion, single FAQPage JSON-LD. */
export function FaqPageBody() {
  const faqItems = palmsPlaceFaqAllAsFaqItems();
  const faqJsonLd = getFaqPageJsonLdForPath("/faq", faqItems);
  const webPageJsonLd = getWebPageJsonLdForPath(
    "/faq",
    {
      name: palmsPlaceFaqIntro.title,
      description: palmsPlaceFaqIntro.description,
    },
    {
      aboutPalmsPlace: true,
      mainEntity: "faq",
      speakableSelectors: ["h1", "#faq-common-heading", "#faq-planning-heading", "h3"],
      hasFaq: true,
    },
  );
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/faq", [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]);
  const related = relatedLinksForPath("/faq");

  return (
    <article className="border-t border-palms-gold/15 bg-palms-charcoal-muted/20">
      <StructuredData data={faqJsonLd} />
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <SectionEyebrow>Questions</SectionEyebrow>
        <h1 className="font-display mt-6 text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
          {palmsPlaceFaqIntro.title}
        </h1>
        <AgentHeroBadge className="mt-6" />
        <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">{palmsPlaceFaqIntro.description}</p>

        <section className="mt-14" aria-labelledby="faq-common-heading">
          <h2
            className="font-display text-2xl font-semibold tracking-tight text-palms-cream md:text-3xl"
            id="faq-common-heading"
          >
            What are the most common Palms Place condo questions?
          </h2>
          <FaqAccordionList items={palmsPlaceFaqPrimary} />
        </section>

        <section className="mt-16 border-t border-palms-gold/15 pt-14" aria-labelledby="faq-planning-heading">
          <h2
            className="font-display text-2xl font-semibold tracking-tight text-palms-cream md:text-3xl"
            id="faq-planning-heading"
          >
            {palmsPlaceFaqPlanningIntro.heading}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-palms-cream/80">
            {palmsPlaceFaqPlanningIntro.description}
          </p>
          <FaqAccordionList items={palmsPlaceFaqPlanningStay} />
        </section>

        <RelatedPages className="mt-16" links={related} />
      </div>
    </article>
  );
}
