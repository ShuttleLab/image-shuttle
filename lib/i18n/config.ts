// i18n configuration. Mirrors the pdf-shuttle layout: a central locale list +
// per-locale metadata (native name, text direction, OG locale). `locales` is the
// LIVE set that is advertised in routing / hreflang / sitemap — a language is
// added here only once its messages + tool-content are fully translated, so we
// never ship untranslated duplicate pages.

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = "en" as const;

export interface LocaleMeta {
  name: string; // English name
  nativeName: string;
  direction: "ltr" | "rtl";
  ogLocale: string;
}

// Metadata for every planned locale (13, matching pdf-shuttle exactly). Having an
// entry here is harmless even before the locale is live in `locales`.
export const localeConfig: Record<string, LocaleMeta> = {
  en: { name: "English", nativeName: "English", direction: "ltr", ogLocale: "en_US" },
  ja: { name: "Japanese", nativeName: "日本語", direction: "ltr", ogLocale: "ja_JP" },
  ko: { name: "Korean", nativeName: "한국어", direction: "ltr", ogLocale: "ko_KR" },
  es: { name: "Spanish", nativeName: "Español", direction: "ltr", ogLocale: "es_ES" },
  fr: { name: "French", nativeName: "Français", direction: "ltr", ogLocale: "fr_FR" },
  de: { name: "German", nativeName: "Deutsch", direction: "ltr", ogLocale: "de_DE" },
  zh: { name: "Chinese (Simplified)", nativeName: "简体中文", direction: "ltr", ogLocale: "zh_CN" },
  "zh-TW": { name: "Chinese (Traditional)", nativeName: "繁體中文", direction: "ltr", ogLocale: "zh_TW" },
  pt: { name: "Portuguese", nativeName: "Português", direction: "ltr", ogLocale: "pt_BR" },
  ar: { name: "Arabic", nativeName: "العربية", direction: "rtl", ogLocale: "ar_AR" },
  it: { name: "Italian", nativeName: "Italiano", direction: "ltr", ogLocale: "it_IT" },
  id: { name: "Indonesian", nativeName: "Bahasa Indonesia", direction: "ltr", ogLocale: "id_ID" },
  vi: { name: "Vietnamese", nativeName: "Tiếng Việt", direction: "ltr", ogLocale: "vi_VN" },
};

export function getDirection(locale: string): "ltr" | "rtl" {
  return localeConfig[locale]?.direction ?? "ltr";
}

export function isRTL(locale: string): boolean {
  return getDirection(locale) === "rtl";
}

export function getOgLocale(locale: string): string {
  return localeConfig[locale]?.ogLocale ?? "en_US";
}
