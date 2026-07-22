"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  QUALITY_PRESETS,
  type QualityPreset,
  type ImageFormat,
  type CompressOptions,
} from "@/lib/image-processor";

// Segmented toggle: a real, finger-friendly control (40px tall) with an
// obvious selected state — replaces the tiny badges that didn't read as
// clickable or tappable.
const chipClass = (active: boolean) =>
  cn(
    "h-10 rounded-lg border px-4 text-sm font-medium transition-colors",
    "disabled:pointer-events-none disabled:opacity-50",
    active
      ? "border-primary bg-primary text-primary-foreground shadow-sm"
      : "border-border bg-background text-foreground hover:bg-muted",
  );

interface ImageControlsProps {
  options: CompressOptions;
  onChange: (options: CompressOptions) => void;
  disabled?: boolean;
}

export function ImageControls({
  options,
  onChange,
  disabled = false,
}: ImageControlsProps) {
  const t = useTranslations("compressor");

  const presets: { key: QualityPreset; label: string }[] = [
    { key: "high", label: t("presetHigh") },
    { key: "balanced", label: t("presetBalanced") },
    { key: "small", label: t("presetSmall") },
  ];

  const formats: { value: ImageFormat | "original"; label: string }[] = [
    { value: "original", label: t("sameAsOriginal") },
    { value: "image/jpeg", label: "JPEG" },
    { value: "image/png", label: "PNG" },
    { value: "image/webp", label: "WebP" },
    { value: "image/avif", label: "AVIF" },
  ];

  const handlePreset = (preset: QualityPreset) => {
    onChange({
      ...options,
      quality: QUALITY_PRESETS[preset],
    });
  };

  const handleFormatChange = (format: ImageFormat | "original") => {
    onChange({ ...options, format });
  };

  const handleQualityChange = (value: number) => {
    onChange({ ...options, quality: value });
  };

  const handleMaxWidthChange = (value: string) => {
    const num = value ? parseInt(value, 10) : undefined;
    onChange({ ...options, maxWidth: num });
  };

  const handleMaxHeightChange = (value: string) => {
    const num = value ? parseInt(value, 10) : undefined;
    onChange({ ...options, maxHeight: num });
  };

  return (
    <Card>
      <CardContent className="p-5 space-y-6 sm:p-6">
        {/* Quality Presets */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">{t("quality")}</Label>
          <div className="flex flex-wrap gap-2">
            {presets.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                disabled={disabled}
                aria-pressed={options.quality === QUALITY_PRESETS[key]}
                onClick={() => handlePreset(key)}
                className={chipClass(options.quality === QUALITY_PRESETS[key])}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={100}
              value={options.quality}
              onChange={(e) => handleQualityChange(parseInt(e.target.value, 10))}
              disabled={disabled}
              className="flex-1 h-2.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="text-base font-semibold tabular-nums w-14 text-right">
              {options.quality}%
            </span>
          </div>
        </div>

        {/* Format Selection */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">{t("format")}</Label>
          <div className="flex flex-wrap gap-2">
            {formats.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                disabled={disabled}
                aria-pressed={options.format === value}
                onClick={() => handleFormatChange(value)}
                className={chipClass(options.format === value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Resize Options */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">{t("resize")}</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-sm text-muted-foreground">{t("width")}</Label>
              <input
                type="number"
                placeholder={t("placeholderMaxWidth")}
                value={options.maxWidth || ""}
                onChange={(e) => handleMaxWidthChange(e.target.value)}
                disabled={disabled}
                className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm text-muted-foreground">{t("height")}</Label>
              <input
                type="number"
                placeholder={t("placeholderMaxHeight")}
                value={options.maxHeight || ""}
                onChange={(e) => handleMaxHeightChange(e.target.value)}
                disabled={disabled}
                className="w-full h-11 px-3 rounded-md border border-input bg-background text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <input
              type="checkbox"
              id="maintainAspect"
              checked={options.maintainAspect}
              onChange={(e) =>
                onChange({ ...options, maintainAspect: e.target.checked })
              }
              disabled={disabled}
              className="size-[1.125rem] rounded border-input accent-primary"
            />
            <Label htmlFor="maintainAspect" className="text-sm text-muted-foreground cursor-pointer">
              {t("maintainAspect")}
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
