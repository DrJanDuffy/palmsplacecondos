import type { Metadata } from "next";
import { FaqPageBody } from "@/components/marketing/faq-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

const title = "Palms Place Las Vegas FAQ | Location, condos, and ownership";
const description =
  "FAQ: Palms Place address, Strip location, 47-story tower, and condo ownership—plus planning your stay. Confirm guest details with the property or your booking.";

export const metadata: Metadata = buildPageMetadata({
  path: "/faq",
  title,
  description,
});

export default function FaqPage() {
  return <FaqPageBody />;
}
