import type { ReactNode } from "react";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { SourcesVerification } from "@/components/seo/sources-verification";
import { StructuredData } from "@/components/seo/structured-data";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";
import { ButtonAnchor, ButtonLink } from "@/components/shared/button-link";
import { SectionEyebrow } from "@/components/shared/section-heading";
import type { RelatedLink } from "@/lib/internal-links";
import type { BreadcrumbItem, FaqItem } from "@/lib/schema";
import {
  getArticleJsonLdForPath,
  getBreadcrumbListJsonLd,
  getHowToJsonLdForPath,
  getWebPageJsonLdForPath,
} from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

type FooterCta = {
  href: string;
  label: string;
  /** Open in a new tab (Calendly, RealScout, etc.). */
  external?: boolean;
};

type MarketingGuidePageShellProps = {
  path: string;
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  headline: string;
  lede: string;
  meta: { title: string; description: string; datePublished: string; dateModified: string };
  authorName: string;
  authorJobTitle: string;
  related: RelatedLink[];
  searchUrl?: string;
  checklist?: { title: string; items: string[] };
  sections: { id: string; question: string; answer: string }[];
  footerCtas: FooterCta[];
  faqItems?: FaqItem[];
  faqHeading?: string;
  extraContent?: ReactNode;
};

export function MarketingGuidePageShell({
  path,
  breadcrumbs,
  eyebrow,
  headline,
  lede,
  meta,
  authorName,
  authorJobTitle,
  related,
  searchUrl,
  checklist,
  sections,
  footerCtas,
  faqItems,
  faqHeading = "What quick answers does this Palms Place guide cover?",
  extraContent,
}: MarketingGuidePageShellProps) {
  const webPageJsonLd = getWebPageJsonLdForPath(
    path,
    {
      name: meta.title,
      description: meta.description,
    },
    {
      aboutPalmsPlace: true,
      hasFaq: Boolean(faqItems && faqItems.length > 0),
      hasHowTo: Boolean(checklist && checklist.items.length > 0),
    },
  );
  const breadcrumbJsonLd = getBreadcrumbListJsonLd(path, breadcrumbs);
  const articleJsonLd = getArticleJsonLdForPath({
    pathname: path,
    headline,
    description: meta.description,
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
    authorName,
    authorJobTitle,
    aboutPalmsPlace: true,
  });
  const howToJsonLd =
    checklist && checklist.items.length > 0
      ? getHowToJsonLdForPath(path, {
          name: checklist.title,
          description: lede,
          steps: checklist.items,
        })
      : null;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={articleJsonLd} />
      {howToJsonLd ? <StructuredData data={howToJsonLd} /> : null}
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        {headline}
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">{lede}</p>
      <p className="mt-3 text-sm text-palms-cream/60">
        By {authorName}, {authorJobTitle} · Last reviewed {meta.dateModified}
        {meta.datePublished !== meta.dateModified ? ` · Published ${meta.datePublished}` : null}
      </p>

      {checklist ? (
        <section className="mt-10" aria-labelledby={`${path.replace(/\//g, "-")}-checklist`}>
          <h2
            className="font-display text-2xl font-semibold text-palms-cream"
            id={`${path.replace(/\//g, "-")}-checklist`}
          >
            {checklist.title}
          </h2>
          <p className="mt-4 leading-relaxed text-palms-cream/85">
            Work this Palms Place checklist first so photography, remarks, and HOA packets match the
            unit you are listing or touring. Confirm every item in official documents.
          </p>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-palms-cream/85">
            {checklist.items.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.id} aria-labelledby={section.id}>
            <h2 className="font-display text-xl font-semibold text-palms-cream" id={section.id}>
              {section.question}
            </h2>
            <p className="mt-3 leading-relaxed text-palms-cream/85">{section.answer}</p>
          </section>
        ))}
      </div>

      {extraContent}

      <div className="mt-12 flex flex-wrap gap-4">
        {footerCtas.map((cta) =>
          cta.external ? (
            <ButtonAnchor key={`${cta.href}-${cta.label}`} href={cta.href} variant="primary">
              {cta.label}
            </ButtonAnchor>
          ) : (
            <ButtonLink key={`${cta.href}-${cta.label}`} href={cta.href} variant="primary">
              {cta.label}
            </ButtonLink>
          ),
        )}
        {searchUrl ? (
          <ButtonAnchor href={searchUrl} variant="secondary">
            Search listings
          </ButtonAnchor>
        ) : null}
      </div>

      <p className="mt-8 text-sm text-palms-cream/60">
        {siteContact.brokerage} · Nevada real estate license {siteContact.license}
      </p>

      {faqItems && faqItems.length > 0 ? (
        <PageFaqSection
          pathname={path}
          headingId={`${path.replace(/\//g, "-")}-faq`}
          heading={faqHeading}
          items={faqItems}
        />
      ) : null}

      <SourcesVerification />
      <RelatedPages links={related} />
    </article>
  );
}
