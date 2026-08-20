import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /* When a parent directory has another lockfile, pin tracing to this app root (Vercel/local). */
  outputFileTracingRoot: path.join(__dirname),

  images: {
    formats: ["image/avif", "image/webp"],
    // Homepage hero source is 1536px. Default 2048/3840 entries make 3x phones
    // request a 1920+ LCP variant (and list empty upscales in the preload srcset).
    deviceSizes: [640, 750, 828, 1080, 1200, 1536],
    // Hero uses quality={65}; keep 75 as the next/image default.
    qualities: [65, 75],
    // Default TTL is 60s — too short for Vercel Image Optimization on a static marketing site.
    minimumCacheTTL: 60 * 60 * 24 * 31,
    remotePatterns: [
      // Cloudflare Images delivery (set NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH)
      { protocol: "https", hostname: "imagedelivery.net", pathname: "/**" },
      // Listing syndication / virtual tour hosts (featured unit photos)
      { protocol: "https", hostname: "static.propertypanorama.com", pathname: "/photos/**" },
      { protocol: "https", hostname: "www.propertypanorama.com", pathname: "/photos/**" },
      { protocol: "https", hostname: "d1buiexcd5gara.cloudfront.net", pathname: "/property_photos/**" },
    ],
  },

  /**
   * RealScout CSP (when you add Content-Security-Policy): include in `script-src` and
   * `connect-src` both `https://em.realscout.com` and `https://www.realscout.com` — see
   * AGENTS.md and `.cursor/rules/next-config-headers.mdc`. Do not duplicate CSP in middleware
   * without aligning directives.
   *
   * This project does not set CSP by default so Next.js/Vercel defaults do not break embeds.
   * Security headers: see vercel.json.
   */
};

export default nextConfig;
