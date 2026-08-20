#!/usr/bin/env node
/**
 * IndexNow + sitemap notify (official FAQ: use both).
 * Option 1: key file at https://www.palmsplacecondos.com/{key}.txt
 * POST https://api.indexnow.org/indexnow — 200 OK or 202 key validation pending.
 *
 * Usage: node scripts/ping-search-engines.mjs
 * @see https://www.indexnow.org/documentation
 * @see https://www.indexnow.org/faq
 */
const ORIGIN = "https://www.palmsplacecondos.com";
const KEY = process.env.INDEXNOW_KEY?.trim() || "99f05a4a9adb4b91aab8e85b83ef541b";
const HOST = "www.palmsplacecondos.com";

/** Recently updated / high-priority pages from this content change — not a full-site dump. */
const URLS = [
  `${ORIGIN}/`,
  `${ORIGIN}/palms-place`,
  `${ORIGIN}/faq`,
  `${ORIGIN}/team`,
  `${ORIGIN}/search`,
  `${ORIGIN}/photos/unit-8322`,
  `${ORIGIN}/guide/compare-strip-high-rises`,
  `${ORIGIN}/insights/palms-place-tour-red-flags`,
  `${ORIGIN}/insights/why-we-request-hoa-packets-early`,
  `${ORIGIN}/insights/furnished-resale-inventory-surprises`,
  `${ORIGIN}/insights/palms-place-corner-unit-listing-campaign`,
];

function isAccepted(status) {
  return status === 200 || status === 202;
}

async function main() {
  const sitemapPing = `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${ORIGIN}/sitemap.xml`)}`;
  const bingSitemap = await fetch(sitemapPing, { redirect: "follow" });
  console.log(
    JSON.stringify({
      step: "bing-sitemap-ping",
      status: bingSitemap.status,
      accepted: bingSitemap.ok,
    }),
  );

  const indexRes = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      urlList: URLS,
    }),
  });

  const body = await indexRes.text();
  const payload = {
    step: "indexnow-post",
    endpoint: "https://api.indexnow.org/indexnow",
    status: indexRes.status,
    accepted: isAccepted(indexRes.status),
    pendingKeyValidation: indexRes.status === 202,
    submittedCount: URLS.length,
    keyFile: `${ORIGIN}/${KEY}.txt`,
    note:
      indexRes.status === 202
        ? "URL received; search engine will crawl the root key file before later submissions return 200."
        : undefined,
    errorBody: isAccepted(indexRes.status) ? undefined : body.slice(0, 500),
  };
  console.log(JSON.stringify(payload));

  if (!isAccepted(indexRes.status)) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
