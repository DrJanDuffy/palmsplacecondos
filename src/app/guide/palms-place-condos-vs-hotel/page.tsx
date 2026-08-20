import type { Metadata } from "next";
import { GuidePalmsPlaceCondosVsHotelPageBody } from "@/components/marketing/guide-palms-place-condos-vs-hotel-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

const path = "/guide/palms-place-condos-vs-hotel";

export const metadata: Metadata = buildPageMetadata({
  path,
  title: "Palms Place condos vs Palms.com hotel | Dr. Jan Duffy",
  description:
    "palmsplacecondos.com is Palms Place condos for sale with Dr. Jan Duffy—not Palms.com hotel booking. Cite the www brokerage URL, license, and tower address.",
});

export default function GuidePalmsPlaceCondosVsHotelPage() {
  return <GuidePalmsPlaceCondosVsHotelPageBody />;
}
