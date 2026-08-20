import Link from "next/link";
import { PageFaqSection } from "@/components/marketing/page-faq-section";
import { RelatedPages } from "@/components/seo/related-pages";
import { StructuredData } from "@/components/seo/structured-data";
import { buyerCalculatorsPageFaq } from "@/lib/content/discoverability-page-faqs";
import { relatedLinksForPath } from "@/lib/internal-links";
import { getRealScoutSharedSearchUrl } from "@/lib/realscout";
import { getBreadcrumbListJsonLd, getWebPageJsonLdForPath } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";
import { AgentHeroBadge } from "@/components/shared/agent-hero-badge";

const pageMeta = {
  name: "Palms Place buyer calculators — payment & HOA planning",
  description:
    "Plan PITI, HOA, and closing costs before you tour Palms Place or Strip high-rises—questions for your lender plus live listing search with the local team.",
};

/** Expanded /buyers/calculators — planning copy; no fabricated rate quotes. */
export function BuyerCalculatorsPageBody() {
  const related = relatedLinksForPath("/buyers/calculators");
  const searchUrl = getRealScoutSharedSearchUrl();
  const phone = siteContact.phone;
  const tel = phone ? `tel:${phone.replace(/\D/g, "")}` : undefined;
  const webPageJsonLd = getWebPageJsonLdForPath("/buyers/calculators", pageMeta, {
    aboutPalmsPlace: true,
    hasFaq: true,
  });
  const breadcrumbJsonLd = getBreadcrumbListJsonLd("/buyers/calculators", [
    { name: "Home", path: "/" },
    { name: "Buyers", path: "/buyers" },
    { name: "Calculators", path: "/buyers/calculators" },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <StructuredData data={webPageJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />
      <h1 className="font-display text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl">
        Palms Place buyer calculators &amp; payment planning in Las Vegas
      </h1>
      <AgentHeroBadge className="mt-6" />
      <p className="mt-4 text-lg leading-relaxed text-palms-cream/85">
        Use this page to frame questions for your lender—{siteContact.buyerSpecialistName} and the team
        at {siteContact.brokerage} focus on property fit and negotiation, not loan underwriting. This is
        not legal or tax advice; consult licensed professionals for your situation.
      </p>

      <section className="mt-12" aria-labelledby="calculators-model-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="calculators-model-heading"
        >
          What should Palms Place buyers model before they offer?
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-palms-cream/85">
          <li>
            <strong className="font-medium text-palms-cream/95">PITI &amp; HOA</strong> — mortgage
            principal and interest, taxes, insurance, and HOA dues (especially in the 47-story tower).
          </li>
          <li>
            <strong className="font-medium text-palms-cream/95">Closing costs</strong> — title,
            recording, and lender fees vary; your lender provides a Loan Estimate.
          </li>
          <li>
            <strong className="font-medium text-palms-cream/95">Rate locks</strong> — quotes change with
            markets; verify numbers with a licensed mortgage professional before you waive contingencies.
          </li>
          <li>
            <strong className="font-medium text-palms-cream/95">Furnished carry</strong> — furnished
            resales may include different fee structures; read HOA resale certificates with your agent.
          </li>
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="calculators-high-rise-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="calculators-high-rise-heading"
        >
          How is high-rise affordability different from single-family?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Two homes at similar list prices can have very different monthly payments once HOA, parking, and
          assessments are included. Compare{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/guide/palms-place-unit-types">
            Palms Place studios vs one-bedroom layouts
          </Link>{" "}
          and read{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/insights/why-we-request-hoa-packets-early">
            why we request HOA packets early
          </Link>{" "}
          before you assume a payment fits your budget.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="calculators-search-heading">
        <h2
          className="font-display text-2xl font-semibold text-palms-cream"
          id="calculators-search-heading"
        >
          Where do I search after I know my payment range?
        </h2>
        <p className="mt-4 leading-relaxed text-palms-cream/85">
          Browse{" "}
          <a
            className="text-palms-gold underline-offset-4 hover:underline"
            href={searchUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            live listings on RealScout
          </a>
          , then return to the{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/buyers">
            buyer guide
          </Link>{" "}
          for tours. Shopping under $500K? See{" "}
          <Link className="text-palms-gold underline-offset-4 hover:underline" href="/under-500k">
            homes &amp; condos under $500K
          </Link>
          .
        </p>
        {phone && tel ? (
          <p className="mt-4 text-palms-cream/85">
            Questions? Call{" "}
            <a className="font-medium text-palms-gold underline-offset-4 hover:underline" href={tel}>
              {phone}
            </a>{" "}
            or{" "}
            <Link className="text-palms-gold underline-offset-4 hover:underline" href="/contact">
              contact the office
            </Link>
            .
          </p>
        ) : (
          <p className="mt-4 text-palms-cream/85">
            <Link className="text-palms-gold underline-offset-4 hover:underline" href="/contact">
              Contact the office
            </Link>{" "}
            for lender introductions, or schedule a tour via Calendly links on the buyer pages.
          </p>
        )}
      </section>

      <PageFaqSection
        pathname="/buyers/calculators"
        headingId="calculators-faq-heading"
        heading="How should Palms Place buyers plan payments and HOA?"
        intro="Payment planning for Palms Place and Las Vegas high-rise purchases—without live rate quotes on this site."
        items={buyerCalculatorsPageFaq}
      />

      <RelatedPages links={related} />
    </article>
  );
}
