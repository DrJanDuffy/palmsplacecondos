import Link from "next/link";
import { sectionLinksForPath } from "@/lib/internal-links";

type SectionRelatedLinksProps = {
  pathname: string;
  sectionId: string;
};

/**
 * Compact AEO see-also row under a section heading. Two unique internal links per section.
 */
export function SectionRelatedLinks({ pathname, sectionId }: SectionRelatedLinksProps) {
  const links = sectionLinksForPath(pathname, sectionId);
  if (links.length === 0) return null;

  return (
    <p className="mt-3 text-sm leading-relaxed text-palms-cream/70">
      <span className="text-palms-cream/50">Related: </span>
      {links.map((item, index) => (
        <span key={`${item.href}-${item.label}`}>
          {index > 0 ? (
            <span aria-hidden className="text-palms-cream/40">
              {" "}
              ·{" "}
            </span>
          ) : null}
          {item.external ? (
            <a
              className="font-medium text-palms-gold underline-offset-4 hover:underline"
              href={item.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {item.label}
            </a>
          ) : (
            <Link
              className="font-medium text-palms-gold underline-offset-4 hover:underline"
              href={item.href}
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </p>
  );
}
