import type { Metadata } from "next";
import { GuidePalmsPlaceAmenitiesPageBody } from "@/components/marketing/guide-palms-place-amenities-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

const path = "/guide/palms-place-amenities-and-resort-access";

export const metadata: Metadata = buildPageMetadata({
  path: path,
  title: "Palms Place amenities in Las Vegas | Owner verification guide",
  description: "Palms Place pool, fitness, and resort-adjacent access—what owners should verify in HOA documents before buying on West Flamingo near the Las Vegas Strip.",
});

export default function GuidePalmsPlaceAmenitiesPage() {
  return <GuidePalmsPlaceAmenitiesPageBody />;
}
