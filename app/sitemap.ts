import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/lib/i18n/config";

export const dynamic = "force-static";

const baseUrl = "https://image.shuttlelab.org";

// URL for a path in a given locale (en stays at the root, others are prefixed).
function localizedUrl(locale: string, path: string): string {
  return locale === defaultLocale
    ? `${baseUrl}${path}`
    : `${baseUrl}/${locale}${path}`;
}

// Full hreflang alternates for a path across every live locale + x-default.
function alternatesFor(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = localizedUrl(locale, path);
  }
  languages["x-default"] = `${baseUrl}${path}`;
  return { languages };
}

const PATHS: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/editor", priority: 0.9, changeFrequency: "monthly" },
  { path: "/collage", priority: 0.9, changeFrequency: "monthly" },
  { path: "/design", priority: 0.9, changeFrequency: "monthly" },
  { path: "/svg-to-png", priority: 0.9, changeFrequency: "monthly" },
  { path: "/tools", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/tools/compress-jpg", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tools/compress-png", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tools/convert-to-webp", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tools/convert-to-avif", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tools/resize-image", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tools/batch-compress", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of PATHS) {
    for (const locale of locales) {
      entries.push({
        url: localizedUrl(locale, path),
        lastModified,
        changeFrequency,
        priority,
        alternates: alternatesFor(path),
      });
    }
  }

  return entries;
}
