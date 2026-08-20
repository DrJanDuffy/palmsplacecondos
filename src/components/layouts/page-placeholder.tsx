import { RelatedPages } from "@/components/seo/related-pages";
import { relatedLinksForPath } from "@/lib/internal-links";

type PagePlaceholderProps = {
  title: string;
  description?: string;
  /** Current route path for contextual internal links (e.g. `/homes`). */
  path: string;
};

export function PagePlaceholder({ title, description, path }: PagePlaceholderProps) {
  const related = relatedLinksForPath(path);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">{description}</p>
      ) : null}
      <p className="mt-6 text-sm text-palms-cream/65">
        Page content is coming soon. Explore related topics below or use the site navigation.
      </p>
      <RelatedPages pathname={path} links={related} />
    </div>
  );
}
