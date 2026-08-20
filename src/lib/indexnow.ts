/**
 * IndexNow — notify Bing, Yandex, Naver, Seznam.cz, and Yep when URLs change.
 *
 * @see https://www.indexnow.org/documentation
 * @see https://www.indexnow.org/faq
 *
 * Keep XML sitemaps (`src/app/sitemap.ts`) as the full URL inventory. IndexNow
 * is only for recent adds/updates/deletes — not a retroactive dump of history.
 *
 * Source of URLs: the same 33 `https://www.palmsplacecondos.com/…` loc values
 * Google Search Console reported as Success on 2026-08-20 (`MARKETING_ROUTES`).
 */

import { MARKETING_ROUTES } from "@/lib/marketing-routes";
import { absoluteUrlForSitemap } from "@/lib/public-site-origin";
import { getSitemapLastModified } from "@/lib/sitemap-last-modified";
import { getSiteUrl } from "@/lib/site-url";

/** Shared IndexNow endpoint; participating engines redistribute submissions. */
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/** Protocol limit per POST (FAQ: more than this may 422). */
export const INDEXNOW_MAX_URLS_PER_POST = 10_000;

/** FAQ: wait at least 5 minutes before resubmitting the same URL. */
export const INDEXNOW_RESUBMIT_GAP_MS = 5 * 60 * 1000;

export const INDEXNOW_KEY_PATTERN = /^[A-Za-z0-9-]{8,128}$/;

/**
 * Default key hosted at `/{key}.txt` (Option 1, site root).
 * Override with `INDEXNOW_KEY` to rotate; host a matching `{new-key}.txt` first.
 */
export const DEFAULT_INDEXNOW_KEY = "26982a60fcd560afd3faf905245587a9";

export type IndexNowSubmitStatus =
  | 200
  | 202
  | 400
  | 403
  | 422
  | 429
  | number;

export type IndexNowSubmitResult = {
  ok: boolean;
  status: IndexNowSubmitStatus;
  host: string;
  endpoint: string;
  urlCount: number;
  urls: string[];
  dryRun: boolean;
  skippedReason?: string;
  message: string;
  bodyPreview?: string;
};

export type IndexNowUrlSelection = {
  /** Include every marketing URL (migration / redesign only). */
  includeAll?: boolean;
  /** Only URLs whose sitemap lastmod is on/after this UTC day. */
  changedSince?: Date;
  /** Explicit absolute or path URLs (same host only). */
  urls?: string[];
};

const lastSubmitByFingerprint = new Map<string, number>();

export function getIndexNowKey(): string {
  const fromEnv = process.env.INDEXNOW_KEY?.trim();
  const key = fromEnv || DEFAULT_INDEXNOW_KEY;
  if (!INDEXNOW_KEY_PATTERN.test(key)) {
    throw new Error(
      "INDEXNOW_KEY must be 8–128 characters of A–Z, a–z, 0–9, or hyphen.",
    );
  }
  return key;
}

/** Canonical production origin used in IndexNow `host` + `urlList`. */
export function getIndexNowOrigin(): string {
  return getSiteUrl().replace(/\/$/, "");
}

export function getIndexNowHost(origin = getIndexNowOrigin()): string {
  return new URL(origin).hostname.toLowerCase();
}

export function getIndexNowKeyLocation(origin = getIndexNowOrigin()): string {
  return `${origin.replace(/\/$/, "")}/${getIndexNowKey()}.txt`;
}

export function isProductionIndexNowTarget(origin = getIndexNowOrigin()): boolean {
  const host = getIndexNowHost(origin);
  if (host.endsWith(".vercel.app") || host === "localhost") {
    return false;
  }
  const env = process.env.VERCEL_ENV?.trim();
  if (env && env !== "production") {
    return false;
  }
  return host.length > 0;
}

export function marketingUrlsForIndexNow(origin = getIndexNowOrigin()): string[] {
  return MARKETING_ROUTES.map((route) => absoluteUrlForSitemap(origin, route.path));
}

function utcDayString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function recentlyChangedMarketingUrls(
  origin = getIndexNowOrigin(),
  changedSince: Date,
): string[] {
  const cutoff = utcDayString(changedSince);
  return MARKETING_ROUTES.filter((route) => {
    const lastmod = utcDayString(getSitemapLastModified(route.path));
    return lastmod >= cutoff;
  }).map((route) => absoluteUrlForSitemap(origin, route.path));
}

export function changedSinceDaysAgo(days: number, now = new Date()): Date {
  const d = new Date(now);
  d.setUTCDate(d.getUTCDate() - days);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

function sameHostUrl(origin: string, candidate: string): string | null {
  let parsed: URL;
  try {
    parsed = candidate.startsWith("http")
      ? new URL(candidate)
      : new URL(candidate.startsWith("/") ? candidate : `/${candidate}`, origin);
  } catch {
    return null;
  }
  const originHost = getIndexNowHost(origin);
  if (parsed.hostname.toLowerCase() !== originHost) {
    return null;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return null;
  }
  return parsed.toString();
}

export function resolveIndexNowUrlList(
  selection: IndexNowUrlSelection = {},
  origin = getIndexNowOrigin(),
): string[] {
  if (selection.urls && selection.urls.length > 0) {
    const resolved = selection.urls
      .map((url) => sameHostUrl(origin, url))
      .filter((url): url is string => Boolean(url));
    return uniqueUrls(resolved);
  }
  if (selection.includeAll) {
    return uniqueUrls(marketingUrlsForIndexNow(origin));
  }
  const since = selection.changedSince ?? changedSinceDaysAgo(14);
  return uniqueUrls(recentlyChangedMarketingUrls(origin, since));
}

function uniqueUrls(urls: string[]): string[] {
  return [...new Set(urls)];
}

function chunkUrls(urls: string[], size = INDEXNOW_MAX_URLS_PER_POST): string[][] {
  const chunks: string[][] = [];
  for (let i = 0; i < urls.length; i += size) {
    chunks.push(urls.slice(i, i + size));
  }
  return chunks;
}

function submissionFingerprint(host: string, urls: string[]): string {
  return `${host}:${urls.slice().sort().join("|")}`;
}

export function shouldDebounceSubmit(host: string, urls: string[], now = Date.now()): boolean {
  const fingerprint = submissionFingerprint(host, urls);
  const previous = lastSubmitByFingerprint.get(fingerprint);
  if (previous !== undefined && now - previous < INDEXNOW_RESUBMIT_GAP_MS) {
    return true;
  }
  lastSubmitByFingerprint.set(fingerprint, now);
  return false;
}

function messageForStatus(status: number, urlCount: number): string {
  switch (status) {
    case 200:
      return `IndexNow received ${urlCount} URL(s). Indexing is not guaranteed.`;
    case 202:
      return `IndexNow accepted ${urlCount} URL(s); key validation pending.`;
    case 400:
      return "IndexNow 400 Bad Request — check URL encoding and key format.";
    case 403:
      return "IndexNow 403 Forbidden — key file missing, mismatched, or not UTF-8 text.";
    case 422:
      return "IndexNow 422 Unprocessable Entity — URLs must match the host and stay under 10,000 per POST.";
    case 429:
      return "IndexNow 429 Too Many Requests — wait and retry; submissions count toward crawl quota.";
    default:
      return `IndexNow responded with HTTP ${status}.`;
  }
}

export function buildIndexNowPayload(
  urls: string[],
  origin = getIndexNowOrigin(),
): {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
} {
  const host = getIndexNowHost(origin);
  const key = getIndexNowKey();
  return {
    host,
    key,
    keyLocation: getIndexNowKeyLocation(origin),
    urlList: urls,
  };
}

export async function submitIndexNowUrls(
  selection: IndexNowUrlSelection = {},
  options: { dryRun?: boolean; skipDebounce?: boolean } = {},
): Promise<IndexNowSubmitResult> {
  const origin = getIndexNowOrigin();
  const host = getIndexNowHost(origin);
  const urls = resolveIndexNowUrlList(selection, origin);

  if (!isProductionIndexNowTarget(origin)) {
    return {
      ok: false,
      status: 0,
      host,
      endpoint: INDEXNOW_ENDPOINT,
      urlCount: urls.length,
      urls,
      dryRun: true,
      skippedReason: "preview-or-non-production-host",
      message:
        "IndexNow submits only from production (www host). Preview/localhost URLs are skipped.",
    };
  }

  if (urls.length === 0) {
    return {
      ok: true,
      status: 200,
      host,
      endpoint: INDEXNOW_ENDPOINT,
      urlCount: 0,
      urls,
      dryRun: Boolean(options.dryRun),
      skippedReason: "no-recent-url-changes",
      message:
        "No URLs selected. Sitemap lastmod is the catalog for older pages; IndexNow is for recent changes.",
    };
  }

  if (urls.length > INDEXNOW_MAX_URLS_PER_POST) {
    return {
      ok: false,
      status: 422,
      host,
      endpoint: INDEXNOW_ENDPOINT,
      urlCount: urls.length,
      urls,
      dryRun: Boolean(options.dryRun),
      message: messageForStatus(422, urls.length),
    };
  }

  if (!options.skipDebounce && !options.dryRun && shouldDebounceSubmit(host, urls)) {
    return {
      ok: true,
      status: 200,
      host,
      endpoint: INDEXNOW_ENDPOINT,
      urlCount: urls.length,
      urls,
      dryRun: false,
      skippedReason: "debounced",
      message: "Same URL set submitted within 5 minutes; skipped to protect crawl quota.",
    };
  }

  if (options.dryRun) {
    return {
      ok: true,
      status: 200,
      host,
      endpoint: INDEXNOW_ENDPOINT,
      urlCount: urls.length,
      urls,
      dryRun: true,
      message: `Dry run: would POST ${urls.length} URL(s) to IndexNow.`,
    };
  }

  const chunks = chunkUrls(urls);
  let lastStatus: IndexNowSubmitStatus = 0;
  let bodyPreview: string | undefined;

  for (const chunk of chunks) {
    const payload = buildIndexNowPayload(chunk, origin);
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    lastStatus = response.status;
    const text = (await response.text()).slice(0, 500);
    if (text) {
      bodyPreview = text;
    }
    logIndexNowSubmission({
      status: response.status,
      urlCount: chunk.length,
      host,
      method: "POST",
    });
    if (response.status !== 200 && response.status !== 202) {
      return {
        ok: false,
        status: response.status,
        host,
        endpoint: INDEXNOW_ENDPOINT,
        urlCount: urls.length,
        urls,
        dryRun: false,
        message: messageForStatus(response.status, chunk.length),
        bodyPreview,
      };
    }
  }

  return {
    ok: true,
    status: lastStatus,
    host,
    endpoint: INDEXNOW_ENDPOINT,
    urlCount: urls.length,
    urls,
    dryRun: false,
    message: messageForStatus(lastStatus, urls.length),
    bodyPreview,
  };
}

export function logIndexNowSubmission(entry: {
  status: number;
  urlCount: number;
  host: string;
  method: "GET" | "POST";
}): void {
  console.info(
    JSON.stringify({
      source: "indexnow",
      timestamp: new Date().toISOString(),
      host: entry.host,
      method: entry.method,
      urlCount: entry.urlCount,
      status: entry.status,
    }),
  );
}
