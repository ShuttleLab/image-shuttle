import type { ToolContent, ToolContentMap, ToolSlug } from "./types";
import { en } from "./en";
import { zh } from "./zh";
import { ja } from "./ja";
import { ko } from "./ko";
import { content as es } from "./es";
import { content as fr } from "./fr";
import { content as de } from "./de";
import { content as zhTW } from "./zh-TW";
import { content as pt } from "./pt";
import { content as ar } from "./ar";
import { content as it } from "./it";
import { content as id } from "./id";
import { content as vi } from "./vi";

// Add a locale here once lib/tool-content/<locale>.ts is translated.
const MAPS: Record<string, ToolContentMap> = {
  en,
  zh,
  ja,
  ko,
  es,
  fr,
  de,
  "zh-TW": zhTW,
  pt,
  ar,
  it,
  id,
  vi,
};

/** Localized content for a tool, falling back to English when missing. */
export function getToolContent(locale: string, slug: ToolSlug): ToolContent {
  const map = MAPS[locale] ?? en;
  return map[slug] ?? en[slug];
}

export type { ToolContent, ToolContentMap, ToolSlug };
export { TOOL_SLUGS } from "./types";
