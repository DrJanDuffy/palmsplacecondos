import type { Metadata } from "next";
import { GuidePalmsPlaceStripViewPageBody } from "@/components/marketing/guide-palms-place-strip-view-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

const path = "/guide/palms-place-strip-view-condos";

export const metadata: Metadata = buildPageMetadata({
  path,
  title: "Palms Place Strip view condos | Las Vegas high-rise outlooks",
  description:
    "Strip view vs mountain view at Palms Place in Las Vegas. Confirm stack, floor, and glass with Dr. Jan Duffy at 4381 W Flamingo Road—not a YouTube thumbnail.",
});

export default function GuidePalmsPlaceStripViewPage() {
  return <GuidePalmsPlaceStripViewPageBody />;
}
