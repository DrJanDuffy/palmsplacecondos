import Link from "next/link";
import type { RelatedLink } from "@/lib/internal-links";

type RelatedPagesProps = {
  title?: string;
  links: RelatedLink[];
  className?: string;
};

export function RelatedPages({
  title = "Which Palms Place pages should you read next?",
  links,
  className = "",
}: RelatedPagesProps) {
  if (links.length === 0) return null;

  return (
    <nav aria-label={title} className={`mt-10 border-t border-palms-gold/15 pt-8 ${className}`}>
      <h2
        className="font-display text-lg font-semibold tracking-tight text-palms-cream"
        id="related-pages-heading"
      >
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            {item.external ? (
              <a
                className="font-medium text-palms-gold underline-offset-4 transition-colors hover:text-palms-gold-hover hover:underline"
                href={item.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.label}
              </a>
            ) : (
              <Link
                className="font-medium text-palms-gold underline-offset-4 transition-colors hover:text-palms-gold-hover hover:underline"
                href={item.href}
              >
                {item.label}
              </Link>
            )}
            {item.description ? (
              <span className="mt-0.5 block text-sm text-palms-cream/60">{item.description}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
