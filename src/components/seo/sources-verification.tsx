import { palmsPlaceTower } from "@/lib/content/palms-place-building";
import { siteContact } from "@/lib/site-contact";

const NEVADA_LICENSE_LOOKUP = "https://red.prod.secure.nv.gov/Lookup/LicenseLookup.aspx";

/**
 * Visible verification footer for AEO/GEO — no fabricated stats; points to real checks.
 */
export function SourcesVerification() {
  return (
    <aside
      aria-labelledby="sources-heading"
      className="mt-10 rounded-xl border border-palms-cream/10 bg-palms-charcoal-elevated/60 p-5 text-sm leading-relaxed text-palms-cream/70"
    >
      <h2 className="font-display text-lg font-semibold text-palms-cream" id="sources-heading">
        How should you verify Palms Place facts on this page?
      </h2>
      <p className="mt-2">
        This site is Palms Place <strong className="text-palms-cream">condos for sale and resale</strong> with{" "}
        {siteContact.agentName}—not the Palms Place hotel booking page. Tower address and year opened
        match public records and the Wikipedia entity for Palms Place. Listing prices, HOA dues,
        assessments, and rental rules must be verified in the current listing record and resale
        certificate for your unit. Not legal or tax advice.
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        <li>
          Official resort (stays):{" "}
          <a
            className="text-palms-gold underline-offset-4 hover:underline"
            href={palmsPlaceTower.officialResortUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            palms.com/palms-place
          </a>
        </li>
        <li>
          Building entity:{" "}
          <a
            className="text-palms-gold underline-offset-4 hover:underline"
            href={palmsPlaceTower.wikipediaUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Palms Place on Wikipedia
          </a>
        </li>
        <li>
          Nevada license {siteContact.license}:{" "}
          <a
            className="text-palms-gold underline-offset-4 hover:underline"
            href={NEVADA_LICENSE_LOOKUP}
            rel="noopener noreferrer"
            target="_blank"
          >
            Nevada Real Estate Division lookup
          </a>
        </li>
      </ul>
    </aside>
  );
}
