import { siteContact } from "@/lib/site-contact";

/**
 * Public photo-rights page + ImageObject `license` URL.
 * Google Images metadata: `license` must describe real terms (not Creative Commons
 * unless the photos are CC). These listing photos are all rights reserved.
 */
export const PHOTO_USE_PATH = "/photo-use" as const;

/** Google `acquireLicensePage` — how to request permission, not a stock cart. */
export const PHOTO_LICENSE_REQUEST_PATH = "/contact" as const;

export const photoUsePage = {
  path: PHOTO_USE_PATH,
  h1: "How may Palms Place listing photos be used?",
  title: "Palms Place listing photo use — credit, copyright, and permission",
  description: `Terms for Palms Place listing photography credited to ${siteContact.agentName} at ${siteContact.brokerage}. Request reuse through the Las Vegas office—photos are not Creative Commons.`,
} as const;

export const photoUsePageFaq: { question: string; answer: string }[] = [
  {
    question: "Who is credited on Palms Place listing photos on this site?",
    answer: `${siteContact.agentName}, Realtor, is the credited creator for first-party listing photos published on palmsplacecondos.com. Copyright notice is ${siteContact.brokerage}. Confirm credit wording before you republish.`,
  },
  {
    question: "Can I copy Palms Place #8322 photos onto another website?",
    answer:
      "Not without written permission. These images market a specific listing. They are not a stock library and are not offered under Creative Commons. Email or call the office from the contact page to request use. MLS or brokerage rules may still block reuse even if we say yes.",
  },
  {
    question: "Where do I ask to license or reprint a photo?",
    answer: `Use the contact page—that is the acquire-license path Google reads. Call ${siteContact.phone ?? "the office"} or email ${siteContact.emailListings ?? siteContact.emailGeneral ?? "the listings inbox"} and name the file (for example the #8322 living-room Strip view). Do not treat a screenshot as a license.`,
  },
];
