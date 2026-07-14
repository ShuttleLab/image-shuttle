import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "zh"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Serve `/` deterministically as English instead of auto-redirecting by
  // Accept-Language. Removes the `/` -> `/zh` 307 (a ~320ms LCP penalty),
  // keeps the root canonical/stable for crawlers, and matches the overseas
  // focus. Users still switch locales via the in-app language switcher.
  localeDetection: false,
});
