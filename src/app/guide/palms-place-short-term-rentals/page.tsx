import type { Metadata } from "next";
import { GuidePalmsPlaceShortTermRentalsPageBody } from "@/components/marketing/guide-palms-place-short-term-rentals-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

const path = "/guide/palms-place-short-term-rentals";

export const metadata: Metadata = buildPageMetadata({
  path,
  title: "Palms Place short-term rentals | HOA rules vs Airbnb videos",
  description:
    "Can you short-term rent a Palms Place condo in Las Vegas? Furnishing is not permission. Verify HOA rules with Dr. Jan Duffy—no Airbnb income promises.",
});

export default function GuidePalmsPlaceShortTermRentalsPage() {
  return <GuidePalmsPlaceShortTermRentalsPageBody />;
}
