import Link from "next/link";
import { breadcrumbTrailForPath } from "@/lib/internal-links";

type SiteBreadcrumbsProps = {
  pathname: string;
};

/**
 * Visible BreadcrumbList twin — Home → hub → page. Hidden on the homepage (single crumb).
 */
export function SiteBreadcrumbs({ pathname }: SiteBreadcrumbsProps) {
  const trail = breadcrumbTrailForPath(pathname);
  if (trail.length < 2) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-palms-gold/10 bg-palms-charcoal-elevated/40"
    >
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-1 px-4 py-2.5 text-xs text-palms-cream/65 md:px-6">
        {trail.map((item, index) => {
          const last = index === trail.length - 1;
          return (
            <li className="inline-flex min-w-0 items-center gap-2" key={`${item.path}-${item.name}`}>
              {index > 0 ? (
                <span aria-hidden className="text-palms-gold/40">
                  /
                </span>
              ) : null}
              {last ? (
                <span className="truncate font-medium text-palms-cream/85">{item.name}</span>
              ) : (
                <Link
                  className="truncate text-palms-gold underline-offset-4 hover:underline"
                  href={item.path}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
