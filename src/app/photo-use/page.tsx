import type { Metadata } from "next";
import { PhotoUsePageBody } from "@/components/marketing/photo-use-page-body";
import { photoUsePage } from "@/lib/content/photo-use";
import { buildPageMetadata } from "@/lib/metadata-helpers";

export const metadata: Metadata = buildPageMetadata({
  path: photoUsePage.path,
  title: photoUsePage.title,
  description: photoUsePage.description,
});

export default function PhotoUsePage() {
  return <PhotoUsePageBody />;
}
