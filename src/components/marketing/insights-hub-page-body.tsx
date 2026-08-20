import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { insightsHubPageFaq } from "@/lib/content/discoverability-page-faqs";
import { fieldNotes, fieldNotesHubMeta } from "@/lib/content/field-notes";
import { relatedLinksForPath } from "@/lib/internal-links";
import {
  getBreadcrumbListJsonLd,
  getItemListJsonLd,
  getWebPageJsonLdForPath,
} from "@/lib/schema";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

const path = "/insights";

export function InsightsHubPageBody() {
  const related = relatedLinksForPath(path);
  const webPageJsonLd = getWebPageJsonLdForPath(path, fieldNotesHubMeta, {
    aboutPalmsPlace: true,
    pageType: "CollectionPage",
    hasFaq: true,
    hasItemList: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd(path, [
    { name: "Home", path: "/" },
    { name: "Field notes", path },
  ]);
  const itemListJsonLd = getItemListJsonLd(path, {
    name: "Palms Place field notes",
    description: fieldNotesHubMeta.description,
    items: fieldNotes.map((note) => ({
      name: note.headline,
      path: `/insights/${note.slug}`,
      description: note.description,
    })),
  });

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData data={itemListJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Palms Place field notes — Las Vegas high-rise tours
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        {fieldNotesHubMeta.description} Each note covers a <strong className="text-palms-cream">specific</strong>{" "}
        situation we see on tours and listings—not recycled “tips for first-time buyers” lists.
      </p>

      <section className="mt-10" aria-labelledby="non-commodity-framing">
        <h2 className="font-display text-xl font-semibold text-palms-cream" id="non-commodity-framing">
          How are Palms Place field notes different from generic condo articles?
        </h2>
        <p className="mt-3 leading-relaxed text-palms-cream/85">
          Google’s people-first guidance rewards content with first-hand experience, original analysis, and
          answers that do not force another search. Our field notes follow that bar: unique to Palms Place,
          tied to real tour and listing workflows, and written by named agents on this team—with a visible
          How/Why disclosure on every article.
        </p>
        <p className="mt-3 text-sm text-palms-cream/60">
          See also:{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/guide/buying-palms-place">
            buying field guide
          </Link>
          ,{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/guide/selling-palms-place">
            selling field guide
          </Link>
          .
        </p>
      </section>

      <ul className="mt-10 space-y-6">
        {fieldNotes.map((note) => (
          <li
            key={note.slug}
            className="rounded-xl border border-palms-cream/15 bg-palms-cream/5 p-6"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-palms-gold">{note.eyebrow}</p>
            <h2 className="mt-2 font-display text-xl font-semibold text-palms-cream" id={`insights-${note.slug}`}>
              <Link
                className="underline-offset-4 hover:underline"
                href={`/insights/${note.slug}`}
              >
                {note.headline}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-palms-cream/75">
              {note.authorName} · Updated {note.dateModified}
            </p>
            <p className="mt-3 leading-relaxed text-palms-cream/85">{note.description}</p>
          </li>
        ))}
      </ul>

      <PageFaqSection
        pathname="/insights"
        headingId="insights-faq-heading"
        heading="What are Palms Place field notes, and how should you use them?"
        intro="What these notes are, what they are not, and how dates work."
        items={insightsHubPageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
