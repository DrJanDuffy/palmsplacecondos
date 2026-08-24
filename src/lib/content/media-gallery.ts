import { getCloudflareImageUrl } from "@/lib/cloudflare-images";
import { featuredListing } from "@/lib/content/featured-listing";
import { palmsPlaceTower } from "@/lib/content/palms-place-building";
import { siteContact } from "@/lib/site-contact";

/**
 * SEO / GEO / AEO media catalog — titles, descriptions, and alt text for galleries.
 * Prefer local `src` under /public; optional `cloudflareImageId` overrides when CF Images is configured.
 */

export type GalleryPhoto = {
  id: string;
  /** Path under /public or absolute CDN URL. */
  src: string;
  /** Optional Cloudflare Images hosted id — wins over `src` when account hash is set. */
  cloudflareImageId?: string;
  title: string;
  description: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  category: "unit" | "building" | "amenity";
};

export type PhotoGallery = {
  slug: string;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  photos: GalleryPhoto[];
};

function resolvePhotoSrc(photo: GalleryPhoto): string {
  if (photo.cloudflareImageId) {
    const cf = getCloudflareImageUrl(photo.cloudflareImageId);
    if (cf) return cf;
  }
  return photo.src;
}

/** Resolve delivery URL (Cloudflare Images when configured, else local/CDN src). */
export function getGalleryPhotoSrc(photo: GalleryPhoto): string {
  return resolvePhotoSrc(photo);
}

const unit8322Photos: GalleryPhoto[] = [
  {
    id: "unit-8322-living-strip-view",
    src: "/images/listings/unit-8322/palms-place-8322-living-room-strip-view-las-vegas.jpg",
    title: "Palms Place #8322 living room with Las Vegas Strip view",
    description:
      `Furnished living room in Palms Place unit #8322 at 4381 W Flamingo Road — corner high-rise residence with floor-to-ceiling glass, fireplace, and east-facing Strip skyline views. MLS #${featuredListing.mlsNumber}.`,
    alt: "Furnished Palms Place condo living room at unit 8322 with fireplace, sectional sofa, and Las Vegas Strip view through floor-to-ceiling windows",
    caption:
      "Unit #8322 living area — Strip views through two walls of glass. Furnishings convey per inventory list.",
    width: 1024,
    height: 682,
    category: "unit",
  },
  {
    id: "unit-8322-balcony-strip-view",
    src: "/images/listings/unit-8322/palms-place-8322-balcony-strip-view-las-vegas.jpg",
    title: "Palms Place #8322 balcony overlooking the Las Vegas Strip",
    description:
      `Private balcony at Palms Place unit #8322 with glass railing and twilight Strip skyline — 8th-floor corner residence near Palms Casino Resort. MLS #${featuredListing.mlsNumber}.`,
    alt: "Palms Place unit 8322 balcony with glass railing and panoramic Las Vegas Strip skyline at twilight",
    caption:
      "8th-floor balcony view toward the Strip — confirm outdoor use and HOA rules in disclosures.",
    width: 1086,
    height: 724,
    category: "unit",
  },
];

export const unit8322Gallery: PhotoGallery = {
  slug: "unit-8322",
  path: "/photos/unit-8322",
  title: `Palms Place #8322 photos — ${featuredListing.price} condo for sale`,
  metaTitle: "Palms Place #8322 photos | Strip-view condo for sale Las Vegas",
  metaDescription: `Photos of Palms Place unit #8322 at ${palmsPlaceTower.streetAddress}, Las Vegas — living room and balcony Strip views. ${featuredListing.beds}, ${featuredListing.baths}, ${featuredListing.squareFeet}. Listed by ${siteContact.agentName}.`,
  h1: "Palms Place #8322 photos — Las Vegas Strip-view condo",
  lede: `${featuredListing.status} · ${featuredListing.price} · ${featuredListing.beds} · ${featuredListing.baths} · ${featuredListing.squareFeet}. Professional listing photos of the furnished corner residence at ${palmsPlaceTower.streetAddress}. Schedule a tour with ${siteContact.agentName}.`,
  photos: unit8322Photos,
};

export const photoGalleries: PhotoGallery[] = [unit8322Gallery];

export function getPhotoGalleryBySlug(slug: string): PhotoGallery | undefined {
  return photoGalleries.find((g) => g.slug === slug);
}

/** Primary featured-listing hero image for homepage banner / OG. */
export function getFeaturedListingHeroPhoto(): GalleryPhoto {
  return unit8322Photos[0];
}

export function getAllGalleryPhotos(): GalleryPhoto[] {
  return photoGalleries.flatMap((g) => g.photos);
}
