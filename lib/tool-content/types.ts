// Structured, localizable content for the /tools/* SEO landing pages. English
// keeps its long-form articles inline in each page; every other locale renders
// this structured content via <ToolLanding>, so each language gets a genuinely
// localized page (localized title/meta/H1/lead/how-to/FAQ) instead of a wall of
// English — which would otherwise trip GSC's "duplicate / alternate page".

export interface ToolStep {
  title: string;
  desc: string;
}

export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolContent {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  steps: ToolStep[];
  faqs: ToolFaq[];
}

export const TOOL_SLUGS = [
  "compress-jpg",
  "compress-png",
  "convert-to-webp",
  "convert-to-avif",
  "resize-image",
  "batch-compress",
] as const;

export type ToolSlug = (typeof TOOL_SLUGS)[number];
export type ToolContentMap = Record<ToolSlug, ToolContent>;
