"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Stage, Layer, Rect } from "react-konva";
import type Konva from "konva";
import {
  Type as TypeIcon, Smile, Shapes as ShapesIcon, ImagePlus, Layers as LayersIcon,
  Download, Undo2, Redo2, Trash2, Copy, ArrowUp, ArrowDown, AlignCenterHorizontal,
  AlignCenterVertical, LayoutTemplate, Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHistory } from "@/lib/editor/use-history";
import { CANVAS_PRESETS, DESIGN_TEMPLATES, type DesignDoc } from "@/lib/editor/design-presets";
import { FONT_FAMILIES, STICKER_CATEGORIES, SHAPE_TYPES } from "@/lib/editor/assets";
import { OverlayNodes, TextEditOverlay } from "./overlay-nodes";
import { makeShape, makeSticker, makeText, overlayId, type Overlay, type TextOverlay, type ShapeOverlay } from "./overlay-types";
import { SliderRow, ColorRow, ExportPanel } from "./controls";
import { cn } from "@/lib/utils";

type Panel = "templates" | "canvas" | "text" | "stickers" | "shapes" | "layers" | "export";

const INITIAL: DesignDoc = {
  width: 1200,
  height: 630,
  bg: { type: "gradient", color1: "#7c3aed", color2: "#4c1d95", angle: 135 },
  overlays: [],
};

export default function DesignApp() {
  const t = useTranslations("design");
  const tEditor = useTranslations("editor");
  const { state: doc, set, undo, redo, reset, canUndo, canRedo } = useHistory<DesignDoc>(INITIAL);
  const [panel, setPanel] = useState<Panel>("templates");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);

  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(760);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const ro = new ResizeObserver(() => setContainerW(node.clientWidth));
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const fitScale = Math.min(containerW / doc.width, 560 / doc.height, 1);

  const gradientProps = useMemo(() => {
    if (doc.bg.type === "solid") return { fill: doc.bg.color1 };
    const rad = (doc.bg.angle * Math.PI) / 180;
    const cx = doc.width / 2, cy = doc.height / 2;
    const len = Math.max(doc.width, doc.height);
    return {
      fillLinearGradientStartPoint: { x: cx - (Math.cos(rad) * len) / 2, y: cy - (Math.sin(rad) * len) / 2 },
      fillLinearGradientEndPoint: { x: cx + (Math.cos(rad) * len) / 2, y: cy + (Math.sin(rad) * len) / 2 },
      fillLinearGradientColorStops: [0, doc.bg.color1, 1, doc.bg.color2],
    };
  }, [doc.bg, doc.width, doc.height]);

  const addOverlay = (ov: Overlay) => {
    set((d) => ({ ...d, overlays: [...d.overlays, ov] }));
    setSelectedId(ov.id);
  };
  const patchOverlay = (id: string, patch: Partial<Overlay>) =>
    set((d) => ({ ...d, overlays: d.overlays.map((o) => (o.id === id ? ({ ...o, ...patch } as Overlay) : o)) }));
  const selected = doc.overlays.find((o) => o.id === selectedId) ?? null;

  const removeOverlay = (id: string) => {
    set((d) => ({ ...d, overlays: d.overlays.filter((o) => o.id !== id) }));
    if (selectedId === id) setSelectedId(null);
  };
  const duplicateOverlay = (id: string) => {
    const src = doc.overlays.find((o) => o.id === id);
    if (!src) return;
    const copy = { ...src, id: overlayId(), x: src.x + 24, y: src.y + 24 } as Overlay;
    addOverlay(copy);
  };
  const moveLayer = (id: string, dir: 1 | -1) =>
    set((d) => {
      const idx = d.overlays.findIndex((o) => o.id === id);
      const to = idx + dir;
      if (idx < 0 || to < 0 || to >= d.overlays.length) return d;
      const arr = [...d.overlays];
      [arr[idx], arr[to]] = [arr[to], arr[idx]];
      return { ...d, overlays: arr };
    });

  const centerSelected = (axis: "h" | "v") => {
    if (!selected) return;
    const stage = stageRef.current;
    const node = stage?.findOne((n: Konva.Node) => n.id?.() === undefined && false); // not used; compute from overlay metrics below
    void node;
    // approximate centering using overlay's own dimensions
    if (selected.kind === "text") {
      const w = selected.width ?? 200;
      patchOverlay(selected.id, axis === "h" ? { x: (doc.width - w) / 2 } : { y: doc.height / 2 - selected.fontSize / 2 });
    } else if (selected.kind === "sticker") {
      patchOverlay(selected.id, axis === "h" ? { x: doc.width / 2 - selected.fontSize / 2 } : { y: doc.height / 2 - selected.fontSize / 2 });
    } else if (selected.kind === "shape") {
      if (selected.shape === "circle" || selected.shape === "triangle" || selected.shape === "star") {
        patchOverlay(selected.id, axis === "h" ? { x: doc.width / 2 } : { y: doc.height / 2 });
      } else {
        patchOverlay(selected.id, axis === "h" ? { x: (doc.width - selected.width) / 2 } : { y: (doc.height - selected.height) / 2 });
      }
    } else {
      patchOverlay(selected.id, axis === "h" ? { x: (doc.width - selected.width) / 2 } : { y: (doc.height - selected.height) / 2 });
    }
  };

  const applyTemplate = (tplId: string) => {
    const tpl = DESIGN_TEMPLATES.find((x) => x.id === tplId);
    if (!tpl) return;
    const w = tpl.size.w, h = tpl.size.h;
    const { bg, overlays } = tpl.build(w, h);
    reset({ width: w, height: h, bg, overlays });
    setSelectedId(null);
  };

  const addImage = (file: File) => {
    const url = URL.createObjectURL(file);
    const el = new window.Image();
    el.onload = () => {
      const scale = Math.min(1, (doc.width * 0.5) / el.naturalWidth);
      addOverlay({
        id: overlayId(), kind: "image", src: url,
        x: doc.width * 0.25, y: doc.height * 0.25,
        width: el.naturalWidth * scale, height: el.naturalHeight * scale,
        rotation: 0, opacity: 1,
      });
    };
    el.src = url;
  };

  const PANEL_TABS: { id: Panel; icon: typeof TypeIcon; label: string }[] = [
    { id: "templates", icon: LayoutTemplate, label: t("tabs.templates") },
    { id: "canvas", icon: Palette, label: t("tabs.canvas") },
    { id: "text", icon: TypeIcon, label: tEditor("tabs.text") },
    { id: "stickers", icon: Smile, label: tEditor("tabs.stickers") },
    { id: "shapes", icon: ShapesIcon, label: tEditor("tabs.shapes") },
    { id: "layers", icon: LayersIcon, label: t("tabs.layers") },
    { id: "export", icon: Download, label: tEditor("tabs.export") },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
      <div className="space-y-2 min-w-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <Button type="button" variant="outline" size="sm" className="h-9" onClick={undo} disabled={!canUndo} aria-label={tEditor("undo")}><Undo2 className="size-4" /></Button>
          <Button type="button" variant="outline" size="sm" className="h-9" onClick={redo} disabled={!canRedo} aria-label={tEditor("redo")}><Redo2 className="size-4" /></Button>
          {selected && (
            <>
              <span className="w-px h-6 bg-border mx-1" />
              <Button type="button" variant="outline" size="sm" className="h-9" onClick={() => centerSelected("h")} aria-label={t("centerH")}><AlignCenterHorizontal className="size-4" /></Button>
              <Button type="button" variant="outline" size="sm" className="h-9" onClick={() => centerSelected("v")} aria-label={t("centerV")}><AlignCenterVertical className="size-4" /></Button>
              <Button type="button" variant="outline" size="sm" className="h-9" onClick={() => duplicateOverlay(selected.id)} aria-label={t("duplicate")}><Copy className="size-4" /></Button>
              <Button type="button" variant="outline" size="sm" className="h-9 text-destructive" onClick={() => removeOverlay(selected.id)} aria-label={tEditor("deleteLayer")}><Trash2 className="size-4" /></Button>
            </>
          )}
          <span className="ml-auto text-xs text-muted-foreground font-mono">{doc.width}×{doc.height}</span>
        </div>

        <div ref={containerRef} className="relative bg-muted/60 rounded-xl border overflow-auto flex items-center justify-center p-3" style={{ minHeight: 380 }}>
          <Stage
            ref={stageRef}
            width={doc.width * fitScale}
            height={doc.height * fitScale}
            scaleX={fitScale}
            scaleY={fitScale}
            onMouseDown={(e) => e.target === e.target.getStage() && setSelectedId(null)}
            onTouchStart={(e) => e.target === e.target.getStage() && setSelectedId(null)}
          >
            <Layer>
              <Rect width={doc.width} height={doc.height} {...gradientProps} onClick={() => setSelectedId(null)} onTap={() => setSelectedId(null)} />
              <OverlayNodes
                overlays={doc.overlays}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onChange={(id, patch) => patchOverlay(id, patch)}
                onTextEdit={setEditingTextId}
              />
            </Layer>
          </Stage>
          {(() => {
            if (!editingTextId) return null;
            const ov = doc.overlays.find((o) => o.id === editingTextId);
            if (!ov || ov.kind !== "text") return null;
            return (
              <TextEditOverlay
                overlay={ov}
                stageScale={fitScale}
                stagePos={{ x: 12, y: 12 }}
                onCommit={(text) => { patchOverlay(editingTextId, { text }); setEditingTextId(null); }}
                onCancel={() => setEditingTextId(null)}
              />
            );
          })()}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex lg:grid lg:grid-cols-7 gap-1 overflow-x-auto pb-1">
          {PANEL_TABS.map(({ id, icon: Icon, label }) => (
            <button key={id} type="button" onClick={() => setPanel(id)}
              className={cn("flex flex-col items-center gap-0.5 rounded-md px-2 py-1.5 text-[10px] min-w-12 transition-colors",
                panel === id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent/50")}>
              <Icon className="size-4" />{label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-4 space-y-4">
          {panel === "templates" && (
            <div className="grid grid-cols-2 gap-2 max-h-[440px] overflow-y-auto pr-1">
              {DESIGN_TEMPLATES.map((tpl) => (
                <button key={tpl.id} type="button" onClick={() => applyTemplate(tpl.id)}
                  className="rounded-lg border p-2 text-left hover:border-primary/60 hover:bg-accent/30 transition-colors">
                  <span className="block text-xs font-medium">{t(`templates.${tpl.id}`)}</span>
                  <span className="block text-[10px] text-muted-foreground font-mono mt-0.5">{tpl.size.w}×{tpl.size.h}</span>
                </button>
              ))}
            </div>
          )}

          {panel === "canvas" && (
            <>
              <div>
                <p className="text-xs text-muted-foreground mb-1.5">{t("sizePresets")}</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {CANVAS_PRESETS.map((p) => (
                    <Button key={p.id} type="button" size="sm"
                      variant={doc.width === p.w && doc.height === p.h ? "default" : "outline"}
                      className="h-8 text-xs justify-start"
                      onClick={() => set((d) => ({ ...d, width: p.w, height: p.h }))}>
                      {t(`sizes.${p.id}`)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="space-y-1">
                  <span className="text-xs text-muted-foreground">{t("widthPx")}</span>
                  <input type="number" min={64} max={4096} value={doc.width}
                    onChange={(e) => set((d) => ({ ...d, width: Math.max(64, Math.min(4096, parseInt(e.target.value) || 64)) }))}
                    className="w-full h-9 px-2 rounded-md border bg-background text-sm font-mono" />
                </label>
                <label className="space-y-1">
                  <span className="text-xs text-muted-foreground">{t("heightPx")}</span>
                  <input type="number" min={64} max={4096} value={doc.height}
                    onChange={(e) => set((d) => ({ ...d, height: Math.max(64, Math.min(4096, parseInt(e.target.value) || 64)) }))}
                    className="w-full h-9 px-2 rounded-md border bg-background text-sm font-mono" />
                </label>
              </div>
              <div className="flex gap-1.5">
                {(["solid", "gradient"] as const).map((bt) => (
                  <Button key={bt} type="button" size="sm" variant={doc.bg.type === bt ? "default" : "outline"} className="h-8 flex-1 text-xs"
                    onClick={() => set((d) => ({ ...d, bg: { ...d.bg, type: bt } }))}>
                    {t(`bg.${bt}`)}
                  </Button>
                ))}
              </div>
              <ColorRow label={t("bg.color1")} value={doc.bg.color1} onChange={(c) => set((d) => ({ ...d, bg: { ...d.bg, color1: c } }))} />
              {doc.bg.type === "gradient" && (
                <>
                  <ColorRow label={t("bg.color2")} value={doc.bg.color2} onChange={(c) => set((d) => ({ ...d, bg: { ...d.bg, color2: c } }))} />
                  <SliderRow label={t("bg.angle")} value={doc.bg.angle} min={0} max={360} onChange={(v) => set((d) => ({ ...d, bg: { ...d.bg, angle: v } }), false)} format={(v) => `${v}°`} />
                </>
              )}
            </>
          )}

          {panel === "text" && (
            <DTextPanel
              selected={selected?.kind === "text" ? selected : null}
              onAdd={() => addOverlay(makeText({ text: t("sampleText"), x: doc.width * 0.1, y: doc.height * 0.4, width: Math.round(doc.width * 0.8), fontSize: Math.max(24, Math.round(doc.width / 14)), shadow: false }))}
              onPatch={(p) => selected && patchOverlay(selected.id, p)}
              t={tEditor}
            />
          )}

          {panel === "stickers" && (
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {STICKER_CATEGORIES.map((cat) => (
                <div key={cat.id}>
                  <p className="text-xs text-muted-foreground mb-1">{tEditor(`stickerCats.${cat.id}`)}</p>
                  <div className="grid grid-cols-8 gap-1">
                    {cat.emojis.map((e) => (
                      <button key={e} type="button" className="text-xl hover:bg-accent/50 rounded p-0.5"
                        onClick={() => addOverlay(makeSticker(e, { x: doc.width / 2 - 48, y: doc.height / 2 - 48 }))}>
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {panel === "shapes" && (
            <DShapesPanel
              selected={selected?.kind === "shape" ? selected : null}
              onAdd={(s) => addOverlay(makeShape(s, "#7c3aed"))}
              onPatch={(p) => selected && patchOverlay(selected.id, p)}
              t={tEditor}
            />
          )}

          {panel === "layers" && (
            <div className="space-y-2">
              <label className="block">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && addImage(e.target.files[0])} />
                <span className="flex items-center justify-center gap-1.5 h-9 rounded-md border text-sm cursor-pointer hover:bg-accent/50">
                  <ImagePlus className="size-4" />{t("addImage")}
                </span>
              </label>
              {doc.overlays.length === 0 && <p className="text-xs text-muted-foreground">{t("noLayers")}</p>}
              <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
                {[...doc.overlays].reverse().map((ov) => (
                  <div key={ov.id}
                    className={cn("flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-xs cursor-pointer",
                      selectedId === ov.id ? "border-primary bg-primary/5" : "hover:bg-accent/30")}
                    onClick={() => setSelectedId(ov.id)}>
                    <span className="flex-1 truncate">
                      {ov.kind === "text" ? `T · ${ov.text.slice(0, 18)}` : ov.kind === "sticker" ? ov.emoji : ov.kind === "shape" ? t(`shapeKind`) + ` · ${ov.shape}` : t("imageKind")}
                    </span>
                    <button type="button" className="p-1 hover:text-primary" onClick={(e) => { e.stopPropagation(); moveLayer(ov.id, 1); }} aria-label={t("layerUp")}><ArrowUp className="size-3" /></button>
                    <button type="button" className="p-1 hover:text-primary" onClick={(e) => { e.stopPropagation(); moveLayer(ov.id, -1); }} aria-label={t("layerDown")}><ArrowDown className="size-3" /></button>
                    <button type="button" className="p-1 hover:text-destructive" onClick={(e) => { e.stopPropagation(); removeOverlay(ov.id); }} aria-label={tEditor("deleteLayer")}><Trash2 className="size-3" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {panel === "export" && (
            <ExportPanel getStage={() => stageRef.current} fileName="design" defaultFormat="image/png" />
          )}
        </div>
      </div>
    </div>
  );
}

// Slim text/shape panels (mirror the editor's, kept local to avoid coupling)
function DTextPanel({ selected, onAdd, onPatch, t }: {
  selected: TextOverlay | null;
  onAdd: () => void;
  onPatch: (p: Partial<TextOverlay>) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="space-y-3">
      <Button type="button" className="w-full h-10" onClick={onAdd}><TypeIcon className="size-4" />{t("text.add")}</Button>
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
          <SliderRow label={t("text.size")} value={selected.fontSize} min={10} max={400} onChange={(v) => onPatch({ fontSize: v })} format={(v) => `${v}px`} />
          <ColorRow label={t("text.color")} value={selected.fill} onChange={(c) => onPatch({ fill: c })} />
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

function DShapesPanel({ selected, onAdd, onPatch, t }: {
  selected: ShapeOverlay | null;
  onAdd: (s: (typeof SHAPE_TYPES)[number]) => void;
  onPatch: (p: Partial<ShapeOverlay>) => void;
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
            <SliderRow label={t("shapes.radius")} value={selected.cornerRadius ?? 0} min={0} max={120} onChange={(v) => onPatch({ cornerRadius: v })} format={(v) => `${v}px`} />
          )}
          <SliderRow label={t("text.opacity")} value={selected.opacity} min={0.1} max={1} step={0.05} onChange={(v) => onPatch({ opacity: v })} format={(v) => `${Math.round(v * 100)}%`} />
        </>
      )}
    </div>
  );
}
