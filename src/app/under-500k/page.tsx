import type { Metadata } from "next";
import { Under500kPageBody } from "@/components/marketing/under-500k-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

export const metadata: Metadata = buildPageMetadata({
  path: "/under-500k",
  title: "Las Vegas homes & condos under $500K | Price-band search",
  description: "Search Las Vegas homes and condos under $500,000 near the Strip and Palms Place—compare HOA carry on high-rises vs single-family with local Realtors.",
});

export default function Under500kPage() {
  return <Under500kPageBody />;
}
