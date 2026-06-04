import { makeShape, makeSticker, makeText, type Overlay } from "@/components/editor/overlay-types";

// Canvas size presets. FotoJet paywalls custom sizes — ours are free.
export const CANVAS_PRESETS = [
  { id: "og", w: 1200, h: 630 },
  { id: "ytThumb", w: 1280, h: 720 },
  { id: "fbCover", w: 1640, h: 859 },
  { id: "igPost", w: 1080, h: 1080 },
  { id: "igStory", w: 1080, h: 1920 },
  { id: "twitterHeader", w: 1500, h: 500 },
  { id: "logo", w: 512, h: 512 },
  { id: "a4Poster", w: 1240, h: 1754 },
] as const;

export interface DesignBackground {
  type: "solid" | "gradient";
  color1: string;
  color2: string;
  angle: number; // degrees, for gradient
}

export interface DesignDoc {
  width: number;
  height: number;
  bg: DesignBackground;
  overlays: Overlay[];
}

export interface DesignTemplate {
  id: string;
  /** Recommended canvas preset; templates scale to any size. */
  size: { w: number; h: number };
  build: (w: number, h: number) => { bg: DesignBackground; overlays: Overlay[] };
}

const solid = (c: string): DesignBackground => ({ type: "solid", color1: c, color2: c, angle: 0 });
const grad = (a: string, b: string, angle = 135): DesignBackground => ({ type: "gradient", color1: a, color2: b, angle });

export const DESIGN_TEMPLATES: DesignTemplate[] = [
  {
    id: "blank",
    size: { w: 1200, h: 630 },
    build: () => ({ bg: solid("#ffffff"), overlays: [] }),
  },
  {
    id: "ogCard",
    size: { w: 1200, h: 630 },
    build: (w, h) => ({
      bg: grad("#7c3aed", "#4c1d95"),
      overlays: [
        makeShape("rect", "#ffffff22") && { ...makeShape("rect", "#ffffff22"), x: w * 0.05, y: h * 0.12, width: w * 0.12, height: 10, cornerRadius: 5 },
        makeText({ text: "Product Name", x: w * 0.05, y: h * 0.3, width: w * 0.9, fontSize: Math.round(h * 0.16), fill: "#ffffff", align: "left", shadow: false }),
        makeText({ text: "One line that sells the value", x: w * 0.05, y: h * 0.55, width: w * 0.9, fontSize: Math.round(h * 0.06), fill: "#ddd6fe", align: "left", fontStyle: "normal", shadow: false }),
      ],
    }),
  },
  {
    id: "ytThumb",
    size: { w: 1280, h: 720 },
    build: (w, h) => ({
      bg: grad("#0f172a", "#1e293b", 160),
      overlays: [
        { ...makeShape("rect", "#facc15"), x: 0, y: h * 0.62, width: w * 0.55, height: h * 0.16, cornerRadius: 0 },
        makeText({ text: "BIG CLAIM", x: w * 0.03, y: h * 0.18, width: w * 0.94, fontSize: Math.round(h * 0.24), fill: "#ffffff", stroke: "#0a0a0a", strokeWidth: 6, align: "left" }),
        makeText({ text: "watch till the end", x: w * 0.02, y: h * 0.645, width: w * 0.5, fontSize: Math.round(h * 0.085), fill: "#0a0a0a", align: "center", shadow: false }),
        { ...makeSticker("🔥"), x: w * 0.82, y: h * 0.55, fontSize: Math.round(h * 0.3) },
      ],
    }),
  },
  {
    id: "igQuote",
    size: { w: 1080, h: 1080 },
    build: (w, h) => ({
      bg: grad("#fdf2f8", "#fce7f3", 180),
      overlays: [
        makeText({ text: "“", x: w * 0.42, y: h * 0.1, fontSize: Math.round(h * 0.2), fill: "#ec4899", fontId: "serif", shadow: false }),
        makeText({ text: "Stay hungry,\nstay foolish.", x: w * 0.1, y: h * 0.32, width: w * 0.8, fontSize: Math.round(h * 0.085), fill: "#500724", fontId: "serif", align: "center", shadow: false }),
        makeText({ text: "— Steve Jobs", x: w * 0.1, y: h * 0.66, width: w * 0.8, fontSize: Math.round(h * 0.035), fill: "#9d174d", align: "center", fontStyle: "normal", shadow: false }),
      ],
    }),
  },
  {
    id: "salePoster",
    size: { w: 1080, h: 1080 },
    build: (w, h) => ({
      bg: solid("#dc2626"),
      overlays: [
        makeText({ text: "SALE", x: w * 0.05, y: h * 0.2, width: w * 0.9, fontSize: Math.round(h * 0.28), fill: "#ffffff", align: "center" }),
        makeText({ text: "UP TO 50% OFF", x: w * 0.1, y: h * 0.55, width: w * 0.8, fontSize: Math.round(h * 0.07), fill: "#fde68a", align: "center", shadow: false }),
        { ...makeShape("rect", "transparent"), x: w * 0.08, y: h * 0.08, width: w * 0.84, height: h * 0.84, stroke: "#ffffff", strokeWidth: 8, cornerRadius: 24 },
      ],
    }),
  },
  {
    id: "logoMono",
    size: { w: 512, h: 512 },
    build: (w, h) => ({
      bg: solid("#ffffff"),
      overlays: [
        { ...makeShape("circle", "#7c3aed"), x: w / 2, y: h / 2, width: w * 0.72, height: h * 0.72 },
        makeText({ text: "S", x: w * 0.18, y: h * 0.24, width: w * 0.64, fontSize: Math.round(h * 0.46), fill: "#ffffff", align: "center", shadow: false }),
      ],
    }),
  },
  {
    id: "fbBanner",
    size: { w: 1640, h: 859 },
    build: (w, h) => ({
      bg: grad("#0ea5e9", "#7c3aed", 120),
      overlays: [
        makeText({ text: "Your Brand Here", x: w * 0.06, y: h * 0.34, width: w * 0.7, fontSize: Math.round(h * 0.13), fill: "#ffffff", align: "left" }),
        makeText({ text: "Tagline that explains what you do", x: w * 0.06, y: h * 0.55, width: w * 0.6, fontSize: Math.round(h * 0.05), fill: "#e0f2fe", align: "left", fontStyle: "normal", shadow: false }),
      ],
    }),
  },
  {
    id: "story",
    size: { w: 1080, h: 1920 },
    build: (w, h) => ({
      bg: grad("#111827", "#7c3aed", 200),
      overlays: [
        makeText({ text: "NEW DROP", x: w * 0.1, y: h * 0.18, width: w * 0.8, fontSize: Math.round(h * 0.06), fill: "#ffffff", align: "center" }),
        { ...makeSticker("✨"), x: w * 0.42, y: h * 0.32, fontSize: Math.round(h * 0.08) },
        makeText({ text: "Swipe up to explore", x: w * 0.15, y: h * 0.78, width: w * 0.7, fontSize: Math.round(h * 0.028), fill: "#c4b5fd", align: "center", fontStyle: "normal", shadow: false }),
      ],
    }),
  },
  {
    id: "birthday",
    size: { w: 1080, h: 1080 },
    build: (w, h) => ({
      bg: grad("#fef9c3", "#fbcfe8", 150),
      overlays: [
        { ...makeSticker("🎂"), x: w * 0.4, y: h * 0.16, fontSize: Math.round(h * 0.2) },
        makeText({ text: "Happy Birthday!", x: w * 0.08, y: h * 0.48, width: w * 0.84, fontSize: Math.round(h * 0.1), fill: "#be185d", fontId: "rounded", align: "center", shadow: false }),
        { ...makeSticker("🎉"), x: w * 0.14, y: h * 0.68, fontSize: Math.round(h * 0.1) },
        { ...makeSticker("🎈"), x: w * 0.74, y: h * 0.66, fontSize: Math.round(h * 0.1) },
      ],
    }),
  },
  {
    id: "minimal",
    size: { w: 1200, h: 630 },
    build: (w, h) => ({
      bg: solid("#fafafa"),
      overlays: [
        { ...makeShape("line", "#0a0a0a"), x: w * 0.42, y: h * 0.3, width: w * 0.16, height: 3 },
        makeText({ text: "Announcement", x: w * 0.1, y: h * 0.4, width: w * 0.8, fontSize: Math.round(h * 0.12), fill: "#0a0a0a", align: "center", shadow: false }),
        makeText({ text: "Something new is coming", x: w * 0.1, y: h * 0.62, width: w * 0.8, fontSize: Math.round(h * 0.045), fill: "#737373", align: "center", fontStyle: "normal", shadow: false }),
      ],
    }),
  },
];
