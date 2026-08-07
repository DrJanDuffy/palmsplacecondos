import type { Metadata } from "next";
import { BuyerCalculatorsPageBody } from "@/components/marketing/buyer-calculators-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

export const metadata: Metadata = buildPageMetadata({
  path: "/buyers/calculators",
  title: "Palms Place buyer calculators | Payment & HOA planning",
  description: "Plan PITI, HOA, and closing costs before you tour Palms Place or Strip high-rises—questions for your lender plus live listing search.",
});

export default function BuyerCalculatorsPage() {
  return <BuyerCalculatorsPageBody />;
}
