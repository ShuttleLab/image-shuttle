import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { ToolContent, ToolSlug } from "@/lib/tool-content";

const BASE = "https://image.shuttlelab.org";

// Shared renderer for the localized (non-English) /tools/* landing pages. English
// keeps its own richer long-form article per route; every other locale renders
// this from the structured tool-content map so each language gets a real,
// indexable page with localized H1 / lead / how-to / FAQ + structured data.
export async function ToolLanding({
  locale,
  slug,
  content,
}: {
  locale: string;
  slug: ToolSlug;
  content: ToolContent;
}) {
  const t = await getTranslations({ locale, namespace: "toolLanding" });
  const path = `/tools/${slug}`;
  const url = `${BASE}/${locale}${path}`;

  const techArticle = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: content.h1,
    description: content.metaDescription,
    inLanguage: locale,
    author: { "@type": "Organization", name: "ShuttleLab" },
    publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
    url,
  };
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: content.h1,
    inLanguage: locale,
    step: content.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
    })),
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />

      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-4 text-4xl font-bold">{content.h1}</h1>
        <p className="mb-8 text-lg text-muted-foreground">{content.lead}</p>

        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("cta")}
          </Link>
        </div>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">{t("howTo")}</h2>
          <ol className="space-y-4">
            {content.steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">{t("faq")}</h2>
          <div className="space-y-6">
            {content.faqs.map((f, i) => (
              <div key={i}>
                <h3 className="mb-1 font-semibold">{f.q}</h3>
                <p className="text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
