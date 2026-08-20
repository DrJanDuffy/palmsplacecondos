import { headers } from "next/headers";
import { PalmsPlaceListingAuthority } from "@/components/seo/palms-place-listing-authority";

/** Server wrapper — pathname comes from middleware `x-pathname`. */
export async function PalmsPlaceListingAuthorityFromRequest() {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "/";
  return <PalmsPlaceListingAuthority pathname={pathname} />;
}
