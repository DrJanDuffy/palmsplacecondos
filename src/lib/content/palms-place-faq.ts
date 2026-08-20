import type { FaqItem } from "@/lib/schema";
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
    "Clear answers on where Palms Place sits versus the Strip, the building and address, and how ownership works in the tower—what buyers, owners, and researchers usually want first. For anything tied to a stay, HOA rules, or a purchase, confirm with official disclosures, the property, or your Nevada real estate professional.",
};

/** Volatile guest-facing topics — confirm with the resort or your booking. */
export const palmsPlaceFaqPlanningIntro = {
  heading: "What should you confirm before a Palms Place stay?",
  description:
    "Pool hours, shuttles, on-property dining, and fees change with season and operations. Use this section as a starting point, then confirm current details with Palms, your host, or your reservation platform before you travel.",
};

/** Stable location, building, units, and ownership Q&A (primary SEO block). */
export const palmsPlaceFaqPrimary: PalmsPlaceFaqEntry[] = [
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
    answer: `The address most commonly used for Palms Place is ${formatPalmsPlaceTowerAddressLine()}.`,
    shortAnswer: `${formatPalmsPlaceTowerAddressLine()}.`,
    category: "Location",
    slug: "what-is-the-address-of-palms-place-las-vegas",
  },
  {
    question: "Is Palms Place on the Las Vegas Strip?",
    answer:
      "No. Palms Place is near the Strip, but it is not on Las Vegas Boulevard. It sits west of the main resort corridor and offers easier access to the Strip without being in the center of the traffic.",
    shortAnswer:
      "No. Palms Place is near the Strip, but it is not on Las Vegas Boulevard.",
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
    answer: "Palms Place is a 47-story tower.",
    shortAnswer: "47 stories.",
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
      "Palms Place opened in 2008, which makes it about 18 years old in 2026.",
    shortAnswer: "Palms Place opened in 2008 and is about 18 years old in 2026.",
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
