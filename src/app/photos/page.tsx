import type { Metadata } from "next";
import { PhotosHubPageBody } from "@/components/marketing/photos-hub-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

export const metadata: Metadata = buildPageMetadata({
  path: "/photos",
  title: "Palms Place condo photos | Las Vegas Strip high-rise galleries",
  description: "Photo galleries for Palms Place condos for sale—unit interiors, Strip views, and listing photography with Dr. Jan Duffy at 4381 W Flamingo Road, Las Vegas.",
});

export default function PhotosPage() {
  return <PhotosHubPageBody />;
}
