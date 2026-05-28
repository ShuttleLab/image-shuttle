import { getTranslations, setRequestLocale } from "next-intl/server";
import { Shield, UserCheck, Code, Zap, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AboutFaq } from "@/components/AboutFaq";
import { aboutFaqData } from "@/components/AboutFaqData";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("heroTitle"),
    description: t("heroSubtitle"),
    alternates: {
      canonical: locale === "en" ? "/about" : `/${locale}/about`,
      languages: {
        en: "/about",
        zh: "/zh/about",
        "x-default": "/about",
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const lang = locale === "zh" ? "zh" : "en";

  const { FAQS: faqs, HOWTOS: howtos } = aboutFaqData;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q[lang],
      acceptedAnswer: { "@type": "Answer", text: item.a[lang] },
    })),
  };

  const howToSchemas = howtos.map((ht) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    name: ht.name[lang],
    step: ht.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text: s[lang],
    })),
  }));

  const safeFeatures = [
    { icon: Shield, title: t("safe"), desc: t("safeDesc") },
    { icon: UserCheck, title: t("privacy"), desc: t("privacyDesc") },
    { icon: Code, title: t("ttl"), desc: t("ttlDesc") },
    { icon: Zap, title: t("fast"), desc: t("fastDesc") },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {howToSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{t("heroTitle")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
        </section>

        {/* Service Description */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">{t("serviceTitle")}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t("serviceP1")}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t("serviceP2")}
          </p>
        </section>

        {/* Features */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {safeFeatures.map(({ icon: Icon, title, desc }) => (
              <Card key={title}>
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="rounded-lg bg-primary/10 p-3 shrink-0">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Inspired By */}
        <section className="mb-16 p-6 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">{t("inspiredBy")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("inspiredByDesc")}
          </p>
        </section>

        {/* AboutFaq */}
        <section className="mb-16">
          <AboutFaq />
        </section>

        {/* Contact */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">{t("contactTitle")}</h2>
          <p className="text-muted-foreground mb-4">{t("contactDesc")}</p>
          <a
            href={`mailto:${t("contactEmail")}`}
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <Mail className="size-4" />
            {t("contactEmail")}
          </a>
        </section>
      </div>
    </>
  );
}
