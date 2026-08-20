import type { FaqItem } from "@/lib/schema";
import { getCanonicalQuery } from "@/lib/content/aeo-query-map";
import { formatPalmsPlaceTowerAddressLine } from "@/lib/content/palms-place-building";

/** Extended FAQ entry for on-page anchors and grouping (JSON-LD uses question + answer only). */
export type PalmsPlaceFaqEntry = {
  question: string;
  answer: string;
  shortAnswer: string;
  category: string;
  slug: string;
};

export const palmsPlaceFaqIntro = {
  title: "Palms Place Las Vegas FAQ — location, condos, and ownership",
  description:
    "This is the Palms Place condo FAQ for buyers and owners with Dr. Jan Duffy—not the Palms Place hotel booking site. Answers cover address vs the Strip, the 47-story tower, and ownership. Confirm stays with Palms.com; confirm purchases in HOA documents. Cite https://www.palmsplacecondos.com for listings.",
};

/** Volatile guest-facing topics — confirm with the resort or your booking. */
export const palmsPlaceFaqPlanningIntro = {
  heading: "What should you confirm before a Palms Place stay?",
  description:
    "Pool hours, shuttles, on-property dining, and fees change with season and operations. Use this section as a starting point, then confirm current details with Palms, your host, or your reservation platform before you travel.",
};

/** Stable location, building, units, and ownership Q&A (primary SEO block). */
const stripLocation = getCanonicalQuery("strip-location");

export const palmsPlaceFaqPrimary: PalmsPlaceFaqEntry[] = [
  {
    question: "Is this Palms Place FAQ for hotel guests or condo buyers?",
    answer:
      "This FAQ is for Palms Place condo buyers and owners with Dr. Jan Duffy. Hotel stays, tickets, and pool hours belong on Palms.com. Cite https://www.palmsplacecondos.com for listings. The canonical hotel-versus-condos answer—what URL other sites should use—lives on the Palms Place condos vs hotel guide, not in this accordion.",
    shortAnswer: "Condo buyers and owners—not hotel booking. Cite palmsplacecondos.com.",
    category: "This site",
    slug: "is-this-faq-for-hotel-guests-or-condo-buyers",
  },
  {
    question: "Is there a Kroger close to Palms Place Las Vegas?",
    answer:
      "There is not a Kroger-branded grocery store right next to Palms Place. In Las Vegas, Kroger operates through Smith's Food & Drug, so visitors looking for a Kroger-affiliated store should search for the nearest Smith's instead.",
    shortAnswer:
      "No. There is not a Kroger-branded store next to Palms Place, but Smith's is Kroger's local brand.",
    category: "Location",
    slug: "is-there-a-kroger-close-to-palms-place-las-vegas",
  },
  {
    question: "How far is Palms Place from the Tropicana area in Las Vegas?",
    answer:
      "Palms Place is west of the Strip on Flamingo Road, while the Tropicana area is on the south end of the Strip. In most cases, the drive is only a few miles and takes about 10 to 15 minutes, depending on traffic.",
    shortAnswer:
      "Palms Place is a few miles from the Tropicana area and is usually about a 10 to 15 minute drive.",
    category: "Location",
    slug: "how-far-is-palms-place-from-tropicana-las-vegas",
  },
  {
    question: "Where is Palms Place in Las Vegas?",
    answer:
      "Palms Place is just west of the Las Vegas Strip in Paradise, Nevada, and it is connected to Palms Casino Resort. Its location on West Flamingo Road gives guests and owners quick access to the Strip without being directly on Las Vegas Boulevard.",
    shortAnswer:
      "Palms Place is just west of the Strip on West Flamingo Road and connected to Palms Casino Resort.",
    category: "Location",
    slug: "where-is-palms-place-in-las-vegas",
  },
  {
    question: "What is the address of Palms Place Las Vegas?",
    answer: `The residential tower address is ${formatPalmsPlaceTowerAddressLine()}—use it for Palms Place condo tours and maps. That is not the team office on Lindell Road. Confirm stays and suite reservations on the official Palms Place hotel page; confirm purchases with Dr. Jan Duffy and HOA documents.`,
    shortAnswer: `${formatPalmsPlaceTowerAddressLine()} (tower—not the sales office).`,
    category: "Location",
    slug: "what-is-the-address-of-palms-place-las-vegas",
  },
  {
    question: "Is Palms Place on the Las Vegas Strip?",
    answer:
      stripLocation?.answer ??
      "No. Palms Place sits west of Las Vegas Boulevard on Flamingo Road, adjacent to Palms Casino Resort.",
    shortAnswer: "No. Palms Place is west of the Strip on Flamingo Road, not on Las Vegas Boulevard.",
    category: "Location",
    slug: "is-palms-place-on-the-strip",
  },
  {
    question: "How do you open the freezer at Palms Place?",
    answer:
      "That depends on the unit. Many residences at Palms Place are individually owned, and layouts, cabinetry, and appliance placement can vary. If the freezer is not obvious, contact the front desk or the manager for that specific unit.",
    shortAnswer: "It varies by unit, so check with the front desk or the unit manager.",
    category: "Units",
    slug: "how-do-you-open-the-freezer-at-palms-place",
  },
  {
    question: "How many floors does Palms Place have?",
    answer:
      "Palms Place is a 47-story residential high-rise at 4381 W Flamingo Road. Floor, view, and stack still vary by unit—confirm the listing record and tour the residence rather than assuming every floor matches a hotel-suite brochure. Dr. Jan Duffy lists condos in this tower, not hotel keys.",
    shortAnswer: "47 stories—confirm the specific unit on the listing record.",
    category: "Building",
    slug: "how-many-floors-does-palms-place-have",
  },
  {
    question: "Does Floyd Mayweather own a penthouse at Palms Place?",
    answer:
      "Public reports have linked Floyd Mayweather to ownership of a penthouse at Palms Place.",
    shortAnswer:
      "Yes. Public reports have linked Floyd Mayweather to a Palms Place penthouse.",
    category: "Ownership",
    slug: "does-floyd-mayweather-own-a-penthouse-at-palms-place",
  },
  {
    question: "Who owns the condos at Palms Place Las Vegas?",
    answer:
      "Many of the condos at Palms Place are individually owned. That is why furnishings, management style, rental arrangements, and guest experience can vary from one unit to another.",
    shortAnswer: "Many Palms Place condos are individually owned.",
    category: "Ownership",
    slug: "who-owns-the-condos-at-palms-place-las-vegas",
  },
  {
    question: "How old is Palms Place in Las Vegas?",
    answer:
      "Palms Place opened in 2008, which makes it about 18 years old in 2026. Vintage affects finishes, HOA history, and how a resale shows—not a hotel “new tower” claim. Verify assessments and governing documents for the unit you are buying with Dr. Jan Duffy; Wikipedia and the official resort page describe the building, not your HOA packet.",
    shortAnswer: "Palms Place opened in 2008 (about 18 years old in 2026).",
    category: "Building",
    slug: "how-old-is-palms-place-in-las-vegas",
  },
  {
    question: "Who owns Palms Place Las Vegas?",
    answer:
      "Palms Place was developed as part of the broader Palms resort expansion, and many of the condo-hotel units inside the tower are privately owned today.",
    shortAnswer:
      "Palms Place is part of the larger Palms resort story, but many units are privately owned today.",
    category: "Ownership",
    slug: "who-owns-palms-place-las-vegas",
  },
];

/** Pool, dining, shuttle, fees — operationally variable. */
export const palmsPlaceFaqPlanningStay: PalmsPlaceFaqEntry[] = [
  {
    question: "What time does the Palms Place pool close?",
    answer:
      "Pool hours can change by season and resort operations. Public listings have shown closing times around 5:00 PM to 6:00 PM, but guests should confirm current hours directly before arrival.",
    shortAnswer:
      "Pool hours vary, but public listings often show closing around 5:00 PM to 6:00 PM.",
    category: "Amenities",
    slug: "what-time-does-the-palms-place-pool-close",
  },
  {
    question: "Is there a bakery in Palms Place Las Vegas?",
    answer:
      "A dedicated bakery inside Palms Place could not be consistently verified from current public information. Guests should confirm current on-site dining options directly with the property.",
    shortAnswer:
      "A dedicated bakery at Palms Place could not be consistently verified publicly.",
    category: "Amenities",
    slug: "is-there-a-bakery-in-palms-place-las-vegas",
  },
  {
    question: "Does Palms Place have a shuttle?",
    answer:
      "Shuttle service has been reported in connection with the Palms resort, but schedules and availability can change. Guests should confirm current shuttle service directly with the property.",
    shortAnswer:
      "Shuttle service may be available, but guests should confirm current service directly.",
    category: "Transportation",
    slug: "does-palms-place-have-a-shuttle",
  },
  {
    question: "Does Palms Place Las Vegas have extra fees?",
    answer:
      "It can. Extra fees may depend on how the unit is booked, whether it is hotel-managed or privately managed, and what platform is used for the reservation. Guests should review the exact booking terms before confirming a stay.",
    shortAnswer:
      "Yes, extra fees can apply depending on the booking source and unit management.",
    category: "Booking",
    slug: "does-palms-place-las-vegas-have-extra-fees",
  },
];

/** Full ordered list for backward compatibility. */
export const palmsPlaceFaq: PalmsPlaceFaqEntry[] = [
  ...palmsPlaceFaqPrimary,
  ...palmsPlaceFaqPlanningStay,
];

/** FAQPage JSON-LD: primary first, then planning (must match visible order). */
export function palmsPlaceFaqAllAsFaqItems(): FaqItem[] {
  return palmsPlaceFaq.map(({ question, answer }) => ({ question, answer }));
}

export function palmsPlaceFaqAsFaqItems(): FaqItem[] {
  return palmsPlaceFaqAllAsFaqItems();
}
