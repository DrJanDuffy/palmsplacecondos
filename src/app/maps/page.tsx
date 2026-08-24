import type { Metadata } from "next";
import { MapsPageBody } from "@/components/marketing/maps-page-body";
import { mapsPage } from "@/lib/content/maps-page";
import { buildPageMetadata } from "@/lib/metadata-helpers";

export const metadata: Metadata = buildPageMetadata({
  path: mapsPage.path,
  title: mapsPage.title,
  description: mapsPage.description,
});

export default function MapsPage() {
  return <MapsPageBody />;
}
