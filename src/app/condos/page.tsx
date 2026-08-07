import type { Metadata } from "next";
import { CondosPageBody } from "@/components/marketing/condos-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = buildPageMetadata({
  path: "/condos",
  title: "Las Vegas Strip condos & high-rises for sale | Palms Place",
  description: `Strip and west-of-Strip condos for sale—including Palms Place—with HOA guides and live search. ${siteContact.buyerSpecialistName}, ${siteContact.brokerage}.`,
});

export default function CondosPage() {
  return <CondosPageBody />;
}
