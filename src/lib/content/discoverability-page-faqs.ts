import type { FaqItem } from "@/lib/schema";
import { canonicalQueryAsFaqItem } from "@/lib/content/aeo-query-map";
import {
  formatOfficeAddressLine,
  formatOfficeHoursWithSpecial,
  siteContact,
} from "@/lib/site-contact";

/** `/featured` — must mirror visible FAQ on that page. */
export const featuredPageFaq: FaqItem[] = [
  {
    question: "Why are there no static listing cards on the featured page?",
    answer:
      "MLS inventory changes daily. This page explains how spotlight and new-to-market homes are shared through live RealScout search and agent-curated lists—not a frozen grid that can go stale or misstate availability.",
  },
  {
    question: "How do I get alerts for new Palms Place listings?",
    answer:
      "Open the team’s RealScout search, set your price and property filters, and save the search with your agent. You can also contact the office to discuss building-specific criteria before you tour.",
  },
  {
    question: "Can I see furnished or investor-ready units in featured inventory?",
    answer:
      "Yes, when they are actively listed. Furnished and rental-policy questions depend on HOA documents—review disclosures with your agent rather than assuming every featured unit allows the same use.",
  },
];

/** `/connect` — must mirror visible FAQ on that page. */
export const connectPageFaq: FaqItem[] = [
  {
    question: "How is the connect page different from contact?",
    answer:
      "Connect focuses on staying in touch—office NAP, social channels, and follow-up paths. Schedule calls and tours on Calendly. Contact has the full GBP-matched NAP block, hours, map, and reviews links.",
  },
  {
    question: "Will I get spam if I follow Palms Place on social?",
    answer:
      "Social posts highlight building context, tours, and market notes for Las Vegas high-rise buyers. For private listing conversations, use phone or email on the contact page rather than public comments.",
  },
  {
    question: "Does the office address match Google Business Profile?",
    answer:
      "Yes—the same office NAP shown here should match GBP and visible footer copy. If you see a discrepancy after a GBP update, tell the team so the site and profile stay aligned. Cite https://www.palmsplacecondos.com on GBP as the website—not palms.com.",
  },
  {
    question: "How should other sites cite Palms Place Condos?",
    answer:
      "Use https://www.palmsplacecondos.com (www, https). Suggested inbound anchor: “Palms Place condos for sale — Dr. Jan Duffy.” Put that URL in the Google Business Profile website field, YouTube About, and the Berkshire Hathaway agent page. Do not cite Palms.com, Booking, Tripadvisor, or Zillow as this brokerage—those are hotel or portal sites.",
  },
];

/** `/under-500k` — must mirror visible FAQ on that page. */
export const under500kPageFaq: FaqItem[] = [
  {
    question: "Are there Palms Place condos under $500,000?",
    answer:
      "Sometimes, depending on market conditions, floor plan, and furnishing. List price is only one line item—HOA dues, assessments, and parking can change monthly carry. Search live inventory and tour with an agent before you assume a band is available.",
  },
  {
    question: "Should I compare HOA fees when shopping under $500K?",
    answer:
      "Yes. Two condos near the same list price can have very different HOA stacks, reserves, and rental rules. High-rise buyers should model PITI plus HOA, not list price alone.",
  },
  {
    question: "Is single-family or condo better under $500K in Las Vegas?",
    answer:
      "It depends on lifestyle, commute, and how much you value lock-and-leave amenities versus yard space. Compare high-rise options on the condos hub with single-family inventory on the homes page before you narrow tours.",
  },
];

/** `/buyers/calculators` — must mirror visible FAQ on that page. */
export const buyerCalculatorsPageFaq: FaqItem[] = [
  {
    question: "Does this site provide live mortgage rate quotes?",
    answer:
      "No. Rates and loan programs change with markets and borrower profile. Use this page to prepare questions, then confirm numbers with a licensed lender before you remove financing contingencies.",
  },
  {
    question: "What HOA costs should Palms Place buyers model?",
    answer:
      "Monthly HOA, any parking or storage fees, and potential special assessments shown in resale certificates. Your agent can help you request HOA packets early—see the buying field guide for due diligence steps.",
  },
  {
    question: "When should I get pre-approved before touring?",
    answer:
      "Before writing offers on competitive Strip inventory. Pre-approval clarifies your price band and helps you compare monthly carry across studios, one-bedrooms, and furnished resales realistically.",
  },
];

/** `/popular-searches` — must mirror visible FAQ on that page. */
export const popularSearchesPageFaq: FaqItem[] = [
  {
    question: "What is the popular searches page for?",
    answer:
      "It groups high-intent topics—Palms Place Strip views, short-term rental rules, Strip towers, luxury homes, and price bands—into descriptive internal links so you can jump to the right guide without searching the whole site.",
  },
  {
    question: "Should I use popular searches or RealScout first?",
    answer:
      "Start here if you are exploring topics. Open RealScout when you are ready to filter live MLS inventory, save searches, and work with the team on alerts.",
  },
  {
    question: "Do these links replace the Palms Place building guide?",
    answer:
      "No. The building guide explains address, amenities, and buying context. Popular searches are shortcuts to topic pages and live search—not a substitute for tower-specific due diligence.",
  },
];

/** `/buyers` — must mirror visible FAQ on that page. */
export const buyersPageFaq: FaqItem[] = [
  {
    question: "Who should start on the Palms Place buyer guide?",
    answer:
      "Buyers comparing Strip high-rises or targeting Palms Place specifically. Use this hub for search entry, calculators, and team contacts—then read the buying field guide before your first tower tour.",
  },
  {
    question: "Who handles Palms Place buyer tours?",
    answer:
      "Dr. Jan Duffy is the Palms Place Buyers Specialist for showings, HOA questions, and offer strategy—and the listing specialist for marketing and seller representation.",
  },
  {
    question: "Where do I search live Palms Place inventory?",
    answer:
      "Use the on-site search page or the team’s RealScout link from this hub. Inventory changes daily—confirm status and HOA documents with your agent before you write.",
  },
];

/** `/communities` — must mirror visible FAQ on that page. */
export const communitiesPageFaq: FaqItem[] = [
  {
    question: "How do Las Vegas communities compare to Palms Place?",
    answer:
      "Master-planned and guard-gated neighborhoods emphasize yards, lot size, and drive times. Palms Place is a Strip-adjacent high-rise with HOA amenities and lock-and-leave living—compare both product types before you tour.",
  },
  {
    question: "Should I tour communities and high-rises in the same weekend?",
    answer:
      "Only if you are genuinely open to both lifestyles. HOA rules, noise, parking, and monthly carry differ sharply—your agent can sequence tours so you compare like-for-like monthly costs.",
  },
  {
    question: "Where do Summerlin and Henderson fit this hub?",
    answer:
      "Use the luxury homes page for estate and single-family context in Summerlin and Henderson, then contrast with Strip condos on the high-rises and Palms Place building guides.",
  },
];

/** `/high-rises` — must mirror visible FAQ on that page. */
export const highRisesPageFaq: FaqItem[] = [
  {
    question: "Is Palms Place the only Strip high-rise on this page?",
    answer:
      "No. Buyers often cross-shop multiple towers. This page explains how to compare HOAs and tours, with Palms Place–specific detail on the building guide and comparison field guide.",
  },
  {
    question: "What should I compare besides list price?",
    answer:
      "HOA dues, parking, rental caps, reserve studies, and assessment history. List price alone rarely predicts monthly carry in Las Vegas towers.",
  },
  {
    question: "Can I search all Strip towers in one MLS filter?",
    answer:
      "Live search can filter by area and property type, but each building’s rules still require disclosure review. Use RealScout for inventory and your agent for tower-specific due diligence.",
  },
];

/** `/homes` — must mirror visible FAQ on that page. */
export const homesPageFaq: FaqItem[] = [
  {
    question: "Does this team sell single-family homes beyond Palms Place?",
    answer:
      "Yes—buyers often compare valley single-family homes with Strip high-rises. This page covers Las Vegas houses; use the condos and Palms Place guides if a tower might fit better.",
  },
  {
    question: "When should I choose a house instead of Palms Place?",
    answer:
      "When yard space, lot size, or a detached house matter more than resort-style amenities and Strip proximity. Monthly payment comparisons should include HOA vs maintenance, not list price alone.",
  },
  {
    question: "How do I search Las Vegas homes for sale here?",
    answer:
      "Open the team’s RealScout search for live MLS inventory, or browse popular searches for price-band shortcuts and topic hubs before you schedule tours.",
  },
];

/** `/guide/buying-palms-place` — must mirror visible FAQ on that page. */
export const buyingGuidePageFaq: FaqItem[] = [
  {
    question: "Is this guide official Palms Place or HOA documentation?",
    answer:
      "No. It is a brokerage field guide based on Palms Place tours and transactions. Always verify rental rules, fees, and assessments in HOA resale certificates and listing disclosures for the unit you are buying. Dr. Jan Duffy uses this checklist on showings; official documents still control what you can do after closing.",
  },
  canonicalQueryAsFaqItem("buy-docs"),
  {
    question: "Who handles buyer tours versus listing marketing?",
    answer:
      "Buyer tours, offer strategy, listing preparation, and marketing all route through Dr. Jan Duffy—listing specialist, team leader, and Palms Place Buyers Specialist. Role details are canonical on the team page; this guide is the tour-and-document workflow.",
  },
];

/** `/guide/compare-strip-high-rises` — must mirror visible FAQ on that page. */
export const compareStripGuidePageFaq: FaqItem[] = [
  {
    question: "Should I tour Palms Place first or another Strip tower?",
    answer:
      "Tour order depends on your must-haves—noise, parking, furnished inventory, and HOA rental rules. This guide suggests a comparison framework; your agent sequences buildings to match your criteria.",
  },
  {
    question: "Are HOA fees comparable across Strip high-rises?",
    answer:
      "Rarely. Amenities, reserves, and assessment history differ by tower. Compare monthly carry with disclosures side by side, not marketing averages from third-party sites.",
  },
  {
    question: "Does comparing towers replace the Palms Place building guide?",
    answer:
      "No. Use the building guide for Palms Place–specific address, amenities, and inventory context. This comparison guide helps you evaluate multiple towers on the same tour weekend.",
  },
];

/** `/guide/palms-place-unit-types` — must mirror visible FAQ on that page. */
export const unitTypesGuidePageFaq: FaqItem[] = [
  canonicalQueryAsFaqItem("studio-mountain"),
  canonicalQueryAsFaqItem("penthouse"),
  {
    question: "Are published square-footage ranges exact for every unit?",
    answer:
      "No. Marketing ranges are starting points—confirm square footage, storage, and parking on each listing record and during your tour.",
  },
  {
    question: "Do studios and one-bedrooms have the same HOA rules?",
    answer:
      "They are in the same association, but furnished inventory, views, and parking assignments still vary by unit. Read the resale certificate for the specific unit you are buying.",
  },
];

/** `/guide/selling-palms-place` — must mirror visible FAQ on that page. */
export const sellingGuidePageFaq: FaqItem[] = [
  canonicalQueryAsFaqItem("sell-hoa"),
  {
    question: "Does furnished staging change how buyers evaluate HOA rules?",
    answer:
      "Furnished presentation can highlight lifestyle but does not replace disclosures. Palms Place buyers still underwrite rental caps, fees, and sound from official documents. Staging is not a substitute for the packet Dr. Jan Duffy orders early in listing prep.",
  },
  {
    question: "Who leads Palms Place listing strategy?",
    answer:
      "Dr. Jan Duffy leads listing marketing and positioning; buyer inquiries on active listings are coordinated per brokerage workflow. Use the sell page for valuation conversations and the #8322 field note to see how a Palms Place corner campaign is actually written.",
  },
];

/** `/guide/palms-place-hoa-and-monthly-costs` — must mirror visible FAQ on that page. */
export const hoaGuidePageFaq: FaqItem[] = [
  canonicalQueryAsFaqItem("hoa-fees"),
  canonicalQueryAsFaqItem("hoa-costs-year"),
  {
    question: "Does this page quote current Palms Place HOA dollar amounts?",
    answer:
      "No. Assessments change and vary by unit. Use this guide to know what to ask for, then confirm numbers in official documents and with your lender for payment modeling. Dr. Jan Duffy will not publish a blog average that can be wrong next quarter.",
  },
  {
    question: "How does HOA review connect to the buyer calculators page?",
    answer:
      "Calculators help you frame lender questions; HOA documents supply the monthly assessment and fee lines to plug into your carry estimate. Both are needed for a realistic Palms Place budget. Neither page is a rate quote from a licensed lender.",
  },
];

/** `/guide/furnished-palms-place-condos` — must mirror visible FAQ on that page. */
export const furnishedGuidePageFaq: FaqItem[] = [
  canonicalQueryAsFaqItem("furnished"),
  {
    question: "Can you Airbnb a furnished Palms Place condo because the photos look turnkey?",
    answer:
      "No. Furnishing is not rental permission. See the Palms Place short-term rentals guide, then confirm HOA rules for that unit with Dr. Jan Duffy.",
  },
  {
    question: "What if furniture in photos is not included in the sale?",
    answer:
      "The purchase agreement and listing remarks control what conveys. Clarify personal property in writing before you assume a turnkey package from marketing photos. Palms Place #8322 is marketed furnished—still read the inventory exhibit Dr. Jan Duffy uses on that listing.",
  },
  {
    question: "Where can I read team field notes on furnished surprises?",
    answer:
      "See the furnished resale inventory surprises field note under insights—it complements this guide but does not replace unit-specific HOA documents. The #8322 corner-listing note shows how remarks separate furniture from rental permission.",
  },
];

/** `/guide/palms-place-amenities-and-resort-access` — must mirror visible FAQ on that page. */
export const amenitiesGuidePageFaq: FaqItem[] = [
  canonicalQueryAsFaqItem("amenities"),
  canonicalQueryAsFaqItem("gym"),
  {
    question: "Can amenities change after you buy?",
    answer:
      "HOA budgets, management decisions, and resort programming can change over time. Base your decision on documents at purchase and maintain realistic expectations about updates.",
  },
  {
    question: "Where is the full amenities FAQ on this site?",
    answer:
      "The main Palms Place FAQ page groups amenities, transportation, and booking-style questions. This guide focuses on owner verification before you buy.",
  },
];

/** `/guide/palms-place-condos-vs-hotel` — must mirror visible FAQ on that page. */
export const condosVsHotelGuidePageFaq: FaqItem[] = [
  canonicalQueryAsFaqItem("hotel-vs-condos"),
  canonicalQueryAsFaqItem("condotel-investors"),
  {
    question: "Which URL should blogs use for Palms Place condos for sale?",
    answer:
      "https://www.palmsplacecondos.com — www, https. Suggested anchor: “Palms Place condos for sale — Dr. Jan Duffy.” Do not link palms.com, Booking, Tripadvisor, or Zillow as if they were this brokerage. The apex without www redirects to www; cite the www host that matches Google Search Console.",
  },
  {
    question: "Do hotel and ticket backlinks help this real estate site?",
    answer:
      "No. Links to Palms.com about pools, concerts, and suites describe the resort, not Dr. Jan Duffy’s listing practice. This site earns citations from owned profiles and first-party listing work such as Palms Place #8322—not from the casino’s travel-press graph.",
  },
];

/** `/guide/palms-place-strip-view-condos` — must mirror visible FAQ on that page. */
export const stripViewGuidePageFaq: FaqItem[] = [
  canonicalQueryAsFaqItem("strip-view"),
  {
    question: "Is every Palms Place studio a Strip view unit?",
    answer:
      "No. Studios can face the Strip, mountains, or a mixed city outlook. Confirm stack and glass on the listing, then tour at the hours you would use the balcony. Dr. Jan Duffy will not sell a video title as an orientation.",
  },
  {
    question: "Where are first-party Palms Place view photos?",
    answer:
      "The photo hub and Palms Place #8322 gallery are listing photography from this brokerage. Competitor YouTube tours are not this inventory. Schedule a showing to verify light and sound.",
  },
];

/** `/guide/palms-place-short-term-rentals` — must mirror visible FAQ on that page. */
export const shortTermRentalGuidePageFaq: FaqItem[] = [
  canonicalQueryAsFaqItem("short-term-rental"),
  canonicalQueryAsFaqItem("furnished"),
  {
    question: "Does this page project Airbnb income at Palms Place?",
    answer:
      "No. Occupancy, nightly rates, and returns are unknown without your own numbers, a CPA, and current HOA rules. Dr. Jan Duffy requests the packet so rental eligibility is documented—she does not underwrite a platform listing.",
  },
];

/** `/area/palms-place-las-vegas` — must mirror visible FAQ on that page. */
export const areaPalmsPlacePageFaq: FaqItem[] = [
  canonicalQueryAsFaqItem("address"),
  {
    question: "Is Palms Place in the City of Las Vegas or Paradise?",
    answer:
      "Many Strip-adjacent properties use Paradise or Las Vegas addressing in public records and maps. Use the tower address 4381 W Flamingo Road and ZIP 89103 for directions. Confirm the tour meeting point with Dr. Jan Duffy so you are not sent to the Lindell Road office when the showing is in the residential tower.",
  },
  {
    question: "How far is Palms Place from the Las Vegas Strip?",
    answer:
      "It is west of the Strip corridor on Flamingo Road—close enough for resort-adjacent living but not interchangeable with every venue on Las Vegas Boulevard. Drive times change with traffic. Tour at the hours you plan to come and go. The Strip yes/no answer lives on the Palms Place FAQ page.",
  },
];

/** `/condos` — must mirror visible FAQ on that page. */
export const condosPageFaq: FaqItem[] = [
  {
    question: "Does this page list every Palms Place condo for sale?",
    answer:
      "No. It orients you to high-rise and Palms Place context, then points to live RealScout search for current inventory. Status and pricing change daily—unlike a frozen Zillow or hotel-suite grid.",
  },
  {
    question: "How is this different from Palms.com, Booking, or Zillow?",
    answer:
      "Palms.com is the resort hotel. Booking and Tripadvisor are stay platforms. Zillow is a third-party portal. This page is Dr. Jan Duffy’s Palms Place condo brokerage hub—listings, HOA due diligence, and tours in the tower at 4381 W Flamingo Road.",
  },
  {
    question: "Where do I compare HOA costs before I offer?",
    answer:
      "Use the Palms Place HOA and monthly costs buyer guide and buyer calculators, then confirm assessments in the resale certificate for your unit.",
  },
];

/** `/luxury-homes` — must mirror visible FAQ on that page. */
export const luxuryHomesPageFaq: FaqItem[] = [
  {
    question: "Does the Palms Place team list luxury single-family homes?",
    answer:
      "Yes—buyers often compare Summerlin and Henderson estates with Strip high-rises. This page covers luxury single-family; use the condos hub if a tower fits better.",
  },
  {
    question: "When should I choose a luxury home instead of Palms Place?",
    answer:
      "When land, lot size, and outdoor space outweigh lock-and-leave amenities and Strip proximity. Compare monthly carry including HOA versus maintenance, not list price alone.",
  },
  {
    question: "How do I search luxury homes near Las Vegas?",
    answer:
      "Start with the homes hub and RealScout search, or browse popular searches for price-band shortcuts. Your agent aligns showings with disclosure review.",
  },
];

/** `/search` — must mirror visible FAQ on that page. */
export const searchPageFaq: FaqItem[] = [
  canonicalQueryAsFaqItem("search"),
  {
    question: "Is this search the same as Zillow or a hotel booking site?",
    answer:
      "No. This is Dr. Jan Duffy’s curated brokerage search for Palms Place and Las Vegas-area listings—not Zillow, Booking.com, Tripadvisor, or Palms.com hotel reservations. Use it to narrow tours, then verify status, HOA, and square footage in official listing records.",
  },
  {
    question: "Who should I call after I find a unit I like?",
    answer:
      "Buyer and seller questions both go to Dr. Jan Duffy. Use the contact page or the office phone shown in the footer. She is the Palms Place listing specialist—not a portal lead center.",
  },
];

/** `/sell` — must mirror visible FAQ on that page. */
export const sellPageFaq: FaqItem[] = [
  {
    question: "Is the free valuation conversation an appraisal?",
    answer:
      "No. It is a listing strategy discussion covering comps, competition, and positioning—not an automated appraisal or a guaranteed sale price.",
  },
  {
    question: "What makes Palms Place listing prep different?",
    answer:
      "Furnished vs unfurnished resales, parking, and HOA packets often drive buyer questions. Dr. Jan Duffy approaches Palms Place as a building-specific campaign, not a template upload.",
  },
  {
    question: "Where should sellers start before photography?",
    answer:
      "Read the Palms Place selling field guide, then schedule a consult so remarks, furniture, and disclosure timing match how the unit will show.",
  },
];

/** `/sellers` — must mirror visible FAQ on that page. */
export const sellersPageFaq: FaqItem[] = [
  {
    question: "How is the sellers hub different from /sell?",
    answer:
      "Sellers is the strategy hub with links to the selling field guide and valuation path. Sell is the conversion page—use Schedule a seller consult (Calendly) to book a listing conversation.",
  },
  {
    question: "Who lists Palms Place for the team?",
    answer:
      "Dr. Jan Duffy is the listing specialist and team leader for Palms Place at Berkshire Hathaway HomeServices Nevada Properties (license S.0197614.LLC).",
  },
  {
    question: "Should I gather HOA documents before I list?",
    answer:
      "Yes when possible. Buyers and lenders request association packets early—starting that process reduces delays after you accept an offer.",
  },
];

/** `/contact` — built from site-contact so NAP/hours never drift from GBP. */
export function getContactPageFaq(): FaqItem[] {
  const hours = formatOfficeHoursWithSpecial();
  return [
    canonicalQueryAsFaqItem("contact"),
    {
      question: "What are office hours?",
      answer: `${hours}. Book tours and calls on Calendly (Schedule an appointment on this page)—evening slots depend on availability. Hours are meant to match the Google Business Profile for Palms Place Condos; report drift so the site and profile stay aligned.`,
    },
    {
      question: "Who do I email for listings vs buyers?",
      answer:
        "Use the listings inbox for listing questions and the general inbox for buyer or general inquiries—both reach Dr. Jan Duffy when those addresses are shown on this page. There is not a separate Palms Place buyers agent. Full role details live on the team page.",
    },
  ];
}

/** `/team` — built from site-contact so license/NAP stay aligned with GBP. */
export function getTeamPageFaq(): FaqItem[] {
  const address = formatOfficeAddressLine();
  const hours = formatOfficeHoursWithSpecial();
  return [
    canonicalQueryAsFaqItem("listing-specialist"),
    {
      question: "Who helps Palms Place buyers?",
      answer: `${siteContact.buyerSpecialistName}, Realtor, is the ${siteContact.buyerSpecialistTitle} (Nevada license ${siteContact.buyerSpecialistLicense}). Buyer tours, filters, and offer prep start with Dr. Jan—the same listing specialist, not a second agent. Use the buyers hub and buying field guide before the first tower showing.`,
    },
    {
      question: "Does team contact info match Google Business Profile?",
      answer: `Yes—business name (${siteContact.gbpBusinessName}), phone ${siteContact.phone}, office at ${address}, service area ${siteContact.primaryServiceArea}, and hours (${hours}) are meant to match GBP and JSON-LD. Report any drift so the site and profile stay aligned.`,
    },
  ];
}

/** `/palms-place` — must mirror visible FAQ on that page. */
export const palmsPlacePageFaq: FaqItem[] = [
  canonicalQueryAsFaqItem("building"),
  {
    question: "What unit types are typically for sale?",
    answer:
      "Active inventory often includes studios and one-bedroom layouts, with select upper-floor or penthouse-style residences when listed. Confirm floor plans, views, and HOA assessments per unit—not from a building average. Compare live listings with Dr. Jan Duffy, then read the unit-types guide before you assume two stacks feel the same.",
  },
  {
    question: "How do I buy or sell at Palms Place with this team?",
    answer:
      "Buyers use the curated search and buying field guide; sellers start with the selling field guide and a valuation conversation with Dr. Jan Duffy. She is the listing specialist and Palms Place Buyers Specialist, so both paths stay in this tower’s workflow instead of a rotating metro desk.",
  },
];

/** `/insights` hub — must mirror visible FAQ on that page. */
export const insightsHubPageFaq: FaqItem[] = [
  {
    question: "What are field notes?",
    answer:
      "Short, first-hand articles from the Palms Place team about tours, HOA packets, and listing prep—not generic market blogs recycled across cities.",
  },
  {
    question: "Are field notes legal advice?",
    answer:
      "No. They share process observations. HOA rules, assessments, and contracts must be verified in official documents for your unit.",
  },
  {
    question: "How often are field notes updated?",
    answer:
      "Each note shows an updated date. Re-read before you tour if association rules or inventory conditions may have changed.",
  },
];

/** `/photos` hub — must mirror visible FAQ on that page. */
export const photosHubPageFaq: FaqItem[] = [
  canonicalQueryAsFaqItem("condo-tour"),
  {
    question: "Which photo galleries are live?",
    answer:
      "Listing photography for Palms Place residences at 4381 W Flamingo Road—Strip views, furnished interiors, and balcony context. The live gallery is Palms Place #8322. Galleries support buyers researching inventory before a tour with Dr. Jan Duffy.",
  },
  {
    question: "Ready to tour what you see in photos?",
    answer:
      "Schedule a showing or contact the office. Photos do not replace disclosures—verify HOA, furnishings, and status with your agent.",
  },
];

/** `/photos/unit-8322` — must mirror visible FAQ on that page. */
export const unit8322PhotosPageFaq: FaqItem[] = [
  {
    question: "What should buyers know about these photos?",
    answer:
      "These are professional listing photos for MLS #2782527. Furnishings, art, and electronics convey only as stated in the inventory exhibit—not by photo alone. Views, light, and sound vary by time of day; tour the unit before you write an offer.",
  },
];
