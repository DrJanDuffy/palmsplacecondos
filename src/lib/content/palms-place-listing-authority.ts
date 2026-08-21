/**
 * Unique per-route proof that Dr. Jan Duffy is the Palms Place high-rise listing specialist
 * and team leader. First-party process and listing work only — no invented rankings,
 * review counts, or sales-volume trophies.
 */

import { featuredListing } from "@/lib/content/featured-listing";
import { formatPalmsPlaceTowerAddressLine, palmsPlaceTower } from "@/lib/content/palms-place-building";
import { siteContact } from "@/lib/site-contact";

export type ListingAuthoritySection = {
  heading: string;
  /** 40–60 words; first sentence is the extractable answer. */
  answer: string;
  proofs: readonly [string, string, string];
  ctaLabel: string;
  ctaHref: string;
};

const license = siteContact.license;
const brokerage = siteContact.brokerage;
const tower = formatPalmsPlaceTowerAddressLine();
const unit = featuredListing.unitNumber;
const mls = featuredListing.mlsNumber;

const listingAuthorityByPath: Record<string, ListingAuthoritySection> = {
  "/": {
    heading: "Why is Dr. Jan Duffy the Palms Place high-rise realtor buyers and sellers work with first?",
    answer: `Dr. Jan Duffy is the listing specialist and team leader for Palms Place—the high-rise realtor this tower’s buyers and sellers work with first. She lists residences at ${tower}, including Palms Place #${unit} (MLS #${mls}), and runs buyer tours in the same building. That is building-level listing work, not a valley-wide template upload.`,
    proofs: [
      `Active listing campaign: Palms Place #${unit}, ${featuredListing.beds}, ${featuredListing.squareFeet}, ${featuredListing.entryLevel} corner with Strip views.`,
      `Nevada license ${license} at ${brokerage}.`,
      "Buyer tours, HOA packet timing, and seller remarks all route through the same Palms Place specialist.",
    ],
    ctaLabel: "Meet the Palms Place listing specialist",
    ctaHref: "/team",
  },
  "/palms-place": {
    heading: "Who lists Palms Place residences in this 47-story tower?",
    answer: `Dr. Jan Duffy is the Palms Place listing specialist and team leader for this 47-story tower that opened in ${palmsPlaceTower.openedYear}. She works the building address—${tower}—as a dedicated high-rise practice: amenities, Sky Tube context, and unit-level HOA documents, not a generic Strip condo brochure.`,
    proofs: [
      `Tower entity she markets: ${palmsPlaceTower.floors} floors at ${tower}, connected to Palms Casino Resort.`,
      `Featured listing photography and remarks for unit #${unit} are her campaign, not a recycled valley template.`,
      `License ${license} — confirm on the Nevada RED lookup linked from Sources on this page.`,
    ],
    ctaLabel: "See Palms Place #8322 photos",
    ctaHref: "/photos/unit-8322",
  },
  "/buyers": {
    heading: "Who runs Palms Place buyer tours as the building’s listing specialist?",
    answer: `Dr. Jan Duffy is the Palms Place Buyers Specialist and the listing specialist for the same tower. On buyer tours she flags parking, sound at the hours you will use the home, and HOA packet timing—the same issues she underwrites when she lists a Palms Place unit. You are not handed to a rotating showing desk.`,
    proofs: [
      "Tour checklists in the buying field guide come from her Palms Place showings, not a national first-time-buyer PDF.",
      `She is currently listing Palms Place #${unit} (MLS #${mls})—the same inventory class buyers tour here.`,
      `Call ${siteContact.phone ?? "the office"} to schedule a Palms Place showing on Calendly.`,
    ],
    ctaLabel: "Open the Palms Place buying field guide",
    ctaHref: "/guide/buying-palms-place",
  },
  "/sellers": {
    heading: "Who leads Palms Place listing strategy for sellers in this tower?",
    answer: `Dr. Jan Duffy is the listing specialist and team leader for Palms Place. Seller prep here is a building campaign: furnished vs unfurnished remarks, parking, and HOA packets before photography—not a same-day upload used for any Las Vegas ZIP. That is why Palms Place owners start with her instead of a generalist.`,
    proofs: [
      `She listed Palms Place #${unit} as an eighth-floor corner with Strip views, STR notes, and HOA-inclusive utilities in the remarks.`,
      "Selling field guide and valuation consults are Palms Place-specific, not a metro-wide CMA template.",
      `${brokerage} · license ${license}.`,
    ],
    ctaLabel: "Start a Palms Place listing conversation",
    ctaHref: "/sell",
  },
  "/guide/buying-palms-place": {
    heading: "Why does Palms Place due diligence run through Dr. Jan Duffy?",
    answer: `Dr. Jan Duffy wrote this buying field guide from Palms Place tours and contracts—not a syndicated condo checklist. As listing specialist she already knows which HOA clauses, parking assignments, and furnished mismatches stall offers in this tower, so buyer due diligence matches how Palms Place actually closes.`,
    proofs: [
      "Tour checklist on this page is the same sequence she uses on Palms Place showings.",
      "HOA packets are requested early because she has watched late certificates collide with lender clocks in this association.",
      `Featured unit #${unit} is a live example of the furnished / STR questions this guide tells you to verify.`,
    ],
    ctaLabel: "Read why we request HOA packets early",
    ctaHref: "/insights/why-we-request-hoa-packets-early",
  },
  "/guide/selling-palms-place": {
    heading: "Why do Palms Place sellers list with the building’s specialist?",
    answer: `Dr. Jan Duffy leads Palms Place listing marketing because this tower’s resales are not interchangeable with valley singles. Furnished conveyances, valet notes, and HOA packet timing have to be in the file before the first showing. She lists here as team leader—not as a weekend upload from another market.`,
    proofs: [
      `Live proof: Palms Place #${unit} (MLS #${mls}) was positioned as a corner-unit campaign with Strip-view photography.`,
      "This guide’s HOA-before-photos sequence is how she actually preps Palms Place listings.",
      `License ${license} at ${brokerage}.`,
    ],
    ctaLabel: "See the #8322 listing photo gallery",
    ctaHref: "/photos/unit-8322",
  },
  "/guide/palms-place-unit-types": {
    heading: "Who explains Palms Place studios vs one-bedrooms from actual listings?",
    answer: `Dr. Jan Duffy compares Palms Place floor plans from units she lists and tours in this tower—not from a marketing range copied across high-rises. Studios, one-bedrooms, and occasional upper-floor layouts still share one association, so she ties plan choice to HOA, parking, and view orientation you will see on the tour.`,
    proofs: [
      `Palms Place #${unit} is a ${featuredListing.beds} / ${featuredListing.baths} / ${featuredListing.squareFeet} corner—use it as a one-bedroom reference, then confirm the next unit on its own record.`,
      "She will not quote a building-wide square-footage average as if every stack matched.",
      "Unit-type advice is paired with the HOA guide because dues and parking still vary by residence.",
    ],
    ctaLabel: "Compare Palms Place with other Strip towers",
    ctaHref: "/guide/compare-strip-high-rises",
  },
  "/guide/compare-strip-high-rises": {
    heading: "Who should sequence Palms Place vs other Strip high-rise tours?",
    answer: `Dr. Jan Duffy sequences Palms Place first when it is the lead building because she lists inside this tower and can contrast Sky Tube, valet, and HOA culture against the next high-rise the same day. That is listing-specialist comparison, not a ranked “best building” blog with invented scores.`,
    proofs: [
      "The comparison table on this page uses process columns—use case, documents, tour focus—not fake HOA dollar averages.",
      `She currently represents Palms Place inventory at ${tower}, including unit #${unit}.`,
      "Tour order in this guide matches how she actually books Palms Place vs comparable towers.",
    ],
    ctaLabel: "Open the Palms Place building guide",
    ctaHref: "/palms-place",
  },
  "/guide/palms-place-hoa-and-monthly-costs": {
    heading: "Who pulls Palms Place HOA packets as the listing specialist?",
    answer: `Dr. Jan Duffy requests Palms Place HOA packets as listing specialist and buyers specialist—the same person who has to defend assessments in listing remarks. She will not publish a blog HOA dollar figure that can be wrong next quarter. Monthly carry is modeled from the certificate for your unit.`,
    proofs: [
      "This guide refuses generic HOA averages because she has seen units in the same tower carry differently.",
      "Early packet requests are the same workflow she uses on Palms Place listings she markets.",
      `Pair this page with buyer calculators, then confirm numbers with a licensed lender and the resale certificate.`,
    ],
    ctaLabel: "HOA packets field note",
    ctaHref: "/insights/why-we-request-hoa-packets-early",
  },
  "/guide/furnished-palms-place-condos": {
    heading: "Who lists furnished Palms Place resales without guessing what conveys?",
    answer: `Dr. Jan Duffy lists furnished Palms Place residences with inventory exhibits and HOA rental rules in the file—because photos do not convey furniture. As the tower’s listing specialist she has seen turnkey marketing collide with empty closets and lease caps. That is why this guide separates furnishing from rental eligibility.`,
    proofs: [
      `Palms Place #${unit} is marketed fully furnished with STR notes—still verify the inventory exhibit and HOA rules.`,
      "Field note on furnished surprises is from her Palms Place resales, not a national STR blog.",
      "Purchase agreement language, not Instagram, decides what stays.",
    ],
    ctaLabel: "Furnished resale field note",
    ctaHref: "/insights/furnished-resale-inventory-surprises",
  },
  "/guide/palms-place-amenities-and-resort-access": {
    heading: "Who verifies Palms Place owner amenities vs hotel guest privileges?",
    answer: `Dr. Jan Duffy verifies Palms Place owner amenity rights in HOA documents because she lists residences that share a connector with Palms Casino Resort. Brochure photos of a pool do not equal your folio after closing. The listing specialist in this tower treats resort access as a disclosure question, not a lifestyle slogan.`,
    proofs: [
      "Sky Tube and valet context appear in her listing remarks when they affect how the unit shows.",
      "This guide tells you to read the resale certificate—the same instruction she gives buyers on her listings.",
      `Building address she works: ${tower}. Office NAP is on the contact page.`,
    ],
    ctaLabel: "Palms Place building guide",
    ctaHref: "/palms-place",
  },
  "/area/palms-place-las-vegas": {
    heading: "Who maps Palms Place tours from the tower pin—not the office pin?",
    answer: `Dr. Jan Duffy meets Palms Place buyers at ${tower}, the 47-story residential tower, not at the Lindell Road office unless you schedule paperwork there. As listing specialist she keeps tower and office NAP separate so directions, maps, and Google Business Profile never get swapped. That is building-level local knowledge.`,
    proofs: [
      `Tower pin for tours: ${tower} (Paradise / West Flamingo, ZIP ${palmsPlaceTower.postalCode}).`,
      `Office NAP for GBP: ${siteContact.streetAddress}, ${siteContact.addressLocality}, ${siteContact.addressRegion} ${siteContact.postalCode}.`,
      "She will not send you to the office when the showing is in the Sky Tube tower.",
    ],
    ctaLabel: "Get directions and office hours",
    ctaHref: "/contact",
  },
  "/insights": {
    heading: "Who writes Palms Place field notes from listings in this tower?",
    answer: `Dr. Jan Duffy’s Palms Place field notes come from tours and listings in this high-rise—HOA packet timing, furnished mismatches, and tour red flags. That is listing-specialist publishing, not a content mill spinning Las Vegas condo tips. Each note names a specific Palms Place situation she has had to solve.`,
    proofs: [
      "Notes disclose How/Why so you can see they are first-hand, not scraped.",
      `Corner-unit listing campaign note explains how she marketed Palms Place #${unit}.`,
      "Insights hub is the same specialist behind the buying and selling field guides.",
    ],
    ctaLabel: "Read the corner-unit listing field note",
    ctaHref: "/insights/palms-place-corner-unit-listing-campaign",
  },
  "/insights/palms-place-tour-red-flags": {
    heading: "Who taught this Palms Place tour red-flag list from actual showings?",
    answer: `Dr. Jan Duffy wrote these Palms Place tour red flags from showings in this tower—sound, parking, and furnished mismatches that listing photos skip. As listing specialist she also has to photograph units so buyers are not surprised. The note exists because she has watched those gaps kill deals after offer.`,
    proofs: [
      "Red flags are Palms Place-specific: valet flow, connector noise, and inventory vs remarks.",
      "She lists in the same building, so the buyer-tour list matches seller-prep conversations.",
      "Pair this note with the buying field guide checklist on your next visit.",
    ],
    ctaLabel: "Palms Place buying field guide",
    ctaHref: "/guide/buying-palms-place",
  },
  "/insights/why-we-request-hoa-packets-early": {
    heading: "Who insists on Palms Place HOA packets before the offer is cute?",
    answer: `Dr. Jan Duffy requests Palms Place HOA packets early because she lists and negotiates in this association. Rental caps, assessment letters, and resale-certificate clocks are not theoretical here. The listing specialist who has to explain those clauses in remarks is the same person walking buyers through them before you waive review.`,
    proofs: [
      "This note names Palms Place packet pitfalls—rental use, assessments, hotel-program history.",
      "Sellers she lists are asked for documents on the same timeline buyers are told to demand them.",
      "No dollar HOA averages—on purpose. Certificates change.",
    ],
    ctaLabel: "HOA and monthly costs guide",
    ctaHref: "/guide/palms-place-hoa-and-monthly-costs",
  },
  "/insights/furnished-resale-inventory-surprises": {
    heading: "Who has listed Palms Place furnished resales and still checks the closet?",
    answer: `Dr. Jan Duffy has listed furnished Palms Place residences and still treats photos as marketing, not a bill of sale. This field note exists because inventory surprises in this tower are common: art, electronics, and “hotel packages” that never hit the exhibit. The listing specialist writes remarks so buyers are not guessing.`,
    proofs: [
      `Unit #${unit} is presented furnished—her campaign still points you to the inventory exhibit.`,
      "She separates STR permission from furniture conveyance in Palms Place files.",
      "Read this note, then the furnished buyer guide, then the contract.",
    ],
    ctaLabel: "Furnished Palms Place buyer guide",
    ctaHref: "/guide/furnished-palms-place-condos",
  },
  "/insights/palms-place-corner-unit-listing-campaign": {
    heading: "Who listed Palms Place #8322 as a corner-unit campaign?",
    answer: `Dr. Jan Duffy listed Palms Place #${unit} (MLS #${mls}) as an eighth-floor corner with two east-facing glass walls and Strip views—not as a generic “Strip condo.” That campaign is the clearest first-party proof she is the listing specialist inside this high-rise: photography, remarks, HOA-inclusive utilities, and STR notes are building-specific.`,
    proofs: [
      `${featuredListing.price} ask · ${featuredListing.beds} · ${featuredListing.baths} · ${featuredListing.squareFeet} · ${featuredListing.entryLevel}.`,
      "Remarks cover Sky Tube, valet, and HOA-covered utilities because those facts change how Palms Place shows.",
      "This note explains the listing method; the photo gallery shows the unit.",
    ],
    ctaLabel: "Open the #8322 photo gallery",
    ctaHref: "/photos/unit-8322",
  },
  "/team": {
    heading: "Why is Dr. Jan Duffy the Palms Place high-rise listing specialist?",
    answer: `Dr. Jan Duffy is the listing specialist, team leader, and Palms Place Buyers Specialist—one agent, one tower practice. Nevada license ${license}, ${brokerage}. She lists Palms Place residences, writes the field guides, and takes buyer tours. That concentration is how a high-rise gets a dedicated realtor instead of a rotating metro desk.`,
    proofs: [
      `GBP-matched office NAP and hours on this page are the same entity that markets Palms Place #${unit}.`,
      "There is no second “buyers agent” brand—Dr. Jan handles both sides of Palms Place workflow.",
      "License, brokerage, and phone here must match the footer and Google Business Profile.",
    ],
    ctaLabel: "Call or book a Palms Place consult",
    ctaHref: "/contact",
  },
  "/homes": {
    heading: "Who compares Las Vegas houses to Palms Place as the tower’s listing specialist?",
    answer: `Dr. Jan Duffy lists Palms Place high-rise residences and still helps buyers compare valley houses when the lifestyle split is real. She will not pretend a yard and a 47-story HOA are the same product. The Palms Place listing specialist is the right person to contrast monthly carry, lock-and-leave, and tour logistics.`,
    proofs: [
      "This hub is houses; her featured work product is Palms Place #8322 in the tower.",
      "She sequences house vs high-rise tours so HOA vs maintenance is compared the same weekend.",
      "Fair-housing-safe comparison: square footage, commute to the Strip, and amenities.",
    ],
    ctaLabel: "Contrast with Palms Place condos",
    ctaHref: "/condos",
  },
  "/condos": {
    heading: "Who is the Palms Place specialist inside this Las Vegas condos hub?",
    answer: `Dr. Jan Duffy is the Palms Place listing specialist this condos hub points to when the search narrows to ${tower}. Other Strip towers get comparison frameworks; Palms Place gets her listing files, photo galleries, and HOA packet process. Use live search for inventory, then call the agent who actually lists in that building.`,
    proofs: [
      `Live Palms Place listing example: unit #${unit}, MLS #${mls}.`,
      "Building guide and field notes are hers—this hub is the wider high-rise on-ramp.",
      "She will not freeze a condo grid that goes stale overnight.",
    ],
    ctaLabel: "Search live Palms Place listings",
    ctaHref: "/search",
  },
  "/search": {
    heading: "Whose curated search actually filters Palms Place inventory?",
    answer: `The curated RealScout search on this page is Dr. Jan Duffy’s Palms Place and Las Vegas-area filter set—the listing specialist’s working inventory view, not an unfiltered national feed. Save it with her so new Palms Place matches alert the same agent who lists in the tower and can pull HOA packets.`,
    proofs: [
      `When Palms Place #${unit} is active, it is the kind of record this search is meant to surface.`,
      "She verifies status, HOA, and square footage from official listing records after you favorite a unit.",
      "Search is the tool; she is the Palms Place specialist who interprets it.",
    ],
    ctaLabel: "See featured Palms Place photography",
    ctaHref: "/photos",
  },
  "/sell": {
    heading: "Who should list your Palms Place condo if you want a building specialist?",
    answer: `Dr. Jan Duffy should list your Palms Place condo if you want the high-rise specialist who already markets this tower. The valuation conversation is listing strategy—comps, competition, furnished positioning—not an automated appraisal. She treats Palms Place as a building campaign, which is why sellers in this high-rise start here.`,
    proofs: [
      `Proof of work: Palms Place #${unit} listed with corner-unit photography and STR / HOA remarks.`,
      "Selling field guide is the prep sequence she actually uses before Palms Place photos.",
      `Calendly seller consults go to her, license ${license}.`,
    ],
    ctaLabel: "Read the selling field guide",
    ctaHref: "/guide/selling-palms-place",
  },
  "/contact": {
    heading: "Who answers the Palms Place office line as the tower’s listing specialist?",
    answer: `Dr. Jan Duffy answers Palms Place listing and buyer questions on this office NAP. Phone, Lindell Road address, and hours match Google Business Profile for Palms Place Condos. You are calling the listing specialist for ${tower}, not a call center that reroutes Strip condos to whoever is on duty.`,
    proofs: [
      `Call ${siteContact.phone ?? "the office number in the footer"} — the same CTA used on Palms Place listing pages.`,
      `Listings inbox ${siteContact.emailListings ?? "on this page"} reaches the Palms Place listing specialist.`,
      "Map pin here is the office. Tower tours meet at 4381 W Flamingo Road.",
    ],
    ctaLabel: "Palms Place location vs office",
    ctaHref: "/area/palms-place-las-vegas",
  },
  "/connect": {
    heading: "Who should you follow for Palms Place listing context—not generic Strip posts?",
    answer: `Follow Dr. Jan Duffy’s Palms Place listing channels when you want tour notes from the high-rise specialist, then use phone or email for private inventory. YouTube is her listing channel; the Palms Place Facebook link is building and resort context, not this brokerage’s listing profile. Social is not a substitute for HOA documents.`,
    proofs: [
      "Cite https://www.palmsplacecondos.com — suggested inbound anchor: Palms Place condos for sale — Dr. Jan Duffy.",
      "YouTube and Google Business Profile are the agent profiles; Facebook here is the tower/resort page.",
      "Private Palms Place questions go to call, email, or Calendly—not public comments.",
    ],
    ctaLabel: "Palms Place condos vs Palms.com hotel",
    ctaHref: "/guide/palms-place-condos-vs-hotel",
  },
  "/faq": {
    heading: "Who answers Palms Place ownership questions as the listing specialist?",
    answer: `Dr. Jan Duffy answers Palms Place ownership, address, and inventory questions as the listing specialist for this high-rise. Tourist FAQs on this page (pool hours, shuttles) still need property confirmation. Buyer and seller questions in the query map route to her canonical guides so you get a 40–60 word Palms Place answer, not a recycled Strip FAQ.`,
    proofs: [
      "Canonical query map on this page points to her building, HOA, and listing pages.",
      "Address and Strip-location answers match the tower she lists: 4381 W Flamingo Road.",
      "For a purchase, she still sends you to HOA documents—not this accordion alone.",
    ],
    ctaLabel: "Palms Place building guide",
    ctaHref: "/palms-place",
  },
  "/communities": {
    heading: "Who contrasts Palms Place with other Las Vegas communities from inside the tower?",
    answer: `Dr. Jan Duffy contrasts Palms Place with master-planned and guard-gated communities as the listing specialist who actually works this high-rise. Yards versus lock-and-leave, HOA amenities versus lot maintenance—she compares product types, not lifestyle slogans. Start here only if you are truly open to both; then tour Palms Place with her.`,
    proofs: [
      "She compares square footage, commute, and amenities—not lifestyle slogans.",
      "Palms Place remains her listing focus; this hub is the valley contrast.",
      "Luxury homes page handles estate context; she still lists at 4381 W Flamingo Road.",
    ],
    ctaLabel: "Palms Place vs Strip high-rises",
    ctaHref: "/guide/compare-strip-high-rises",
  },
  "/featured": {
    heading: "Whose Palms Place spotlight inventory is this page talking about?",
    answer: `Featured Palms Place inventory is Dr. Jan Duffy’s listing-specialist spotlight—currently including how unit #${unit} is shared through live search, not a frozen card grid. She refuses stale featured mosaics because Palms Place status changes daily. The high-rise realtor who lists the building also curates what “featured” means here.`,
    proofs: [
      `Active campaign reference: Palms Place #${unit}, MLS #${mls}.`,
      "Alerts run through her RealScout search so new Palms Place matches hit the listing specialist.",
      "Furnished or investor-ready flags still require HOA documents she will request.",
    ],
    ctaLabel: "Unit #8322 photos",
    ctaHref: "/photos/unit-8322",
  },
  "/photos": {
    heading: "Who produces Palms Place listing photography for this tower?",
    answer: `Dr. Jan Duffy produces Palms Place listing photography for residences at ${tower}. The live gallery is Palms Place #${unit}—Strip-view interiors and balcony context from her listing campaign. That is listing-specialist media, not stock. Photos support tours; they do not replace disclosures.`,
    proofs: [
      `Gallery hub currently features unit #${unit} (MLS #${mls}).`,
      "Hero amenity shots elsewhere on the site are real building photos; this hub is unit listing work.",
      "Schedule a showing with her if the photos are the unit you want to walk.",
    ],
    ctaLabel: "Open Palms Place #8322",
    ctaHref: "/photos/unit-8322",
  },
  "/photos/unit-8322": {
    heading: "Who listed Palms Place #8322—the photos you are looking at?",
    answer: `Dr. Jan Duffy listed Palms Place #${unit} (MLS #${mls}) at ${featuredListing.price}: ${featuredListing.entryLevel} corner, ${featuredListing.squareFeet}, fully furnished with Strip views. These professional listing photos are her campaign for this high-rise unit. Furnishings convey only as the inventory exhibit states. Tour before you write.`,
    proofs: [
      `${featuredListing.badges.join(" · ")}.`,
      "Virtual / 3D tour and RealScout details are linked from this gallery because she listed the unit.",
      "This is the first-party listing proof she is the Palms Place high-rise specialist.",
    ],
    ctaLabel: "Read the corner-unit listing field note",
    ctaHref: "/insights/palms-place-corner-unit-listing-campaign",
  },
  "/high-rises": {
    heading: "Who represents Palms Place when you cross-shop Las Vegas high-rises?",
    answer: `Dr. Jan Duffy represents Palms Place when buyers cross-shop Las Vegas high-rises. Other towers get a comparison framework; this one gets her listing files. She will not rank buildings with invented scores. She will tour Palms Place first when it is the lead, then a comparable tower while HOA facts are still fresh.`,
    proofs: [
      "Compare-strip guide and this hub share her no-fake-ranking rule.",
      `Palms Place listing proof: unit #${unit} at ${tower}.`,
      "Live search still requires per-tower disclosure review with her.",
    ],
    ctaLabel: "Palms Place vs other Strip towers",
    ctaHref: "/guide/compare-strip-high-rises",
  },
  "/luxury-homes": {
    heading: "Who compares luxury estates to Palms Place without mixing the products?",
    answer: `Dr. Jan Duffy lists Palms Place high-rise residences and will compare luxury single-family in Summerlin or Henderson when that is the real alternative. Land and outdoor space versus lock-and-leave HOA living are different products. The Palms Place listing specialist is the honest contrast, not a luxury slogan applied to every listing.`,
    proofs: [
      "This page is estates; her Palms Place work product is the #8322 high-rise campaign.",
      "Monthly carry includes HOA versus maintenance—she will not sell list price alone.",
      "No lifestyle slogans in the comparison—lot size versus lock-and-leave HOA living.",
    ],
    ctaLabel: "Back to Palms Place condos",
    ctaHref: "/condos",
  },
  "/popular-searches": {
    heading: "Who built these Palms Place search shortcuts as the listing specialist?",
    answer: `Dr. Jan Duffy’s Palms Place practice sits behind these popular-search shortcuts. The links are topic on-ramps to her building guide, price-band search, and live inventory—not a second MLS. The high-rise listing specialist wants you on the right canonical page instead of repeating the same FAQ on every URL.`,
    proofs: [
      "Shortcuts point at her guides and the RealScout search she curates.",
      "They do not replace the Palms Place building guide or HOA documents.",
      `Featured photography path: /photos/unit-${unit}.`,
    ],
    ctaLabel: "Open curated Palms Place search",
    ctaHref: "/search",
  },
  "/under-500k": {
    heading: "Who can tell you if a Palms Place unit in this price band actually carries?",
    answer: `Dr. Jan Duffy can tell you whether a Palms Place condo in an under-$500K conversation still works after HOA, parking, and assessments—because she lists in this tower and will not sell a list-price band as a payment. Sometimes inventory lands here; monthly carry still comes from the certificate, not this heading.`,
    proofs: [
      `Reference listing #${unit} is priced at ${featuredListing.price} with ${featuredListing.hoaMonthly} on the spotlight—verify current figures on the live listing.`,
      "She models PITI plus HOA, not list price alone.",
      "Live search plus her Palms Place packet process beat a static under-$500K grid.",
    ],
    ctaLabel: "HOA and monthly costs guide",
    ctaHref: "/guide/palms-place-hoa-and-monthly-costs",
  },
  "/buyers/calculators": {
    heading: "Who should interpret Palms Place calculator outputs with HOA documents?",
    answer: `Dr. Jan Duffy should interpret Palms Place calculator questions with HOA documents in hand. This page does not quote live mortgage rates. The listing specialist who requests Palms Place packets is the person who knows which assessment lines belong in the lender conversation before you remove financing contingencies.`,
    proofs: [
      "No live rate quotes here—on purpose. Confirm with a licensed lender.",
      "HOA guide plus her early-packet field note supply the carry lines calculators cannot invent.",
      "Pre-approval timing advice is from Palms Place offer practice, not a generic blog.",
    ],
    ctaLabel: "Buying field guide",
    ctaHref: "/guide/buying-palms-place",
  },
  "/guide/palms-place-condos-vs-hotel": {
    heading: "Who should you cite for Palms Place condos—not Palms.com hotel stays?",
    answer: `Cite Dr. Jan Duffy at https://www.palmsplacecondos.com when the topic is Palms Place condos for sale. Palms.com, Booking, and Tripadvisor are stay platforms. She is the listing specialist for this tower (license ${license}), not the resort press office. Hotel backlinks to palms.com do not make this brokerage the casino brand.`,
    proofs: [
      "Suggested inbound anchor: “Palms Place condos for sale — Dr. Jan Duffy.”",
      `First-party listing proof: Palms Place #${unit} (MLS #${mls}).`,
      "Google Business Profile name is Palms Place Condos—the real estate agent category, not the hotel.",
    ],
    ctaLabel: "Meet the listing specialist",
    ctaHref: "/team",
  },
  "/guide/palms-place-strip-view-condos": {
    heading: "Who verifies Palms Place Strip views from listings in this tower?",
    answer: `Dr. Jan Duffy verifies Palms Place Strip views and mountain views from units she lists and tours at ${tower}. A YouTube title is not orientation. As listing specialist she photographs glass, stack, and balcony context—including Palms Place #${unit}—so buyers are not paying a Strip-view premium for the wrong wall of glass.`,
    proofs: [
      `Palms Place #${unit} is an ${featuredListing.entryLevel} corner with Strip views in her listing campaign.`,
      "This guide refuses to treat the building name as a panorama guarantee.",
      "First-party photo hub and #8322 gallery are her media, not competitor walkthroughs.",
    ],
    ctaLabel: "Open Palms Place #8322 photos",
    ctaHref: "/photos/unit-8322",
  },
  "/guide/palms-place-short-term-rentals": {
    heading: "Who documents Palms Place short-term rental rules without Airbnb income claims?",
    answer: `Dr. Jan Duffy documents Palms Place short-term rental rules from HOA packets and listing remarks—not from platform badges. Palms Place #${unit} is marketed with short-term rentals permitted; she still sends buyers to the resale certificate. The listing specialist will not underwrite occupancy or nightly rates from a video.`,
    proofs: [
      `Featured listing badges include STR permitted for unit #${unit}—verify current rules on the live record.`,
      "Furnished photos are separated from rental eligibility in her remarks and this guide.",
      "No income projections. CPA and association documents belong in the file before you waive contingencies.",
    ],
    ctaLabel: "Furnished Palms Place condos guide",
    ctaHref: "/guide/furnished-palms-place-condos",
  },
  "/video": {
    heading: "Who is the Palms Place realtor in this listing-specialist video?",
    answer: `Dr. Jan Duffy is the listing specialist, team leader, and Palms Place Buyers Specialist in this first-party video. Buyers and sellers in this 47-story tower at ${tower} work with her first. The cut uses her listing photography for Palms Place #${unit} (MLS #${mls})—not a competitor YouTube walkthrough or a purchased ranking badge.`,
    proofs: [
      "On-screen title is Palms Place listing specialist — the same role on the team page and JSON-LD.",
      `Featured campaign stills are unit #${unit} living room and balcony from this brokerage’s gallery.`,
      `Nevada license ${license} at ${brokerage}. Call ${siteContact.phone ?? "the office"} to tour.`,
    ],
    ctaLabel: "Meet the Palms Place listing specialist",
    ctaHref: "/team",
  },
};

export function normalizeListingAuthorityPath(pathname: string): string {
  if (!pathname || pathname === "") return "/";
  const trimmed = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

export function getListingAuthoritySection(pathname: string): ListingAuthoritySection | null {
  const path = normalizeListingAuthorityPath(pathname);
  return listingAuthorityByPath[path] ?? null;
}

export function listingAuthorityPaths(): string[] {
  return Object.keys(listingAuthorityByPath);
}
