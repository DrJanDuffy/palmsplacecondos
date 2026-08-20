import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  changedSinceDaysAgo,
  submitIndexNowUrls,
  type IndexNowUrlSelection,
} from "@/lib/indexnow";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Submit recently changed marketing URLs to IndexNow.
 *
 * GET  — Vercel Cron (`Authorization: Bearer $CRON_SECRET`).
 * POST — same auth; optional JSON `{ urls?, includeAll?, dryRun?, changedSinceDays? }`.
 *
 * Preview deployments never ping IndexNow (host/env guard in `submitIndexNowUrls`).
 */
export async function GET(request: Request): Promise<Response> {
  const unauthorized = requireSubmitSecret(request);
  if (unauthorized) {
    return unauthorized;
  }
  const dryRun = new URL(request.url).searchParams.get("dryRun") === "1";
  const result = await submitIndexNowUrls(
    { changedSince: changedSinceDaysAgo(14) },
    { dryRun },
  );
  return NextResponse.json(publicResult(result), { status: httpStatusForResult(result) });
}

export async function POST(request: Request): Promise<Response> {
  const unauthorized = requireSubmitSecret(request);
  if (unauthorized) {
    return unauthorized;
  }

  let selection: IndexNowUrlSelection = { changedSince: changedSinceDaysAgo(14) };
  let dryRun = false;

  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = (await request.json()) as unknown;
    if (body !== null && typeof body === "object") {
      const record = body as Record<string, unknown>;
      dryRun = record.dryRun === true;
      if (record.includeAll === true) {
        selection = { includeAll: true };
      }
      if (Array.isArray(record.urls)) {
        const urls = record.urls.filter((item): item is string => typeof item === "string");
        selection = { urls };
      }
      if (typeof record.changedSinceDays === "number" && Number.isFinite(record.changedSinceDays)) {
        selection = {
          ...selection,
          changedSince: changedSinceDaysAgo(Math.max(0, Math.floor(record.changedSinceDays))),
        };
      }
    }
  }

  const result = await submitIndexNowUrls(selection, { dryRun });
  return NextResponse.json(publicResult(result), { status: httpStatusForResult(result) });
}

function requireSubmitSecret(request: Request): Response | null {
  const expected =
    process.env.CRON_SECRET?.trim() || process.env.INDEXNOW_SUBMIT_SECRET?.trim() || "";
  const vercelEnv = process.env.VERCEL_ENV?.trim();
  const isProduction = vercelEnv === "production" || (!vercelEnv && process.env.NODE_ENV === "production");

  if (!expected) {
    if (isProduction) {
      return NextResponse.json(
        { ok: false, error: "Set CRON_SECRET (or INDEXNOW_SUBMIT_SECRET) before submitting." },
        { status: 503 },
      );
    }
    return null;
  }

  const bearer = bearerToken(request.headers.get("authorization"));
  const header = request.headers.get("x-indexnow-secret")?.trim() ?? "";
  if (secretEquals(bearer, expected) || secretEquals(header, expected)) {
    return null;
  }

  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

function bearerToken(authorization: string | null): string {
  if (!authorization?.startsWith("Bearer ")) {
    return "";
  }
  return authorization.slice("Bearer ".length).trim();
}

function secretEquals(given: string, expected: string): boolean {
  if (!given || !expected) {
    return false;
  }
  const left = Buffer.from(given);
  const right = Buffer.from(expected);
  if (left.length !== right.length) {
    return false;
  }
  return timingSafeEqual(left, right);
}

function publicResult(result: Awaited<ReturnType<typeof submitIndexNowUrls>>) {
  return {
    ok: result.ok,
    status: result.status,
    host: result.host,
    endpoint: result.endpoint,
    urlCount: result.urlCount,
    urls: result.urls,
    dryRun: result.dryRun,
    skippedReason: result.skippedReason,
    message: result.message,
  };
}

function httpStatusForResult(result: Awaited<ReturnType<typeof submitIndexNowUrls>>): number {
  if (result.skippedReason === "preview-or-non-production-host") {
    return 200;
  }
  if (result.status === 0) {
    return result.ok ? 200 : 500;
  }
  if (result.status === 202) {
    return 202;
  }
  if (result.ok) {
    return 200;
  }
  if (result.status >= 400 && result.status < 600) {
    return result.status;
  }
  return 502;
}
