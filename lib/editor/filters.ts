import Konva from "konva";

// Parametric adjustments applied to the photo. All client-side via Konva filters;
// the source pixels are never mutated, so undo/redo is just state snapshots.
export interface Adjustments {
  brightness: number; // -1 .. 1 (Konva.Filters.Brighten)
  contrast: number; // -100 .. 100 (Konva.Filters.Contrast)
  saturation: number; // -2 .. 2 (HSL)
  hue: number; // -180 .. 180 degrees (HSL)
  blur: number; // 0 .. 40 px (Blur)
  sharpen: number; // 0 .. 1 (Enhance — Konva's contrast-stretch acts as a sharpen/punch)
  noise: number; // 0 .. 1 (Noise)
  pixelate: number; // 0 (off) | 2 .. 32 (Pixelate)
  grayscale: boolean;
  sepia: boolean;
  invert: boolean;
  vignette: number; // 0 .. 1 — rendered as a radial-gradient overlay, not a Konva filter
}

export const DEFAULT_ADJUSTMENTS: Adjustments = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  hue: 0,
  blur: 0,
  sharpen: 0,
  noise: 0,
  pixelate: 0,
  grayscale: false,
  sepia: false,
  invert: false,
  vignette: 0,
};

/** Build the Konva filter chain + node attrs for a given adjustment state. */
export function konvaFiltersFor(a: Adjustments): {
  filters: typeof Konva.Filters.Brighten[];
  attrs: Record<string, number>;
} {
  const filters: typeof Konva.Filters.Brighten[] = [];
  const attrs: Record<string, number> = {};

  if (a.brightness !== 0) {
    filters.push(Konva.Filters.Brighten);
    attrs.brightness = a.brightness;
  }
  if (a.contrast !== 0) {
    filters.push(Konva.Filters.Contrast);
    attrs.contrast = a.contrast;
  }
  if (a.saturation !== 0 || a.hue !== 0) {
    filters.push(Konva.Filters.HSL);
    attrs.saturation = a.saturation;
    attrs.hue = a.hue;
  }
  if (a.blur > 0) {
    filters.push(Konva.Filters.Blur);
    attrs.blurRadius = a.blur;
  }
  if (a.sharpen > 0) {
    filters.push(Konva.Filters.Enhance);
    attrs.enhance = a.sharpen;
  }
  if (a.noise > 0) {
    filters.push(Konva.Filters.Noise);
    attrs.noise = a.noise;
  }
  if (a.pixelate >= 2) {
    filters.push(Konva.Filters.Pixelate);
    attrs.pixelSize = Math.round(a.pixelate);
  }
  if (a.grayscale) filters.push(Konva.Filters.Grayscale);
  if (a.sepia) filters.push(Konva.Filters.Sepia);
  if (a.invert) filters.push(Konva.Filters.Invert);

  return { filters, attrs };
}

/** One-click looks, FotoJet-style. Each preset is a partial adjustment overlay. */
export interface FilterPreset {
  id: string;
  values: Partial<Adjustments>;
}

export const FILTER_PRESETS: FilterPreset[] = [
  { id: "original", values: {} },
  { id: "bw", values: { grayscale: true, contrast: 8 } },
  { id: "noir", values: { grayscale: true, contrast: 32, vignette: 0.45 } },
  { id: "sepia", values: { sepia: true, brightness: 0.03 } },
  { id: "vintage", values: { sepia: true, contrast: -8, brightness: 0.06, noise: 0.12, vignette: 0.35 } },
  { id: "warm", values: { hue: -12, saturation: 0.18, brightness: 0.05 } },
  { id: "cool", values: { hue: 14, saturation: 0.08, brightness: 0.02 } },
  { id: "fade", values: { contrast: -22, brightness: 0.1, saturation: -0.35 } },
  { id: "punch", values: { contrast: 26, saturation: 0.35, sharpen: 0.12 } },
  { id: "soft", values: { blur: 1.4, brightness: 0.07, saturation: -0.08 } },
  { id: "dramatic", values: { contrast: 42, saturation: -0.12, brightness: -0.05, vignette: 0.5 } },
  { id: "pixel", values: { pixelate: 10 } },
];

export function applyPreset(preset: FilterPreset): Adjustments {
  return { ...DEFAULT_ADJUSTMENTS, ...preset.values };
}
