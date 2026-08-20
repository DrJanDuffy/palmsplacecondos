"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const REALSCOUT_SCRIPT_SRC =
  "https://em.realscout.com/widgets/realscout-web-components.umd.js";

type RealScoutOfficeListingsMountProps = {
  /** Sanitized custom-element HTML for the office listings widget. */
  markup: string;
};

/**
 * Defers RealScout script + custom element until near the viewport so LCP/TBT
 * are not competed by ~200KB of third-party JS and listing photo fetches.
 */
export function RealScoutOfficeListingsMount({ markup }: RealScoutOfficeListingsMountProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || shouldLoad) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px", threshold: 0.01 },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div className="min-h-[480px] w-full" ref={hostRef}>
      {shouldLoad ? (
        <>
          <Script src={REALSCOUT_SCRIPT_SRC} strategy="lazyOnload" />
          <div dangerouslySetInnerHTML={{ __html: markup }} />
        </>
      ) : (
        <p className="sr-only">Listings load when this section is near the viewport.</p>
      )}
    </div>
  );
}
