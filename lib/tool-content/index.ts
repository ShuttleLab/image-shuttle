import type { ToolContent, ToolContentMap, ToolSlug } from "./types";
import { en } from "./en";
import { zh } from "./zh";

// Add a locale here once lib/tool-content/<locale>.ts is translated.
const MAPS: Record<string, ToolContentMap> = {
  en,
  zh,
};

/** Localized content for a tool, falling back to English when missing. */
export function getToolContent(locale: string, slug: ToolSlug): ToolContent {
  const map = MAPS[locale] ?? en;
  return map[slug] ?? en[slug];
}

export type { ToolContent, ToolContentMap, ToolSlug };
export { TOOL_SLUGS } from "./types";
