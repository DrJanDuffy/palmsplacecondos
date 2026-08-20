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
        Building address and tower context come from public property records and team field work.
        Listing prices, HOA dues, assessments, and rental rules must be verified in the current listing
        record, resale certificate, and association documents for your unit—not from this page alone.
        Not legal or tax advice.
      </p>
    </aside>
  );
}
