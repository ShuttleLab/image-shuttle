import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { CollageShell } from "@/components/editor/editor-shell";

type Props = { params: Promise<{ locale: string }> };

const BASE = "https://image.shuttlelab.org";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collage" });
  const path = "/collage";
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: {
      canonical: locale === "en" ? `${BASE}${path}` : `${BASE}/${locale}${path}`,
      languages: { en: `${BASE}${path}`, zh: `${BASE}/zh${path}`, "x-default": `${BASE}${path}` },
    },
  };
}

export default async function CollagePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "collage" });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-1">{t("title")}</h1>
      <p className="text-sm text-muted-foreground mb-6">{t("subtitle")}</p>
      <CollageShell />
    </div>
  );
}
