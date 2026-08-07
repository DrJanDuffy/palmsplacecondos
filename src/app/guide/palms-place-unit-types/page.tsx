import type { Metadata } from "next";
import { GuidePalmsPlaceUnitTypesPageBody } from "@/components/marketing/guide-palms-place-unit-types-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

const path = "/guide/palms-place-unit-types";

export const metadata: Metadata = buildPageMetadata({
  path: path,
  title: "Palms Place studios vs one-bedroom | Buyer guide",
  description: "Choose Palms Place studios vs one-bedroom layouts—square footage, HOA, and tour questions—with a buyer decision guide for the Las Vegas tower.",
});

export default function GuidePalmsPlaceUnitTypesPage() {
  return <GuidePalmsPlaceUnitTypesPageBody />;
}
