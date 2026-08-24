import type { FieldNote } from "@/lib/content/field-notes/types";
import { featuredListing } from "@/lib/content/featured-listing";
import { siteContact } from "@/lib/site-contact";

export const palmsPlaceCornerListingNote: FieldNote = {
  slug: "palms-place-corner-unit-listing-campaign",
  title: "Palms Place #8322: A Corner-Unit Listing Campaign",
  description:
    "Why Palms Place #8322 was marketed as an eighth-floor corner with Strip-view glass, HOA-inclusive utilities, and STR remarks—not a valley-wide template.",
  datePublished: "2026-08-20",
  dateModified: "2026-08-24",
  eyebrow: "Field note · Listing campaign",
  headline: "How we listed Palms Place #8322 as a corner-unit campaign—not a generic Strip condo",
  lede: `Palms Place #${featuredListing.unitNumber} (MLS #${featuredListing.mlsNumber}) is an ${featuredListing.entryLevel} corner with two east-facing walls of glass. We did not upload it as “nice Strip condo, call for details.” The remarks, photography, and HOA notes had to match how this high-rise actually shows—or the first serious buyer would catch the gaps on tour.`,
  authorName: siteContact.agentName,
  authorJobTitle: siteContact.agentTitle,
  howCreated:
    "Written from the listing file Dr. Jan Duffy used for Palms Place #8322: photography direction, remark structure, and the HOA / STR questions buyers asked after the first showings. Price and HOA figures can move—re-verify on the live listing.",
  whyCreated:
    "Most Strip condo blogs recycle amenity adjectives. This note shows the building-specific choices a Palms Place listing specialist makes on a corner stack so sellers see the difference between a template and a tower campaign.",
  sections: [
    {
      id: "why-corner",
      heading: "Why did Palms Place #8322 need a corner-unit story instead of a floor-plan label?",
      body: `The unit is ${featuredListing.squareFeet} with ${featuredListing.beds} and ${featuredListing.baths}—numbers that look ordinary until you stand in the two-wall glass corner. We led with orientation, ${featuredListing.entryLevel} context, and Strip views at the hours buyers will actually be in the room. A “1,220 SF one-bedroom” label without that would have under-sold the architecture and over-sold a generic high-rise comparable.`,
    },
    {
      id: "hoa-in-remarks",
      heading: "What Palms Place HOA facts belong in remarks versus the resale certificate?",
      body: `Buyers asked immediately whether power, water, gas, cable, valet, and concierge were in the monthly assessment. We put the listing’s HOA-inclusive utilities in remarks so the first conversation was honest, then still sent every buyer to the resale certificate. Palms Place assessments change; remarks are a map, not a substitute for the packet.`,
    },
    {
      id: "furnished-str",
      heading: "How did we separate furnished presentation from short-term rental permission?",
      body: `The unit is fully furnished and the listing notes short-term rentals as permitted—two different facts. We photographed the furniture because that is how the home shows, then warned that art, electronics, and pieces convey only as the inventory exhibit states. Rental eligibility still lives in HOA rules. Mixing those three into one “investor-ready” headline is how Palms Place deals blow up in week two.`,
    },
    {
      id: "sky-tube-valet",
      heading: "Which Palms Place building mechanics did the photos miss that remarks had to cover?",
      body: `Photos sell glass and the balcony. They do not explain Sky Tube access to Palms Casino Resort, valet flow, or sound at late hours. We wrote those into the campaign because Palms Place living is a connector-and-valet pattern, not a suburban driveway. Buyers who skip that context pick the wrong building—or the right building for the wrong night-of-week.`,
    },
  ],
  whatWeDoNext: [
    "Walk Palms Place #8322 (or your unit) at the hours you will actually use the home—views and sound change.",
    "Request the HOA packet and inventory exhibit before you treat photos as a bill of sale.",
    "If you are selling a corner or furnished Palms Place residence, use this campaign structure instead of a valley template.",
  ],
};
