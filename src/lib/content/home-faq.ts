import type { FaqItem } from "@/lib/schema";
import { canonicalQueryAsFaqItem } from "@/lib/content/aeo-query-map";

/**
 * Homepage FAQ — visible copy and FAQPage JSON-LD must stay in sync (single source).
 * Canonical overlapping questions live on topic pages (see aeo-query-map.ts).
 * Answers lead with a direct response (AEO); general guidance only — not legal/tax advice.
 */
export const homeFaqItems: FaqItem[] = [
  canonicalQueryAsFaqItem("inventory"),
  {
    question: "Is this the Palms Place hotel or a condos-for-sale site?",
    answer:
      "This homepage is Palms Place condos for sale with Dr. Jan Duffy—not Palms.com hotel booking, Booking.com, or Tripadvisor. Stay reservations belong on the official resort page. Ownership, listings, and HOA questions stay here. The Palms Place condos vs hotel guide is the canonical page for which URL other sites should cite.",
  },
  {
    question: "How do I tour Palms Place condos for sale this week?",
    answer:
      "Schedule a Palms Place showing on Calendly or call the office number in the footer. Dr. Jan Duffy runs tower tours at 4381 W Flamingo Road—not at the Lindell office unless you booked paperwork there. Bring must-haves (view, furnishing, rental intent) so the first visit uses the buying-guide checklist instead of a generic walkthrough. First-party photos live on the photo hub; Strip vs mountain outlook is on the Strip view guide.",
  },
  {
    question: "What should Palms Place buyers verify besides list price?",
    answer:
      "Verify HOA assessments, parking, what furniture conveys, and rental rules in the resale certificate for that unit. List price is one line. Palms Place monthly carry can swing on those documents. Use the HOA guide and buyer calculators to frame lender questions, then confirm numbers with a licensed lender before you remove contingencies.",
  },
  {
    question: "How do I search Palms Place condos without duplicating the search-page FAQ?",
    answer:
      "Open the curated RealScout search page for filters, saved alerts, and live status. This homepage is the inventory overview; the search page is the canonical how-to. Confirm every field with Dr. Jan Duffy before you tour or offer—widgets can lag the official listing record.",
  },
  {
    question: "Do Palms Place buyers and sellers work with different agents?",
    answer:
      "No. Dr. Jan Duffy is both listing specialist and Palms Place Buyers Specialist. Tours, offers, listing prep, and marketing all route through her at Berkshire Hathaway HomeServices Nevada Properties (license S.0197614.LLC). Read the full role answer on the team page rather than a second FAQ copy here.",
  },
  {
    question: "Where does listing information on this homepage come from?",
    answer:
      "Listing widgets are provided through the brokerage’s listing tools and are deemed reliable but not guaranteed. Verify price, square footage, HOA fees, and status with Dr. Jan Duffy and official listing records. Featured Palms Place #8322 details are a spotlight—they can change, so re-check the live record before you offer.",
  },
];
