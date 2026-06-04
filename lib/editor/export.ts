"use client";

import type Konva from "konva";
import { downloadBlob } from "@/lib/image-processor";

export type ExportFormat = "image/png" | "image/jpeg" | "image/webp";

export interface ExportOptions {
  format: ExportFormat;
  quality: number; // 0-100, ignored for png
  pixelRatio: number; // 1 | 2 | 3
  /** Region of the stage to export, in stage coordinates. Defaults to full stage. */
  region?: { x: number; y: number; width: number; height: number };
  fileName: string;
}

/**
 * Render a Konva stage region to a Blob. Differentiator vs FotoJet: the
 * export pipes through the same quality-controlled toBlob used by the
 * compressor, so users pick format AND compression level — and there is
 * never a watermark.
 */
export async function exportStage(stage: Konva.Stage, opts: ExportOptions): Promise<Blob> {
  const canvas = stage.toCanvas({
    pixelRatio: opts.pixelRatio,
    ...(opts.region ?? {}),
  });
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Failed to render canvas"))),
      opts.format,
      opts.format === "image/png" ? undefined : opts.quality / 100,
    );
  });
  return blob;
}

export async function exportAndDownload(stage: Konva.Stage, opts: ExportOptions): Promise<number> {
  const blob = await exportStage(stage, opts);
  const ext = opts.format === "image/png" ? "png" : opts.format === "image/webp" ? "webp" : "jpg";
  downloadBlob(blob, `${opts.fileName}.${ext}`);
  return blob.size;
}
