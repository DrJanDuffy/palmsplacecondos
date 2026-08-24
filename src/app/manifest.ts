import type { MetadataRoute } from "next";
import { siteContact } from "@/lib/site-contact";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteContact.gbpBusinessName,
    short_name: "Palms Place",
    description: siteContact.schemaAgentDescription ?? `Palms Place condos for sale on the Las Vegas Strip — ${siteContact.teamBrandName}.`,
    start_url: "/",
    display: "browser",
    background_color: "#0d0d0d",
    theme_color: "#0d0d0d",
    lang: "en-US",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
