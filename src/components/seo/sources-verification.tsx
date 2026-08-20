/**
 * Visible verification footer for AEO/GEO — no fabricated stats; points to real checks.
 */
import { geoCitationLinks } from "@/lib/internal-links";

export function SourcesVerification() {
  const citations = geoCitationLinks().slice(0, 5);

  return (
    <aside
      aria-labelledby="sources-heading"
      className="mt-10 rounded-xl border border-palms-cream/10 bg-palms-charcoal-elevated/60 p-5 text-sm leading-relaxed text-palms-cream/70"
    >
      <h2 className="font-display text-lg font-semibold text-palms-cream" id="sources-heading">
        How should you verify Palms Place facts on this page?
      </h2>
      <p className="mt-2">
        Building address and tower context come from public property records and team field work.
        Listing prices, HOA dues, assessments, and rental rules must be verified in the current listing
        record, resale certificate, and association documents for your unit—not from this page alone.
        Not legal or tax advice.
      </p>
      {citations.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-2">
          {citations.map((item) => (
            <li key={item.href}>
              <a
                className="font-medium text-palms-gold underline-offset-4 hover:underline"
                href={item.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </aside>
  );
}
