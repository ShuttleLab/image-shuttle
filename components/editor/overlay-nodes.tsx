"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Text, Rect, Circle, RegularPolygon, Star, Line, Arrow, Image as KImage, Transformer } from "react-konva";
import type Konva from "konva";
import { resolveFontFamily } from "@/lib/editor/assets";
import type { Overlay, TextOverlay } from "./overlay-types";

interface OverlayLayerProps {
  overlays: Overlay[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onChange: (id: string, patch: Partial<Overlay>) => void;
  onTextEdit: (id: string) => void;
  listening?: boolean;
}

function useImageElement(src: string) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    const el = new window.Image();
    el.onload = () => setImg(el);
    el.src = src;
  }, [src]);
  return img;
}

function OverlayImage({ ov, common }: { ov: Extract<Overlay, { kind: "image" }>; common: Konva.NodeConfig }) {
  const img = useImageElement(ov.src);
  if (!img) return null;
  return <KImage image={img} width={ov.width} height={ov.height} {...common} />;
}

export function OverlayNodes({ overlays, selectedId, onSelect, onChange, onTextEdit, listening = true }: OverlayLayerProps) {
  const trRef = useRef<Konva.Transformer>(null);
  const nodeRefs = useRef<Map<string, Konva.Node>>(new Map());

  useEffect(() => {
    const tr = trRef.current;
    if (!tr) return;
    const node = selectedId ? nodeRefs.current.get(selectedId) : null;
    tr.nodes(node ? [node] : []);
    tr.getLayer()?.batchDraw();
  }, [selectedId, overlays]);

  const bind = (ov: Overlay): Konva.NodeConfig & Record<string, unknown> => ({
    x: ov.x,
    y: ov.y,
    rotation: ov.rotation,
    opacity: ov.opacity,
    draggable: listening,
    listening,
    ref: (n: Konva.Node | null) => {
      if (n) nodeRefs.current.set(ov.id, n);
      else nodeRefs.current.delete(ov.id);
    },
    onClick: () => onSelect(ov.id),
    onTap: () => onSelect(ov.id),
    onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) =>
      onChange(ov.id, { x: e.target.x(), y: e.target.y() }),
    onTransformEnd: (e: Konva.KonvaEventObject<Event>) => {
      const node = e.target;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      node.scaleX(1);
      node.scaleY(1);
      const patch: Partial<Overlay> = { x: node.x(), y: node.y(), rotation: node.rotation() };
      if (ov.kind === "text" || ov.kind === "sticker") {
        (patch as Partial<TextOverlay>).fontSize = Math.max(6, Math.round(ov.fontSize * scaleY));
        if (ov.kind === "text" && ov.width) (patch as Partial<TextOverlay>).width = Math.max(20, ov.width * scaleX);
      } else {
        (patch as { width?: number; height?: number }).width = Math.max(4, ov.width * scaleX);
        (patch as { width?: number; height?: number }).height = Math.max(4, ov.height * scaleY);
      }
      onChange(ov.id, patch);
    },
  });

  return (
    <Fragment>
      {overlays.map((ov) => {
        const common = bind(ov);
        switch (ov.kind) {
          case "text":
            return (
              <Text
                key={ov.id}
                {...common}
                text={ov.text}
                fontFamily={resolveFontFamily(ov.fontId)}
                fontSize={ov.fontSize}
                fontStyle={ov.fontStyle}
                fill={ov.fill}
                stroke={ov.strokeWidth ? ov.stroke : undefined}
                strokeWidth={ov.strokeWidth || 0}
                fillAfterStrokeEnabled
                align={ov.align}
                width={ov.width}
                shadowColor="rgba(0,0,0,0.45)"
                shadowBlur={ov.shadow ? 8 : 0}
                shadowOffsetY={ov.shadow ? 2 : 0}
                shadowEnabled={!!ov.shadow}
                onDblClick={() => onTextEdit(ov.id)}
                onDblTap={() => onTextEdit(ov.id)}
              />
            );
          case "sticker":
            return <Text key={ov.id} {...common} text={ov.emoji} fontSize={ov.fontSize} />;
          case "shape": {
            const shapeCommon = {
              ...common,
              fill: ov.fill,
              stroke: ov.strokeWidth ? ov.stroke : undefined,
              strokeWidth: ov.strokeWidth,
            };
            switch (ov.shape) {
              case "rect":
                return <Rect key={ov.id} {...shapeCommon} width={ov.width} height={ov.height} cornerRadius={ov.cornerRadius} />;
              case "circle":
                return <Circle key={ov.id} {...shapeCommon} radius={Math.min(ov.width, ov.height) / 2} />;
              case "triangle":
                return <RegularPolygon key={ov.id} {...shapeCommon} sides={3} radius={Math.min(ov.width, ov.height) / 2} />;
              case "star":
                return (
                  <Star key={ov.id} {...shapeCommon} numPoints={5} innerRadius={Math.min(ov.width, ov.height) / 4} outerRadius={Math.min(ov.width, ov.height) / 2} />
                );
              case "line":
                return <Line key={ov.id} {...shapeCommon} points={[0, 0, ov.width, 0]} strokeWidth={Math.max(2, ov.height)} stroke={ov.fill} hitStrokeWidth={20} />;
              case "arrow":
                return <Arrow key={ov.id} {...shapeCommon} points={[0, 0, ov.width, 0]} strokeWidth={Math.max(2, ov.height)} stroke={ov.fill} fill={ov.fill} pointerLength={Math.max(8, ov.height * 3)} pointerWidth={Math.max(8, ov.height * 3)} hitStrokeWidth={20} />;
            }
            return null;
          }
          case "image":
            return <OverlayImage key={ov.id} ov={ov} common={common} />;
        }
      })}
      {listening && (
        <Transformer
          ref={trRef}
          rotateEnabled
          anchorSize={12}
          anchorCornerRadius={6}
          borderStroke="#7c3aed"
          anchorStroke="#7c3aed"
          anchorFill="#ffffff"
          keepRatio={false}
          enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right", "middle-left", "middle-right"]}
          boundBoxFunc={(oldBox, newBox) => (newBox.width < 8 || newBox.height < 8 ? oldBox : newBox)}
        />
      )}
    </Fragment>
  );
}

/** Inline HTML textarea positioned over a Konva.Text node for editing. */
export function TextEditOverlay({
  overlay,
  stageScale,
  stagePos,
  onCommit,
  onCancel,
}: {
  overlay: TextOverlay;
  stageScale: number;
  stagePos: { x: number; y: number };
  onCommit: (text: string) => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  const left = stagePos.x + overlay.x * stageScale;
  const top = stagePos.y + overlay.y * stageScale;

  return (
    <textarea
      ref={ref}
      defaultValue={overlay.text}
      onBlur={(e) => onCommit(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onCommit((e.target as HTMLTextAreaElement).value);
        }
        if (e.key === "Escape") onCancel();
      }}
      className="absolute z-20 bg-background/95 border border-primary rounded-md p-2 text-foreground shadow-lg resize-none outline-none"
      style={{
        left,
        top,
        minWidth: 160,
        fontSize: Math.max(14, overlay.fontSize * stageScale * 0.6),
        fontFamily: "inherit",
      }}
      rows={2}
      aria-label="Edit text"
    />
  );
}
