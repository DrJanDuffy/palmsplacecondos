#!/usr/bin/env node
/**
 * Self-improving SEO / GEO / AEO audit.
 *
 * Static, dependency-free checks against this repo's own SEO surface —
 * no network calls, no external services. Runs in CI (see
 * .github/workflows/seo-geo-aeo-self-improve.yml) on a weekly schedule and
 * on every PR touching content/SEO files, so drift is caught automatically
 * instead of waiting for a human to notice a stale guide or a duplicate
 * title in Search Console weeks later.
 *
 * Checks:
 *  1. Route coverage   — every MARKETING_ROUTES path resolves to a real
 *                         page.tsx (catches sitemap/llms.txt entries that
 *                         would 404).
 *  2. Orphan pages      — static page.tsx files that exist but are not in
 *                         MARKETING_ROUTES (missing from sitemap/llms.txt).
 *  3. Title/description — length and sitewide duplicates (duplicate titles
 *                         and descriptions are a classic SEO/AEO
 *                         disambiguation problem for both Google and
 *                         answer engines).
 *  4. Content freshness — dateModified / sitemap lastmod values older than
 *                         FRESHNESS_WARN_DAYS. GEO best practice treats
 *                         content freshness as a citation-priority signal
 *                         for AI answer engines, distinct from Google
 *                         ranking.
 *  5. AI crawler allow-list — robots.ts includes the answer-engine crawlers
 *                         this site intentionally welcomes for GEO/AEO
 *                         visibility.
 *
 * Usage: node scripts/seo-geo-aeo-audit.mjs [--strict] [--out <file>]
 *   --strict  exit 1 on warnings too (default: only hard errors exit 1)
 *   --out     also write the full Markdown report to this file
 */

import { readFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const APP_DIR = path.join(ROOT, "src", "app");
const CONTENT_DIR = path.join(ROOT, "src", "lib", "content");

const FRESHNESS_WARN_DAYS = 180;
const TITLE_MIN = 15;
const TITLE_MAX = 70;
const DESCRIPTION_MIN = 70;
const DESCRIPTION_MAX = 185;

/** Answer-engine / AI crawlers this site intentionally allows (GEO/AEO visibility). */
const EXPECTED_AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "YouBot",
  "DuckAssistBot",
  "Meta-ExternalAgent",
  "Amazonbot",
];

const errors = [];
const warnings = [];
const notes = [];

function readText(absPath) {
  return readFileSync(absPath, "utf8");
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// 1. Parse MARKETING_ROUTES from src/lib/marketing-routes.ts (regex, no TS exec)
// ---------------------------------------------------------------------------

const marketingRoutesSrc = readText(path.join(ROOT, "src", "lib", "marketing-routes.ts"));
const routeBlockMatch = marketingRoutesSrc.match(
  /MARKETING_ROUTES:\s*MarketingRoute\[\]\s*=\s*\[([\s\S]*?)\n\];/,
);
if (!routeBlockMatch) {
  errors.push("Could not locate MARKETING_ROUTES array in src/lib/marketing-routes.ts — audit cannot run.");
}
const routeEntries = [];
if (routeBlockMatch) {
  const entryRe = /path:\s*"([^"]*)"/g;
  let m;
  while ((m = entryRe.exec(routeBlockMatch[1])) !== null) {
    routeEntries.push(m[1]);
  }
}

function routeToStaticFile(routePath) {
  const segments = routePath.split("/").filter(Boolean);
  return path.join(APP_DIR, ...segments, "page.tsx");
}

/** Resolve a route to its backing page.tsx, following one level of [dynamicSlug] fallback. */
function resolveRouteFile(routePath) {
  const staticFile = routeToStaticFile(routePath);
  if (existsSync(staticFile)) return { file: staticFile, dynamic: false };

  const segments = routePath.split("/").filter(Boolean);
  if (segments.length === 0) return null;
  const parentDir = path.join(APP_DIR, ...segments.slice(0, -1));
  if (!existsSync(parentDir)) return null;
  const dynamicChild = readdirSync(parentDir, { withFileTypes: true }).find(
    (e) => e.isDirectory() && /^\[.+\]$/.test(e.name),
  );
  if (!dynamicChild) return null;
  const dynamicFile = path.join(parentDir, dynamicChild.name, "page.tsx");
  return existsSync(dynamicFile) ? { file: dynamicFile, dynamic: true, slug: segments[segments.length - 1] } : null;
}

const resolvedRoutes = [];
for (const routePath of routeEntries) {
  const resolved = resolveRouteFile(routePath);
  if (!resolved) {
    errors.push(
      `Route coverage: "${routePath || "/"}" is listed in MARKETING_ROUTES (sitemap, llms.txt, IndexNow) but no page.tsx resolves for it. This will 404.`,
    );
    continue;
  }
  resolvedRoutes.push({ routePath, ...resolved });
}

// ---------------------------------------------------------------------------
// 2. Orphan static pages — page.tsx files not represented in MARKETING_ROUTES
// ---------------------------------------------------------------------------

const marketingPathSet = new Set(routeEntries.map((p) => (p === "" ? "/" : p)));
const allPageFiles = walk(APP_DIR).filter((f) => f.endsWith(`${path.sep}page.tsx`) || f === path.join(APP_DIR, "page.tsx"));

for (const file of allPageFiles) {
  const rel = path.relative(APP_DIR, file);
  const dir = path.dirname(rel);
  if (dir.split(path.sep).some((seg) => /^\[.+\]$/.test(seg))) continue; // dynamic — can't statically enumerate
  const routePath = dir === "." ? "/" : `/${dir.split(path.sep).join("/")}`;
  if (!marketingPathSet.has(routePath)) {
    warnings.push(
      `Orphan page: "${routePath}" has a page.tsx but is not in MARKETING_ROUTES — it is missing from sitemap.xml, llms.txt, and IndexNow submissions.`,
    );
  }
}

// ---------------------------------------------------------------------------
// 3. Title / description length + sitewide duplicates
// ---------------------------------------------------------------------------

// Slug -> description, sourced from field-notes content modules (dynamic /insights/:slug pages).
const fieldNotesDir = path.join(CONTENT_DIR, "field-notes");
const fieldNoteDescByFile = new Map();
if (existsSync(fieldNotesDir)) {
  for (const file of readdirSync(fieldNotesDir)) {
    if (!file.endsWith(".ts") || file === "index.ts" || file === "types.ts") continue;
    const src = readText(path.join(fieldNotesDir, file));
    const title = src.match(/\btitle:\s*"([^"]+)"/)?.[1];
    const description = src.match(/\bdescription:\s*\n?\s*"([^"]+)"/)?.[1];
    const slug = src.match(/\bslug:\s*"([^"]+)"/)?.[1];
    if (slug) fieldNoteDescByFile.set(slug, { title, description });
  }
}

const titleByPath = new Map();
const descByPath = new Map();

for (const { routePath, file, dynamic, slug } of resolvedRoutes) {
  const label = routePath || "/";
  let title;
  let description;

  if (dynamic) {
    const entry = slug ? fieldNoteDescByFile.get(slug) : undefined;
    title = entry?.title;
    description = entry?.description;
  } else {
    const src = readText(file);
    title = src.match(/const\s+title\s*=\s*"([^"]+)"/)?.[1] ?? src.match(/\btitle:\s*"([^"]+)"/)?.[1];
    description =
      src.match(/const\s+description\s*=\s*"([^"]+)"/)?.[1] ?? src.match(/\bdescription:\s*"([^"]+)"/)?.[1];
  }

  if (!title || !description) {
    // generateMetadata()-only routes (e.g. dynamic pages without a matched content file) —
    // not enough static signal to check safely; skip rather than false-positive.
    continue;
  }

  titleByPath.set(label, title);
  descByPath.set(label, description);

  if (title.length < TITLE_MIN || title.length > TITLE_MAX) {
    warnings.push(`Title length: "${label}" is ${title.length} chars (target ${TITLE_MIN}-${TITLE_MAX}): "${title}"`);
  }
  if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX) {
    warnings.push(
      `Description length: "${label}" is ${description.length} chars (target ${DESCRIPTION_MIN}-${DESCRIPTION_MAX}): "${description}"`,
    );
  }
}

function reportDuplicates(byPath, kind) {
  const seen = new Map();
  for (const [routePath, value] of byPath) {
    const key = value.trim().toLowerCase();
    if (!seen.has(key)) seen.set(key, []);
    seen.get(key).push(routePath);
  }
  for (const [value, paths] of seen) {
    if (paths.length > 1) {
      warnings.push(`Duplicate ${kind} across ${paths.length} pages (${paths.join(", ")}): "${value}"`);
    }
  }
}
reportDuplicates(titleByPath, "title");
reportDuplicates(descByPath, "description");

// ---------------------------------------------------------------------------
// 4. Content freshness
// ---------------------------------------------------------------------------

const now = new Date();
function daysSince(isoDate) {
  const then = new Date(`${isoDate}T12:00:00.000Z`);
  return Math.round((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
}

const freshnessSources = [
  ...walk(CONTENT_DIR).filter((f) => f.endsWith(".ts") && f !== path.join(fieldNotesDir, "types.ts")),
  path.join(ROOT, "src", "lib", "sitemap-last-modified.ts"),
];

const seenDates = new Set();
for (const file of freshnessSources) {
  const src = readText(file);
  const re = /dateModified:\s*"(\d{4}-\d{2}-\d{2})"|"(\/[^"]*)"\s*:\s*"(\d{4}-\d{2}-\d{2})"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const isoDate = m[1] ?? m[3];
    const label = m[2] ? m[2] : path.relative(ROOT, file);
    const key = `${label}:${isoDate}`;
    if (seenDates.has(key)) continue;
    seenDates.add(key);
    const age = daysSince(isoDate);
    if (age > FRESHNESS_WARN_DAYS) {
      warnings.push(
        `Content freshness: "${label}" last modified ${isoDate} (${age} days ago, threshold ${FRESHNESS_WARN_DAYS}) — refresh copy/facts and bump dateModified for GEO citation priority.`,
      );
    }
  }
}

// ---------------------------------------------------------------------------
// 5. AI crawler allow-list in robots.ts
// ---------------------------------------------------------------------------

const robotsSrc = readText(path.join(APP_DIR, "robots.ts"));
const missingCrawlers = EXPECTED_AI_CRAWLERS.filter((bot) => !robotsSrc.includes(`"${bot}"`));
if (missingCrawlers.length > 0) {
  warnings.push(
    `robots.ts is missing recommended AI/answer-engine crawlers for GEO/AEO visibility: ${missingCrawlers.join(", ")}.`,
  );
}

notes.push(`Checked ${routeEntries.length} MARKETING_ROUTES, ${allPageFiles.length} page.tsx files, ${freshnessSources.length} content modules for freshness.`);

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------

const lines = [];
lines.push("# SEO / GEO / AEO self-audit");
lines.push("");
lines.push(`Generated ${now.toISOString().slice(0, 10)} · ${errors.length} error(s) · ${warnings.length} warning(s)`);
lines.push("");

if (errors.length > 0) {
  lines.push("## Errors (break the build)");
  lines.push("");
  for (const e of errors) lines.push(`- ❌ ${e}`);
  lines.push("");
}

if (warnings.length > 0) {
  lines.push("## Warnings (review, not blocking)");
  lines.push("");
  for (const w of warnings) lines.push(`- ⚠️ ${w}`);
  lines.push("");
} else {
  lines.push("## Warnings");
  lines.push("");
  lines.push("None. 🎉");
  lines.push("");
}

lines.push("## Notes");
lines.push("");
for (const n of notes) lines.push(`- ${n}`);
lines.push("");

const report = lines.join("\n");
console.log(report);

const args = process.argv.slice(2);
const strict = args.includes("--strict");
const outIdx = args.indexOf("--out");
if (outIdx !== -1 && args[outIdx + 1]) {
  writeFileSync(path.resolve(ROOT, args[outIdx + 1]), report, "utf8");
}

if (errors.length > 0 || (strict && warnings.length > 0)) {
  process.exitCode = 1;
}
