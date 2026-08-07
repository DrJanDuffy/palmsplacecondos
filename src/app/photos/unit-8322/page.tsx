import type { Metadata } from "next";
import { PhotosUnit8322PageBody } from "@/components/marketing/photos-unit-8322-page-body";
import {
  getFeaturedListingHeroPhoto,
  getGalleryPhotoSrc,
  unit8322Gallery,
} from "@/lib/content/media-gallery";
import { buildPageMetadata } from "@/lib/metadata-helpers";

const hero = getFeaturedListingHeroPhoto();
const heroSrc = getGalleryPhotoSrc(hero);

export const metadata: Metadata = buildPageMetadata({
  path: unit8322Gallery.path,
  title: unit8322Gallery.metaTitle,
  description: unit8322Gallery.metaDescription,
  images: [
    {
      url: heroSrc,
      width: hero.width,
      height: hero.height,
      alt: hero.alt,
    },
  ],
});

export default function PhotosUnit8322Page() {
  return <PhotosUnit8322PageBody />;
}
