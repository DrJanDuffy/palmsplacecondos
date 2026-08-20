/**
 * Public IndexNow ownership key — Option 1 (root `/{key}.txt`).
 * @see https://www.indexnow.org/documentation
 * @see https://www.indexnow.org/faq
 *
 * Allowed: 8–128 chars, a–z A–Z 0–9 hyphen. This is ownership proof hosted
 * publicly; override with INDEXNOW_KEY on Vercel to rotate.
 */
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY?.trim() || "99f05a4a9adb4b91aab8e85b83ef541b";

export const INDEXNOW_KEY_PATH = `/${INDEXNOW_KEY}.txt`;

export function isIndexNowKeyRequest(pathname: string): boolean {
  return pathname === INDEXNOW_KEY_PATH;
}

/** Option 1 key URL — used only if a caller needs keyLocation; POST Option 1 omits it. */
export function indexNowKeyLocation(origin: string): string {
  return `${origin.replace(/\/$/, "")}${INDEXNOW_KEY_PATH}`;
}

export function indexNowKeyFileHeaders(): HeadersInit {
  return {
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "public, max-age=3600",
    "x-content-type-options": "nosniff",
  };
}
