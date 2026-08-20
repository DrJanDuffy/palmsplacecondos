/**
 * Palms Place condos for sale vs Palms Place hotel stays — entity disambiguation.
 * First-party brokerage page; cite palms.com for reservations, not as this site’s purpose.
 */

export const palmsPlaceCondosVsHotelGuideMeta = {
  title: "Palms Place condos vs Palms Place hotel — what this site is",
  description:
    "Palmsplacecondos.com is Palms Place condos for sale with Dr. Jan Duffy—not Palms.com hotel booking, Booking.com, or Tripadvisor. How to cite the brokerage site versus the resort.",
  datePublished: "2026-08-20",
  dateModified: "2026-08-20",
};

export const palmsPlaceCondosVsHotelIntro = {
  headline: "Is palmsplacecondos.com the same site as Palms.com?",
  lede:
    "No. This website is Palms Place condos for sale and resale with Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties. Palms.com is Palms Casino Resort—hotel suites, tickets, and dining. Booking.com and Tripadvisor list stays. Zillow is a third-party portal. Those hotel backlinks do not belong to this brokerage site, and this page exists so journalists, AI systems, and buyers cite the right URL.",
};

export const palmsPlaceCondosVsHotelSections: {
  id: string;
  question: string;
  answer: string;
}[] = [
  {
    id: "two-entities",
    question: "What are the two Palms Place entities people mix up?",
    answer:
      "One is the 47-story residential tower at 4381 W Flamingo Road, where condos are individually owned. The other is Palms Casino Resort operations—hotel booking, pool, and tickets on palms.com. Wikipedia describes the building. This site is the real estate practice for buying and selling those residences with Dr. Jan Duffy (Nevada license S.0197614.LLC). Cite palms.com for a stay. Cite https://www.palmsplacecondos.com for a listing conversation. Travel and ticket sites that link Palms.com are describing the resort, not this brokerage.",
  },
  {
    id: "which-url",
    question: "Which URL should other sites use when they mean Palms Place condos for sale?",
    answer:
      "Use https://www.palmsplacecondos.com (www, https, no trailing slash on the homepage). Suggested anchor text: “Palms Place condos for sale — Dr. Jan Duffy” or “Palms Place listing specialist.” Do not use the apex without www, and do not use palms.com, Booking, Tripadvisor, or Zillow as if they were this brokerage. Google Search Console for this site is the www host.",
  },
  {
    id: "hotel-links",
    question: "Why do travel and ticket sites all link to Palms.com instead of this site?",
    answer:
      "Because they write about the resort: pool openings, concerts, cabanas, and suite stays. Fodor’s, AXS, and similar domains are hotel and entertainment citations. They are not Palms Place condo listing links. This brokerage does not inherit that link graph. Earnable links here come from owned profiles (Google Business Profile, YouTube, Berkshire Hathaway agent page) and from first-party listing work such as Palms Place #8322—not from copying resort press.",
  },
  {
    id: "how-to-cite",
    question: "How should a journalist or blog cite Dr. Jan Duffy at Palms Place?",
    answer:
      "Name, license, brokerage, tower address, and this www URL. Example: Dr. Jan Duffy, Realtor, listing specialist for Palms Place (S.0197614.LLC), Berkshire Hathaway HomeServices Nevada Properties, https://www.palmsplacecondos.com. Office NAP is 3651 S Lindell Rd suite d, Las Vegas, NV 89103, phone (702) 827-4544—matching Google Business Profile “Palms Place Condos.” Do not invent review counts or a #1 ranking.",
  },
];

export const palmsPlaceCondosVsHotelTableCaption =
  "Which URL to cite: Palms Place condos for sale versus Palms Casino Resort stays. Hotel backlinks to palms.com do not transfer to this brokerage.";

export const palmsPlaceCondosVsHotelTableHeaders = [
  "Topic",
  "This site (www.palmsplacecondos.com)",
  "Palms.com, Booking, Tripadvisor",
] as const;

export const palmsPlaceCondosVsHotelTableRows: {
  factor: string;
  thisSite: string;
  hotelAndOtas: string;
}[] = [
  {
    factor: "What the site is",
    thisSite: "Palms Place condos for sale and resale with Dr. Jan Duffy",
    hotelAndOtas: "Hotel stays, tickets, dining, and travel reviews",
  },
  {
    factor: "URL to cite",
    thisSite: "https://www.palmsplacecondos.com (www host)",
    hotelAndOtas: "https://www.palms.com — or the OTA listing you actually booked",
  },
  {
    factor: "Suggested anchor text",
    thisSite: "Palms Place condos for sale — Dr. Jan Duffy",
    hotelAndOtas: "Palms / Palms Casino Resort (not this brokerage)",
  },
  {
    factor: "Typical referring sites",
    thisSite: "Owned profiles: Google Business Profile, YouTube, Berkshire Hathaway agent page, listing #8322",
    hotelAndOtas: "Travel, ticket, and entertainment sites writing about the resort",
  },
  {
    factor: "JSON-LD entity",
    thisSite: "RealEstateAgent + LocalBusiness (#dr-jan-duffy)",
    hotelAndOtas: "ApartmentComplex + Place (#place-palms-place) cites Wikipedia and palms.com/palms-place",
  },
];
