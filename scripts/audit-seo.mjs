#!/usr/bin/env node
/**
 * Technical SEO/GEO/AEO regression check — the automated half of the site's
 * self-improving SEO loop (see docs/seo-geo-aeo-audit-log.md).
 *
 * Boots the already-built app (`npm run build` must run first), walks every
 * URL in the generated sitemap, and asserts the basics that keep the site
 * eligible for Google rich results and AI answer-engine citation:
 *   - page responds 200 and canonical matches the sitemap URL's path
 *   - exactly one <h1>, a title and meta description in a sane length range
 *   - at least one valid application/ld+json block
 *   - /robots.txt, /llms.txt, /llms-full.txt all resolve
 *
 * This is a fast, cheap regression net, not a full audit — it exists so a
 * change that silently drops metadata or breaks JSON-LD fails CI instead of
 * shipping. Run locally with `npm run audit:seo` after `npm run build`
 * (ideally with the same NEXT_PUBLIC_SITE_URL both times).
 *
 * Uses node:http directly rather than fetch(): NEXT_PUBLIC_SITE_URL is
 * inlined into the middleware bundle at *build* time (standard Next.js
 * behavior for NEXT_PUBLIC_ vars), so it can't be overridden by an env var
 * at `next start` time. If the build's canonical host doesn't match this
 * script's request, middleware 308s to the real domain — and fetch()
 * forbids setting a custom Host header to work around that, while
 * node:http does not.
 */

import http from "node:http";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..");
const nextBin = path.join(repoRoot, "node_modules", ".bin", "next");

const PORT = Number(process.env.AUDIT_SEO_PORT ?? "4173");
// The host/protocol middleware expects — whatever NEXT_PUBLIC_SITE_URL was set to
// for the build under test. Falls back to the app's own no-env-var default.
const CANONICAL_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
const canonicalUrl = new URL(CANONICAL_ORIGIN);

/** @type {string[]} */
const failures = [];

function fail(context, message) {
  failures.push(`${context}: ${message}`);
}

/** GET `path` from the locally running server, presenting the canonical Host/proto. */
function request(pathname) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        host: "127.0.0.1",
        port: PORT,
        path: pathname,
        method: "GET",
        headers: {
          Host: canonicalUrl.host,
          "X-Forwarded-Proto": canonicalUrl.protocol.replace(":", ""),
        },
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () =>
          resolve({ status: res.statusCode ?? 0, body: Buffer.concat(chunks).toString("utf8") }),
        );
      },
    );
    req.on("error", reject);
    req.end();
  });
}

async function waitForServer(maxAttempts = 80) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const res = await request("/robots.txt");
      if (res.status > 0) return;
    } catch {
      // server not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Server on 127.0.0.1:${PORT} did not become ready in time`);
}

function extractAll(regex, text) {
  return [...text.matchAll(regex)].map((m) => m[1]);
}

function safePathname(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

async function auditFlatFile(pathname, { minLength = 20 } = {}) {
  const { status, body } = await request(pathname);
  if (status !== 200) {
    fail(pathname, `expected 200, got ${status}`);
    return;
  }
  if (body.trim().length < minLength) {
    fail(pathname, `body suspiciously short (${body.trim().length} chars)`);
  }
}

async function auditSitemap() {
  const { status, body } = await request("/sitemap.xml");
  if (status !== 200) {
    fail("/sitemap.xml", `expected 200, got ${status}`);
    return [];
  }
  const urls = extractAll(/<loc>([^<]+)<\/loc>/g, body);
  if (urls.length === 0) {
    fail("/sitemap.xml", "no <loc> entries found");
  }
  const dupes = urls.filter((u, i) => urls.indexOf(u) !== i);
  if (dupes.length > 0) {
    fail("/sitemap.xml", `duplicate URLs: ${[...new Set(dupes)].join(", ")}`);
  }
  // All sitemap URLs should share one origin — a mixed-origin sitemap usually
  // means a hardcoded URL slipped in.
  const origins = new Set(urls.map((loc) => new URL(loc).origin));
  if (origins.size > 1) {
    fail("/sitemap.xml", `mixed origins across sitemap URLs: ${[...origins].join(", ")}`);
  }
  return urls;
}

async function auditPage(url) {
  const pathname = safePathname(url) || "/";
  const label = `page ${pathname}`;
  const { status, body } = await request(pathname);
  if (status !== 200) {
    fail(label, `expected 200, got ${status}`);
    return;
  }

  const h1s = extractAll(/<h1[\s>]/g, body);
  if (h1s.length !== 1) {
    fail(label, `expected exactly one <h1>, found ${h1s.length}`);
  }

  const titleMatch = body.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch?.[1] ?? "";
  if (title.length < 10 || title.length > 70) {
    fail(label, `title length ${title.length} outside 10–70 chars: "${title}"`);
  }

  const descMatch = body.match(/<meta name="description" content="([^"]*)"/);
  const description = descMatch?.[1] ?? "";
  if (description.length < 50 || description.length > 300) {
    fail(label, `meta description length ${description.length} outside 50–300 chars`);
  }

  const canonicalMatch = body.match(/<link rel="canonical" href="([^"]*)"/);
  const canonical = canonicalMatch?.[1] ?? "";
  const canonicalPathname = safePathname(canonical).replace(/\/$/, "");
  const expectedPathname = safePathname(url).replace(/\/$/, "");
  if (!canonical) {
    fail(label, "missing <link rel=\"canonical\">");
  } else if (canonicalPathname !== expectedPathname) {
    fail(label, `canonical "${canonical}" path does not match sitemap URL "${url}"`);
  }

  const jsonLdBlocks = extractAll(
    /<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
    body,
  );
  if (jsonLdBlocks.length === 0) {
    fail(label, "no JSON-LD blocks found");
  }
  for (const [index, block] of jsonLdBlocks.entries()) {
    try {
      JSON.parse(block);
    } catch (err) {
      fail(label, `JSON-LD block ${index} failed to parse: ${err.message}`);
    }
  }
}

async function main() {
  console.log(`Starting production server on port ${PORT} (canonical origin ${CANONICAL_ORIGIN})...`);
  const server = spawn(nextBin, ["start", "-p", String(PORT)], {
    cwd: repoRoot,
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout?.on("data", () => {});
  server.stderr?.on("data", (chunk) => process.stderr.write(chunk));

  try {
    await waitForServer();

    await auditFlatFile("/robots.txt");
    await auditFlatFile("/llms.txt");
    await auditFlatFile("/llms-full.txt");
    const urls = await auditSitemap();

    console.log(`Auditing ${urls.length} sitemap URLs...`);
    for (const url of urls) {
      await auditPage(url);
    }
  } finally {
    server.kill("SIGTERM");
  }

  if (failures.length > 0) {
    console.error(`\n❌ SEO audit found ${failures.length} issue(s):\n`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  } else {
    console.log("\n✅ SEO audit passed — all sitemap URLs have canonical, title, description, and JSON-LD.");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error("SEO audit crashed:", err);
  process.exit(1);
});
