import type { Metadata } from "next";
import { ConnectPageBody } from "@/components/marketing/connect-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = buildPageMetadata({
  path: "/connect",
  title: "Connect with the Palms Place team | Las Vegas Strip condos",
  description: `Call ${siteContact.phone} or follow social channels for Palms Place and Las Vegas Strip high-rise updates—${siteContact.agentName}, ${siteContact.brokerage}.`,
});

export default function ConnectPage() {
  return <ConnectPageBody />;
}
