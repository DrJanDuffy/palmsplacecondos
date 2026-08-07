import Image from "next/image";
import { cn } from "@/lib/utils";

type LuxuryImageProps = {
  /** Short description for assistive tech (e.g. “High-rise skyline at dusk”). */
  alt: string;
  className?: string;
  /** Visual variant for different sections. */
  variant?: "hero" | "stay" | "unwind";
  /** Explicit image path override (defaults to the variant image). */
  src?: string;
};

/**
 * Homepage section imagery — real Palms Place building photos (tower, interiors,
 * amenities). Distinct from unit listing photography under `/photos` / media-gallery.
 */
const variantSrc: Record<NonNullable<LuxuryImageProps["variant"]>, string> = {
  hero: "/images/hero-tower-dusk.webp",
  stay: "/images/stay-studio-interior.webp",
  unwind: "/images/unwind-pool-amenities.webp",
};

export function LuxuryPlaceholder({ alt, className, variant = "hero", src }: LuxuryImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-palms-charcoal-muted", className)}>
      <Image
        alt={alt}
        className="object-cover"
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        src={src ?? variantSrc[variant]}
      />
    </div>
  );
}
