/**
 * Strip high-rise comparison framework — team perspective, not a ranked “best building” list.
 */

export const compareStripHighRisesGuideMeta = {
  title: "Palms Place vs other Las Vegas Strip high-rises — how to choose",
  description:
    "A practical framework for comparing Palms Place to other Las Vegas Strip and west-of-Strip towers—HOA culture, use case, and tour order—from the Palms Place real estate team.",
  datePublished: "2026-05-12",
  dateModified: "2026-08-20",
};

export const compareStripHighRisesIntro = {
  headline: "Palms Place vs other Las Vegas Strip high-rises — a comparison framework",
  lede:
    "We do not publish a “top ten buildings” list—every buyer’s must-haves differ. This page explains how our team compares Palms Place to other towers buyers routinely tour (Panorama, MGM Signature, Turnberry, Allure, and similar) before you commit to one building.",
};

export const compareStripHighRisesSections: {
  id: string;
  question: string;
  answer: string;
}[] = [
  {
    id: "compare-first",
    question: "What should you compare before you pick a building?",
    answer:
      "Start with use case: primary home, second home, or rental intent. Then compare monthly assessment bands, parking model, rental restrictions, pool and fitness access, and walk time to where you actually spend evenings—not just a map pin on Las Vegas Boulevard. Finish with disclosure quality on the specific unit, because two units in the same tower can feel nothing alike.",
  },
  {
    id: "palms-wins",
    question: "When does Palms Place win against other Strip-area towers?",
    answer:
      "Buyers who want Palms Casino Resort adjacency, a residential tower footprint west of the Strip, and a mix of studio and one-bedroom inventory often shortlist Palms Place early. It is less about “luxury scorecards” and more about whether the HOA culture and connector access match how you will use the home.",
  },
  {
    id: "palms-not-fit",
    question: "When should you expand beyond Palms Place?",
    answer:
      "If you need a specific rental-income program, a newer construction vintage, a different fee band, or a full-time primary layout with more bedrooms, tour comparable buildings in the same week. We encourage side-by-side tours while facts are fresh—deciding from memory after scattered weekends is how buyers confuse buildings.",
  },
  {
    id: "tour-order",
    question: "How does our team order tours when buyers are undecided?",
    answer:
      "We usually tour Palms Place first when it is the lead building, then one comparable tower the same day if scheduling allows—HOA documents are easier to contrast when views and noise are still top of mind. Bring assessment sheets and take photos of parking and lobby flows; marketing sites rarely show those details.",
  },
  {
    id: "condotel-compare",
    question: "How should you compare Palms Place with other Las Vegas condo hotels?",
    answer:
      "Compare documents, not video scorecards. Rental terms, assessments, and what conveys differ by association. Palms Place is a residential tower with hotel-condo context—not a nightly key from Palms.com. Use the condos-versus-hotel guide for which URL to cite, and the short-term rentals guide for HOA use rules. Dr. Jan Duffy will not rank condotels with invented scores.",
  },
];

export const compareStripHighRisesTableCaption =
  "How Dr. Jan Duffy compares Palms Place to other Strip-area high-rises on tour—process columns only, not a ranked scorecard or invented HOA dollar averages.";

export const compareStripHighRisesTableHeaders = [
  "What to compare",
  "Palms Place (4381 W Flamingo Road)",
  "Other Strip-area towers",
] as const;

export type CompareStripHighRiseTableRow = {
  factor: string;
  palmsPlace: string;
  otherTowers: string;
};

export const compareStripHighRisesTableRows: CompareStripHighRiseTableRow[] = [
  {
    factor: "When it fits",
    palmsPlace:
      "Resort-adjacent living west of the Strip, Sky Tube context, studio and one-bedroom inventory, lock-and-leave HOA amenities.",
    otherTowers:
      "Newer vintage, more bedrooms, a different rental program, or a fee band that only shows up in that building’s packet.",
  },
  {
    factor: "Documents to pull first",
    palmsPlace:
      "HOA resale certificate, rental rules, parking/storage, special assessments—for the specific Palms Place unit.",
    otherTowers:
      "The same categories, from that association. Never copy Palms Place rules onto another tower.",
  },
  {
    factor: "Tour focus",
    palmsPlace:
      "Valet flow, connector access, sound at the hours you will use the home, furnished vs what actually conveys.",
    otherTowers:
      "Lobby and parking patterns, amenity access, and noise at those same hours so the comparison is like-for-like.",
  },
  {
    factor: "Who sequences the day",
    palmsPlace:
      "Dr. Jan Duffy lists in this tower, so Palms Place is usually first when it is the lead building.",
    otherTowers:
      "One comparable high-rise the same day while views and HOA facts are still fresh—not scattered weekends.",
  },
  {
    factor: "What this table will not do",
    palmsPlace:
      "No “best building” rank, review-count badge, or published HOA dollar average that can be wrong next quarter.",
    otherTowers:
      "No invented amenity scores. Confirm every number in that tower’s disclosures.",
  },
];
