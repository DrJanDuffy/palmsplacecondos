import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

/** Open Graph / Twitter card dimensions (Facebook, LinkedIn, X). */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export const OG_IMAGE_ALT =
  "Palms Place condos for sale — Las Vegas Strip high-rise residences with Dr. Jan Duffy";

/**
 * Static photo-based share card (1200×630 JPEG) — real building photo with brand
 * text overlay. Override via `NEXT_PUBLIC_OG_IMAGE_URL` when a custom card is ready.
 */
export const DEFAULT_OG_IMAGE_PATH = "/images/og-palms-place.jpg";

/** Absolute OG/logo URL for JSON-LD ImageObject (matches Open Graph card). */
export function getDefaultOgImageAbsoluteUrl(siteUrl = getSiteUrl()): string {
  const origin = siteUrl.replace(/\/$/, "");
  const custom = process.env.NEXT_PUBLIC_OG_IMAGE_URL?.trim();
  if (!custom) return `${origin}${DEFAULT_OG_IMAGE_PATH}`;
  if (custom.startsWith("http://") || custom.startsWith("https://")) return custom;
  if (custom.startsWith("/")) return `${origin}${custom}`;
  return `${origin}/${custom}`;
}

export function getDefaultOgImages(): NonNullable<Metadata["openGraph"]>["images"] {
  const custom = process.env.NEXT_PUBLIC_OG_IMAGE_URL?.trim();
  if (custom) {
    return [{ url: custom, ...OG_IMAGE_SIZE, alt: OG_IMAGE_ALT }];
  }
  return [{ url: DEFAULT_OG_IMAGE_PATH, ...OG_IMAGE_SIZE, alt: OG_IMAGE_ALT, type: "image/jpeg" }];
}

export function getDefaultTwitterImages(): NonNullable<Metadata["twitter"]>["images"] {
  const custom = process.env.NEXT_PUBLIC_OG_IMAGE_URL?.trim();
  if (custom) return [custom];
  return [DEFAULT_OG_IMAGE_PATH];
}
