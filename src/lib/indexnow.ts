import { INDEXNOW_KEY } from "@/lib/indexnow-key";
import { MARKETING_ROUTES, marketingPathHref } from "@/lib/marketing-routes";
import { getSiteUrl } from "@/lib/site-url";

/** Global IndexNow endpoint — submissions are shared with participating engines (Bing, Yep, etc.). */
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_POST = 10_000;

export type IndexNowSubmitResult = {
  endpoint: string;
  status: number;
  accepted: boolean;
  pendingKeyValidation: boolean;
  submittedCount: number;
};

function siteOrigin(): string {
  return getSiteUrl().replace(/\/$/, "");
}

function siteHost(): string {
  return new URL(siteOrigin()).hostname;
}

/** 200 = processed; 202 = received, key validation pending (first submissions). */
export function isIndexNowAccepted(status: number): boolean {
  return status === 200 || status === 202;
}

export function marketingIndexNowUrls(origin = siteOrigin()): string[] {
  const seen = new Set<string>();
  const urls: string[] = [];
  for (const route of MARKETING_ROUTES) {
    const href = marketingPathHref(route.path);
    const url = href === "/" ? `${origin}/` : `${origin}${href}`;
    if (seen.has(url)) continue;
    seen.add(url);
    urls.push(url);
  }
  return urls;
}

function urlsOnThisHost(urls: string[], host: string): string[] {
  const allowed = new Set<string>();
  for (const raw of urls) {
    let parsed: URL;
    try {
      parsed = new URL(raw);
    } catch {
      continue;
    }
    if (parsed.hostname !== host) continue;
    allowed.add(parsed.href);
  }
  return [...allowed].slice(0, MAX_URLS_PER_POST);
}

/**
 * Bulk POST (Option 1 root key file — no `keyLocation`).
 * @see https://www.indexnow.org/faq
 */
export async function submitIndexNowUrls(urls: string[]): Promise<IndexNowSubmitResult> {
  const host = siteHost();
  const urlList = urlsOnThisHost(urls, host);
  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      urlList,
    }),
  });

  return {
    endpoint: INDEXNOW_ENDPOINT,
    status: res.status,
    accepted: isIndexNowAccepted(res.status),
    pendingKeyValidation: res.status === 202,
    submittedCount: urlList.length,
  };
}

export { INDEXNOW_KEY, INDEXNOW_KEY_PATH, isIndexNowKeyRequest } from "@/lib/indexnow-key";
