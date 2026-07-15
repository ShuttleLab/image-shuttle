"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Upload, Download, Package, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { downloadBlob, formatFileSize } from "@/lib/image-processor";
import {
  parseSvg,
  rasterizeSvg,
  type RasterFormat,
  type SvgSource,
} from "@/lib/svg-to-png";
import { createZip } from "@/lib/zip";

const ICON_SIZES = [16, 32, 48, 64, 128, 256, 512] as const;
const DEFAULT_ICONS = new Set<number>([16, 32, 48, 64, 128, 256]);
const LOSSY: RasterFormat[] = ["image/webp", "image/jpeg"];

const FORMATS: { value: RasterFormat; label: string; ext: string }[] = [
  { value: "image/png", label: "PNG", ext: "png" },
  { value: "image/webp", label: "WebP", ext: "webp" },
  { value: "image/jpeg", label: "JPG", ext: "jpg" },
];

function baseName(name: string): string {
  return name.replace(/\.[^.]+$/, "") || "image";
}

export function SvgToPngApp() {
  const t = useTranslations("svgToPng");

  const [src, setSrc] = useState<SvgSource | null>(null);
  const [fileBase, setFileBase] = useState("image");
  const [dragOver, setDragOver] = useState(false);
  const [showPaste, setShowPaste] = useState(false);
  const [pasted, setPasted] = useState("");

  const [format, setFormat] = useState<RasterFormat>("image/png");
  const [transparent, setTransparent] = useState(true);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [quality, setQuality] = useState(92);

  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [lockAspect, setLockAspect] = useState(true);

  const [icons, setIcons] = useState<Set<number>>(new Set(DEFAULT_ICONS));
  const [busy, setBusy] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const previewUri = useMemo(
    () =>
      src
        ? `data:image/svg+xml;utf8,${encodeURIComponent(src.text)}`
        : null,
    [src],
  );

  const ext = FORMATS.find((f) => f.value === format)?.ext ?? "png";
  const isLossy = LOSSY.includes(format);
  const background =
    format === "image/jpeg" ? bgColor : transparent ? undefined : bgColor;

  const loadSvgText = useCallback(
    (text: string, name: string) => {
      try {
        const parsed = parseSvg(text);
        setSrc(parsed);
        setFileBase(baseName(name));
        const long = Math.max(parsed.naturalWidth, parsed.naturalHeight);
        // Default output ~ up to 512 on the long edge, keeping aspect.
        const scale = long > 512 ? 512 / long : 1;
        setWidth(Math.round(parsed.naturalWidth * scale));
        setHeight(Math.round(parsed.naturalHeight * scale));
      } catch {
        toast.error(t("invalidSvg"));
      }
    },
    [t],
  );

  const handleFile = useCallback(
    (file: File) => {
      const isSvg =
        file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg");
      if (!isSvg) {
        toast.error(t("invalidSvg"));
        return;
      }
      file.text().then((text) => loadSvgText(text, file.name));
    },
    [loadSvgText, t],
  );

  const onWidth = (v: number) => {
    setWidth(v);
    if (lockAspect && src) {
      setHeight(Math.max(1, Math.round((v * src.naturalHeight) / src.naturalWidth)));
    }
  };
  const onHeight = (v: number) => {
    setHeight(v);
    if (lockAspect && src) {
      setWidth(Math.max(1, Math.round((v * src.naturalWidth) / src.naturalHeight)));
    }
  };

  const downloadSingle = useCallback(async () => {
    if (!src) return;
    setBusy(true);
    try {
      const blob = await rasterizeSvg(src, {
        width,
        height,
        format,
        background,
        quality: isLossy ? quality : undefined,
      });
      downloadBlob(blob, `${fileBase}-${width}x${height}.${ext}`);
      toast.success(t("downloaded", { size: formatFileSize(blob.size) }));
    } catch {
      toast.error(t("renderFailed"));
    } finally {
      setBusy(false);
    }
  }, [src, width, height, format, background, isLossy, quality, fileBase, ext, t]);

  const downloadIcons = useCallback(async () => {
    if (!src) return;
    const sizes = ICON_SIZES.filter((s) => icons.has(s));
    if (sizes.length === 0) {
      toast.error(t("pickIcon"));
      return;
    }
    setBusy(true);
    try {
      // Icons are emitted as PNG (the favicon/app-icon standard), honoring the
      // chosen transparent/solid background.
      const files = await Promise.all(
        sizes.map(async (size) => ({
          name: `${fileBase}-${size}x${size}.png`,
          blob: await rasterizeSvg(src, {
            width: size,
            height: size,
            format: "image/png",
            background: transparent ? undefined : bgColor,
          }),
        })),
      );
      const zip = await createZip(files);
      downloadBlob(zip, `${fileBase}-icons.zip`);
      toast.success(t("zipReady", { count: sizes.length }));
    } catch {
      toast.error(t("renderFailed"));
    } finally {
      setBusy(false);
    }
  }, [src, icons, fileBase, transparent, bgColor, t]);

  const reset = () => {
    setSrc(null);
    setPasted("");
    setShowPaste(false);
  };

  // ---- Upload / paste state ----
  if (!src) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex gap-2">
          <Button
            variant={showPaste ? "outline" : "default"}
            size="sm"
            onClick={() => setShowPaste(false)}
          >
            {t("uploadTab")}
          </Button>
          <Button
            variant={showPaste ? "default" : "outline"}
            size="sm"
            onClick={() => setShowPaste(true)}
          >
            {t("pasteTab")}
          </Button>
        </div>

        {showPaste ? (
          <div className="space-y-3">
            <textarea
              value={pasted}
              onChange={(e) => setPasted(e.target.value)}
              placeholder={t("pastePlaceholder")}
              className="h-56 w-full resize-y rounded-xl border bg-card p-3 font-mono text-xs outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            <Button
              disabled={!pasted.trim()}
              onClick={() => loadSvgText(pasted, "image")}
            >
              {t("pasteLoad")}
            </Button>
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const file = e.dataTransfer.files?.[0];
              if (file) handleFile(file);
            }}
            className={cn(
              "flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-dashed p-10 text-center transition-all",
              dragOver
                ? "border-primary bg-primary/5 scale-[1.01]"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
            )}
          >
            <div className="rounded-full bg-muted p-4">
              <Upload className="size-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-medium">{t("dropTitle")}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("dropSubtitle")}
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/svg+xml,.svg"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
                e.target.value = "";
              }}
            />
          </div>
        )}
      </div>
    );
  }

  // ---- Editor state ----
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Preview */}
      <div className="space-y-3">
        <div
          className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-xl border p-6"
          style={{
            backgroundImage:
              "conic-gradient(#0000 90deg, rgba(120,120,120,.12) 0 180deg, #0000 0 270deg, rgba(120,120,120,.12) 0)",
            backgroundSize: "24px 24px",
            backgroundColor: transparent ? undefined : bgColor,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUri!}
            alt={t("previewAlt")}
            className="max-h-[60vh] max-w-full object-contain"
          />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {t("source", { w: src.naturalWidth, h: src.naturalHeight })}
        </p>
        <div className="text-center">
          <Button variant="ghost" size="sm" onClick={reset}>
            <RefreshCw className="size-4" />
            {t("newSvg")}
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        {/* Format */}
        <section>
          <h3 className="mb-2 text-sm font-semibold">{t("format")}</h3>
          <div className="flex gap-2">
            {FORMATS.map((f) => (
              <Button
                key={f.value}
                variant={format === f.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFormat(f.value)}
              >
                {f.label}
              </Button>
            ))}
          </div>
          {isLossy && (
            <label className="mt-3 block text-sm">
              <span className="text-muted-foreground">
                {t("quality")}: {quality}
              </span>
              <input
                type="range"
                min={1}
                max={100}
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="mt-1 w-full accent-primary"
              />
            </label>
          )}
        </section>

        {/* Background */}
        <section>
          <h3 className="mb-2 text-sm font-semibold">{t("background")}</h3>
          {format === "image/jpeg" ? (
            <p className="mb-2 text-xs text-muted-foreground">{t("jpegNote")}</p>
          ) : (
            <label className="mb-2 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={transparent}
                onChange={(e) => setTransparent(e.target.checked)}
                className="size-4 accent-primary"
              />
              {t("transparent")}
            </label>
          )}
          {(!transparent || format === "image/jpeg") && (
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="h-8 w-16 cursor-pointer rounded border bg-card"
              aria-label={t("background")}
            />
          )}
        </section>

        {/* Custom size */}
        <section>
          <h3 className="mb-2 text-sm font-semibold">{t("customSize")}</h3>
          <div className="flex items-center gap-2">
            <label className="flex-1 text-sm">
              <span className="text-muted-foreground">{t("width")}</span>
              <input
                type="number"
                min={1}
                max={8192}
                value={width}
                onChange={(e) => onWidth(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border bg-card px-2 py-1.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </label>
            <span className="mt-5 text-muted-foreground">×</span>
            <label className="flex-1 text-sm">
              <span className="text-muted-foreground">{t("height")}</span>
              <input
                type="number"
                min={1}
                max={8192}
                value={height}
                onChange={(e) => onHeight(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border bg-card px-2 py-1.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </label>
          </div>
          <label className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={lockAspect}
              onChange={(e) => setLockAspect(e.target.checked)}
              className="size-4 accent-primary"
            />
            {t("lockAspect")}
          </label>
          <Button
            className="mt-3 w-full"
            disabled={busy}
            onClick={downloadSingle}
          >
            <Download className="size-4" />
            {t("downloadFile", { ext: ext.toUpperCase() })}
          </Button>
        </section>

        {/* Icon set */}
        <section>
          <h3 className="mb-1 text-sm font-semibold">{t("iconSet")}</h3>
          <p className="mb-2 text-xs text-muted-foreground">{t("iconSetHint")}</p>
          <div className="flex flex-wrap gap-2">
            {ICON_SIZES.map((size) => {
              const on = icons.has(size);
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() =>
                    setIcons((prev) => {
                      const next = new Set(prev);
                      if (next.has(size)) next.delete(size);
                      else next.add(size);
                      return next;
                    })
                  }
                  className={cn(
                    "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50",
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
          <Button
            variant="outline"
            className="mt-3 w-full"
            disabled={busy}
            onClick={downloadIcons}
          >
            <Package className="size-4" />
            {t("downloadZip")}
          </Button>
        </section>
      </div>
    </div>
  );
}
