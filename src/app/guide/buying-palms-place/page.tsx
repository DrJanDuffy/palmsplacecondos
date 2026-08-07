import type { Metadata } from "next";
import { GuideBuyingPalmsPlacePageBody } from "@/components/marketing/guide-buying-palms-place-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

const path = "/guide/buying-palms-place";

export const metadata: Metadata = buildPageMetadata({
  path: path,
  title: "Buying a Palms Place condo | Team field guide",
  description: "Palms Place buyer field guide—tour checklist, HOA due diligence, and team roles for Las Vegas Strip high-rise purchases with Dr. Jan Duffy's team.",
});

export default function GuideBuyingPalmsPlacePage() {
  return <GuideBuyingPalmsPlacePageBody />;
}
