import Link from "next/link";
import { StructuredData } from "@/components/seo/structured-data";
import { geoCitationLinks, type RelatedLink } from "@/lib/internal-links";
import { getRelatedItemListJsonLd } from "@/lib/schema";

type RelatedPagesProps = {
  title?: string;
  links: RelatedLink[];
  className?: string;
  /** Current route — required for related ItemList `@id`. */
  pathname: string;
  /** Include GBP / maps / license citations (default true). */
  includeCitations?: boolean;
};

function LinkRow({ item }: { item: RelatedLink }) {
  const className =
    "font-medium text-palms-gold underline-offset-4 transition-colors hover:text-palms-gold-hover hover:underline";
  return (
    <li>
      {item.external ? (
        <a className={className} href={item.href} rel="noopener noreferrer" target="_blank">
          {item.label}
        </a>
      ) : (
        <Link className={className} href={item.href}>
          {item.label}
        </Link>
      )}
      {item.description ? (
        <span className="mt-0.5 block text-sm text-palms-cream/60">{item.description}</span>
      ) : null}
    </li>
  );
}

export function RelatedPages({
  title = "Which Palms Place pages should you read next?",
  links,
  className = "",
  pathname,
  includeCitations = true,
}: RelatedPagesProps) {
  if (links.length === 0) return null;

  const citations = includeCitations ? geoCitationLinks() : [];
  const relatedJsonLd = getRelatedItemListJsonLd(
    pathname,
    links.filter((item) => !item.external),
  );

  return (
    <nav aria-label={title} className={`mt-10 border-t border-palms-gold/15 pt-8 ${className}`}>
      <StructuredData data={relatedJsonLd} />
      <h2
        className="font-display text-lg font-semibold tracking-tight text-palms-cream"
        id="related-pages-heading"
      >
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((item) => (
          <LinkRow item={item} key={`${item.href}-${item.label}`} />
        ))}
      </ul>

      {citations.length > 0 ? (
        <div className="mt-8 border-t border-palms-gold/10 pt-6">
          <h3
            className="font-display text-base font-semibold tracking-tight text-palms-cream"
            id="related-citations-heading"
          >
            Where can you verify Palms Place on the map and in public records?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-palms-cream/70">
            These official profiles and maps match the NAP and tower address on this page. Listing
            prices and HOA fees still need the current unit file.
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {citations.map((item) => (
              <LinkRow item={item} key={`cite-${item.href}-${item.label}`} />
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
