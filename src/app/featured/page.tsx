import type { Metadata } from "next";
import { FeaturedPageBody } from "@/components/marketing/featured-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

export const metadata: Metadata = buildPageMetadata({
  path: "/featured",
  title: "Featured Palms Place & Las Vegas listings | Spotlight inventory",
  description: "Spotlight Palms Place and Las Vegas high-rise listings—live RealScout search, new inventory, and private tour lists with Dr. Jan Duffy's team.",
});

export default function FeaturedPage() {
  return <FeaturedPageBody />;
}
