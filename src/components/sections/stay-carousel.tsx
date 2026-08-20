"use client";

import dynamic from "next/dynamic";
import type { FadeCarouselProps } from "@/components/sections/fade-carousel";

const FadeCarouselDynamic = dynamic(
  () =>
    import("@/components/sections/fade-carousel").then((mod) => ({
      default: mod.FadeCarousel,
    })),
  {
    loading: () => (
      <div
        aria-hidden
        className="min-h-[520px] rounded-2xl bg-palms-charcoal-muted/40 md:min-h-[280px]"
      />
    ),
  },
);

/** Code-split carousel JS. SSR the first slide so the homepage does not CLS on hydrate. */
export function StayCarousel(props: FadeCarouselProps) {
  return <FadeCarouselDynamic {...props} />;
}
