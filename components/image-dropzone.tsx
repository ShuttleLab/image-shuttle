"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { isSupportedFormat, SUPPORTED_FORMATS } from "@/lib/image-processor";

interface ImageDropzoneProps {
  onFilesAdded: (files: File[]) => void;
  disabled?: boolean;
  className?: string;
}

export function ImageDropzone({
  onFilesAdded,
  disabled = false,
  className,
}: ImageDropzoneProps) {
  const t = useTranslations("compressor");
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (files: FileList | File[]) => {
      const validFiles = Array.from(files).filter((file) => {
        if (!isSupportedFormat(file)) {
          console.warn(`Unsupported format: ${file.type}`);
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        onFilesAdded(validFiles);
      }
    },
    [onFilesAdded],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragOver(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    },
    [],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (!disabled) handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles],
  );

  const handleClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) handleFiles(e.target.files);
      e.target.value = "";
    },
    [handleFiles],
  );

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
        isDragOver
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={SUPPORTED_FORMATS.join(",")}
        multiple
        className="hidden"
        onChange={handleInputChange}
        disabled={disabled}
      />

      <div className="flex flex-col items-center gap-4">
        <div
          className={cn(
            "rounded-full p-4 transition-colors",
            isDragOver ? "bg-primary/10" : "bg-muted",
          )}
        >
          {isDragOver ? (
            <ImageIcon className="size-8 text-primary" />
          ) : (
            <Upload className="size-8 text-muted-foreground" />
          )}
        </div>

        <div>
          <p className="text-lg font-medium">{t("dropzoneTitle")}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {t("dropzoneSubtitle")}
          </p>
        </div>
      </div>
    </div>
  );
}
