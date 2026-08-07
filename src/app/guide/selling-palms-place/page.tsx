import type { Metadata } from "next";
import { GuideSellingPalmsPlacePageBody } from "@/components/marketing/guide-selling-palms-place-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

const path = "/guide/selling-palms-place";

export const metadata: Metadata = buildPageMetadata({
  path: path,
  title: "Selling a Palms Place condo | Team field guide",
  description: "Sell a Palms Place condo with HOA packet timing, furnished resale prep, and listing strategy from Dr. Jan Duffy's Las Vegas Strip team.",
});

export default function GuideSellingPalmsPlacePage() {
  return <GuideSellingPalmsPlacePageBody />;
}
