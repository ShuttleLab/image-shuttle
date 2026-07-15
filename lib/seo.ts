import { locales, defaultLocale } from "@/lib/i18n/config";

export const SITE_URL = "https://image.shuttlelab.org";

/** Path for a locale (English at the root, others prefixed). */
export function localizedPath(locale: string, path: string): string {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export function canonicalUrl(locale: string, path: string): string {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

/** hreflang map across every live locale, plus x-default → English root. */
export function hreflangAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${SITE_URL}${localizedPath(locale, path)}`;
  }
  languages["x-default"] = `${SITE_URL}${path}`;
  return languages;
}
