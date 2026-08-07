import type { Metadata } from "next";
import { AreaPalmsPlaceLasVegasPageBody } from "@/components/marketing/area-palms-place-las-vegas-page-body";
import { buildPageMetadata } from "@/lib/metadata-helpers";

export const metadata: Metadata = buildPageMetadata({
  path: "/area/palms-place-las-vegas",
  title: "Palms Place location | West Flamingo & Paradise, Las Vegas NV",
  description: "Palms Place at 4381 W Flamingo Rd, Paradise 89103—Strip-adjacent tower location, map, directions, and links to buying guides for Las Vegas high-rise condos.",
});

export default function AreaPalmsPlaceLasVegasPage() {
  return <AreaPalmsPlaceLasVegasPageBody />;
}
