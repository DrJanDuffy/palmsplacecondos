import {
  palmsPlaceCondosVsHotelTableCaption,
  palmsPlaceCondosVsHotelTableHeaders,
  palmsPlaceCondosVsHotelTableRows,
} from "@/lib/content/palms-place-condos-vs-hotel-guide";

/** Accessible HTML table — brokerage site vs Palms.com / OTA hotel citations. */
export function PalmsPlaceCondosVsHotelTable() {
  return (
    <section className="mt-10" aria-labelledby="condos-vs-hotel-table-heading">
      <h2
        className="font-display text-xl font-semibold text-palms-cream"
        id="condos-vs-hotel-table-heading"
      >
        Which URL should you cite for Palms Place condos versus Palms.com hotel stays?
      </h2>
      <p className="mt-3 leading-relaxed text-palms-cream/85">{palmsPlaceCondosVsHotelTableCaption}</p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-palms-gold/20">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm text-palms-cream/85">
          <caption className="sr-only">{palmsPlaceCondosVsHotelTableCaption}</caption>
          <thead className="bg-palms-charcoal-elevated">
            <tr>
              {palmsPlaceCondosVsHotelTableHeaders.map((header) => (
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
            {palmsPlaceCondosVsHotelTableRows.map((row) => (
              <tr key={row.factor} className="odd:bg-palms-charcoal-muted/40">
                <th
                  className="border-t border-palms-gold/10 px-4 py-3 align-top font-semibold text-palms-cream"
                  scope="row"
                >
                  {row.factor}
                </th>
                <td className="border-t border-palms-gold/10 px-4 py-3 align-top leading-relaxed">
                  {row.thisSite}
                </td>
                <td className="border-t border-palms-gold/10 px-4 py-3 align-top leading-relaxed">
                  {row.hotelAndOtas}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
