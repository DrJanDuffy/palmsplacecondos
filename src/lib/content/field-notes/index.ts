import { furnishedInventorySurprisesNote } from "@/lib/content/field-notes/furnished-inventory-surprises";
import { hoaPacketBeforeOfferNote } from "@/lib/content/field-notes/hoa-packet-before-offer";
import { palmsPlaceCornerListingNote } from "@/lib/content/field-notes/palms-place-corner-listing";
import { palmsPlaceTourRedFlagsNote } from "@/lib/content/field-notes/palms-place-tour-red-flags";
import type { FieldNote } from "@/lib/content/field-notes/types";

export const fieldNotes: FieldNote[] = [
  palmsPlaceCornerListingNote,
  palmsPlaceTourRedFlagsNote,
  hoaPacketBeforeOfferNote,
  furnishedInventorySurprisesNote,
];

export function getFieldNoteBySlug(slug: string): FieldNote | undefined {
  return fieldNotes.find((note) => note.slug === slug);
}

export const fieldNotesHubMeta = {
  name: "Palms Place field notes — Las Vegas high-rise tours",
  description:
    "First-hand Palms Place field notes from Dr. Jan Duffy: specific tour, HOA, and furnished-resale situations—not generic Las Vegas condo tips.",
};
