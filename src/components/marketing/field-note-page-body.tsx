import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { SectionRelatedLinks } from "@/components/seo/section-related-links";
import { SourcesVerification } from "@/components/seo/sources-verification";
import { StructuredData } from "@/components/seo/structured-data";
import { ButtonLink } from "@/components/shared/button-link";
import { SectionEyebrow } from "@/components/shared/section-heading";
import type { FieldNote } from "@/lib/content/field-notes/types";
import { relatedLinksForPath } from "@/lib/internal-links";
import {
  getArticleJsonLdForPath,
  getBreadcrumbListJsonLd,
  getWebPageJsonLdForPath,
  type FaqItem,
} from "@/lib/schema";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

type FieldNotePageBodyProps = {
  note: FieldNote;
};

export function FieldNotePageBody({ note }: FieldNotePageBodyProps) {
  const path = `/insights/${note.slug}`;
  const related = relatedLinksForPath(path);
  const webPageJsonLd = getWebPageJsonLdForPath(path, {
    name: note.title,
    description: note.description,
  }, { aboutPalmsPlace: true, hasFaq: true });
  const breadcrumbLabel =
    note.headline.length > 48 ? `${note.headline.slice(0, 45)}…` : note.headline;
  const breadcrumbJsonLd = getBreadcrumbListJsonLd(path, [
    { name: "Home", path: "/" },
    { name: "Field notes", path: "/insights" },
    { name: breadcrumbLabel, path },
  ]);
  const articleJsonLd = getArticleJsonLdForPath({
    pathname: path,
    headline: note.headline,
    description: note.description,
    datePublished: note.datePublished,
    dateModified: note.dateModified,
    authorName: note.authorName,
    authorJobTitle: note.authorJobTitle,
    aboutPalmsPlace: true,
  });
  const faqItems: FaqItem[] = note.sections
    .filter((section) => section.heading.trim().endsWith("?"))
    .slice(0, 3)
    .map((section) => ({
      question: section.heading,
      answer: section.body,
    }));

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={articleJsonLd} />
      <SectionEyebrow>{note.eyebrow}</SectionEyebrow>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        {note.headline}
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">{note.lede}</p>
      <p className="mt-3 text-sm text-palms-cream/60">
        By {note.authorName}, {note.authorJobTitle} · Updated {note.dateModified}
      </p>

      <aside
        className="mt-8 rounded-xl border border-palms-cream/15 bg-palms-cream/5 p-5 text-sm leading-relaxed text-palms-cream/80"
        aria-labelledby="how-why-heading"
      >
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="how-why-heading">
          How and why was this Palms Place field note written?
        </h2>
        <p className="mt-3">
          <strong className="text-palms-cream">How:</strong> {note.howCreated}
        </p>
        <p className="mt-3">
          <strong className="text-palms-cream">Why:</strong> {note.whyCreated}
        </p>
        <SectionRelatedLinks pathname={path} sectionId="how-why-heading" />
      </aside>

      <div className="mt-10 space-y-10">
        {note.sections.map((section) => (
          <section key={section.id} aria-labelledby={section.id}>
            <h2 className="font-display text-xl font-semibold text-palms-cream" id={section.id}>
              {section.heading}
            </h2>
            <p className="mt-3 leading-relaxed text-palms-cream/85">{section.body}</p>
            <SectionRelatedLinks pathname={path} sectionId={section.id} />
          </section>
        ))}
      </div>

      <section className="mt-10 rounded-xl border border-palms-gold/25 bg-palms-gold/5 p-6" aria-labelledby="what-we-do-next">
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="what-we-do-next">
          What do we do on the next Palms Place tour or listing?
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          These are the next steps Dr. Jan Duffy&apos;s team typically takes after this field note—verify
          facts for the specific unit before you offer or list.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-palms-cream/85">
          {note.whatWeDoNext.map((item) => (
            <li key={item} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
        <SectionRelatedLinks pathname={path} sectionId="what-we-do-next" />
      </section>

      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href="/guide/buying-palms-place" variant="primary">
          Buying field guide
        </ButtonLink>
        <ButtonLink href="/insights" variant="secondary">
          All field notes
        </ButtonLink>
      </div>

      <p className="mt-8 text-sm text-palms-cream/60">
        Not legal or tax advice. HOA rules and assessments change—verify in official documents for your unit.
        Last reviewed: {note.dateModified}.
      </p>

      {faqItems.length > 0 ? (
        <PageFaqSection
          pathname={path}
          headingId={`${note.slug}-faq`}
          heading="What quick answers come from this Palms Place field note?"
          items={faqItems}
        />
      ) : null}

      <SourcesVerification />
      <RelatedPages pathname={path} links={related} />
    </article>
  );
}
