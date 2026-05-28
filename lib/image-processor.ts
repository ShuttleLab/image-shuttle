export type ImageFormat = "image/jpeg" | "image/png" | "image/webp" | "image/avif";

export type QualityPreset = "high" | "balanced" | "small" | "custom";

export interface CompressOptions {
  quality: number; // 0-100
  format: ImageFormat | "original";
  maxWidth?: number;
  maxHeight?: number;
  maintainAspect: boolean;
}

export interface CompressResult {
  blob: Blob;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  format: string;
  savings: number; // percentage
}

export interface ImageInfo {
  file: File;
  width: number;
  height: number;
  format: string;
  size: number;
}

export const QUALITY_PRESETS: Record<QualityPreset, number> = {
  high: 85,
  balanced: 70,
  small: 50,
  custom: 70,
};

export const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export function isSupportedFormat(file: File): boolean {
  return SUPPORTED_FORMATS.includes(file.type);
}

export function getFormatExtension(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
  };
  return map[mime] || "jpg";
}

export function getOutputFilename(
  originalName: string,
  outputFormat: string,
): string {
  const baseName = originalName.replace(/\.[^.]+$/, "");
  const ext = getFormatExtension(outputFormat);
  return `${baseName}-compressed.${ext}`;
}

export async function getImageInfo(file: File): Promise<ImageInfo> {
  const img = await loadImage(file);
  return {
    file,
    width: img.naturalWidth,
    height: img.naturalHeight,
    format: file.type,
    size: file.size,
  };
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image"));
    };
    img.src = URL.createObjectURL(file);
  });
}

function calculateDimensions(
  width: number,
  height: number,
  maxWidth?: number,
  maxHeight?: number,
  maintainAspect = true,
): { width: number; height: number } {
  if (!maxWidth && !maxHeight) return { width, height };

  if (maintainAspect) {
    const ratio = width / height;

    if (maxWidth && maxHeight) {
      if (width > maxWidth || height > maxHeight) {
        const widthRatio = maxWidth / width;
        const heightRatio = maxHeight / height;
        const scale = Math.min(widthRatio, heightRatio);
        return {
          width: Math.round(width * scale),
          height: Math.round(height * scale),
        };
      }
    } else if (maxWidth && width > maxWidth) {
      return {
        width: maxWidth,
        height: Math.round(maxWidth / ratio),
      };
    } else if (maxHeight && height > maxHeight) {
      return {
        width: Math.round(maxHeight * ratio),
        height: maxHeight,
      };
    }

    return { width, height };
  }

  return {
    width: maxWidth || width,
    height: maxHeight || height,
  };
}

export async function compressImage(
  file: File,
  options: CompressOptions,
): Promise<CompressResult> {
  const img = await loadImage(file);

  const { width, height } = calculateDimensions(
    img.naturalWidth,
    img.naturalHeight,
    options.maxWidth,
    options.maxHeight,
    options.maintainAspect,
  );

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to get canvas context");

  ctx.drawImage(img, 0, 0, width, height);

  const outputFormat =
    options.format === "original" ? file.type : options.format;
  const quality = options.quality / 100;

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Failed to compress image"));
      },
      outputFormat,
      quality,
    );
  });

  const savings = Math.round((1 - blob.size / file.size) * 100);

  return {
    blob,
    width,
    height,
    originalSize: file.size,
    compressedSize: blob.size,
    format: outputFormat,
    savings: Math.max(0, savings),
  };
}

export async function compressPngWithWasm(file: File, options: CompressOptions): Promise<CompressResult> {
  try {
    const { default: LibImageQuant } = await import(
      "@fe-daily/libimagequant-wasm"
    );

    const img = await loadImage(file);
    const { width, height } = calculateDimensions(
      img.naturalWidth,
      img.naturalHeight,
      options.maxWidth,
      options.maxHeight,
      options.maintainAspect,
    );

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    ctx.drawImage(img, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const target = Math.round(options.quality * 0.7);

    const quantizer = new LibImageQuant();
    const result = await quantizer.quantizeImageData(imageData, {
      quality: { min: 0, target },
      speed: 4,
    });

    const blob = new Blob([result.pngBytes.buffer as ArrayBuffer], { type: "image/png" });

    const savings = Math.round((1 - blob.size / file.size) * 100);

    return {
      blob,
      width: result.width,
      height: result.height,
      originalSize: file.size,
      compressedSize: blob.size,
      format: "image/png",
      savings: Math.max(0, savings),
    };
  } catch (error) {
    console.error("WASM PNG compression failed, falling back to canvas:", error);
    return compressImage(file, {
      quality: 70,
      format: "image/png",
      maintainAspect: true,
    });
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
