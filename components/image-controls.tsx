"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  QUALITY_PRESETS,
  type QualityPreset,
  type ImageFormat,
  type CompressOptions,
} from "@/lib/image-processor";

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
      <CardContent className="p-4 space-y-5">
        {/* Quality Presets */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("quality")}</Label>
          <div className="flex flex-wrap gap-2">
            {presets.map(({ key, label }) => (
              <Badge
                key={key}
                variant={options.quality === QUALITY_PRESETS[key] ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => !disabled && handlePreset(key)}
              >
                {label}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={100}
              value={options.quality}
              onChange={(e) => handleQualityChange(parseInt(e.target.value, 10))}
              disabled={disabled}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="text-sm font-mono w-10 text-right">
              {options.quality}%
            </span>
          </div>
        </div>

        {/* Format Selection */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("format")}</Label>
          <div className="flex flex-wrap gap-2">
            {formats.map(({ value, label }) => (
              <Badge
                key={value}
                variant={options.format === value ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors"
                onClick={() => !disabled && handleFormatChange(value)}
              >
                {label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Resize Options */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("resize")}</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">{t("width")}</Label>
              <input
                type="number"
                placeholder={t("placeholderMaxWidth")}
                value={options.maxWidth || ""}
                onChange={(e) => handleMaxWidthChange(e.target.value)}
                disabled={disabled}
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">{t("height")}</Label>
              <input
                type="number"
                placeholder={t("placeholderMaxHeight")}
                value={options.maxHeight || ""}
                onChange={(e) => handleMaxHeightChange(e.target.value)}
                disabled={disabled}
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="maintainAspect"
              checked={options.maintainAspect}
              onChange={(e) =>
                onChange({ ...options, maintainAspect: e.target.checked })
              }
              disabled={disabled}
              className="rounded border-input"
            />
            <Label htmlFor="maintainAspect" className="text-xs text-muted-foreground cursor-pointer">
              {t("maintainAspect")}
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
