import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FieldNotePageBody } from "@/components/marketing/field-note-page-body";
import { fieldNotes, getFieldNoteBySlug } from "@/lib/content/field-notes";
import { buildPageMetadata } from "@/lib/metadata-helpers";
import { formatTeamPhrase, siteContact } from "@/lib/site-contact";

type InsightsArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return fieldNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: InsightsArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getFieldNoteBySlug(slug);
  if (!note) {
    return {
      title: "Field note not found",
      robots: { index: false, follow: false },
    };
  }
  const path = `/insights/${slug}`;
  return buildPageMetadata({
    path,
    title: `${note.title} | Field note`,
    description: `${note.description} ${formatTeamPhrase()} — ${siteContact.brokerage}.`,
  });
}

export default async function InsightsArticlePage({ params }: InsightsArticlePageProps) {
  const { slug } = await params;
  const note = getFieldNoteBySlug(slug);
  if (!note) {
    notFound();
  }
  return <FieldNotePageBody note={note} />;
}
