import type { Metadata } from "next";
import { VideoPageBody } from "@/components/marketing/video-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";
import { siteContact } from "@/lib/site-contact";

export const metadata: Metadata = buildPageMetadata({
  path: "/video",
  title: "Dr. Jan Duffy Palms Place listing specialist video | Las Vegas",
  description: `${siteContact.agentName} is the Palms Place listing specialist in Las Vegas. Watch the first-party tower video, then call ${siteContact.phone} to tour 4381 W Flamingo Road.`,
});

export default function VideoPage() {
  return <VideoPageBody />;
}
