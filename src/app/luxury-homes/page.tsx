import type { Metadata } from "next";
import { LuxuryHomesPageBody } from "@/components/marketing/luxury-homes-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = buildPageMetadata({
  path: "/luxury-homes",
  title: "Las Vegas luxury homes for sale | Summerlin & Henderson",
  description: `Luxury homes and estates in Summerlin, Henderson, and the Las Vegas valley—compare with Palms Place high-rises. ${siteContact.buyerSpecialistName}, ${siteContact.brokerage}.`,
});

export default function LuxuryHomesPage() {
  return <LuxuryHomesPageBody />;
}
