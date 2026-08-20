import type { FieldNote } from "@/lib/content/field-notes/types";
import { siteContact } from "@/lib/site-contact";

export const hoaPacketBeforeOfferNote: FieldNote = {
  slug: "why-we-request-hoa-packets-early",
  title: "Why we request Palms Place HOA packets before—not after—an offer",
  description:
    "A Palms Place–specific look at rental caps, special assessments, and resale certificate timing from Dr. Jan Duffy’s listing team—why early HOA review beats waiving contingencies to “win.”",
  datePublished: "2026-05-16",
  dateModified: "2026-08-20",
  eyebrow: "Field note · Due diligence",
  headline: "Why we request Palms Place HOA packets before—not after—an offer",
  lede:
    "In competitive markets, buyers sometimes waive document review to look decisive. At Palms Place, that gamble often backfires because the tower mixes owner-occupant resales, furnished turnovers, and units with rental history—each with different rules in the same association.",
  authorName: siteContact.agentName,
  authorJobTitle: siteContact.agentTitle,
  howCreated:
    "Based on listing and negotiation patterns Dr. Jan Duffy’s team sees on Palms Place resales. Figures and assessment amounts are not cited here because they change—always read the packet for the unit you are buying.",
  whyCreated:
    "Generic “read the HOA docs” advice does not explain which Palms Place clauses actually kill deals in week three. This note names those clauses so you know what you are requesting.",
  sections: [
    {
      id: "rental-cap-surprise",
      heading: "What happens when Palms Place rental caps do not match how you plan to use the home?",
      body:
        "A buyer intending to lease the unit between personal visits may discover minimum lease terms, rental caps, or owner-occupancy floors that were never mentioned on the tour. We read rental restrictions before offer—not because we expect to talk you out of the purchase, but because the use case may require a different building entirely.",
    },
    {
      id: "assessment-letter",
      heading: "Where are special assessment letters buried in Palms Place resale packets?",
      body:
        "Palms Place assessments and reserve studies update on association timelines, not listing launch dates. We look for pending or contemplated special assessments in minutes and manager letters, then map them to your planned hold period. A “great price” can be ordinary once a six-figure assessment is annualized.",
    },
    {
      id: "certificate-timeline",
      heading: "How does Palms Place resale certificate timing affect your loan clock?",
      body:
        "If the association requires a formal resale certificate, production time can overlap with lender conditions. We build that timeline into the contract calendar so you are not forced to waive inspection or HOA review simply because the certificate arrived late.",
    },
    {
      id: "hotel-program-history",
      heading: "When does prior short-term rental use trigger extra Palms Place questions?",
      body:
        "Units with hotel-program or host history sometimes need trailing operating statements the seller is willing—but not required—to share. We ask early so income representations in remarks can be compared to actuals before you rely on them for financing or cash-flow planning.",
    },
  ],
  whatWeDoNext: [
    "Request governing documents, budget, and resale certificate timeline with the offer or immediately after acceptance—never assume “we’ll get them later.”",
    "Flag rental restrictions to your lender if the unit will not be owner-occupied.",
    "Pair this review with the buying field guide tour checklist on your second visit.",
  ],
};
