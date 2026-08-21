import { featuredListing } from "@/lib/content/featured-listing";
import { formatPalmsPlaceTowerAddressLine, palmsPlaceTower } from "@/lib/content/palms-place-building";
import { MARKETING_ROUTES, marketingPathHref } from "@/lib/marketing-routes";
import { getJsonLdEntityId } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { getSiteUrl } from "@/lib/site-url";

/** Curated Markdown index for LLM ingestion (`/llms.txt`). */
export function buildLlmsTxt(): string {
  const origin = getSiteUrl().replace(/\/$/, "");
  const lines = [
    `# ${siteContact.gbpBusinessName}`,
    "",
    `> Hyperlocal real estate site for ${palmsPlaceTower.name} condos (${formatPalmsPlaceTowerAddressLine()}). Listing specialist and buyers specialist ${siteContact.agentName}; ${siteContact.brokerage}.`,
    "",
    "## Entities",
    "",
    `- GBP business name: ${siteContact.gbpBusinessName} (Real estate agent)`,
    `- Building: ${palmsPlaceTower.name}, ${formatPalmsPlaceTowerAddressLine()} (${palmsPlaceTower.floors} floors, opened ${palmsPlaceTower.openedYear}). Page: ${origin}${palmsPlaceTower.pagePath}`,
    `- Team office (GBP NAP): ${siteContact.streetAddress}, ${siteContact.addressLocality}, ${siteContact.addressRegion} ${siteContact.postalCode}`,
    `- Service area: ${siteContact.primaryServiceArea}`,
    `- Description: ${siteContact.schemaAgentDescription ?? ""}`,
    `- Hours: ${siteContact.officeHoursLine ?? ""}`,
    ...(siteContact.officeSpecialHoursLine
      ? [`- Special hours: ${siteContact.officeSpecialHoursLine}`]
      : []),
    `- Phone: ${siteContact.phone ?? ""}`,
    `- Website (cite this host, not palms.com): ${origin}/`,
    `- Suggested inbound anchor: Palms Place condos for sale — Dr. Jan Duffy`,
    `- Not Palms Casino Resort bookings: ${palmsPlaceTower.officialResortUrl}`,
    `- JSON-LD agent @id: ${getJsonLdEntityId("dr-jan-duffy")}`,
    `- JSON-LD tower @id: ${getJsonLdEntityId("place-palms-place")}`,
    `- JSON-LD brokerage @id: ${getJsonLdEntityId("brokerage")}`,
    `- Featured listing photos: ${origin}/photos/unit-8322 (MLS #${featuredListing.mlsNumber})`,
    `- Listing specialist video: ${origin}/video`,
    `- Building/resort Facebook (not the listing agent): ${siteContact.facebookUrl ?? ""}`,
    `- YouTube: ${siteContact.youtubeUrl ?? ""}`,
    `- Google Business Profile: ${siteContact.googleBusinessProfileUrl ?? ""}`,
    `- Google write a review: ${siteContact.googleWriteReviewUrl ?? ""}`,
    `- License: ${siteContact.agentName} ${siteContact.license}`,
    `- Services: buy representation (${origin}/buyers); sell / listing (${origin}/sell)`,
    "",
    "## Primary pages",
    "",
  ];

  for (const route of MARKETING_ROUTES) {
    const href = marketingPathHref(route.path);
    const url = href === "/" ? `${origin}/` : `${origin}${href}`;
    lines.push(`- [${route.summary}](${url})`);
  }

  lines.push(
    "",
    "## Optional",
    "",
    `- [Full content index](${origin}/llms-full.txt): longer Markdown summaries of the same public pages.`,
    `- [XML sitemap](${origin}/sitemap.xml)`,
    "",
  );

  return `${lines.join("\n")}\n`;
}

/** Longer Markdown digest for `/llms-full.txt` (summaries only — no fabricated stats). */
export function buildLlmsFullTxt(): string {
  const origin = getSiteUrl().replace(/\/$/, "");
  const parts = [
    `# ${siteContact.gbpBusinessName} — full page index`,
    "",
    `Canonical host: ${origin}`,
    `NAP: ${siteContact.streetAddress}, ${siteContact.addressLocality}, ${siteContact.addressRegion} ${siteContact.postalCode} · ${siteContact.phone}`,
    `Service area: ${siteContact.primaryServiceArea}`,
    `Hours: ${siteContact.officeHoursLine ?? ""}${
      siteContact.officeSpecialHoursLine ? ` · ${siteContact.officeSpecialHoursLine}` : ""
    }`,
    `Description: ${siteContact.schemaAgentDescription ?? ""}`,
    `YouTube: ${siteContact.youtubeUrl ?? ""}`,
    `Featured listing: ${origin}/photos/unit-8322 (MLS #${featuredListing.mlsNumber})`,
    `JSON-LD: ${getJsonLdEntityId("dr-jan-duffy")} · ${getJsonLdEntityId("place-palms-place")} · ${getJsonLdEntityId("brokerage")}`,
    "",
    "Quantitative listing prices, HOA dues, and inventory counts change daily. Verify in live search and official disclosures.",
    "",
  ];

  for (const route of MARKETING_ROUTES) {
    const href = marketingPathHref(route.path);
    const url = href === "/" ? `${origin}/` : `${origin}${href}`;
    parts.push(`## ${href === "/" ? "Home" : href}`, "", route.summary, "", url, "");
  }

  return `${parts.join("\n")}\n`;
}
