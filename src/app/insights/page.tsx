import type { Metadata } from "next";
import { InsightsHubPageBody } from "@/components/marketing/insights-hub-page-body";
import { fieldNotesHubMeta } from "@/lib/content/field-notes";
import { buildPageMetadata } from "@/lib/metadata-helpers";

export const metadata: Metadata = buildPageMetadata({
  path: "/insights",
  title: "Palms Place field notes | Team insights",
  description: fieldNotesHubMeta.description,
});

export default function InsightsPage() {
  return <InsightsHubPageBody />;
}
