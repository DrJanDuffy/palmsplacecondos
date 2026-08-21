#!/usr/bin/env node
/**
 * Generate a Palms Place listing-specialist MP4 via the Tavus Video API.
 *
 * This is async file generation (POST /v2/videos), not the Conversational Video
 * Interface in https://github.com/Tavus-Engineering/tavus-examples.git (live
 * Daily rooms). Do not put TAVUS_API_KEY in NEXT_PUBLIC_* or browser code —
 * those examples send the key from the client.
 *
 * Docs: https://docs.tavus.io/sections/video/quickstart
 * Create: https://docs.tavus.io/api-reference/video-request/create-video
 *
 * Required env:
 *   TAVUS_API_KEY
 *   TAVUS_REPLICA_ID  Face ID for Dr. Jan Duffy (GET /v2/faces, face_type=user).
 *                     Never use a stock/system face and label it as Dr. Jan.
 *
 * Optional env:
 *   TAVUS_BACKGROUND_SOURCE_URL  Public MP4 used as B-roll behind the face.
 *   TAVUS_VIDEO_NAME
 *
 * Usage:
 *   node scripts/generate-tavus-palms-place-video.mjs --dry-run
 *   node scripts/generate-tavus-palms-place-video.mjs --list-faces
 *   node scripts/generate-tavus-palms-place-video.mjs
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://tavusapi.com/v2";
const ORIGIN = "https://www.palmsplacecondos.com";
const DEFAULT_BACKGROUND = `${ORIGIN}/videos/dr-jan-duffy-palms-place-listing-specialist-youtube.mp4`;
const OUT_FILE = join(
  ROOT,
  "public/videos/dr-jan-duffy-palms-place-listing-specialist-tavus.mp4",
);
const VO_FILE = join(ROOT, "content/video/tavus-palms-place-vo.txt");

const args = new Set(process.argv.slice(2));
const apiKey = process.env.TAVUS_API_KEY?.trim();
const replicaId = process.env.TAVUS_REPLICA_ID?.trim();
const backgroundSourceUrl =
  process.env.TAVUS_BACKGROUND_SOURCE_URL?.trim() || DEFAULT_BACKGROUND;
const videoName =
  process.env.TAVUS_VIDEO_NAME?.trim() ||
  "Dr. Jan Duffy Palms Place listing specialist";

function loadScript() {
  return readFileSync(VO_FILE, "utf8").replace(/\s+/g, " ").trim();
}

function headers() {
  return {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
  };
}

function requireApiKey() {
  if (apiKey) return;
  console.error(
    "Missing TAVUS_API_KEY. Create a key at https://platform.tavus.io/api-keys and set it in the environment (never NEXT_PUBLIC_*).",
  );
  process.exit(1);
}

async function tavus(path, init) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { ...headers(), ...init?.headers },
  });
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text.slice(0, 500) };
  }
  if (!res.ok) {
    const err = body.error || body.message || res.statusText;
    throw new Error(`Tavus ${res.status} ${path}: ${err}`);
  }
  return body;
}

function buildPayload() {
  return {
    replica_id: replicaId,
    script: loadScript(),
    video_name: videoName,
    background_source_url: backgroundSourceUrl,
    properties: {
      start_with_wave: false,
    },
  };
}

async function listFaces() {
  requireApiKey();
  const body = await tavus("/faces?verbose=true&face_type=user&limit=50");
  const rows = Array.isArray(body.data) ? body.data : [];
  console.log(
    JSON.stringify(
      {
        total_count: body.total_count ?? rows.length,
        faces: rows.map((face) => ({
          face_id: face.face_id ?? face.replica_id,
          face_name: face.face_name ?? face.replica_name,
          status: face.status,
          face_type: face.face_type,
          model_name: face.model_name,
          training_progress: face.training_progress,
        })),
      },
      null,
      2,
    ),
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generate() {
  requireApiKey();
  if (!replicaId) {
    console.error(
      "Missing TAVUS_REPLICA_ID. Run with --list-faces and use a completed user face trained as Dr. Jan Duffy — not a Tavus stock face.",
    );
    process.exit(1);
  }

  const payload = buildPayload();
  const created = await tavus("/videos", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const videoId = created.video_id;
  if (!videoId) {
    throw new Error("Tavus create-video response had no video_id");
  }
  console.log(
    JSON.stringify({
      step: "queued",
      video_id: videoId,
      status: created.status,
      hosted_url: created.hosted_url,
    }),
  );

  const deadline = Date.now() + 20 * 60 * 1000;
  let latest = created;
  while (Date.now() < deadline) {
    latest = await tavus(`/videos/${videoId}`);
    const status = latest.status;
    console.log(
      JSON.stringify({
        step: "poll",
        video_id: videoId,
        status,
        generation_progress: latest.generation_progress,
      }),
    );
    if (status === "ready") break;
    if (status === "error" || status === "deleted") {
      throw new Error(
        `Tavus video ${videoId} ended with status ${status}: ${latest.status_details || ""}`,
      );
    }
    await sleep(10_000);
  }
  if (latest.status !== "ready") {
    throw new Error(`Timed out waiting for Tavus video ${videoId}`);
  }

  const downloadUrl = latest.download_url || latest.stream_url;
  if (!downloadUrl) {
    console.log(
      JSON.stringify({
        step: "ready-no-download-url",
        video_id: videoId,
        hosted_url: latest.hosted_url,
        note: "Open hosted_url, then save the MP4 into public/videos/",
      }),
    );
    return;
  }

  const fileRes = await fetch(downloadUrl);
  if (!fileRes.ok) {
    throw new Error(`Download failed ${fileRes.status} ${downloadUrl}`);
  }
  const buf = Buffer.from(await fileRes.arrayBuffer());
  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, buf);
  console.log(
    JSON.stringify({
      step: "wrote",
      video_id: videoId,
      bytes: buf.length,
      path: OUT_FILE,
      hosted_url: latest.hosted_url,
    }),
  );
}

async function main() {
  if (args.has("--list-faces")) {
    await listFaces();
    return;
  }

  const payload = {
    replica_id: replicaId || "<TAVUS_REPLICA_ID>",
    script: loadScript(),
    video_name: videoName,
    background_source_url: backgroundSourceUrl,
    properties: { start_with_wave: false },
  };

  if (args.has("--dry-run")) {
    console.log(
      JSON.stringify(
        {
          step: "dry-run",
          endpoint: `${API}/videos`,
          docs: "https://docs.tavus.io/api-reference/video-request/create-video",
          not: "CVI live rooms from tavus-examples",
          payload,
        },
        null,
        2,
      ),
    );
    return;
  }

  await generate();
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
