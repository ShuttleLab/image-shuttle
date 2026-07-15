// Client-side SVG rasterizer. Renders an SVG via an <img> element (which never
// executes scripts or loads external subresources, so the canvas stays
// untainted) and encodes it through the same quality-controlled canvas.toBlob
// pipeline the compressor uses. Everything runs in the browser — no uploads.

export type RasterFormat =
  | "image/png"
  | "image/webp"
  | "image/jpeg"
  | "image/avif";

export interface SvgSource {
  /** Normalized SVG markup with explicit width/height + viewBox. */
  text: string;
  naturalWidth: number;
  naturalHeight: number;
}

export interface RasterizeOptions {
  width: number;
  height: number;
  /** CSS color for the backdrop. Omit for transparent (PNG/WebP/AVIF). */
  background?: string;
  format: RasterFormat;
  /** 0–100, applied to lossy formats only. */
  quality?: number;
  /** "contain" preserves aspect and centers; "stretch" fills exactly. */
  fit?: "contain" | "stretch";
}

const DEFAULT_SIZE = 512;

function parseLength(value: string | null): number {
  if (!value) return 0;
  const trimmed = value.trim();
  if (trimmed.endsWith("%")) return 0; // percentages have no intrinsic size
  const n = parseFloat(trimmed);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/**
 * Validate an SVG string, read its natural size, and guarantee the root carries
 * explicit pixel width/height + a viewBox — Firefox renders a 0×0 image
 * otherwise. Throws "INVALID_SVG" if the markup isn't a parseable <svg>.
 */
export function parseSvg(text: string): SvgSource {
  const doc = new DOMParser().parseFromString(text, "image/svg+xml");
  const svg = doc.documentElement;
  if (
    doc.querySelector("parsererror") ||
    !svg ||
    svg.tagName.toLowerCase() !== "svg"
  ) {
    throw new Error("INVALID_SVG");
  }

  let vbW = 0;
  let vbH = 0;
  const viewBox = svg.getAttribute("viewBox");
  if (viewBox) {
    const parts = viewBox.split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
      vbW = parts[2];
      vbH = parts[3];
    }
  }

  const naturalWidth =
    parseLength(svg.getAttribute("width")) || vbW || DEFAULT_SIZE;
  const naturalHeight =
    parseLength(svg.getAttribute("height")) || vbH || DEFAULT_SIZE;

  svg.setAttribute("width", String(naturalWidth));
  svg.setAttribute("height", String(naturalHeight));
  if (!viewBox) {
    svg.setAttribute("viewBox", `0 0 ${naturalWidth} ${naturalHeight}`);
  }

  return {
    text: new XMLSerializer().serializeToString(svg),
    naturalWidth,
    naturalHeight,
  };
}

function loadSvgImage(svgText: string): Promise<HTMLImageElement> {
  const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("SVG_RENDER_FAILED"));
    };
    img.src = url;
  });
}

export async function rasterizeSvg(
  src: SvgSource,
  opts: RasterizeOptions,
): Promise<Blob> {
  const width = Math.max(1, Math.round(opts.width));
  const height = Math.max(1, Math.round(opts.height));
  const img = await loadSvgImage(src.text);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("NO_CANVAS_CONTEXT");

  // JPEG has no alpha channel — force an opaque backdrop so transparency
  // doesn't turn black.
  const background =
    opts.background ?? (opts.format === "image/jpeg" ? "#ffffff" : undefined);
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  if ((opts.fit ?? "contain") === "contain") {
    const scale = Math.min(
      width / src.naturalWidth,
      height / src.naturalHeight,
    );
    const dw = src.naturalWidth * scale;
    const dh = src.naturalHeight * scale;
    ctx.drawImage(img, (width - dw) / 2, (height - dh) / 2, dw, dh);
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }

  const quality = opts.quality != null ? opts.quality / 100 : undefined;
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("ENCODE_FAILED"))),
      opts.format,
      quality,
    );
  });
}
