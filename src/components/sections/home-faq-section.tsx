import Link from "next/link";
import { StructuredData } from "@/components/seo/structured-data";
import { SectionEyebrow } from "@/components/shared/section-heading";
import { homeFaqItems } from "@/lib/content/home-faq";
import { getHomeFaqPageJsonLd } from "@/lib/schema";

export function HomeFaqSection() {
  const faqJsonLd = getHomeFaqPageJsonLd(
    homeFaqItems.map(({ question, answer }) => ({ question, answer })),
  );

  return (
    <section
      aria-labelledby="home-faq-heading"
      className="border-t border-palms-gold/15 bg-palms-charcoal-muted/20 py-16 md:py-20"
    >
      <StructuredData data={faqJsonLd} />
      <div className="mx-auto max-w-3xl px-6">
        <SectionEyebrow>Questions</SectionEyebrow>
        <h2
          className="font-display mt-6 text-3xl font-semibold tracking-tight text-palms-cream md:text-4xl"
          id="home-faq-heading"
        >
          What do Palms Place buyers in Las Vegas ask first?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-palms-cream/80">
          Direct answers about Palms Place location, inventory, and how to tour with the local team.
          For the building overview, see{" "}
          <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/palms-place">
            Palms Place Las Vegas guide
          </Link>
          ; for tower history, amenities, and stay planning, see the{" "}
          <Link className="font-medium text-palms-gold underline-offset-4 hover:underline" href="/faq">
            full FAQ
          </Link>
          .
        </p>
        <dl className="mt-10 space-y-10">
          {homeFaqItems.map((item) => (
            <div key={item.question}>
              <dt>
                <h3 className="text-lg font-semibold text-palms-cream">{item.question}</h3>
              </dt>
              <dd className="mt-3 text-base leading-relaxed text-palms-cream/80">
                {item.answer}
                {item.related && item.related.length > 0 ? (
                  <p className="mt-3 text-sm text-palms-cream/70">
                    <span className="text-palms-cream/50">Related: </span>
                    {item.related.map((link, index) => (
                      <span key={link.href}>
                        {index > 0 ? (
                          <span aria-hidden className="text-palms-cream/40">
                            {" "}
                            ·{" "}
                          </span>
                        ) : null}
                        <Link
                          className="font-medium text-palms-gold underline-offset-4 hover:underline"
                          href={link.href}
                        >
                          {link.label}
                        </Link>
                      </span>
                    ))}
                  </p>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
