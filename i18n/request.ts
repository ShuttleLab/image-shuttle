import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { mergeWithFallback } from "@/lib/i18n/fallback";

// Memoize per-locale merged messages for the lifetime of the isolate. next-intl
// calls this on every request; without the cache each non-default-locale request
// re-ran a full deep-merge of the ~390-key message tree, adding avoidable CPU to
// every SSR render — a real cost against Cloudflare's free-tier Worker CPU budget.
// Messages are immutable static data, so caching across requests is safe.
const messagesCache = new Map<string, Record<string, unknown>>();

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const cached = messagesCache.get(locale);
  if (cached) return { locale, messages: cached };

  const english = (await import(`../messages/en.json`)).default;
  const messages =
    locale === routing.defaultLocale
      ? english
      : mergeWithFallback(
          (await import(`../messages/${locale}.json`)).default,
          english,
        );

  messagesCache.set(locale, messages);
  return { locale, messages };
});
