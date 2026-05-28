"use client";

import { useTranslations } from "next-intl";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { Card, CardContent } from "@/components/ui/card";
import { formatFileSize } from "@/lib/image-processor";

interface ImagePreviewProps {
  originalUrl: string;
  compressedUrl: string;
  originalSize: number;
  compressedSize: number;
  originalName: string;
  className?: string;
}

export function ImagePreview({
  originalUrl,
  compressedUrl,
  originalSize,
  compressedSize,
  originalName,
  className,
}: ImagePreviewProps) {
  const t = useTranslations("compressor");
  const savings = Math.round((1 - compressedSize / originalSize) * 100);

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header with file info */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium truncate max-w-[200px]">
              {originalName}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">
                {t("originalSize")}: {formatFileSize(originalSize)}
              </span>
              <span className="text-muted-foreground">→</span>
              <span className="font-medium text-primary">
                {formatFileSize(compressedSize)}
              </span>
              {savings > 0 && (
                <span className="text-green-600 font-medium">
                  -{savings}%
                </span>
              )}
            </div>
          </div>

          {/* Comparison Slider */}
          <div className="relative rounded-lg overflow-hidden border">
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage
                  src={originalUrl}
                  alt={t("before")}
                  style={{ objectFit: "contain" }}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={compressedUrl}
                  alt={t("after")}
                  style={{ objectFit: "contain" }}
                />
              }
              className="max-h-[400px]"
              style={{ width: "100%", height: "400px" }}
            />

            {/* Labels */}
            <div className="absolute top-2 left-2 right-2 flex justify-between pointer-events-none">
              <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">
                {t("before")}
              </span>
              <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">
                {t("after")}
              </span>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            {t("compareSlider")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
