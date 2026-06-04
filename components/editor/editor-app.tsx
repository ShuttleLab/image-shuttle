"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Stage, Layer, Image as KImage, Rect, Group, Transformer as KTransformer } from "react-konva";
import type Konva from "konva";
import {
  SlidersHorizontal, Wand2, Type as TypeIcon, Smile, Shapes as ShapesIcon,
  Download, Undo2, Redo2, RotateCw, FlipHorizontal2, FlipVertical2, ImagePlus,
  Check, X, Trash2, ChevronDown, Crop as CropIcon, Scaling, SunMedium, Droplets,
  Sparkles, Settings2, Eye, Lock, Unlock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageDropzone } from "@/components/image-dropzone";
import { useHistory } from "@/lib/editor/use-history";
import {
  DEFAULT_ADJUSTMENTS, FILTER_PRESETS, applyPreset, konvaFiltersFor, type Adjustments,
} from "@/lib/editor/filters";
import { FONT_FAMILIES, STICKER_CATEGORIES, SHAPE_TYPES, type ShapeType } from "@/lib/editor/assets";
import { OverlayNodes, TextEditOverlay } from "./overlay-nodes";
import { makeShape, makeSticker, makeText, type Overlay, type TextOverlay } from "./overlay-types";
import { SliderRow, ColorRow, ExportPanel, NumField } from "./controls";
import { cn } from "@/lib/utils";

interface CropRect { x: number; y: number; width: number; height: number }

interface EditState {
  adjustments: Adjustments;
  presetId: string;
  overlays: Overlay[];
  crop: CropRect | null; // natural image coords
  rotation: 0 | 90 | 180 | 270;
  flipX: boolean;
  flipY: boolean;
  resize: { w: number; h: number } | null; // output dimensions
}

const INITIAL: EditState = {
  adjustments: DEFAULT_ADJUSTMENTS,
  presetId: "original",
  overlays: [],
  crop: null,
  rotation: 0,
  flipX: false,
  flipY: false,
  resize: null,
};

type Rail = "adjust" | "filters" | "text" | "stickers" | "shapes" | "export";
type Section = "crop" | "resize" | "rotate" | "exposure" | "color" | "advanced" | null;

const ASPECTS: { id: string; ratio: number | null }[] = [
  { id: "free", ratio: null },
  { id: "1:1", ratio: 1 },
  { id: "4:3", ratio: 4 / 3 },
  { id: "3:4", ratio: 3 / 4 },
  { id: "16:9", ratio: 16 / 9 },
  { id: "9:16", ratio: 9 / 16 },
];

export default function EditorApp() {
  const t = useTranslations("editor");
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState("edited");
  const { state, set, undo, redo, reset, canUndo, canRedo } = useHistory<EditState>(INITIAL);
  const [rail, setRail] = useState<Rail>("adjust");
  const [section, setSection] = useState<Section>("crop");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [cropDraft, setCropDraft] = useState<CropRect | null>(null);
  const [cropLock, setCropLock] = useState(false);
  const [cropRatio, setCropRatio] = useState<number | null>(null);
  const [resizeDraft, setResizeDraft] = useState<{ w: number; h: number } | null>(null);
  const [resizeLock, setResizeLock] = useState(true);
  const [comparing, setComparing] = useState(false);

  const stageRef = useRef<Konva.Stage>(null);
  const photoRef = useRef<Konva.Image>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 800, h: 520 });

  // ---- file loading -------------------------------------------------------
  const handleFiles = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const el = new window.Image();
    el.onload = () => {
      setImg(el);
      setFileName(file.name.replace(/\.[^.]+$/, "") + "-edited");
      reset(INITIAL);
      setSelectedId(null);
      setCropDraft(null);
      setResizeDraft(null);
    };
    el.src = url;
  }, [reset]);

  // ---- responsive stage ---------------------------------------------------
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const ro = new ResizeObserver(() => {
      setContainerSize({ w: node.clientWidth, h: Math.max(340, Math.min(620, window.innerHeight - 300)) });
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, [img]);

  // ---- geometry -----------------------------------------------------------
  const cropRect: CropRect | null = state.crop;
  const baseW = cropRect ? cropRect.width : img?.naturalWidth ?? 1;
  const baseH = cropRect ? cropRect.height : img?.naturalHeight ?? 1;
  const rotated = state.rotation === 90 || state.rotation === 270;
  const logicalW = rotated ? baseH : baseW;
  const logicalH = rotated ? baseW : baseH;
  const fitScale = Math.min(containerSize.w / logicalW, containerSize.h / logicalH, 1);
  const outW = state.resize?.w ?? logicalW;
  const outH = state.resize?.h ?? logicalH;
  // Export at the exact output size regardless of on-screen scale.
  const exportPixelRatio = outW / (logicalW * fitScale);

  // ---- konva filters ------------------------------------------------------
  const { filters, attrs } = useMemo(
    () => (comparing ? { filters: [], attrs: {} } : konvaFiltersFor(state.adjustments)),
    [state.adjustments, comparing],
  );
  useEffect(() => {
    const node = photoRef.current;
    if (!node || !img) return;
    if (filters.length > 0) node.cache();
    else node.clearCache();
    node.getLayer()?.batchDraw();
  }, [filters, attrs, img, state.crop, state.rotation, state.flipX, state.flipY, fitScale]);

  const patchAdjust = (patch: Partial<Adjustments>, record = false) =>
    set((s) => ({ ...s, presetId: "custom", adjustments: { ...s.adjustments, ...patch } }), record);

  const autoEnhance = () =>
    set((s) => ({
      ...s,
      presetId: "custom",
      adjustments: { ...s.adjustments, brightness: 0.05, contrast: 14, saturation: 0.18, sharpen: 0.1 },
    }));

  // ---- overlays -----------------------------------------------------------
  const addOverlay = (ov: Overlay) => {
    set((s) => ({ ...s, overlays: [...s.overlays, ov] }));
    setSelectedId(ov.id);
  };
  const patchOverlay = (id: string, patch: Partial<Overlay>, record = true) =>
    set((s) => ({ ...s, overlays: s.overlays.map((o) => (o.id === id ? ({ ...o, ...patch } as Overlay) : o)) }), record);
  const removeSelected = () => {
    if (!selectedId) return;
    set((s) => ({ ...s, overlays: s.overlays.filter((o) => o.id !== selectedId) }));
    setSelectedId(null);
  };
  const selected = state.overlays.find((o) => o.id === selectedId) ?? null;

  // ---- crop ---------------------------------------------------------------
  const startCrop = () => {
    const m = Math.round(Math.min(logicalW, logicalH) * 0.08);
    setCropDraft({ x: m, y: m, width: logicalW - m * 2, height: logicalH - m * 2 });
    setSelectedId(null);
  };
  const setCropAspect = (ratio: number | null) => {
    setCropRatio(ratio);
    setCropLock(ratio !== null);
    if (ratio !== null && cropDraft) {
      const h = Math.min(cropDraft.width / ratio, logicalH - cropDraft.y);
      setCropDraft({ ...cropDraft, width: h * ratio, height: h });
    }
  };
  const patchCropDim = (dim: "width" | "height", value: number) => {
    if (!cropDraft) return;
    const v = Math.max(16, value);
    let { width, height } = cropDraft;
    const ratio = cropLock ? (cropRatio ?? cropDraft.width / cropDraft.height) : null;
    if (dim === "width") {
      width = Math.min(v, logicalW - cropDraft.x);
      if (ratio) height = Math.min(width / ratio, logicalH - cropDraft.y);
    } else {
      height = Math.min(v, logicalH - cropDraft.y);
      if (ratio) width = Math.min(height * ratio, logicalW - cropDraft.x);
    }
    setCropDraft({ ...cropDraft, width, height });
  };
  const applyCrop = () => {
    if (!cropDraft) return;
    const prev = state.crop ?? { x: 0, y: 0, width: img?.naturalWidth ?? 0, height: img?.naturalHeight ?? 0 };
    set((s) => ({
      ...s,
      resize: null,
      crop: {
        x: prev.x + Math.max(0, Math.round(cropDraft.x)),
        y: prev.y + Math.max(0, Math.round(cropDraft.y)),
        width: Math.round(Math.min(cropDraft.width, prev.width)),
        height: Math.round(Math.min(cropDraft.height, prev.height)),
      },
    }));
    setCropDraft(null);
  };
  const cropDisabled = state.rotation !== 0;

  // ---- resize -------------------------------------------------------------
  const beginResize = () => setResizeDraft({ w: outW, h: outH });
  const patchResize = (dim: "w" | "h", value: number) => {
    if (!resizeDraft) return;
    const v = Math.max(8, Math.min(8192, Math.round(value) || 8));
    if (resizeLock) {
      const ratio = logicalW / logicalH;
      setResizeDraft(dim === "w" ? { w: v, h: Math.max(8, Math.round(v / ratio)) } : { w: Math.max(8, Math.round(v * ratio)), h: v });
    } else {
      setResizeDraft({ ...resizeDraft, [dim]: v });
    }
  };
  const applyResize = () => {
    if (!resizeDraft) return;
    set((s) => ({ ...s, resize: { ...resizeDraft } }));
    setResizeDraft(null);
  };

  const RAIL_ITEMS: { id: Rail; icon: typeof SlidersHorizontal; label: string }[] = [
    { id: "adjust", icon: SlidersHorizontal, label: t("tabs.adjust") },
    { id: "filters", icon: Wand2, label: t("tabs.filters") },
    { id: "text", icon: TypeIcon, label: t("tabs.text") },
    { id: "stickers", icon: Smile, label: t("tabs.stickers") },
    { id: "shapes", icon: ShapesIcon, label: t("tabs.shapes") },
    { id: "export", icon: Download, label: t("tabs.export") },
  ];

  if (!img) {
    return (
      <div className="max-w-2xl mx-auto">
        <ImageDropzone onFilesAdded={handleFiles} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_300px_1fr] gap-3 items-start">
      {/* icon rail */}
      <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible order-2 lg:order-1 bg-card border rounded-xl p-1.5">
        {RAIL_ITEMS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setRail(id)}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-lg px-2.5 py-2 text-[10px] min-w-14 transition-colors",
              rail === id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent/50",
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>

      {/* tool panel */}
      <div className="order-3 lg:order-2 rounded-xl border bg-card p-3 space-y-2 lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto">
        {rail === "adjust" && (
          <>
            <Button type="button" className="w-full h-10 bg-primary" onClick={autoEnhance}>
              <Sparkles className="size-4" />{t("autoEnhance")}
            </Button>
            <p className="text-[11px] text-muted-foreground pt-1">{t("sections.basic")}</p>

            {/* Crop */}
            <Accordion icon={CropIcon} label={t("tabs.crop")} open={section === "crop"} onToggle={() => setSection(section === "crop" ? null : "crop")}>
              {cropDisabled && <p className="text-xs text-destructive">{t("crop.rotateFirst")}</p>}
              {!cropDraft ? (
                <Button type="button" className="w-full h-9" onClick={startCrop} disabled={cropDisabled}>
                  {t("crop.start")}
                </Button>
              ) : (
                <div className="space-y-2.5">
                  <select
                    value={cropRatio === null ? "free" : ASPECTS.find((a) => a.ratio === cropRatio)?.id ?? "free"}
                    onChange={(e) => setCropAspect(ASPECTS.find((a) => a.id === e.target.value)?.ratio ?? null)}
                    className="w-full h-9 rounded-md border bg-background px-2 text-sm"
                    aria-label={t("crop.aspect")}
                  >
                    {ASPECTS.map((a) => (
                      <option key={a.id} value={a.id}>{a.id === "free" ? t("crop.free") : a.id}</option>
                    ))}
                  </select>
                  <DimInputs
                    w={Math.round(cropDraft.width)}
                    h={Math.round(cropDraft.height)}
                    locked={cropLock}
                    onToggleLock={() => setCropLock(!cropLock)}
                    onW={(v) => patchCropDim("width", v)}
                    onH={(v) => patchCropDim("height", v)}
                  />
                  <ApplyCancel onApply={applyCrop} onCancel={() => setCropDraft(null)} applyLabel={t("crop.apply")} cancelLabel={t("crop.cancel")} />
                </div>
              )}
              {state.crop && !cropDraft && (
                <Button type="button" variant="outline" size="sm" className="w-full h-8 mt-2 text-xs" onClick={() => set((s) => ({ ...s, crop: null, resize: null }))}>
                  {t("crop.clear")}
                </Button>
              )}
            </Accordion>

            {/* Resize */}
            <Accordion icon={Scaling} label={t("resize.title")} open={section === "resize"} onToggle={() => { setSection(section === "resize" ? null : "resize"); if (section !== "resize") beginResize(); }}>
              {resizeDraft ? (
                <div className="space-y-2.5">
                  <DimInputs
                    w={resizeDraft.w}
                    h={resizeDraft.h}
                    locked={resizeLock}
                    onToggleLock={() => setResizeLock(!resizeLock)}
                    onW={(v) => patchResize("w", v)}
                    onH={(v) => patchResize("h", v)}
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {[25, 50, 75, 200].map((p) => (
                      <Button key={p} type="button" variant="outline" size="sm" className="h-7 px-2 text-[11px]"
                        onClick={() => setResizeDraft({ w: Math.max(8, Math.round(logicalW * p / 100)), h: Math.max(8, Math.round(logicalH * p / 100)) })}>
                        {p}%
                      </Button>
                    ))}
                  </div>
                  <ApplyCancel onApply={applyResize} onCancel={() => setResizeDraft(null)} applyLabel={t("crop.apply")} cancelLabel={t("crop.cancel")} />
                </div>
              ) : (
                <Button type="button" className="w-full h-9" onClick={beginResize}>{t("resize.start")}</Button>
              )}
              {state.resize && (
                <p className="text-[11px] text-muted-foreground mt-2 font-mono">{t("resize.current", { w: state.resize.w, h: state.resize.h })}</p>
              )}
            </Accordion>

            {/* Rotate */}
            <Accordion icon={RotateCw} label={t("rotate.title")} open={section === "rotate"} onToggle={() => setSection(section === "rotate" ? null : "rotate")}>
              <div className="flex flex-wrap gap-1.5">
                <Button type="button" variant="outline" size="sm" className="h-9 flex-1" onClick={() => set((s) => ({ ...s, rotation: ((s.rotation + 90) % 360) as EditState["rotation"] }))}>
                  <RotateCw className="size-4" />90°
                </Button>
                <Button type="button" variant="outline" size="sm" className="h-9 flex-1" onClick={() => set((s) => ({ ...s, flipX: !s.flipX }))} aria-label={t("flipH")}>
                  <FlipHorizontal2 className="size-4" />
                </Button>
                <Button type="button" variant="outline" size="sm" className="h-9 flex-1" onClick={() => set((s) => ({ ...s, flipY: !s.flipY }))} aria-label={t("flipV")}>
                  <FlipVertical2 className="size-4" />
                </Button>
              </div>
            </Accordion>

            {/* Exposure */}
            <Accordion icon={SunMedium} label={t("sections.exposure")} open={section === "exposure"} onToggle={() => setSection(section === "exposure" ? null : "exposure")}>
              <SliderRow label={t("adjust.brightness")} value={state.adjustments.brightness} min={-1} max={1} step={0.01} onChange={(v) => patchAdjust({ brightness: v })} format={(v) => v.toFixed(2)} />
              <SliderRow label={t("adjust.contrast")} value={state.adjustments.contrast} min={-100} max={100} onChange={(v) => patchAdjust({ contrast: v })} />
            </Accordion>

            {/* Color */}
            <Accordion icon={Droplets} label={t("sections.color")} open={section === "color"} onToggle={() => setSection(section === "color" ? null : "color")}>
              <SliderRow label={t("adjust.saturation")} value={state.adjustments.saturation} min={-2} max={2} step={0.05} onChange={(v) => patchAdjust({ saturation: v })} format={(v) => v.toFixed(2)} />
              <SliderRow label={t("adjust.hue")} value={state.adjustments.hue} min={-180} max={180} onChange={(v) => patchAdjust({ hue: v })} format={(v) => `${v}°`} />
              <div className="flex gap-1.5 pt-1">
                {(["grayscale", "sepia", "invert"] as const).map((k) => (
                  <Button key={k} type="button" size="sm" variant={state.adjustments[k] ? "default" : "outline"} className="h-8 flex-1 text-xs"
                    onClick={() => patchAdjust({ [k]: !state.adjustments[k] } as Partial<Adjustments>, true)}>
                    {t(`presets.${k === "grayscale" ? "bw" : k}` as never) || k}
                  </Button>
                ))}
              </div>
            </Accordion>

            <p className="text-[11px] text-muted-foreground pt-1">{t("sections.advanced")}</p>
            <Accordion icon={Settings2} label={t("sections.advanced")} open={section === "advanced"} onToggle={() => setSection(section === "advanced" ? null : "advanced")}>
              <SliderRow label={t("adjust.sharpen")} value={state.adjustments.sharpen} min={0} max={1} step={0.02} onChange={(v) => patchAdjust({ sharpen: v })} format={(v) => v.toFixed(2)} />
              <SliderRow label={t("adjust.blur")} value={state.adjustments.blur} min={0} max={40} onChange={(v) => patchAdjust({ blur: v })} format={(v) => `${v}px`} />
              <SliderRow label={t("adjust.vignette")} value={state.adjustments.vignette} min={0} max={1} step={0.02} onChange={(v) => patchAdjust({ vignette: v })} format={(v) => v.toFixed(2)} />
              <SliderRow label={t("adjust.noise")} value={state.adjustments.noise} min={0} max={1} step={0.02} onChange={(v) => patchAdjust({ noise: v })} format={(v) => v.toFixed(2)} />
              <SliderRow label={t("presets.pixel")} value={state.adjustments.pixelate} min={0} max={32} onChange={(v) => patchAdjust({ pixelate: v })} format={(v) => (v < 2 ? "—" : `${Math.round(v)}`)} />
            </Accordion>

            <Button type="button" variant="outline" size="sm" className="w-full h-8 text-xs" onClick={() => set((s) => ({ ...s, adjustments: DEFAULT_ADJUSTMENTS, presetId: "original" }))}>
              {t("adjust.reset")}
            </Button>
          </>
        )}

        {rail === "filters" && (
          <div className="grid grid-cols-3 gap-2">
            {FILTER_PRESETS.map((p) => (
              <button key={p.id} type="button"
                onClick={() => set((s) => ({ ...s, presetId: p.id, adjustments: applyPreset(p) }))}
                className={cn("rounded-lg border px-2 py-3 text-xs transition-colors",
                  state.presetId === p.id ? "border-primary bg-primary/10 text-primary" : "hover:bg-accent/50")}>
                {t(`presets.${p.id}`)}
              </button>
            ))}
          </div>
        )}

        {rail === "text" && (
          <TextPanel
            selected={selected?.kind === "text" ? selected : null}
            onAdd={() => addOverlay(makeText({ text: t("text.sample"), x: logicalW * 0.1, y: logicalH * 0.4, fontSize: Math.max(24, Math.round(logicalW / 14)), width: Math.round(logicalW * 0.8) }))}
            onPatch={(patch) => selected && patchOverlay(selected.id, patch)}
            t={t}
          />
        )}

        {rail === "stickers" && (
          <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
            {STICKER_CATEGORIES.map((cat) => (
              <div key={cat.id}>
                <p className="text-xs text-muted-foreground mb-1">{t(`stickerCats.${cat.id}`)}</p>
                <div className="grid grid-cols-8 gap-1">
                  {cat.emojis.map((e) => (
                    <button key={e} type="button" className="text-xl hover:bg-accent/50 rounded p-0.5"
                      onClick={() => addOverlay(makeSticker(e, { x: logicalW / 2 - 48, y: logicalH / 2 - 48 }))}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {rail === "shapes" && (
          <ShapesPanel
            selected={selected?.kind === "shape" ? selected : null}
            onAdd={(shape) => addOverlay(makeShape(shape, "#7c3aed"))}
            onPatch={(patch) => selected && patchOverlay(selected.id, patch)}
            t={t}
          />
        )}

        {rail === "export" && (
          <ExportPanel
            getStage={() => stageRef.current}
            getRegion={() => ({ x: 0, y: 0, width: logicalW * fitScale, height: logicalH * fitScale })}
            fileName={fileName}
            defaultFormat="image/jpeg"
            pixelRatioOverride={exportPixelRatio}
            sizeLabel={`${outW} × ${outH} px`}
          />
        )}
      </div>

      {/* canvas column */}
      <div className="order-1 lg:order-3 space-y-2 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          {selected && (
            <Button type="button" variant="outline" size="sm" className="h-9 text-destructive" onClick={removeSelected}>
              <Trash2 className="size-4" />{t("deleteLayer")}
            </Button>
          )}
          <label className="ml-auto">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && handleFiles([...e.target.files])} />
            <span className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border text-sm cursor-pointer hover:bg-accent/50">
              <ImagePlus className="size-4" />{t("newImage")}
            </span>
          </label>
          <Button type="button" className="h-9" onClick={() => setRail("export")}>
            <Download className="size-4" />{t("download")}
          </Button>
        </div>

        <div ref={containerRef} className="relative bg-muted/60 rounded-xl border overflow-hidden flex items-center justify-center" style={{ minHeight: 340 }}>
          <Stage
            ref={stageRef}
            width={logicalW * fitScale}
            height={logicalH * fitScale}
            scaleX={fitScale}
            scaleY={fitScale}
            onMouseDown={(e) => e.target === e.target.getStage() && setSelectedId(null)}
            onTouchStart={(e) => e.target === e.target.getStage() && setSelectedId(null)}
          >
            <Layer>
              <Group x={logicalW / 2} y={logicalH / 2} rotation={state.rotation} offsetX={baseW / 2} offsetY={baseH / 2}
                scaleX={state.flipX ? -1 : 1} scaleY={state.flipY ? -1 : 1}>
                <KImage ref={photoRef} image={img} width={baseW} height={baseH} crop={cropRect ?? undefined} filters={filters} {...attrs} />
              </Group>
              {!comparing && state.adjustments.vignette > 0 && (
                <Rect width={logicalW} height={logicalH} listening={false}
                  fillRadialGradientStartPoint={{ x: logicalW / 2, y: logicalH / 2 }}
                  fillRadialGradientEndPoint={{ x: logicalW / 2, y: logicalH / 2 }}
                  fillRadialGradientStartRadius={Math.min(logicalW, logicalH) * 0.35}
                  fillRadialGradientEndRadius={Math.max(logicalW, logicalH) * 0.75}
                  fillRadialGradientColorStops={[0, "rgba(0,0,0,0)", 1, `rgba(0,0,0,${state.adjustments.vignette})`]} />
              )}
              <OverlayNodes overlays={state.overlays} selectedId={selectedId} onSelect={setSelectedId}
                onChange={(id, patch) => patchOverlay(id, patch)} onTextEdit={setEditingTextId} />
              {cropDraft && <CropUI draft={cropDraft} bounds={{ w: logicalW, h: logicalH }} onChange={setCropDraft} ratio={cropLock ? (cropRatio ?? cropDraft.width / cropDraft.height) : null} />}
            </Layer>
          </Stage>
          {(() => {
            if (!editingTextId) return null;
            const ov = state.overlays.find((o) => o.id === editingTextId);
            if (!ov || ov.kind !== "text") return null;
            return (
              <TextEditOverlay overlay={ov} stageScale={fitScale} stagePos={{ x: 0, y: 0 }}
                onCommit={(text) => { patchOverlay(editingTextId, { text }); setEditingTextId(null); }}
                onCancel={() => setEditingTextId(null)} />
            );
          })()}
        </div>

        {/* bottom status bar — FotoJet style */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Button type="button" variant="outline" size="sm" className="h-8" onClick={undo} disabled={!canUndo} aria-label={t("undo")}>
            <Undo2 className="size-3.5" />
          </Button>
          <Button type="button" variant="outline" size="sm" className="h-8" onClick={redo} disabled={!canRedo} aria-label={t("redo")}>
            <Redo2 className="size-3.5" />
          </Button>
          <Button type="button" variant="outline" size="sm" className="h-8 select-none"
            onPointerDown={() => setComparing(true)} onPointerUp={() => setComparing(false)} onPointerLeave={() => setComparing(false)}
            title={t("compareHint")}>
            <Eye className="size-3.5" />{t("compare")}
          </Button>
          <span className="ml-auto font-mono tabular-nums">
            {outW} × {outH} px{state.resize ? ` (${t("resize.resized")})` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

// ---- small composables ------------------------------------------------------

function Accordion({ icon: Icon, label, open, onToggle, children }: {
  icon: typeof CropIcon; label: string; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border">
      <button type="button" onClick={onToggle}
        className={cn("flex w-full items-center gap-2 px-3 py-2.5 text-sm transition-colors rounded-lg",
          open ? "text-primary" : "hover:bg-accent/40")}>
        <Icon className="size-4 shrink-0" />
        <span className="flex-1 text-left font-medium">{label}</span>
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="px-3 pb-3 space-y-2.5">{children}</div>}
    </div>
  );
}

function DimInputs({ w, h, locked, onToggleLock, onW, onH }: {
  w: number; h: number; locked: boolean; onToggleLock: () => void;
  onW: (v: number) => void; onH: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <NumField value={w} onCommit={onW} ariaLabel="width" />
      <button type="button" onClick={onToggleLock}
        className={cn("shrink-0 p-1.5 rounded-md border", locked ? "text-primary border-primary/50" : "text-muted-foreground")}
        aria-label="lock aspect ratio">
        {locked ? <Lock className="size-3.5" /> : <Unlock className="size-3.5" />}
      </button>
      <NumField value={h} onCommit={onH} ariaLabel="height" />
    </div>
  );
}

function ApplyCancel({ onApply, onCancel, applyLabel, cancelLabel }: {
  onApply: () => void; onCancel: () => void; applyLabel: string; cancelLabel: string;
}) {
  return (
    <div className="flex gap-2">
      <Button type="button" variant="outline" className="flex-1 h-9" onClick={onCancel}>
        <X className="size-4" />{cancelLabel}
      </Button>
      <Button type="button" className="flex-1 h-9" onClick={onApply}>
        <Check className="size-4" />{applyLabel}
      </Button>
    </div>
  );
}

// ---- crop UI (draggable + resizable rect with dim mask + thirds grid) -------
function CropUI({ draft, bounds, onChange, ratio }: {
  draft: CropRect;
  bounds: { w: number; h: number };
  onChange: (r: CropRect) => void;
  ratio: number | null;
}) {
  const rectRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);
  useEffect(() => {
    if (rectRef.current && trRef.current) {
      trRef.current.nodes([rectRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, []);
  const dim = "rgba(0,0,0,0.5)";
  const thirds = [1 / 3, 2 / 3];
  return (
    <>
      <Rect x={0} y={0} width={bounds.w} height={draft.y} fill={dim} listening={false} />
      <Rect x={0} y={draft.y + draft.height} width={bounds.w} height={bounds.h - draft.y - draft.height} fill={dim} listening={false} />
      <Rect x={0} y={draft.y} width={draft.x} height={draft.height} fill={dim} listening={false} />
      <Rect x={draft.x + draft.width} y={draft.y} width={bounds.w - draft.x - draft.width} height={draft.height} fill={dim} listening={false} />
      {/* rule-of-thirds grid */}
      {thirds.map((f) => (
        <Rect key={`v${f}`} x={draft.x + draft.width * f} y={draft.y} width={1} height={draft.height} fill="rgba(255,255,255,0.5)" listening={false} />
      ))}
      {thirds.map((f) => (
        <Rect key={`h${f}`} x={draft.x} y={draft.y + draft.height * f} width={draft.width} height={1} fill="rgba(255,255,255,0.5)" listening={false} />
      ))}
      <Rect
        ref={rectRef}
        x={draft.x} y={draft.y} width={draft.width} height={draft.height}
        stroke="#7c3aed" strokeWidth={2} dash={[8, 4]} draggable
        dragBoundFunc={(pos) => ({
          x: Math.max(0, Math.min(pos.x, bounds.w - draft.width)),
          y: Math.max(0, Math.min(pos.y, bounds.h - draft.height)),
        })}
        onDragEnd={(e) => onChange({ ...draft, x: e.target.x(), y: e.target.y() })}
        onTransformEnd={(e) => {
          const n = e.target;
          const w = Math.max(24, draft.width * n.scaleX());
          let h = Math.max(24, draft.height * n.scaleY());
          if (ratio) h = w / ratio;
          n.scaleX(1); n.scaleY(1);
          onChange({
            x: Math.max(0, n.x()),
            y: Math.max(0, n.y()),
            width: Math.min(w, bounds.w - Math.max(0, n.x())),
            height: Math.min(h, bounds.h - Math.max(0, n.y())),
          });
        }}
      />
      <KTransformer ref={trRef} rotateEnabled={false} anchorSize={12} borderEnabled={false} anchorStroke="#7c3aed" anchorFill="#fff" keepRatio={!!ratio} />
    </>
  );
}

// ---- text panel -------------------------------------------------------------
function TextPanel({ selected, onAdd, onPatch, t }: {
  selected: TextOverlay | null;
  onAdd: () => void;
  onPatch: (p: Partial<TextOverlay>) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="space-y-3">
      <Button type="button" className="w-full h-10" onClick={onAdd}>
        <TypeIcon className="size-4" />{t("text.add")}
      </Button>
      {selected ? (
        <>
          <p className="text-xs text-muted-foreground">{t("text.editHint")}</p>
          <div className="grid grid-cols-3 gap-1.5">
            {FONT_FAMILIES.map((f) => (
              <button key={f.id} type="button" onClick={() => onPatch({ fontId: f.id })}
                className={cn("rounded border px-1 py-1.5 text-[11px] truncate", selected.fontId === f.id ? "border-primary text-primary" : "hover:bg-accent/50")}
                style={{ fontFamily: f.css }}>
                {f.label}
              </button>
            ))}
          </div>
          <SliderRow label={t("text.size")} value={selected.fontSize} min={10} max={300} onChange={(v) => onPatch({ fontSize: v })} format={(v) => `${v}px`} />
          <ColorRow label={t("text.color")} value={selected.fill} onChange={(c) => onPatch({ fill: c })} />
          <SliderRow label={t("text.outline")} value={selected.strokeWidth ?? 0} min={0} max={12} onChange={(v) => onPatch({ strokeWidth: v })} format={(v) => `${v}px`} />
          {(selected.strokeWidth ?? 0) > 0 && (
            <ColorRow label={t("text.outlineColor")} value={selected.stroke ?? "#0a0a0a"} onChange={(c) => onPatch({ stroke: c })} />
          )}
          <div className="flex flex-wrap gap-1.5">
            {(["normal", "bold", "italic", "bold italic"] as const).map((s) => (
              <Button key={s} type="button" size="sm" variant={selected.fontStyle === s ? "default" : "outline"} className="h-8 text-xs" onClick={() => onPatch({ fontStyle: s })}>
                {t(`text.style.${s.replace(" ", "_")}`)}
              </Button>
            ))}
          </div>
          <div className="flex gap-1.5">
            {(["left", "center", "right"] as const).map((a) => (
              <Button key={a} type="button" size="sm" variant={selected.align === a ? "default" : "outline"} className="h-8 flex-1 text-xs" onClick={() => onPatch({ align: a })}>
                {t(`text.align.${a}`)}
              </Button>
            ))}
          </div>
          <SliderRow label={t("text.opacity")} value={selected.opacity} min={0.1} max={1} step={0.05} onChange={(v) => onPatch({ opacity: v })} format={(v) => `${Math.round(v * 100)}%`} />
        </>
      ) : (
        <p className="text-xs text-muted-foreground">{t("text.selectHint")}</p>
      )}
    </div>
  );
}

// ---- shapes panel -----------------------------------------------------------
function ShapesPanel({ selected, onAdd, onPatch, t }: {
  selected: import("./overlay-types").ShapeOverlay | null;
  onAdd: (s: ShapeType) => void;
  onPatch: (p: Partial<import("./overlay-types").ShapeOverlay>) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-1.5">
        {SHAPE_TYPES.map((s) => (
          <Button key={s} type="button" variant="outline" size="sm" className="h-9 text-xs" onClick={() => onAdd(s)}>
            {t(`shapeNames.${s}`)}
          </Button>
        ))}
      </div>
      {selected && (
        <>
          <ColorRow label={t("shapes.fill")} value={selected.fill} onChange={(c) => onPatch({ fill: c })} />
          <SliderRow label={t("shapes.strokeWidth")} value={selected.strokeWidth} min={0} max={20} onChange={(v) => onPatch({ strokeWidth: v })} format={(v) => `${v}px`} />
          {selected.strokeWidth > 0 && <ColorRow label={t("shapes.stroke")} value={selected.stroke} onChange={(c) => onPatch({ stroke: c })} />}
          {selected.shape === "rect" && (
            <SliderRow label={t("shapes.radius")} value={selected.cornerRadius ?? 0} min={0} max={80} onChange={(v) => onPatch({ cornerRadius: v })} format={(v) => `${v}px`} />
          )}
          <SliderRow label={t("text.opacity")} value={selected.opacity} min={0.1} max={1} step={0.05} onChange={(v) => onPatch({ opacity: v })} format={(v) => `${Math.round(v * 100)}%`} />
        </>
      )}
    </div>
  );
}
