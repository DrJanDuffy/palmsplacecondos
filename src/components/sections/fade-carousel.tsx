"use client";

import {
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type FadeCarouselSlide = {
  id: string;
  content: React.ReactNode;
};

export type FadeCarouselProps = {
  slides: FadeCarouselSlide[];
  /** Autoplay interval in ms (disabled when reduced motion is on). */
  autoplayMs?: number;
  className?: string;
  /** Visually hidden label for screen readers. */
  label: string;
};

export function FadeCarousel({
  slides,
  autoplayMs = 7500,
  className,
  label,
}: FadeCarouselProps) {
  const baseId = useId();
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const count = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const fn = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (reduceMotion || count <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [reduceMotion, count, autoplayMs]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        goTo(count - 1);
      }
    },
    [go, goTo, count],
  );

  if (count === 0) return null;

  return (
    <div
      aria-label={label}
      aria-roledescription="carousel"
      aria-live={reduceMotion ? "off" : "polite"}
      className={cn("relative outline-none", className)}
      onKeyDown={onKeyDown}
      role="region"
      tabIndex={0}
    >
      <div className="relative min-h-[220px] overflow-hidden rounded-xl md:min-h-[280px]">
        {/* Inactive slides stay mounted for the fade. `inert` + `invisible`
            take them out of the accessibility tree and tab order. `aria-hidden`
            alone still leaves links focusable and fails axe/Lighthouse. */}
        {slides.map((slide, i) => {
          const isActive = i === index;
          return (
            <div
              aria-roledescription="slide"
              className={cn(
                "transition-opacity duration-700 ease-out motion-reduce:transition-none",
                isActive
                  ? "relative z-10 opacity-100"
                  : "pointer-events-none invisible absolute inset-0 z-0 opacity-0",
              )}
              id={`${baseId}-slide-${slide.id}`}
              inert={isActive ? undefined : true}
              key={slide.id}
              role="group"
            >
              {slide.content}
            </div>
          );
        })}
      </div>

      {count > 1 ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              aria-label="Previous slide"
              className="rounded-md border border-palms-gold/35 px-3 py-2 text-sm text-palms-cream hover:border-palms-gold hover:bg-palms-gold/10"
              onClick={() => go(-1)}
              type="button"
            >
              Prev
            </button>
            <button
              aria-label="Next slide"
              className="rounded-md border border-palms-gold/35 px-3 py-2 text-sm text-palms-cream hover:border-palms-gold hover:bg-palms-gold/10"
              onClick={() => go(1)}
              type="button"
            >
              Next
            </button>
          </div>

          <div
            aria-label="Slide indicators"
            className="flex flex-wrap gap-2"
            role="group"
          >
            {slides.map((slide, i) => (
              <button
                aria-controls={`${baseId}-slide-${slide.id}`}
                aria-label={`Go to slide ${i + 1}`}
                aria-pressed={i === index}
                className="group inline-flex min-h-11 min-w-11 items-center justify-center rounded-md"
                key={slide.id}
                onClick={() => goTo(i)}
                type="button"
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    i === index
                      ? "bg-palms-gold"
                      : "bg-palms-cream/25 group-hover:bg-palms-cream/45",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
