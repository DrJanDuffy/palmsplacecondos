/**
 * Map iframe helpers for contact / area pages.
 *
 * Google My Maps (`/maps/d/embed?mid=…`) often 404 with Google's
 * “404. That’s an error” page when the mid is unpublished or revoked.
 * Prefer Maps Embed API (key) or the stable `maps/embed?origin=mfe&pb=` place embed.
 */

export type MapCoords = {
  latitude: number;
  longitude: number;
};

function isDeadMyMapsEmbedUrl(url: string): boolean {
  try {
    const { pathname } = new URL(url);
    return pathname.includes("/maps/d/embed");
  } catch {
    return false;
  }
}

/** Stable keyless Google place embed (same target `output=embed` redirects to). */
export function googleMapsPlaceEmbedUrl(addressOrQuery: string): string {
  const q = addressOrQuery.trim().replace(/\s+/g, "+");
  return `https://www.google.com/maps/embed?origin=mfe&pb=!1m2!2m1!1s${q}`;
}

/** Official Maps Embed API place mode — free unlimited usage; requires API key. */
export function googleMapsEmbedApiPlaceUrl(addressOrQuery: string, apiKey: string): string {
  const q = encodeURIComponent(addressOrQuery.trim());
  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${q}`;
}

/** Google Maps place search (citation / “open in Maps” / JSON-LD `hasMap`). */
export function googleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.trim())}`;
}

/** Google Maps directions to a destination address or place name. */
export function googleMapsDirectionsUrl(destination: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination.trim())}`;
}

/** Keyless OpenStreetMap fallback when Google embeds are unavailable. */
export function openStreetMapEmbedUrl(
  { latitude, longitude }: MapCoords,
  span = { lat: 0.008, lng: 0.012 },
): string {
  const bbox = [
    longitude - span.lng,
    latitude - span.lat,
    longitude + span.lng,
    latitude + span.lat,
  ].join(",");
  const marker = encodeURIComponent(`${latitude},${longitude}`);
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${marker}`;
}

export type ResolveMapEmbedSrcOptions = {
  /** Human-readable address or place query for Google place embeds. */
  query: string;
  /** Optional lat/lng for OSM fallback. */
  coords?: MapCoords;
  /**
   * Explicit iframe URL (env or site-contact). Dead My Maps `/maps/d/embed` URLs
   * are ignored so they do not render Google's 404 page.
   */
  overrideUrl?: string;
  /** `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY` when set. */
  embedApiKey?: string;
};

/**
 * Resolve iframe `src` for a location map.
 * Order: valid override → Embed API → Google mfe place embed → OSM (if coords).
 */
export function resolveMapEmbedSrc({
  query,
  coords,
  overrideUrl,
  embedApiKey,
}: ResolveMapEmbedSrcOptions): string {
  const override = overrideUrl?.trim();
  if (override && !isDeadMyMapsEmbedUrl(override)) {
    return override;
  }

  const key = embedApiKey?.trim();
  if (key) {
    return googleMapsEmbedApiPlaceUrl(query, key);
  }

  if (query.trim()) {
    return googleMapsPlaceEmbedUrl(query);
  }

  if (coords) {
    return openStreetMapEmbedUrl(coords);
  }

  return googleMapsPlaceEmbedUrl("Las Vegas, NV");
}
