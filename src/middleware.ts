import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Consolidate non-canonical hosts and HTTP to `NEXT_PUBLIC_SITE_URL` (production: https://www…).
 * Cloudflare/Vercel may redirect before this runs; this covers apex, http://www, and direct hits.
 *
 * Google Search Console “Page with redirect” for http:// and apex URLs is expected.
 * Do not remove these redirects to make GSC “Validate Fix” pass.
 */
export function middleware(request: NextRequest) {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) {
    return NextResponse.next();
  }

  let canonical: URL;
  try {
    canonical = new URL(raw.replace(/\/$/, ""));
  } catch {
    return NextResponse.next();
  }

  const canonicalHost = canonical.hostname.toLowerCase();
  if (!canonicalHost.startsWith("www.")) {
    return NextResponse.next();
  }

  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!host) {
    return NextResponse.next();
  }

  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim()?.toLowerCase();
  const requestIsHttps =
    forwardedProto === "https" || request.nextUrl.protocol === "https:";

  const hostMatches = host === canonicalHost;
  const protocolMatches =
    canonical.protocol === "https:" ? requestIsHttps : request.nextUrl.protocol === canonical.protocol;

  if (hostMatches && protocolMatches) {
    return NextResponse.next();
  }

  const destination = new URL(
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
    canonical.origin,
  );
  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
