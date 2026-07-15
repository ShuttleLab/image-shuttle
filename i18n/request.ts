import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { mergeWithFallback } from "@/lib/i18n/fallback";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const english = (await import(`../messages/en.json`)).default;

  if (locale === routing.defaultLocale) {
    return { locale, messages: english };
  }

  // Merge the locale's messages over English so any missing key falls back to
  // English instead of rendering a raw key.
  const localeMessages = (await import(`../messages/${locale}.json`)).default;
  return {
    locale,
    messages: mergeWithFallback(localeMessages, english),
  };
});
