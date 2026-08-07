import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layouts/site-footer";
import { SiteHeader } from "@/components/layouts/site-header";
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
});

const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
  display: "swap",
});

const siteUrl = getSiteUrl();
const googleSiteVerification = getGoogleSiteVerification();

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
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
};

function getGoogleSiteVerification(): string | undefined {
  const v =
    process.env.GOOGLE_SITE_VERIFICATION?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  return v || undefined;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${displaySerif.variable} min-h-screen bg-palms-charcoal text-palms-cream antialiased`}
      >
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
          </main>
          <RealScoutOfficeListingsEmbed />
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
