import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { INDEXNOW_KEY, indexNowKeyFileHeaders, isIndexNowKeyRequest } from "@/lib/indexnow-key";

/**
 * Consolidate non-canonical hosts and HTTP to `NEXT_PUBLIC_SITE_URL` (production: https://www…).
 * Cloudflare/Vercel may redirect before this runs; this covers apex, http://www, and direct hits.
 *
 * Google Search Console “Page with redirect” for http:// and apex URLs is expected.
 * Do not remove these redirects to make GSC “Validate Fix” pass.
 *
 * Also: pass `x-pathname` to server components, and serve the public IndexNow key file.
 */
function nextWithPathname(request: NextRequest): NextResponse {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (isIndexNowKeyRequest(pathname)) {
    return new NextResponse(INDEXNOW_KEY, {
      status: 200,
      headers: indexNowKeyFileHeaders(),
    });
  }

  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) {
    return nextWithPathname(request);
  }

  let canonical: URL;
  try {
    canonical = new URL(raw.replace(/\/$/, ""));
  } catch {
    return nextWithPathname(request);
  }

  const canonicalHost = canonical.hostname.toLowerCase();
  if (!canonicalHost.startsWith("www.")) {
    return nextWithPathname(request);
  }

  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!host) {
    return nextWithPathname(request);
  }

  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim()?.toLowerCase();
  const requestIsHttps =
    forwardedProto === "https" || request.nextUrl.protocol === "https:";

  const hostMatches = host === canonicalHost;
  const protocolMatches =
    canonical.protocol === "https:" ? requestIsHttps : request.nextUrl.protocol === canonical.protocol;

  if (hostMatches && protocolMatches) {
    return nextWithPathname(request);
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
