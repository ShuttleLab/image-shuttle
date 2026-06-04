"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type Konva from "konva";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { exportAndDownload, type ExportFormat } from "@/lib/editor/export";
import { formatFileSize } from "@/lib/image-processor";
import { SWATCHES } from "@/lib/editor/assets";
import { cn } from "@/lib/utils";

/** Labeled range slider used across all editor panels. */
export function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format = (v) => `${v}`,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono tabular-nums">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        aria-label={label}
      />
    </div>
  );
}

/** Color input with brand swatches. */
export function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (c: string) => void }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <div className="flex items-center gap-1.5">
          <input
            type="color"
            value={/^#([0-9a-f]{6})$/i.test(value) ? value : "#ffffff"}
            onChange={(e) => onChange(e.target.value)}
            className="size-7 rounded cursor-pointer border border-border bg-transparent"
            aria-label={label}
          />
          <span className="font-mono text-[10px] text-muted-foreground w-14">{value}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {SWATCHES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={cn("size-5 rounded-full border border-border/60", value === c && "ring-2 ring-primary ring-offset-1")}
            style={{ background: c }}
            aria-label={c}
          />
        ))}
      </div>
    </div>
  );
}

/** Shared export panel: format + quality + scale + download. */
export function ExportPanel({
  getStage,
  getRegion,
  fileName,
  defaultFormat = "image/png",
}: {
  getStage: () => Konva.Stage | null;
  getRegion?: () => { x: number; y: number; width: number; height: number } | undefined;
  fileName: string;
  defaultFormat?: ExportFormat;
}) {
  const t = useTranslations("editor");
  const [format, setFormat] = useState<ExportFormat>(defaultFormat);
  const [quality, setQuality] = useState(90);
  const [scale, setScale] = useState(1);
  const [busy, setBusy] = useState(false);

  const formats: { value: ExportFormat; label: string }[] = [
    { value: "image/png", label: "PNG" },
    { value: "image/jpeg", label: "JPG" },
    { value: "image/webp", label: "WebP" },
  ];

  const handleExport = async () => {
    const stage = getStage();
    if (!stage) return;
    setBusy(true);
    try {
      const size = await exportAndDownload(stage, {
        format,
        quality,
        pixelRatio: scale,
        region: getRegion?.(),
        fileName,
      });
      toast.success(t("exported", { size: formatFileSize(size) }));
    } catch {
      toast.error(t("exportFailed"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {formats.map((f) => (
          <Button
            key={f.value}
            type="button"
            size="sm"
            variant={format === f.value ? "default" : "outline"}
            className="h-8 px-3 text-xs"
            onClick={() => setFormat(f.value)}
          >
            {f.label}
          </Button>
        ))}
      </div>
      {format !== "image/png" && (
        <SliderRow label={t("quality")} value={quality} min={10} max={100} onChange={setQuality} format={(v) => `${v}%`} />
      )}
      <div className="flex flex-wrap gap-1.5">
        {[1, 2, 3].map((s) => (
          <Button
            key={s}
            type="button"
            size="sm"
            variant={scale === s ? "default" : "outline"}
            className="h-8 px-3 text-xs"
            onClick={() => setScale(s)}
          >
            {s}x
          </Button>
        ))}
      </div>
      <Button type="button" className="w-full h-10" onClick={handleExport} disabled={busy}>
        {busy ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
        {t("download")}
      </Button>
    </div>
  );
}
