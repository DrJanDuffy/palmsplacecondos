import { StructuredData } from "@/components/seo/structured-data";
import type { FaqItem } from "@/lib/schema";
import { getFaqPageJsonLdForPath } from "@/lib/schema";

type PageFaqSectionProps = {
  pathname: string;
  headingId: string;
  heading: string;
  intro?: string;
  items: FaqItem[];
};

/** Visible FAQ + matching FAQPage JSON-LD for a single marketing route. */
export function PageFaqSection({ pathname, headingId, heading, intro, items }: PageFaqSectionProps) {
  if (items.length === 0) return null;

  const faqJsonLd = getFaqPageJsonLdForPath(pathname, items);

  return (
    <section className="mt-16 border-t border-palms-gold/15 pt-14" aria-labelledby={headingId}>
      <StructuredData data={faqJsonLd} />
      <h2 className="font-display text-2xl font-semibold tracking-tight text-palms-cream" id={headingId}>
        {heading}
      </h2>
      {intro ? <p className="mt-4 leading-relaxed text-palms-cream/85">{intro}</p> : null}
      <dl className="mt-8 space-y-8">
        {items.map((item) => (
          <div key={item.question}>
            <dt>
              <h3 className="text-lg font-semibold text-palms-cream">{item.question}</h3>
            </dt>
            <dd className="mt-3 text-base leading-relaxed text-palms-cream/80">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
