import { formatPalmsPlaceTowerAddressLine, palmsPlaceTower } from "@/lib/content/palms-place-building";
import { googleMapsDirectionsUrl, googleMapsSearchUrl } from "@/lib/maps-embed";
import { formatOfficeAddressLine, siteContact } from "@/lib/site-contact";

export const MAPS_PAGE_PATH = "/maps" as const;

/** Static HTML Google Sites can embed (NAP citation + GBP map + follow backlink). */
export const GOOGLE_SITES_CITATION_PATH = "/google-sites/gbp-citation.html" as const;

export const mapsPage = {
  path: MAPS_PAGE_PATH,
  h1: "Palms Place Google Maps — office, tower, and nearby landmarks",
  title: "Palms Place Google Maps and GBP citation | Las Vegas office & tower",
  description: `Unique Google Maps for the ${siteContact.gbpBusinessName} office, Palms Place at 4381 W Flamingo Road, and nearby Las Vegas landmarks—plus a Google Sites embed of the Google Business Profile map with NAP and a site backlink.`,
} as const;

export type UniqueGoogleMap = {
  id: string;
  title: string;
  description: string;
  query: string;
  mapsUrl: string;
  directionsUrl: string;
  embed: boolean;
  coords?: { latitude: number; longitude: number };
};

function uniqueMap(
  id: string,
  title: string,
  description: string,
  query: string,
  embed: boolean,
  coords?: UniqueGoogleMap["coords"],
): UniqueGoogleMap {
  return {
    id,
    title,
    description,
    query,
    mapsUrl: googleMapsSearchUrl(query),
    directionsUrl: googleMapsDirectionsUrl(query),
    embed,
    coords,
  };
}

function officeQuery(): string {
  const line = formatOfficeAddressLine();
  return line
    ? `${siteContact.gbpBusinessName}, ${line}`
    : `${siteContact.gbpBusinessName}, Las Vegas, NV`;
}

function towerQuery(): string {
  return `Palms Place, ${formatPalmsPlaceTowerAddressLine()}`;
}

/**
 * Unique Google Maps — office GBP pin, Palms Place tower, and public landmarks
 * buyers actually use. Not 150 duplicate Google Sites with the same pin.
 */
export function getUniqueGoogleMaps(): UniqueGoogleMap[] {
  const officeLine = formatOfficeAddressLine();
  const officeCoords =
    typeof siteContact.officeLatitude === "number" &&
    typeof siteContact.officeLongitude === "number"
      ? { latitude: siteContact.officeLatitude, longitude: siteContact.officeLongitude }
      : undefined;

  return [
    uniqueMap(
      "gbp-office",
      `${siteContact.gbpBusinessName} office (Google Business Profile)`,
      `This pin is the listing-office NAP that must match Google Business Profile: ${officeLine || "Las Vegas office"}. Use it for citations, directions to Dr. Jan Duffy, and Google Sites embeds—not the Palms Place tower.`,
      officeQuery(),
      true,
      officeCoords,
    ),
    uniqueMap(
      "tower",
      "Palms Place tower — 4381 W Flamingo Road",
      `Residential tower at ${formatPalmsPlaceTowerAddressLine()} (${palmsPlaceTower.floors} floors, opened ${palmsPlaceTower.openedYear}). Showings and building tours use this address. It is not the Spring Valley office pin.`,
      towerQuery(),
      true,
      { latitude: palmsPlaceTower.latitude, longitude: palmsPlaceTower.longitude },
    ),
    uniqueMap(
      "palms-casino",
      "Palms Casino Resort (adjacent)",
      "Palms Place connects to Palms Casino Resort on West Flamingo. Cite the tower for ownership tours and palms.com for hotel stays—this map is the resort campus next door, not this brokerage’s GBP.",
      "Palms Casino Resort, 4321 W Flamingo Rd, Las Vegas, NV",
      false,
    ),
    uniqueMap(
      "flamingo-strip",
      "Las Vegas Boulevard & Flamingo Road",
      "East on Flamingo from Palms Place reaches the Strip crossing at Las Vegas Boulevard. Use this map for drive-in orientation; valet and guest rules at the tower still come from HOA and management materials.",
      "Las Vegas Blvd & Flamingo Rd, Las Vegas, NV",
      false,
    ),
    uniqueMap(
      "harry-reid",
      "Harry Reid International Airport",
      "LAS sits southeast of Palms Place. Fly-in buyers typically land here, then continue to 4381 W Flamingo Road for a tower tour or to the Lindell office for a listing appointment—confirm which pin with Dr. Jan Duffy before you ride.",
      "Harry Reid International Airport, Las Vegas, NV",
      false,
    ),
    uniqueMap(
      "allegiant",
      "Allegiant Stadium",
      "Allegiant Stadium is south of the Strip corridor. Event-night traffic on I-15 and the Strip can change arrival time at Palms Place; tour at the hour you would actually come and go, then confirm parking in the unit’s documents.",
      "Allegiant Stadium, Las Vegas, NV",
      false,
    ),
    uniqueMap(
      "t-mobile-arena",
      "T-Mobile Arena",
      "T-Mobile Arena sits on the Strip corridor east of Palms Place. Concert and game nights add congestion on Flamingo and Las Vegas Boulevard—plan the same window you would use as an owner, not a midday listing photo.",
      "T-Mobile Arena, Las Vegas, NV",
      false,
    ),
    uniqueMap(
      "rio",
      "Rio Las Vegas",
      "Rio Las Vegas is west of the Strip on the same Flamingo corridor as Palms Place. It is a separate resort; this map is for orientation, not a Palms Place amenity claim.",
      "Rio All-Suite Hotel & Casino, Las Vegas, NV",
      false,
    ),
    uniqueMap(
      "caesars",
      "Caesars Palace",
      "Caesars Palace is on Las Vegas Boulevard east of Palms Place. Buyers comparing Strip-front hotels with a residential tower on Flamingo use this pin for distance, not for Palms Place HOA rights.",
      "Caesars Palace, Las Vegas, NV",
      false,
    ),
    uniqueMap(
      "bellagio",
      "Bellagio",
      "Bellagio faces the Strip east of Flamingo. Fountain-view hotel stays are not Palms Place condo inventory. Use this map only to place the tower west of that corridor.",
      "Bellagio Hotel and Casino, Las Vegas, NV",
      false,
    ),
    uniqueMap(
      "sphere",
      "Sphere Las Vegas",
      "Sphere sits east of the Strip near the Sands corridor. It is a landmark for visitors staying at Palms Place, not part of the Palms Place HOA. Confirm event traffic if you tour on a show night.",
      "Sphere Las Vegas, 255 Sands Ave, Las Vegas, NV",
      false,
    ),
    uniqueMap(
      "fashion-show",
      "Fashion Show",
      "Fashion Show is on the Strip north of Flamingo. Shoppers at Palms Place often use this corridor; it is not a Palms Place amenity. Pair this map with the tower pin when you explain drive patterns to out-of-state buyers.",
      "Fashion Show Mall, Las Vegas, NV",
      false,
    ),
    uniqueMap(
      "gold-coast",
      "Gold Coast Hotel & Casino",
      "Gold Coast sits west of Palms Place on the Flamingo / West Sahara edge of the corridor. Another off-Strip high-rise reference—not this listing office and not Palms Place inventory.",
      "Gold Coast Hotel and Casino, Las Vegas, NV",
      false,
    ),
    uniqueMap(
      "downtown-summerlin",
      "Downtown Summerlin",
      "Downtown Summerlin is west of the Strip in the same valley as the Lindell office. Use it to separate suburban retail from Palms Place’s Flamingo tower pin—two maps, two jobs.",
      "Downtown Summerlin, Las Vegas, NV",
      false,
    ),
  ];
}

export function getOfficeGoogleMap(): UniqueGoogleMap {
  return getUniqueGoogleMaps()[0];
}

export function getTowerGoogleMap(): UniqueGoogleMap {
  return getUniqueGoogleMaps()[1];
}
