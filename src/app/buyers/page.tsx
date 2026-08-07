import type { Metadata } from "next";
import { BuyersPageBody } from "@/components/marketing/buyers-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = buildPageMetadata({
  path: "/buyers",
  title: "Buy Palms Place & Las Vegas high-rise condos | Buyer hub",
  description: `Search Palms Place condos, use buyer calculators, and tour with ${siteContact.buyerSpecialistName}—${siteContact.buyerSpecialistTitle}, ${siteContact.brokerage}.`,
});

export default function BuyersPage() {
  return <BuyersPageBody />;
}
