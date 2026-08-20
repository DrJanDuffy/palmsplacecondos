import { compareStripHighRisesTableCaption, compareStripHighRisesTableHeaders, compareStripHighRisesTableRows } from "@/lib/content/compare-strip-high-rises-guide";

/** Accessible HTML comparison table — Palms Place vs other Strip-area high-rises. */
export function StripHighRiseComparisonTable() {
  return (
    <section className="mt-10" aria-labelledby="compare-table-heading">
      <h2
        className="font-display text-xl font-semibold text-palms-cream"
        id="compare-table-heading"
      >
        How does Palms Place compare to other Strip-area high-rises on a tour day?
      </h2>
      <p className="mt-3 leading-relaxed text-palms-cream/85">{compareStripHighRisesTableCaption}</p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-palms-gold/20">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm text-palms-cream/85">
          <caption className="sr-only">{compareStripHighRisesTableCaption}</caption>
          <thead className="bg-palms-charcoal-elevated">
            <tr>
              {compareStripHighRisesTableHeaders.map((header) => (
                <th
                  key={header}
                  className="border-b border-palms-gold/20 px-4 py-3 font-semibold text-palms-cream"
                  scope="col"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compareStripHighRisesTableRows.map((row) => (
              <tr key={row.factor} className="odd:bg-palms-charcoal-muted/40">
                <th className="border-t border-palms-gold/10 px-4 py-3 align-top font-semibold text-palms-cream" scope="row">
                  {row.factor}
                </th>
                <td className="border-t border-palms-gold/10 px-4 py-3 align-top leading-relaxed">
                  {row.palmsPlace}
                </td>
                <td className="border-t border-palms-gold/10 px-4 py-3 align-top leading-relaxed">
                  {row.otherTowers}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
