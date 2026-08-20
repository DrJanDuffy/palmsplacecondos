import { DEFAULT_INDEXNOW_KEY, getIndexNowKey } from "@/lib/indexnow";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type IndexNowKeyFileProps = {
  params: Promise<{ key: string }>;
};

/** Filenames served by more specific App Router or `public/` routes. */
const RESERVED_TXT_STEMS = new Set(["llms", "llms-full", "humans", "robots"]);

/**
 * IndexNow Option 1 key file at `/{key}.txt`.
 * A static copy also lives in `public/{DEFAULT_INDEXNOW_KEY}.txt`.
 * This handler covers key rotation via `INDEXNOW_KEY`.
 */
export async function GET(_request: Request, { params }: IndexNowKeyFileProps): Promise<Response> {
  const { key: requested } = await params;
  if (RESERVED_TXT_STEMS.has(requested)) {
    notFound();
  }

  let configured: string;
  try {
    configured = getIndexNowKey();
  } catch {
    notFound();
  }

  const allowed = new Set([configured, DEFAULT_INDEXNOW_KEY]);
  if (!allowed.has(requested)) {
    notFound();
  }

  return new Response(requested, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
