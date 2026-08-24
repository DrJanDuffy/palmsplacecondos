import type { FieldNote } from "@/lib/content/field-notes/types";
import { siteContact } from "@/lib/site-contact";

export const furnishedInventorySurprisesNote: FieldNote = {
  slug: "furnished-resale-inventory-surprises",
  title: "Furnished Palms Place Resales: Inventory Surprises",
  description:
    "How our listing team documents art, linens, and built-ins on furnished Palms Place resales—so buyers and sellers agree on what conveys before walkthrough.",
  datePublished: "2026-05-18",
  dateModified: "2026-08-24",
  eyebrow: "Field note · Listing prep",
  headline: "Furnished Palms Place resales: inventory surprises we catch before closing",
  lede:
    "A furnished Palms Place unit can show beautifully on a Saturday tour and still close with disputes over wine fridges, wall-mounted TVs, or custom window treatments. This note explains how our listing team documents conveyance before listing photos go live—so buyers are not negotiating furniture on the eve of closing.",
  authorName: siteContact.agentName,
  authorJobTitle: siteContact.agentTitle,
  howCreated:
    "From seller-side listing prep and buyer-side walkthrough issues on furnished Palms Place resales. We do not publish dollar amounts or private settlement terms.",
  whyCreated:
    "Commodity staging articles talk about neutral paint and depersonalizing. Palms Place furnished resales need an inventory discipline because the product being sold includes housewares—not just drywall.",
  sections: [
    {
      id: "remarks-vs-reality",
      heading: "What if “fully furnished” means different things to a Palms Place seller and buyer?",
      body:
        "Sellers sometimes intend to remove personal art, replace mattresses, or swap TVs while buyers assume everything in photos conveys. We resolve that gap in remarks and exhibits before the first showing, not at final walkthrough.",
    },
    {
      id: "built-in-vs-loose",
      heading: "Which Palms Place built-ins look permanent but are not deeded fixtures?",
      body:
        "Custom closet systems, motorized shades, and some AV racks may be bolted in yet still excluded unless listed. We photograph each category and label it in the inventory exhibit so there is no debate about what stays.",
    },
    {
      id: "linens-and-consumables",
      heading: "Do Palms Place linens, pantry stock, and consumables convey?",
      body:
        "Hotel-style turnovers often include linens and starter pantry items that sellers view as consumable and buyers view as part of the purchase. We set expectations in writing—typically consumables do not convey unless explicitly listed.",
    },
    {
      id: "buyer-walkthrough",
      heading: "Why should Palms Place buyers tour with the inventory exhibit in hand?",
      body:
        "On the buyer side, Dr. Jan Duffy’s tours cross-check the exhibit against what is in the unit before removal contingencies expire. If a piece in photos is missing on tour, we fix it in the contract or adjust price—before appraisal and loan docs assume a furnished sale.",
    },
  ],
  whatWeDoNext: [
    "Sellers: finalize the inventory exhibit before photography and open houses.",
    "Buyers: attach the exhibit to the purchase agreement and re-walk with it before removing contingencies.",
    "Both sides: read the selling and buying field guides for how HOA and furniture interact at Palms Place.",
  ],
};
