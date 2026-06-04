"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Stage, Layer, Image as KImage, Rect, Group, Transformer as KTransformer } from "react-konva";
import type Konva from "konva";
import {
  SlidersHorizontal, Wand2, Type as TypeIcon, Smile, Shapes as ShapesIcon,
  Crop as CropIcon, Download, Undo2, Redo2, RotateCw, FlipHorizontal2,
  FlipVertical2, ImagePlus, Check, X, Trash2,
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
import { SliderRow, ColorRow, ExportPanel } from "./controls";
import { cn } from "@/lib/utils";

interface CropRect { x: number; y: number; width: number; height: number }

interface EditState {
  adjustments: Adjustments;
  presetId: string;
  overlays: Overlay[];
  crop: CropRect | null; // in natural image coords
  rotation: 0 | 90 | 180 | 270;
  flipX: boolean;
  flipY: boolean;
}

const INITIAL: EditState = {
  adjustments: DEFAULT_ADJUSTMENTS,
  presetId: "original",
  overlays: [],
  crop: null,
  rotation: 0,
  flipX: false,
  flipY: false,
};

type Panel = "adjust" | "filters" | "text" | "stickers" | "shapes" | "crop" | "export";

export default function EditorApp() {
  const t = useTranslations("editor");
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState("edited");
  const { state, set, undo, redo, reset, canUndo, canRedo } = useHistory<EditState>(INITIAL);
  const [panel, setPanel] = useState<Panel>("adjust");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [cropDraft, setCropDraft] = useState<CropRect | null>(null);

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
    };
    el.src = url;
  }, [reset]);

  // ---- responsive stage ---------------------------------------------------
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const ro = new ResizeObserver(() => {
      setContainerSize({ w: node.clientWidth, h: Math.max(360, Math.min(640, window.innerHeight - 280)) });
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, [img]);

  // Effective (post-crop) logical size, before 90° rotation
  const cropRect: CropRect | null = state.crop;
  const baseW = cropRect ? cropRect.width : img?.naturalWidth ?? 1;
  const baseH = cropRect ? cropRect.height : img?.naturalHeight ?? 1;
  const rotated = state.rotation === 90 || state.rotation === 270;
  const logicalW = rotated ? baseH : baseW;
  const logicalH = rotated ? baseW : baseH;
  const fitScale = Math.min(containerSize.w / logicalW, containerSize.h / logicalH, 1);

  // ---- konva filters ------------------------------------------------------
  const { filters, attrs } = useMemo(() => konvaFiltersFor(state.adjustments), [state.adjustments]);
  useEffect(() => {
    const node = photoRef.current;
    if (!node || !img) return;
    if (filters.length > 0) node.cache();
    else node.clearCache();
    node.getLayer()?.batchDraw();
  }, [filters, attrs, img, state.crop, state.rotation, state.flipX, state.flipY, fitScale]);

  const patchAdjust = (patch: Partial<Adjustments>, record = false) =>
    set((s) => ({ ...s, presetId: "custom", adjustments: { ...s.adjustments, ...patch } }), record);

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
    const m = Math.round(Math.min(logicalW, logicalH) * 0.1);
    setCropDraft({ x: m, y: m, width: logicalW - m * 2, height: logicalH - m * 2 });
    setPanel("crop");
    setSelectedId(null);
  };
  const applyCrop = () => {
    if (!cropDraft) return;
    // cropDraft is in current logical coords; only support crop at rotation 0 for v1 math simplicity
    const prev = state.crop ?? { x: 0, y: 0, width: img?.naturalWidth ?? 0, height: img?.naturalHeight ?? 0 };
    const next: CropRect = {
      x: prev.x + Math.max(0, Math.round(cropDraft.x)),
      y: prev.y + Math.max(0, Math.round(cropDraft.y)),
      width: Math.round(Math.min(cropDraft.width, prev.width)),
      height: Math.round(Math.min(cropDraft.height, prev.height)),
    };
    set((s) => ({ ...s, crop: next }));
    setCropDraft(null);
  };
  const cropDisabled = state.rotation !== 0;

  // ---- export region ------------------------------------------------------
  const getRegion = () => ({ x: 0, y: 0, width: logicalW * fitScale, height: logicalH * fitScale });
  // Export at natural resolution regardless of on-screen scale:
  const getStageForExport = () => {
    const stage = stageRef.current;
    if (!stage) return null;
    return stage;
  };

  const PANEL_TABS: { id: Panel; icon: typeof SlidersHorizontal; label: string }[] = [
    { id: "adjust", icon: SlidersHorizontal, label: t("tabs.adjust") },
    { id: "filters", icon: Wand2, label: t("tabs.filters") },
    { id: "text", icon: TypeIcon, label: t("tabs.text") },
    { id: "stickers", icon: Smile, label: t("tabs.stickers") },
    { id: "shapes", icon: ShapesIcon, label: t("tabs.shapes") },
    { id: "crop", icon: CropIcon, label: t("tabs.crop") },
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
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
      {/* Canvas area */}
      <div className="space-y-2 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <Button type="button" variant="outline" size="sm" className="h-9" onClick={undo} disabled={!canUndo} aria-label={t("undo")}>
            <Undo2 className="size-4" />
          </Button>
          <Button type="button" variant="outline" size="sm" className="h-9" onClick={redo} disabled={!canRedo} aria-label={t("redo")}>
            <Redo2 className="size-4" />
          </Button>
          <span className="w-px h-6 bg-border mx-1" />
          <Button type="button" variant="outline" size="sm" className="h-9" onClick={() => set((s) => ({ ...s, rotation: ((s.rotation + 90) % 360) as EditState["rotation"] }))}>
            <RotateCw className="size-4" />90°
          </Button>
          <Button type="button" variant="outline" size="sm" className="h-9" onClick={() => set((s) => ({ ...s, flipX: !s.flipX }))} aria-label={t("flipH")}>
            <FlipHorizontal2 className="size-4" />
          </Button>
          <Button type="button" variant="outline" size="sm" className="h-9" onClick={() => set((s) => ({ ...s, flipY: !s.flipY }))} aria-label={t("flipV")}>
            <FlipVertical2 className="size-4" />
          </Button>
          <span className="w-px h-6 bg-border mx-1" />
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
        </div>

        <div ref={containerRef} className="relative bg-muted/60 rounded-xl border overflow-hidden flex items-center justify-center" style={{ minHeight: 360 }}>
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
              <Group
                x={logicalW / 2}
                y={logicalH / 2}
                rotation={state.rotation}
                offsetX={baseW / 2}
                offsetY={baseH / 2}
                scaleX={state.flipX ? -1 : 1}
                scaleY={state.flipY ? -1 : 1}
              >
                <KImage
                  ref={photoRef}
                  image={img}
                  width={baseW}
                  height={baseH}
                  crop={cropRect ?? undefined}
                  filters={filters}
                  {...attrs}
                />
              </Group>
              {state.adjustments.vignette > 0 && (
                <Rect
                  width={logicalW}
                  height={logicalH}
                  listening={false}
                  fillRadialGradientStartPoint={{ x: logicalW / 2, y: logicalH / 2 }}
                  fillRadialGradientEndPoint={{ x: logicalW / 2, y: logicalH / 2 }}
                  fillRadialGradientStartRadius={Math.min(logicalW, logicalH) * 0.35}
                  fillRadialGradientEndRadius={Math.max(logicalW, logicalH) * 0.75}
                  fillRadialGradientColorStops={[0, "rgba(0,0,0,0)", 1, `rgba(0,0,0,${state.adjustments.vignette})`]}
                />
              )}
              <OverlayNodes
                overlays={state.overlays}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onChange={(id, patch) => patchOverlay(id, patch)}
                onTextEdit={setEditingTextId}
              />
              {cropDraft && (
                <CropUI draft={cropDraft} bounds={{ w: logicalW, h: logicalH }} onChange={setCropDraft} />
              )}
            </Layer>
          </Stage>
          {(() => {
            if (!editingTextId) return null;
            const ov = state.overlays.find((o) => o.id === editingTextId);
            if (!ov || ov.kind !== "text") return null;
            return (
              <TextEditOverlay
                overlay={ov}
                stageScale={fitScale}
                stagePos={{ x: 0, y: 0 }}
                onCommit={(text) => { patchOverlay(editingTextId, { text }); setEditingTextId(null); }}
                onCancel={() => setEditingTextId(null)}
              />
            );
          })()}
        </div>
        <p className="text-xs text-muted-foreground">{t("canvasHint", { w: logicalW, h: logicalH })}</p>
      </div>

      {/* Control panel */}
      <div className="space-y-3">
        <div className="flex lg:grid lg:grid-cols-7 gap-1 overflow-x-auto pb-1">
          {PANEL_TABS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setPanel(id)}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-md px-2 py-1.5 text-[10px] min-w-12 transition-colors",
                panel === id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent/50",
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-4 space-y-4">
          {panel === "adjust" && (
            <>
              <SliderRow label={t("adjust.brightness")} value={state.adjustments.brightness} min={-1} max={1} step={0.01} onChange={(v) => patchAdjust({ brightness: v })} format={(v) => v.toFixed(2)} />
              <SliderRow label={t("adjust.contrast")} value={state.adjustments.contrast} min={-100} max={100} onChange={(v) => patchAdjust({ contrast: v })} />
              <SliderRow label={t("adjust.saturation")} value={state.adjustments.saturation} min={-2} max={2} step={0.05} onChange={(v) => patchAdjust({ saturation: v })} format={(v) => v.toFixed(2)} />
              <SliderRow label={t("adjust.hue")} value={state.adjustments.hue} min={-180} max={180} onChange={(v) => patchAdjust({ hue: v })} format={(v) => `${v}°`} />
              <SliderRow label={t("adjust.blur")} value={state.adjustments.blur} min={0} max={40} onChange={(v) => patchAdjust({ blur: v })} format={(v) => `${v}px`} />
              <SliderRow label={t("adjust.sharpen")} value={state.adjustments.sharpen} min={0} max={1} step={0.02} onChange={(v) => patchAdjust({ sharpen: v })} format={(v) => v.toFixed(2)} />
              <SliderRow label={t("adjust.vignette")} value={state.adjustments.vignette} min={0} max={1} step={0.02} onChange={(v) => patchAdjust({ vignette: v })} format={(v) => v.toFixed(2)} />
              <SliderRow label={t("adjust.noise")} value={state.adjustments.noise} min={0} max={1} step={0.02} onChange={(v) => patchAdjust({ noise: v })} format={(v) => v.toFixed(2)} />
              <Button type="button" variant="outline" size="sm" className="w-full h-9" onClick={() => set((s) => ({ ...s, adjustments: DEFAULT_ADJUSTMENTS, presetId: "original" }))}>
                {t("adjust.reset")}
              </Button>
            </>
          )}

          {panel === "filters" && (
            <div className="grid grid-cols-3 gap-2">
              {FILTER_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => set((s) => ({ ...s, presetId: p.id, adjustments: applyPreset(p) }))}
                  className={cn(
                    "rounded-lg border px-2 py-3 text-xs transition-colors",
                    state.presetId === p.id ? "border-primary bg-primary/10 text-primary" : "hover:bg-accent/50",
                  )}
                >
                  {t(`presets.${p.id}`)}
                </button>
              ))}
            </div>
          )}

          {panel === "text" && (
            <TextPanel
              selected={selected?.kind === "text" ? selected : null}
              onAdd={() => addOverlay(makeText({ text: t("text.sample"), x: logicalW * 0.1, y: logicalH * 0.4, fontSize: Math.max(24, Math.round(logicalW / 14)), width: Math.round(logicalW * 0.8) }))}
              onPatch={(patch) => selected && patchOverlay(selected.id, patch)}
              t={t}
            />
          )}

          {panel === "stickers" && (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {STICKER_CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <p className="text-xs text-muted-foreground mb-1">{t(`stickerCats.${cat.id}`)}</p>
                  <div className="grid grid-cols-8 gap-1">
                    {cat.emojis.map((e) => (
                      <button
                        key={e}
                        type="button"
                        className="text-xl hover:bg-accent/50 rounded p-0.5"
                        onClick={() => addOverlay(makeSticker(e, { x: logicalW / 2 - 48, y: logicalH / 2 - 48 }))}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {panel === "shapes" && (
            <ShapesPanel
              selected={selected?.kind === "shape" ? selected : null}
              onAdd={(shape) => addOverlay(makeShape(shape, "#7c3aed"))}
              onPatch={(patch) => selected && patchOverlay(selected.id, patch)}
              t={t}
            />
          )}

          {panel === "crop" && (
            <div className="space-y-3">
              {cropDisabled && <p className="text-xs text-destructive">{t("crop.rotateFirst")}</p>}
              {!cropDraft ? (
                <Button type="button" className="w-full h-10" onClick={startCrop} disabled={cropDisabled}>
                  <CropIcon className="size-4" />{t("crop.start")}
                </Button>
              ) : (
                <>
                  <div className="grid grid-cols-4 gap-1.5">
                    {([["free", null], ["1:1", 1], ["4:3", 4 / 3], ["16:9", 16 / 9]] as const).map(([label, ratio]) => (
                      <Button
                        key={label}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => {
                          if (!cropDraft) return;
                          if (ratio === null) return;
                          const w = cropDraft.width;
                          const h = w / ratio;
                          setCropDraft({ ...cropDraft, height: Math.min(h, logicalH - cropDraft.y) });
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" className="flex-1 h-10" onClick={applyCrop}>
                      <Check className="size-4" />{t("crop.apply")}
                    </Button>
                    <Button type="button" variant="outline" className="flex-1 h-10" onClick={() => setCropDraft(null)}>
                      <X className="size-4" />{t("crop.cancel")}
                    </Button>
                  </div>
                </>
              )}
              {state.crop && (
                <Button type="button" variant="outline" size="sm" className="w-full h-9" onClick={() => set((s) => ({ ...s, crop: null }))}>
                  {t("crop.clear")}
                </Button>
              )}
            </div>
          )}

          {panel === "export" && (
            <ExportPanel getStage={getStageForExport} getRegion={getRegion} fileName={fileName} defaultFormat="image/jpeg" />
          )}
        </div>
      </div>
    </div>
  );
}

// ---- crop UI (draggable + resizable rect with dim mask) --------------------
function CropUI({ draft, bounds, onChange }: {
  draft: CropRect;
  bounds: { w: number; h: number };
  onChange: (r: CropRect) => void;
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
  return (
    <>
      <Rect x={0} y={0} width={bounds.w} height={draft.y} fill={dim} listening={false} />
      <Rect x={0} y={draft.y + draft.height} width={bounds.w} height={bounds.h - draft.y - draft.height} fill={dim} listening={false} />
      <Rect x={0} y={draft.y} width={draft.x} height={draft.height} fill={dim} listening={false} />
      <Rect x={draft.x + draft.width} y={draft.y} width={bounds.w - draft.x - draft.width} height={draft.height} fill={dim} listening={false} />
      <Rect
        ref={rectRef}
        x={draft.x}
        y={draft.y}
        width={draft.width}
        height={draft.height}
        stroke="#7c3aed"
        strokeWidth={2}
        dash={[8, 4]}
        draggable
        dragBoundFunc={(pos) => ({
          x: Math.max(0, Math.min(pos.x, bounds.w - draft.width)),
          y: Math.max(0, Math.min(pos.y, bounds.h - draft.height)),
        })}
        onDragEnd={(e) => onChange({ ...draft, x: e.target.x(), y: e.target.y() })}
        onTransformEnd={(e) => {
          const n = e.target;
          const w = Math.max(24, draft.width * n.scaleX());
          const h = Math.max(24, draft.height * n.scaleY());
          n.scaleX(1); n.scaleY(1);
          onChange({
            x: Math.max(0, n.x()),
            y: Math.max(0, n.y()),
            width: Math.min(w, bounds.w - Math.max(0, n.x())),
            height: Math.min(h, bounds.h - Math.max(0, n.y())),
          });
        }}
      />
      <KTransformer ref={trRef} rotateEnabled={false} anchorSize={12} borderEnabled={false} anchorStroke="#7c3aed" anchorFill="#fff" />
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
              <button
                key={f.id}
                type="button"
                onClick={() => onPatch({ fontId: f.id })}
                className={cn("rounded border px-1 py-1.5 text-[11px] truncate", selected.fontId === f.id ? "border-primary text-primary" : "hover:bg-accent/50")}
                style={{ fontFamily: f.css }}
              >
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
