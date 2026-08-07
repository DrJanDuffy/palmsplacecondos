import type { Metadata } from "next";
import { SellersPageBody } from "@/components/marketing/sellers-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = buildPageMetadata({
  path: "/sellers",
  title: "Sell Palms Place & Las Vegas condos | Seller guide",
  description: `Listing prep, valuation conversations, and the Palms Place selling field guide with ${siteContact.agentName}, ${siteContact.agentTitle}. ${siteContact.brokerage}.`,
});

export default function SellersPage() {
  return <SellersPageBody />;
}
