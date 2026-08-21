import type { FieldNote } from "@/lib/content/field-notes/types";
import { siteContact } from "@/lib/site-contact";

export const palmsPlaceTourRedFlagsNote: FieldNote = {
  slug: "palms-place-tour-red-flags",
  title: "Palms Place tour red flags we actually walk buyers past",
  description:
    "Palms Place tour signals—sound, furnished mismatches, parking, and SkyTube access—that buyer tours address before offers, not generic high-rise tips.",
  datePublished: "2026-05-15",
  dateModified: "2026-08-21",
  eyebrow: "Field note · Buyer tours",
  headline: "Palms Place tour red flags we actually walk buyers past",
  lede:
    "“7 things to check on a condo tour” could apply to any tower. This note records recurring Palms Place–specific signals we pause on during buyer tours—patterns that rarely show up in amenity brochures but do show up in HOA packets and resale remarks.",
  authorName: siteContact.buyerSpecialistName,
  authorJobTitle: siteContact.buyerSpecialistTitle,
  howCreated:
    "Written from buyer tours and offer prep at Palms Place by the site’s buyers specialist—not compiled from third-party listicles. No client names or unit numbers are used.",
  whyCreated:
    "Buyers who toured only as hotel guests often discover these issues after an offer. We publish the checklist so you can decide on-site, not from memory weeks later.",
  sections: [
    {
      id: "sound-not-view",
      heading: "When the view sells the tour but sound sells the neighbor",
      body:
        "A west-facing unit can look perfect at 2 p.m. on a quiet weekday. We still ask buyers to stand in the bedroom with hallway doors closed and listen for elevator machinery, ice machines, or adjacent party walls—especially on floors where hotel operations sit closer to residential stacks. If you only tour once, schedule a second pass during a busier window when you can.",
    },
    {
      id: "furnished-ghost",
      heading: "Furnished listings where the furniture is not really “included”",
      body:
        "Remarks sometimes say furnished while the seller plans to swap staging pieces, remove art, or strip linens before closing. We photograph built-ins and serial-tagged items on tour and require an exhibit list in the contract when conveyance matters. A Palms Place furnished resale is not the same product category as an unfurnished one-bedroom—treat them as different comp sets.",
    },
    {
      id: "parking-on-paper",
      heading: "Parking that exists on the listing but not on the assignment letter",
      body:
        "Valet stacks, owner parking, and guest privileges differ by unit. We verify the deeded or assigned space number against HOA resale documents before buyers waive contingencies—not against the marketing flyer alone.",
    },
    {
      id: "skytube-assumption",
      heading: "Assuming SkyTube access works like a hotel key",
      body:
        "Residential owners do not always have the same connector privileges guests assume from a weekend stay. We confirm which amenities attach to the unit’s HOA schedule and what requires separate resort credentials, so buyers are not surprised after closing when guest policies change.",
    },
  ],
  whatWeDoNext: [
    "Re-tour at a different time of day if sound or crowd noise was the only open question.",
    "Request resale HOA documents and parking assignment before drafting offer terms.",
    "Attach a furnished inventory exhibit when remarks promise conveyance.",
    "Compare the unit to our studio vs one-bedroom guide only after you have the exact floor plan in hand.",
  ],
};
