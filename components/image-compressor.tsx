"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Download, Trash2, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ImageDropzone } from "@/components/image-dropzone";
import { ImageControls } from "@/components/image-controls";
import { ImagePreview } from "@/components/image-preview";
import { ImageQueue, type QueueTask } from "@/lib/image-queue";
import {
  formatFileSize,
  downloadBlob,
  getOutputFilename,
  type CompressOptions,
  type CompressResult,
  QUALITY_PRESETS,
} from "@/lib/image-processor";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  result?: CompressResult;
  compressedUrl?: string;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

let idCounter = 0;
const generateId = () => `img-${++idCounter}`;

export function ImageCompressor() {
  const t = useTranslations("compressor");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [options, setOptions] = useState<CompressOptions>({
    quality: QUALITY_PRESETS.balanced,
    format: "original",
    maintainAspect: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });

  const handleFilesAdded = useCallback((files: File[]) => {
    const newImages: ImageItem[] = files.map((file) => ({
      id: generateId(),
      file,
      previewUrl: URL.createObjectURL(file),
      status: "pending",
    }));

    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const processImages = useCallback(async () => {
    const pendingImages = images.filter((img) => img.status === "pending");
    if (pendingImages.length === 0) return;

    setIsProcessing(true);
    setProgress({ completed: 0, total: pendingImages.length });

    const queue = new ImageQueue((completed, total, currentResult) => {
      setProgress({ completed, total });

      if (currentResult && !currentResult.error) {
        setImages((prev) =>
          prev.map((img) => {
            if (img.id === currentResult.id) {
              const compressedUrl = URL.createObjectURL(currentResult.result.blob);
              return {
                ...img,
                result: currentResult.result,
                compressedUrl,
                status: "done",
              };
            }
            return img;
          }),
        );
      } else if (currentResult?.error) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === currentResult.id
              ? { ...img, status: "error", error: currentResult.error }
              : img,
          ),
        );
      }
    });

    const tasks: QueueTask[] = pendingImages.map((img) => ({
      id: img.id,
      file: img.file,
      options,
    }));

    queue.addMultiple(tasks);

    // Mark all as processing
    setImages((prev) =>
      prev.map((img) =>
        img.status === "pending" ? { ...img, status: "processing" } : img,
      ),
    );

    await queue.process();

    setIsProcessing(false);
    toast.success(t("complete"));
  }, [images, options, t]);

  const handleDownload = useCallback(
    (image: ImageItem) => {
      if (!image.result) return;
      const filename = getOutputFilename(image.file.name, image.result.format);
      downloadBlob(image.result.blob, filename);
    },
    [],
  );

  const handleDownloadAll = useCallback(() => {
    const completedImages = images.filter((img) => img.status === "done" && img.result);
    completedImages.forEach((img) => {
      if (img.result) {
        const filename = getOutputFilename(img.file.name, img.result.format);
        downloadBlob(img.result.blob, filename);
      }
    });
  }, [images]);

  const handleRemoveImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) {
        URL.revokeObjectURL(img.previewUrl);
        if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const handleClearAll = useCallback(() => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.previewUrl);
      if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
    });
    setImages([]);
  }, [images]);

  const completedCount = images.filter((img) => img.status === "done").length;
  const hasCompleted = completedCount > 0;
  const hasPending = images.some((img) => img.status === "pending");

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <ImageDropzone onFilesAdded={handleFilesAdded} disabled={isProcessing} />

      {/* Controls */}
      {images.length > 0 && (
        <ImageControls
          options={options}
          onChange={setOptions}
          disabled={isProcessing}
        />
      )}

      {/* Actions */}
      {images.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          {hasPending && (
            <Button
              size="lg"
              className="h-12 px-7 text-base font-semibold"
              onClick={processImages}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="size-5 mr-2 animate-spin" />
                  {t("batchProgress", {
                    current: progress.completed,
                    total: progress.total,
                  })}
                </>
              ) : (
                t("apply")
              )}
            </Button>
          )}

          {hasCompleted && (
            <Button
              size="lg"
              variant={hasPending ? "outline" : "default"}
              className="h-12 px-6 text-base font-semibold"
              onClick={handleDownloadAll}
            >
              <Download className="size-5 mr-2" />
              {t("downloadAll")} ({completedCount})
            </Button>
          )}

          <Button
            size="lg"
            variant="outline"
            className="h-12 px-6 text-base"
            onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
          >
            <Plus className="size-5 mr-2" />
            {t("addMore")}
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="h-12 px-6 text-base text-destructive"
            onClick={handleClearAll}
          >
            <Trash2 className="size-5 mr-2" />
            {t("clearAll")}
          </Button>
        </div>
      )}

      {/* Progress */}
      {isProcessing && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t("processing")}</span>
                <span>
                  {progress.completed} / {progress.total}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{
                    width: `${(progress.completed / progress.total) * 100}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image List */}
      {images.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>{t("noImages")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {images.map((image) => (
            <div key={image.id}>
              {image.status === "done" && image.result && image.compressedUrl ? (
                <div className="space-y-3">
                  <ImagePreview
                    originalUrl={image.previewUrl}
                    compressedUrl={image.compressedUrl}
                    originalSize={image.result.originalSize}
                    compressedSize={image.result.compressedSize}
                    originalName={image.file.name}
                  />
                  <div className="flex justify-end">
                    <Button
                      size="lg"
                      className="h-12 px-6 text-base font-semibold"
                      onClick={() => handleDownload(image)}
                    >
                      <Download className="size-5 mr-2" />
                      {t("downloadSingle")}
                    </Button>
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded bg-muted flex items-center justify-center overflow-hidden">
                          <img
                            src={image.previewUrl}
                            alt=""
                            className="size-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium truncate max-w-[200px]">
                            {image.file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(image.file.size)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {image.status === "processing" && (
                          <Loader2 className="size-4 animate-spin text-muted-foreground" />
                        )}
                        {image.status === "error" && (
                          <span className="text-xs text-destructive">
                            {image.error || t("processingError")}
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-10 text-destructive"
                          onClick={() => handleRemoveImage(image.id)}
                          aria-label={t("removeImage")}
                        >
                          <Trash2 className="size-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
