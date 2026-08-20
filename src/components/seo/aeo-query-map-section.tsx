import Link from "next/link";
import { AEO_QUERY_MAP } from "@/lib/content/aeo-query-map";

/**
 * AEO query map: one canonical URL per buyer/seller question.
 * Full 40–60 word answers live on those pages; this list is the index.
 */
export function AeoQueryMapSection() {
  return (
    <section className="mt-16 border-t border-palms-gold/15 pt-14" aria-labelledby="aeo-query-map-heading">
      <h2
        className="font-display text-2xl font-semibold tracking-tight text-palms-cream md:text-3xl"
        id="aeo-query-map-heading"
      >
        Where should you read the full Palms Place buyer and seller answers?
      </h2>
      <p className="mt-4 leading-relaxed text-palms-cream/85">
        Each question below has one canonical page with a 40–60 word answer. Other site pages link
        there instead of repeating the same FAQ. Open the canonical URL for the extractable answer.
      </p>
      <ol className="mt-8 space-y-6">
        {AEO_QUERY_MAP.map((item) => (
          <li key={item.id}>
            <h3 className="text-lg font-semibold text-palms-cream">{item.question}</h3>
            <p className="mt-2 text-base leading-relaxed text-palms-cream/80">
              {item.answer.split(/(?<=\.)\s/)[0]}
            </p>
            <p className="mt-2 text-sm">
              <Link
                className="font-medium text-palms-gold underline-offset-4 hover:underline"
                href={item.canonicalPath}
              >
                Full 40–60 word answer: {item.canonicalLabel}
              </Link>
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
