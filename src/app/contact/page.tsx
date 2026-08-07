import type { Metadata } from "next";
import { ContactPageBody } from "@/components/marketing/contact-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = buildPageMetadata({
  path: "/contact",
  title: "Contact Dr. Jan Duffy — Palms Place real estate",
  description: `Call ${siteContact.phone} for Palms Place tours and Las Vegas high-rise questions. ${siteContact.agentName}, ${siteContact.brokerage}.`,
});

export default function ContactPage() {
  return <ContactPageBody />;
}
