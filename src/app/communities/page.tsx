import type { Metadata } from "next";
import { CommunitiesPageBody } from "@/components/marketing/communities-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

export const metadata: Metadata = buildPageMetadata({
  path: "/communities",
  title: "Las Vegas communities & neighborhoods | Palms Place area guide",
  description: "Compare Strip-adjacent corridors, guard-gated neighborhoods, and Summerlin or Henderson with Palms Place high-rise living before you tour.",
});

export default function CommunitiesPage() {
  return <CommunitiesPageBody />;
}
