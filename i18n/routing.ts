import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale } from "@/lib/i18n/config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  // Serve `/` deterministically as English instead of auto-redirecting by
  // Accept-Language. Removes the `/` -> `/<locale>` 307 (an LCP penalty), keeps
  // the root canonical/stable for crawlers, and matches the overseas focus.
  // Users switch locales via the in-app language switcher.
  localeDetection: false,
});
