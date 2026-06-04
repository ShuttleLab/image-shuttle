// Shared asset catalogs for the editor / collage / design modules.
// Fonts are system/web-safe stacks plus the bundled Geist — zero network
// fetches keeps everything offline-capable (PWA) and private.

export const FONT_FAMILIES = [
  { id: "geist", label: "Geist", css: "var(--font-geist-sans), system-ui, sans-serif" },
  { id: "geist-mono", label: "Geist Mono", css: "var(--font-geist-mono), ui-monospace, monospace" },
  { id: "system", label: "System UI", css: "system-ui, -apple-system, sans-serif" },
  { id: "serif", label: "Serif", css: "Georgia, 'Times New Roman', serif" },
  { id: "rounded", label: "Rounded", css: "'Arial Rounded MT Bold', 'Hiragino Maru Gothic ProN', system-ui, sans-serif" },
  { id: "impact", label: "Display", css: "Impact, 'Arial Narrow Bold', sans-serif" },
  { id: "cursive", label: "Handwriting", css: "'Snell Roundhand', 'Comic Sans MS', cursive" },
  { id: "zh-sans", label: "中文黑体", css: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif" },
  { id: "zh-serif", label: "中文宋体", css: "'Songti SC', 'SimSun', serif" },
] as const;

// Konva needs a concrete font-family string (no CSS vars). Resolve at runtime.
export function resolveFontFamily(id: string): string {
  const f = FONT_FAMILIES.find((x) => x.id === id) ?? FONT_FAMILIES[0];
  if (typeof window !== "undefined" && f.css.includes("var(")) {
    const varName = f.css.match(/var\((--[^)]+)\)/)?.[1];
    if (varName) {
      const resolved = getComputedStyle(document.body).getPropertyValue(varName).trim();
      if (resolved) return `${resolved}, ${f.css.replace(/var\([^)]+\),?\s*/, "")}`;
    }
  }
  return f.css;
}

// Emoji double as a huge clipart library — no licensing, no downloads.
export const STICKER_CATEGORIES: { id: string; emojis: string[] }[] = [
  { id: "smileys", emojis: ["😀", "😂", "🥰", "😎", "🤩", "😭", "🥳", "😴", "🤔", "😱", "🙌", "👍", "👏", "✌️", "🤝", "💪"] },
  { id: "love", emojis: ["❤️", "💖", "💘", "💝", "💕", "💞", "💓", "💗", "💜", "🧡", "💛", "💚", "💙", "🤍", "💔", "💋"] },
  { id: "celebrate", emojis: ["🎉", "🎊", "🎂", "🎁", "🎈", "🥂", "🍾", "🎄", "🎃", "✨", "🌟", "⭐", "🏆", "🥇", "🎆", "🪅"] },
  { id: "nature", emojis: ["🌸", "🌹", "🌻", "🌈", "☀️", "🌙", "⛅", "❄️", "🍀", "🌊", "🔥", "⚡", "🦋", "🐱", "🐶", "🌵"] },
  { id: "food", emojis: ["🍕", "🍔", "🍟", "🌮", "🍣", "🍜", "🍩", "🍪", "🧋", "☕", "🍺", "🍉", "🍓", "🥑", "🍰", "🍦"] },
  { id: "symbols", emojis: ["✅", "❌", "⚠️", "💯", "🔔", "📌", "🔗", "💡", "🎯", "🚀", "⏰", "📷", "🎵", "🗯️", "💬", "➡️"] },
];

export const SHAPE_TYPES = ["rect", "circle", "triangle", "star", "line", "arrow"] as const;
export type ShapeType = (typeof SHAPE_TYPES)[number];

export const SWATCHES = [
  "#ffffff", "#0a0a0a", "#ef4444", "#f97316", "#f59e0b", "#84cc16",
  "#22c55e", "#14b8a6", "#0ea5e9", "#3b82f6", "#7c3aed", "#d946ef",
  "#ec4899", "#78716c", "#e5e5e5", "#facc15",
];
