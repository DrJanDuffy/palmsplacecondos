/**
 * Canonical buyer/seller questions → one URL each (AEO query map).
 * Full 40–60 word answers live only on the canonical page FAQ.
 * Other routes should link here instead of repeating the same FAQ block.
 */

export type CanonicalQuery = {
  id: string;
  question: string;
  /** 40–60 words; first sentence is the direct answer. */
  answer: string;
  canonicalPath: string;
  canonicalLabel: string;
};

export const AEO_QUERY_MAP: CanonicalQuery[] = [
  {
    id: "inventory",
    question: "Are there Palms Place condos for sale?",
    answer:
      "Yes. Palms Place condos for sale appear in live brokerage search and change daily. Open the curated RealScout search or the featured office listings, then confirm status, price, parking, and HOA assessments with Dr. Jan Duffy and the official listing record before you write. Do not rely on a screenshot or a stale blog grid.",
    canonicalPath: "/",
    canonicalLabel: "Palms Place condos for sale homepage",
  },
  {
    id: "address",
    question: "What is the Palms Place building address?",
    answer:
      "Palms Place is at 4381 W Flamingo Road, Las Vegas, NV 89103—a 47-story residential tower west of the Strip and connected to Palms Casino Resort. Use that tower address for tours and maps. The team office on the contact page is a different NAP and must match Google Business Profile, not the building pin.",
    canonicalPath: "/area/palms-place-las-vegas",
    canonicalLabel: "Palms Place location page",
  },
  {
    id: "strip-location",
    question: "Is Palms Place on the Las Vegas Strip?",
    answer:
      "No. Palms Place sits west of Las Vegas Boulevard on Flamingo Road, adjacent to Palms Casino Resort rather than inside the Strip hotel corridor. Driving, valet, and guest-access rules can differ from a Strip hotel stay. Tour at the hours you actually plan to come and go, then confirm HOA and management materials with your agent.",
    canonicalPath: "/faq",
    canonicalLabel: "Palms Place FAQ",
  },
  {
    id: "hotel-vs-condos",
    question: "Is this the Palms Place hotel booking website?",
    answer:
      "No. This site is Palms Place condos for sale and resale with Dr. Jan Duffy, Realtor—not hotel reservations. Book a stay on the official Palms Place hotel page at palms.com or your reservation platform. For ownership, HOA packets, and live listings at 4381 W Flamingo Road, stay here with the Palms Place listing specialist.",
    canonicalPath: "/guide/palms-place-condos-vs-hotel",
    canonicalLabel: "Palms Place condos vs hotel guide",
  },
  {
    id: "building",
    question: "What is Palms Place?",
    answer:
      "Palms Place is a 47-story residential high-rise that opened in 2008 at 4381 W Flamingo Road, connected to Palms Casino Resort. Owners buy condos—not hotel keys—so furnishings, parking, and rental rules vary by unit. Confirm amenities, assessments, and inventory on the building guide and in HOA documents, not from a marketing headline.",
    canonicalPath: "/palms-place",
    canonicalLabel: "Palms Place building guide",
  },
  {
    id: "search",
    question: "How do I search Palms Place condos for sale?",
    answer:
      "Use the team’s curated RealScout search to filter Palms Place and comparable Las Vegas-area listings by price, property type, and status. Save the search with Dr. Jan Duffy so new matches alert you. Inventory changes daily—verify square footage, HOA, and remarks on the official listing before you tour or offer.",
    canonicalPath: "/search",
    canonicalLabel: "Curated Palms Place search",
  },
  {
    id: "listing-specialist",
    question: "Who is the Palms Place listing specialist?",
    answer:
      "Dr. Jan Duffy, Realtor, is the listing specialist, team leader, and Palms Place Buyers Specialist (Nevada license S.0197614.LLC) at Berkshire Hathaway HomeServices Nevada Properties. Buyer tours, seller marketing, HOA packet timing, and the featured Palms Place #8322 campaign all run through her—not a rotating valley-wide desk.",
    canonicalPath: "/team",
    canonicalLabel: "Palms Place team page",
  },
  {
    id: "hoa-fees",
    question: "Where do I find Palms Place HOA fees for a specific unit?",
    answer:
      "In the HOA resale certificate and governing documents for that unit—not on a generic blog average. Assessments, parking, storage, and special assessments change and vary by residence. Dr. Jan Duffy requests the packet early so you can model monthly carry with a lender before you offer, then re-read the certificate in escrow.",
    canonicalPath: "/guide/palms-place-hoa-and-monthly-costs",
    canonicalLabel: "Palms Place HOA and monthly costs guide",
  },
  {
    id: "buy-docs",
    question: "What is the first document to request before a Palms Place offer?",
    answer:
      "Request the HOA resale package and governing documents, plus a clear picture of parking, storage, and any special assessments. Dr. Jan Duffy coordinates that timing so you are not guessing from listing photos. The buying field guide walks the tour checklist; official documents still control what you can do after closing.",
    canonicalPath: "/guide/buying-palms-place",
    canonicalLabel: "Buying a Palms Place condo field guide",
  },
  {
    id: "sell-hoa",
    question: "When should a Palms Place seller order HOA documents?",
    answer:
      "Order HOA documents early in listing prep so remarks, pricing, and buyer questions match rental rules, reserves, and assessments. Late packets slow escrow, not just photography. Dr. Jan Duffy treats Palms Place listing prep as a building-specific campaign—furnished conveyances and parking notes belong in the file before the first showing.",
    canonicalPath: "/guide/selling-palms-place",
    canonicalLabel: "Selling a Palms Place condo field guide",
  },
  {
    id: "furnished",
    question: "Are all furnished Palms Place listings investor-ready?",
    answer:
      "No. Furnishing and rental eligibility are separate questions. Photos can show a turnkey look while the resale certificate still limits leases, minimum terms, or registration. Read what conveys in the purchase agreement, then confirm HOA rental rules for that unit with Dr. Jan Duffy before you underwrite income.",
    canonicalPath: "/guide/furnished-palms-place-condos",
    canonicalLabel: "Furnished Palms Place condos guide",
  },
  {
    id: "amenities",
    question: "Do Palms Place owners get the same access as hotel guests?",
    answer:
      "Not automatically. Residential ownership follows HOA and building rules, not a nightly hotel folio. Owner amenity rights, resort connector access, and any separate fees belong in the resale certificate for your unit. Verify those lines with Dr. Jan Duffy before you assume pool, spa, or Palms Casino Resort privileges from a brochure.",
    canonicalPath: "/guide/palms-place-amenities-and-resort-access",
    canonicalLabel: "Palms Place amenities and resort access guide",
  },
  {
    id: "contact",
    question: "How do I contact the Palms Place real estate team?",
    answer:
      "Call the office number on this site, email the listings or general inbox, or book a tour on Calendly. Hours and the Lindell Road office address match the Google Business Profile for Palms Place Condos. Dr. Jan Duffy handles both listing and buyer questions—do not expect a separate agent for Palms Place tours.",
    canonicalPath: "/contact",
    canonicalLabel: "Contact the Palms Place office",
  },
  {
    id: "strip-view",
    question: "Do Palms Place condos have Las Vegas Strip views?",
    answer:
      "Some Palms Place condos have Las Vegas Strip views; others face mountains or the west valley. Stack, floor, and glass decide the outlook—not the building name. Confirm remarks and tour at the hours you would use the balcony. Dr. Jan Duffy shows both orientations at 4381 W Flamingo Road.",
    canonicalPath: "/guide/palms-place-strip-view-condos",
    canonicalLabel: "Palms Place Strip view condos guide",
  },
  {
    id: "condo-tour",
    question: "Where is a Palms Place high-rise condo tour?",
    answer:
      "Start with first-party listing photography on this site, then book a showing with Dr. Jan Duffy. Palms Place #8322 has a live photo gallery and a PropertyPanorama 3D tour. The listing-specialist video is on /video. Competitor YouTube walkthroughs are not this brokerage’s inventory. Photos do not replace HOA documents or a walk at the hours you would live there.",
    canonicalPath: "/photos",
    canonicalLabel: "Palms Place condo photo galleries",
  },
  {
    id: "studio-mountain",
    question: "What is a Palms Place studio mountain view versus a Strip view studio?",
    answer:
      "Palms Place studios can face mountains, city, or the Strip depending on stack and floor. A mountain-view studio is not the same product as a Strip-view studio. Confirm orientation on the listing, then tour. Marketing often cites about 615 square feet—verify on the record with Dr. Jan Duffy.",
    canonicalPath: "/guide/palms-place-unit-types",
    canonicalLabel: "Palms Place studios vs one-bedroom guide",
  },
  {
    id: "hoa-costs-year",
    question: "Where are Palms Place HOA costs explained for this year?",
    answer:
      "Palms Place HOA costs are unit-specific and change. Do not use a YouTube dollar figure or a studio average for a one-bedroom. Request the current resale certificate, then model monthly carry with a licensed lender. Dr. Jan Duffy will not publish a blog HOA number that can be wrong next quarter.",
    canonicalPath: "/guide/palms-place-hoa-and-monthly-costs",
    canonicalLabel: "Palms Place HOA and monthly costs guide",
  },
  {
    id: "short-term-rental",
    question: "Can you legally short-term rent or Airbnb a Palms Place condo?",
    answer:
      "Short-term rental at Palms Place is an HOA question, not a platform badge. Some listings, including Palms Place #8322, are marketed with short-term rentals permitted—still read the resale certificate for your unit. Furnishing is not permission. Do not underwrite income from a video. Confirm rules with Dr. Jan Duffy before you offer.",
    canonicalPath: "/guide/palms-place-short-term-rentals",
    canonicalLabel: "Palms Place short-term rentals guide",
  },
  {
    id: "condotel-investors",
    question: "Is Palms Place a Las Vegas condo hotel for investors?",
    answer:
      "Palms Place is a residential high-rise with hotel-condo operations nearby—not a nightly hotel key. Investors still buy a unit with HOA rules, not a guaranteed rental program. Compare Palms Place with other Las Vegas condo-hotels on documents: rental terms, assessments, and what conveys. Dr. Jan Duffy will not rank condotels with invented scores.",
    canonicalPath: "/guide/palms-place-condos-vs-hotel",
    canonicalLabel: "Palms Place condos vs hotel guide",
  },
  {
    id: "penthouse",
    question: "Are Palms Place penthouses and 57th-floor residences for sale?",
    answer:
      "Palms Place penthouses and upper-floor residences are individual listings, not a single 57th-floor product. Square footage, terraces, and spa features vary. Confirm floor, outdoor space, and status on the live record. Do not assume a YouTube penthouse tour is still for sale. Dr. Jan Duffy matches current upper-floor inventory to your criteria.",
    canonicalPath: "/guide/palms-place-unit-types",
    canonicalLabel: "Palms Place studios vs one-bedroom guide",
  },
  {
    id: "listing-specialist-video",
    question: "Where is Dr. Jan Duffy’s Palms Place listing specialist video?",
    answer:
      "Watch Dr. Jan Duffy’s Palms Place listing-specialist video on this site’s /video page. The 48-second cut uses first-party tower and #8322 photography—not a competitor YouTube walkthrough. Captions are on screen. Call the office number on that page or schedule a showing at 4381 W Flamingo Road after you watch. Condos for sale, not hotel booking.",
    canonicalPath: "/video",
    canonicalLabel: "Palms Place listing specialist video",
  },
  {
    id: "gym",
    question: "Does Palms Place have a condo gym owners can use?",
    answer:
      "Palms Place includes residential fitness amenities documented for owners, not every hotel gym guests see in marketing. Confirm current access, hours, and any separate fees in the HOA packet. Tour the gym at the hours you would actually use it. Dr. Jan Duffy treats amenity access as a disclosure item, not a lifestyle slogan.",
    canonicalPath: "/guide/palms-place-amenities-and-resort-access",
    canonicalLabel: "Palms Place amenities and resort access guide",
  },
];

export function getCanonicalQuery(id: string): CanonicalQuery | undefined {
  return AEO_QUERY_MAP.find((item) => item.id === id);
}

export function canonicalQueryAsFaqItem(id: string): { question: string; answer: string } {
  const item = getCanonicalQuery(id);
  if (!item) {
    throw new Error(`Unknown canonical query id: ${id}`);
  }
  return { question: item.question, answer: item.answer };
}

/** One-sentence pointer for non-canonical pages (do not paste the full canonical answer). */
export function canonicalQueryPointer(id: string): string {
  const item = getCanonicalQuery(id);
  if (!item) {
    throw new Error(`Unknown canonical query id: ${id}`);
  }
  return `See the full answer on ${item.canonicalLabel}.`;
}
