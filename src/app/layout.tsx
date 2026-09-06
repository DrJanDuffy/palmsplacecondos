import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
import { PalmsPlaceListingAuthorityFromRequest } from "@/components/seo/palms-place-listing-authority-from-request";
import { RealScoutOfficeListingsEmbed } from "@/components/seo/realscout-office-listings-embed";
import { StructuredData } from "@/components/seo/structured-data";
import { formatTeamPhrase, siteContact } from "@/lib/site-contact";
import { getBaseJsonLd } from "@/lib/schema";
import { getDefaultOgImages, getDefaultTwitterImages } from "@/lib/social-images";
import { getSiteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  // LCP on `/` is the hero image — do not preload the body font on the critical path.
  preload: false,
});

const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  // Headings/header use semibold/bold only (no font-display at weight 400).
  weight: ["600", "700"],
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});

const siteUrl = getSiteUrl();

/** Shared fallback only — page routes should set their own title/description/OG via buildPageMetadata. */
const rootDescription = [
  siteContact.schemaAgentDescription,
  `Service area: ${siteContact.primaryServiceArea}.`,
  siteContact.phone ? `Call ${siteContact.phone}.` : null,
  formatTeamPhrase(),
  siteContact.brokerage,
]
  .filter(Boolean)
  .join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Pages set full titles via buildPageMetadata — no brand template suffix (avoids double “Palms Place”).
  title: "Palms Place Condos for Sale | Las Vegas Strip High-Rise | Dr. Jan Duffy",
  description: rootDescription,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteContact.gbpBusinessName,
    images: getDefaultOgImages(),
  },
  twitter: {
    card: "summary_large_image",
    images: getDefaultTwitterImages(),
  },
  ...siteVerificationMetadata(),
};

function getGoogleSiteVerification(): string | undefined {
  const v =
    process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  return v || undefined;
}

function getBingSiteVerification(): string | undefined {
  const v =
    process.env.BING_SITE_VERIFICATION?.trim() ||
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();
  return v || undefined;
}

function siteVerificationMetadata(): Pick<Metadata, "verification"> {
  const google = getGoogleSiteVerification();
  const bing = getBingSiteVerification();
  if (!google && !bing) return {};
  return {
    verification: {
      ...(google ? { google } : {}),
      ...(bing ? { other: { "msvalidate.01": bing } } : {}),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${geistSans.variable} ${displaySerif.variable}`} lang="en">
      <body className="min-h-screen bg-palms-charcoal text-palms-cream antialiased">
        <StructuredData data={getBaseJsonLd()} />
        <div className="flex min-h-screen flex-col">
          <a
            className="sr-only rounded-md bg-palms-gold px-4 py-2 text-sm font-medium text-palms-charcoal focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:outline-none focus:ring-2 focus:ring-palms-cream"
            href="#site-footer-nav"
          >
            Skip to site navigation
          </a>
          <SiteHeader />
          <main className="flex-1" id="main-content">
            {children}
            <PalmsPlaceListingAuthorityFromRequest />
          </main>
          <RealScoutOfficeListingsEmbed />
          <SiteFooter />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
