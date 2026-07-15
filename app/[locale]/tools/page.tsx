import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { canonicalUrl, hreflangAlternates, localizedPath, SITE_URL } from "@/lib/seo";
import { getToolContent, TOOL_SLUGS } from "@/lib/tool-content";

const PATH = "/tools";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "toolsIndex" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: hreflangAlternates(PATH),
    },
  };
}

export default async function ToolsIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "toolsIndex" });

  const cards = [
    {
      href: localizedPath(locale, "/svg-to-png"),
      title: t("svgTitle"),
      desc: t("svgDesc"),
    },
    ...TOOL_SLUGS.map((slug) => {
      const c = getToolContent(locale, slug);
      return { href: localizedPath(locale, `/tools/${slug}`), title: c.h1, desc: c.lead };
    }),
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("title"),
    itemListElement: cards.map((card, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: card.title,
      url: `${SITE_URL}${card.href}`,
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}${localizedPath(locale, "")}/` },
      { "@type": "ListItem", position: 2, name: t("title"), item: `${SITE_URL}${localizedPath(locale, PATH)}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t("intro")}</p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40 hover:bg-accent/40"
            >
              <h2 className="flex items-center gap-1 font-semibold text-foreground">
                {card.title}
                <ArrowRight className="size-4 shrink-0 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
