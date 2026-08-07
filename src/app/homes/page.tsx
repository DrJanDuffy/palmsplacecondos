import type { Metadata } from "next";
import { HomesPageBody } from "@/components/marketing/homes-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = buildPageMetadata({
  path: "/homes",
  title: "Las Vegas homes for sale | Compare with Palms Place condos",
  description: `Browse Las Vegas single-family and attached homes for sale—compare valley neighborhoods with Palms Place with ${siteContact.buyerSpecialistName}, ${siteContact.brokerage}.`,
});

export default function HomesPage() {
  return <HomesPageBody />;
}
