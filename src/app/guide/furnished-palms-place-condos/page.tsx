import type { Metadata } from "next";
import { GuideFurnishedPalmsPlacePageBody } from "@/components/marketing/guide-furnished-palms-place-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

const path = "/guide/furnished-palms-place-condos";

export const metadata: Metadata = buildPageMetadata({
  path: path,
  title: "Furnished Palms Place condos in Las Vegas | Buyer guide",
  description: "Buying a furnished Palms Place condo—what conveys, HOA rental rules, and resale documents to verify before you write on a Las Vegas high-rise listing.",
});

export default function GuideFurnishedPalmsPlacePage() {
  return <GuideFurnishedPalmsPlacePageBody />;
}
