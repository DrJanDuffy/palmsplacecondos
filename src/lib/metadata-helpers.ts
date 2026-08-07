import type { Metadata } from "next";
import { siteContact } from "@/lib/site-contact";
import { getDefaultOgImages, getDefaultTwitterImages } from "@/lib/social-images";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Absolute canonical URL for a path (leading slash). Root uses `""` or `"/"`.
 */
export function canonicalPath(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  if (path === "" || path === "/") {
    return `${base}/`;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Spread into `export const metadata` for `alternates.canonical`. */
export function canonicalMetadata(path: string): Pick<Metadata, "alternates"> {
  return {
    alternates: {
      canonical: canonicalPath(path),
    },
  };
}

type OgImageEntry = {
  url: string | URL;
  width?: number;
  height?: number;
  alt?: string;
};

type BuildPageMetadataInput = {
  /** App path (`"/"` or `""` for home). */
  path: string;
  /** Document title — use full SERP title; layout has no brand template suffix. */
  title: string;
  /** Meta description (~150–160 chars preferred). */
  description: string;
  /** Optional Open Graph / Twitter overrides. */
  ogTitle?: string;
  ogDescription?: string;
  /** Optional social images (defaults to brand OG card). */
  images?: OgImageEntry | OgImageEntry[] | string | string[];
  /** Extra metadata (keywords, robots, etc.). */
  extras?: Omit<Metadata, "title" | "description" | "openGraph" | "twitter" | "alternates">;
};

function resolveTwitterImages(
  images: BuildPageMetadataInput["images"],
): string[] {
  if (!images) {
    const defaults = getDefaultTwitterImages();
    return (Array.isArray(defaults) ? defaults : [defaults]).map(String);
  }
  const list = Array.isArray(images) ? images : [images];
  return list.map((img) => {
    if (typeof img === "string") return img;
    return typeof img.url === "string" ? img.url : img.url.toString();
  });
}

/**
 * Page-level metadata with matching canonical + Open Graph + Twitter.
 * Prevents root-layout OG homepage title/URL from leaking onto child routes
 * (Next.js shallow-merges openGraph objects).
 */
export function buildPageMetadata({
  path,
  title,
  description,
  ogTitle,
  ogDescription,
  images,
  extras,
}: BuildPageMetadataInput): Metadata {
  const url = canonicalPath(path);
  const socialTitle = ogTitle ?? title;
  const socialDescription = ogDescription ?? description;
  return {
    ...extras,
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteContact.gbpBusinessName,
      url,
      title: socialTitle,
      description: socialDescription,
      images: images ?? getDefaultOgImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: resolveTwitterImages(images),
    },
    ...canonicalMetadata(path),
  };
}
