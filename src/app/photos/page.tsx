import type { Metadata } from "next";
import { PhotosHubPageBody } from "@/components/marketing/photos-hub-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

export const metadata: Metadata = buildPageMetadata({
  path: "/photos",
  title: "Palms Place high-rise condo tour photos | Las Vegas galleries",
  description:
    "First-party Palms Place condo tour photos—Strip views, interiors, and listing galleries with Dr. Jan Duffy at 4381 W Flamingo Road. Not competitor YouTube walkthroughs.",
});

export default function PhotosPage() {
  return <PhotosHubPageBody />;
}
