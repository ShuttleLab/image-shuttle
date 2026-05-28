import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { LayoutShell } from "@/components/layout-shell";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, l === routing.defaultLocale ? "/" : `/${l}`]),
  );

  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: {
        ...languages,
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      siteName: "Image Shuttle",
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? ["en_US"] : ["zh_CN"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("subtitle"),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LayoutShell>{children}</LayoutShell>
    </NextIntlClientProvider>
  );
}
