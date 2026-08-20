import { headers } from "next/headers";
import { SiteBreadcrumbs } from "@/components/seo/site-breadcrumbs";

/** Server wrapper — pathname comes from middleware `x-pathname`. */
export async function SiteBreadcrumbsFromRequest() {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") ?? "/";
  return <SiteBreadcrumbs pathname={pathname} />;
}
