"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Stage, Layer, Rect, Group, Image as KImage } from "react-konva";
import type Konva from "konva";
import { ImagePlus, Trash2, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COLLAGE_LAYOUTS, ASPECTS, type CollageLayout } from "@/lib/editor/collage-layouts";
import { SliderRow, ColorRow, ExportPanel } from "./controls";
import { cn } from "@/lib/utils";

const EXPORT_W = 2000;

interface PoolPhoto { id: string; url: string; el: HTMLImageElement }
interface CellState { photoId: string | null; offsetX: number; offsetY: number; zoom: number }

export default function CollageApp() {
  const t = useTranslations("collage");
  const [layout, setLayout] = useState<CollageLayout>(COLLAGE_LAYOUTS[2]);
  const [aspect, setAspect] = useState<(typeof ASPECTS)[number]>(ASPECTS[0]);
  const [pool, setPool] = useState<PoolPhoto[]>([]);
  const [cells, setCells] = useState<CellState[]>(() => COLLAGE_LAYOUTS[2].cells.map(() => ({ photoId: null, offsetX: 0, offsetY: 0, zoom: 1 })));
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [spacing, setSpacing] = useState(16);
  const [margin, setMargin] = useState(24);
  const [radius, setRadius] = useState(12);
  const [bg, setBg] = useState("#ffffff");

  const stageRef = useRef<Konva.Stage>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // cell index that triggered the picker; null = picker opened from the pool tile
  const pendingCellRef = useRef<number | null>(null);
  const photoSeq = useRef(0);
  const [containerW, setContainerW] = useState(720);

  const logicalW = EXPORT_W;
  const logicalH = Math.round(EXPORT_W / aspect.ratio);
  const fitScale = Math.min(containerW / logicalW, 560 / logicalH);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const ro = new ResizeObserver(() => setContainerW(node.clientWidth));
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  // keep cell state array in sync with layout size
  const pickLayout = (l: CollageLayout) => {
    setLayout(l);
    setCells((prev) => l.cells.map((_, i) => prev[i] ?? { photoId: null, offsetX: 0, offsetY: 0, zoom: 1 }));
    setSelectedCell(null);
  };

  // Add photos to the pool and place them into cells. Slot order is computed
  // up-front (target cell first, then remaining empty cells) so async image
  // loads can't race each other into the same cell.
  const addPhotos = useCallback((files: File[], targetIdx: number | null = null) => {
    const empties = cells.map((c, i) => (c.photoId === null ? i : -1)).filter((i) => i !== -1);
    const order = targetIdx !== null ? [targetIdx, ...empties.filter((i) => i !== targetIdx)] : empties;
    files.forEach((file, fi) => {
      const slot = order[fi];
      const url = URL.createObjectURL(file);
      const el = new window.Image();
      el.onload = () => {
        const photo = { id: `p-${++photoSeq.current}`, url, el };
        setPool((p) => [...p, photo]);
        if (slot !== undefined) {
          setCells((cur) => cur.map((c, i) => (i === slot ? { photoId: photo.id, offsetX: 0, offsetY: 0, zoom: 1 } : c)));
        }
      };
      el.src = url;
    });
  }, [cells]);

  const openPickerForCell = (i: number) => {
    pendingCellRef.current = i;
    fileInputRef.current?.click();
  };

  const handlePicked = (files: File[]) => {
    const target = pendingCellRef.current;
    pendingCellRef.current = null;
    addPhotos(files, target);
  };

  const assignToCell = (cellIdx: number, photoId: string) =>
    setCells((cs) => cs.map((c, i) => (i === cellIdx ? { ...c, photoId, offsetX: 0, offsetY: 0, zoom: 1 } : c)));

  const patchCell = (idx: number, patch: Partial<CellState>) =>
    setCells((cs) => cs.map((c, i) => (i === idx ? { ...c, ...patch } : c)));

  const photoById = useMemo(() => new Map(pool.map((p) => [p.id, p])), [pool]);
  const filledCount = cells.filter((c) => c.photoId).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
      <div className="space-y-3 min-w-0">
        <div ref={containerRef} className="bg-muted/60 rounded-xl border overflow-hidden flex items-center justify-center p-2">
          <Stage ref={stageRef} width={logicalW * fitScale} height={logicalH * fitScale} scaleX={fitScale} scaleY={fitScale}>
            <Layer>
              <Rect width={logicalW} height={logicalH} fill={bg} />
              {layout.cells.map((cell, i) => {
                const innerX = margin + cell.x * (logicalW - margin * 2) + spacing / 2;
                const innerY = margin + cell.y * (logicalH - margin * 2) + spacing / 2;
                const innerW = cell.w * (logicalW - margin * 2) - spacing;
                const innerH = cell.h * (logicalH - margin * 2) - spacing;
                const st = cells[i];
                const photo = st?.photoId ? photoById.get(st.photoId) : null;
                return (
                  <Group
                    key={i}
                    x={innerX}
                    y={innerY}
                    clipFunc={(ctx) => {
                      const r = Math.min(radius, innerW / 2, innerH / 2);
                      ctx.beginPath();
                      ctx.moveTo(r, 0);
                      ctx.arcTo(innerW, 0, innerW, innerH, r);
                      ctx.arcTo(innerW, innerH, 0, innerH, r);
                      ctx.arcTo(0, innerH, 0, 0, r);
                      ctx.arcTo(0, 0, innerW, 0, r);
                      ctx.closePath();
                    }}
                    onClick={() => {
                      setSelectedCell(i);
                      if (!st?.photoId) openPickerForCell(i);
                    }}
                    onTap={() => {
                      setSelectedCell(i);
                      if (!st?.photoId) openPickerForCell(i);
                    }}
                    onMouseEnter={(e) => { e.target.getStage()!.container().style.cursor = "pointer"; }}
                    onMouseLeave={(e) => { e.target.getStage()!.container().style.cursor = "default"; }}
                  >
                    <Rect width={innerW} height={innerH} fill={photo ? "#00000010" : selectedCell === i ? "#7c3aed22" : "#00000014"} />
                    {photo ? (
                      <CellImage photo={photo} cellW={innerW} cellH={innerH} state={st} onPan={(ox, oy) => patchCell(i, { offsetX: ox, offsetY: oy })} />
                    ) : (
                      <KPlus w={innerW} h={innerH} />
                    )}
                    {selectedCell === i && <Rect width={innerW} height={innerH} stroke="#7c3aed" strokeWidth={6} listening={false} />}
                  </Group>
                );
              })}
            </Layer>
          </Stage>
        </div>

        {/* shared picker: triggered by empty cells or the pool tile */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handlePicked([...e.target.files]);
            e.target.value = "";
          }}
        />

        {/* photo pool */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            className="shrink-0 flex items-center justify-center size-16 rounded-lg border-2 border-dashed cursor-pointer hover:border-primary text-muted-foreground"
            onClick={() => { pendingCellRef.current = null; fileInputRef.current?.click(); }}
            aria-label={t("poolHint")}
          >
            <ImagePlus className="size-5" />
          </button>
          {pool.map((p) => (
            <button
              key={p.id}
              type="button"
              className={cn("shrink-0 size-16 rounded-lg overflow-hidden border-2", selectedCell !== null ? "border-primary/60 hover:border-primary" : "border-transparent")}
              onClick={() => selectedCell !== null && assignToCell(selectedCell, p.id)}
              title={selectedCell !== null ? t("assignHint") : t("selectCellFirst")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- object URL thumbnails */}
              <img src={p.url} alt="" className="size-full object-cover" />
            </button>
          ))}
          {pool.length === 0 && <p className="text-xs text-muted-foreground">{t("poolHint")}</p>}
        </div>
        <p className="text-xs text-muted-foreground">{t("status", { filled: filledCount, total: layout.cells.length })}</p>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border bg-card p-4 space-y-4">
          {/* layouts */}
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">{t("layouts")}</p>
            <div className="grid grid-cols-5 gap-1.5 max-h-44 overflow-y-auto pr-1">
              {COLLAGE_LAYOUTS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => pickLayout(l)}
                  className={cn("relative aspect-square rounded border p-1", layout.id === l.id ? "border-primary bg-primary/10" : "hover:bg-accent/50")}
                  aria-label={l.id}
                >
                  {l.cells.map((c, i) => (
                    <span key={i} className="absolute bg-muted-foreground/50 rounded-[1px]" style={{ left: `${8 + c.x * 84}%`, top: `${8 + c.y * 84}%`, width: `${c.w * 84 - 3}%`, height: `${c.h * 84 - 3}%` }} />
                  ))}
                </button>
              ))}
            </div>
          </div>
          {/* aspect */}
          <div className="flex flex-wrap gap-1.5">
            {ASPECTS.map((a) => (
              <Button key={a.id} type="button" size="sm" variant={aspect.id === a.id ? "default" : "outline"} className="h-8 text-xs" onClick={() => setAspect(a)}>
                {a.id}
              </Button>
            ))}
          </div>
          <SliderRow label={t("spacing")} value={spacing} min={0} max={80} onChange={setSpacing} format={(v) => `${v}px`} />
          <SliderRow label={t("margin")} value={margin} min={0} max={120} onChange={setMargin} format={(v) => `${v}px`} />
          <SliderRow label={t("radius")} value={radius} min={0} max={100} onChange={setRadius} format={(v) => `${v}px`} />
          <ColorRow label={t("background")} value={bg} onChange={setBg} />
          {selectedCell !== null && cells[selectedCell]?.photoId && (
            <div className="space-y-2 border-t pt-3">
              <p className="text-xs font-medium flex items-center gap-1"><ZoomIn className="size-3.5" />{t("cellControls", { n: selectedCell + 1 })}</p>
              <SliderRow label={t("zoom")} value={cells[selectedCell].zoom} min={1} max={3} step={0.05} onChange={(v) => patchCell(selectedCell, { zoom: v })} format={(v) => `${v.toFixed(2)}x`} />
              <Button type="button" variant="outline" size="sm" className="w-full h-8 text-xs text-destructive" onClick={() => patchCell(selectedCell, { photoId: null })}>
                <Trash2 className="size-3.5" />{t("clearCell")}
              </Button>
            </div>
          )}
        </div>
        <div className="rounded-xl border bg-card p-4">
          <ExportPanel getStage={() => stageRef.current} fileName="collage" defaultFormat="image/jpeg" />
        </div>
      </div>
    </div>
  );
}

/** Cover-fit image with drag-to-pan inside its clipped cell. */
function CellImage({ photo, cellW, cellH, state, onPan }: {
  photo: { el: HTMLImageElement };
  cellW: number;
  cellH: number;
  state: { offsetX: number; offsetY: number; zoom: number };
  onPan: (ox: number, oy: number) => void;
}) {
  const iw = photo.el.naturalWidth;
  const ih = photo.el.naturalHeight;
  const cover = Math.max(cellW / iw, cellH / ih) * state.zoom;
  const w = iw * cover;
  const h = ih * cover;
  const minX = cellW - w;
  const minY = cellH - h;
  const x = Math.max(minX, Math.min(0, (cellW - w) / 2 + state.offsetX));
  const y = Math.max(minY, Math.min(0, (cellH - h) / 2 + state.offsetY));
  return (
    <KImage
      image={photo.el}
      x={x}
      y={y}
      width={w}
      height={h}
      draggable
      dragBoundFunc={(pos) => ({ x: Math.max(minX, Math.min(0, pos.x)), y: Math.max(minY, Math.min(0, pos.y)) })}
      onDragEnd={(e) => onPan(e.target.x() - (cellW - w) / 2, e.target.y() - (cellH - h) / 2)}
    />
  );
}

function KPlus({ w, h }: { w: number; h: number }) {
  const s = Math.min(w, h) * 0.12;
  return (
    <Group listening={false}>
      <Rect x={w / 2 - s / 2} y={h / 2 - s / 6} width={s} height={s / 3} fill="#9ca3af" cornerRadius={s / 6} />
      <Rect x={w / 2 - s / 6} y={h / 2 - s / 2} width={s / 3} height={s} fill="#9ca3af" cornerRadius={s / 6} />
    </Group>
  );
}
