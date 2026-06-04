import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import { EditorShell } from "@/components/editor/editor-shell";

type Props = { params: Promise<{ locale: string }> };

const BASE = "https://image.shuttlelab.org";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "editor" });
  const path = "/editor";
  return {
    title: t("metaTitle"),
    description: t("metaDesc"),
    alternates: {
      canonical: locale === "en" ? `${BASE}${path}` : `${BASE}/${locale}${path}`,
      languages: { en: `${BASE}${path}`, zh: `${BASE}/zh${path}`, "x-default": `${BASE}${path}` },
    },
  };
}

export default async function EditorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "editor" });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-1">{t("title")}</h1>
      <p className="text-sm text-muted-foreground mb-1">{t("subtitle")}</p>
      <p className="text-sm text-muted-foreground mb-6">
        {t("batchHint")}{" "}
        <Link href={locale === "en" ? "/" : `/${locale}`} className="text-primary font-medium hover:underline">
          {t("batchHintLink")}
        </Link>
      </p>
      <EditorShell />
    </div>
  );
}
