/**
 * First-hand buyer guide — written from the Palms Place team's listing/buyer workflow.
 * Not generic tower marketing copy. Keep claims process-based; no fabricated volume or rankings.
 */

export const palmsPlaceBuyerGuideMeta = {
  title: "Buying a Palms Place condo — team field guide",
  description:
    "A practical Palms Place buyer guide from Dr. Jan Duffy—listing specialist and Palms Place Buyers Specialist: tour checklist, HOA documents, owner vs rental-pool context, and offer prep.",
  datePublished: "2026-05-01",
  dateModified: "2026-08-20",
};

export const palmsPlaceBuyerGuideIntro = {
  headline: "Buying a Palms Place condo in Las Vegas — what our team does differently on tours",
  lede:
    "Most Palms Place pages online recycle the same tower amenities list. This guide is written from how Dr. Jan Duffy actually runs buyer tours and offer prep in Las Vegas—as both listing specialist and Palms Place Buyers Specialist, not a generic call center. Situation-specific tour and HOA notes live in our separate field notes hub.",
};

/** Questions buyers should ask on-site — citable checklist for AEO. */
export const palmsPlaceTourChecklist: string[] = [
  "Who manages this unit day-to-day (owner, long-term tenant, hotel program, or third-party host)—and does that match the listing remarks?",
  "Which pool, fitness, and parking privileges attach to this unit's HOA documents—not just what hotel guests see on a weekend stay?",
  "Are furnishings, linens, and housewares included in the sale, and who removes personal items before closing?",
  "What is the current monthly assessment, and when did the association last publish a reserve study or special-assessment notice?",
  "Are there rental caps, minimum lease terms, or owner-occupancy rules that affect how you plan to use the home?",
  "How does guest access work for the SkyTube / resort connector versus a standard residential high-rise lobby?",
  "What parking space(s), storage, and valet arrangements transfer with this unit number?",
  "If the unit was used as a short-term rental, ask for trailing 12-month income and expense summaries the seller is willing to share—not marketing projections.",
];

export const palmsPlaceBuyerGuideSections: {
  id: string;
  question: string;
  answer: string;
}[] = [
  {
    id: "why-split-team",
    question: "Who represents Palms Place buyers and sellers?",
    answer:
      "Palms Place inventory mixes owner-occupant resales, furnished turnovers, and units with rental history. Dr. Jan Duffy handles listing strategy, pricing context, and seller representation—and leads buyer tours, HOA document review, and offer timing as the Palms Place Buyers Specialist. On any one transaction she represents only one side, so buyer advocacy and listing negotiations never collide.",
  },
  {
    id: "hotel-vs-owner",
    question: "Is buying a Palms Place condo the same as booking a Palms hotel room?",
    answer:
      "No. A hotel stay reflects nightly operations, housekeeping, and guest policies. A resale condo purchase is governed by HOA covenants, unit-specific disclosures, and Nevada contract law. Buyers who toured only as hotel guests are often surprised by parking assignments, furniture condition, sound transfer between units, and what is—or is not—included in the monthly assessment. Treat your first condo tour as a disclosure visit, not a vacation preview.",
  },
  {
    id: "documents-before-offer",
    question: "Which documents should you read before writing an offer?",
    answer:
      "Your agent should help you request association governing documents, rules on rentals and pets, the current budget, recent board minutes if available, and the seller's property disclosure. For furnished units, add an inventory list and photos that match what you saw on tour. We do not recommend offers based on listing photos alone—Palms Place units vary widely by floor, view, and renovation year even when square footage looks similar.",
  },
  {
    id: "curated-search",
    question: "How is the team's curated search different from scrolling every Las Vegas condo?",
    answer:
      "The RealScout search linked from this site is maintained for Palms Place and comparable Strip-adjacent high-rises Dr. Jan Duffy's team works—not an unfiltered national feed. That narrows noise (wrong building, wrong status, duplicate entries) so you spend tours on units that match your price band and property type. You should still verify status, HOA, and square footage in official records before you waive contingencies.",
  },
  {
    id: "compare-towers",
    question: "When should you compare Palms Place to another Las Vegas high-rise?",
    answer:
      "Compare towers when your must-haves are really about HOA monthly cost, rental flexibility, parking, or walkability—not just a Strip map pin. Palms Place wins buyers who want resort-adjacent access with a residential tower footprint; other buildings win on different HOA cultures, fee bands, or newer construction. We encourage side-by-side tours when you are down to two buildings so you are not deciding from marketing copy alone.",
  },
];
