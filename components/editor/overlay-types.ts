import type { ShapeType } from "@/lib/editor/assets";

interface OverlayBase {
  id: string;
  x: number;
  y: number;
  rotation: number;
  draggable?: boolean;
}

export interface TextOverlay extends OverlayBase {
  kind: "text";
  text: string;
  fontId: string;
  fontSize: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  fontStyle: "normal" | "bold" | "italic" | "bold italic";
  align: "left" | "center" | "right";
  width?: number;
  opacity: number;
  shadow?: boolean;
}

export interface StickerOverlay extends OverlayBase {
  kind: "sticker";
  emoji: string;
  fontSize: number;
  opacity: number;
}

export interface ShapeOverlay extends OverlayBase {
  kind: "shape";
  shape: ShapeType;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  cornerRadius?: number;
  opacity: number;
}

export interface ImageOverlay extends OverlayBase {
  kind: "image";
  src: string; // object URL
  width: number;
  height: number;
  opacity: number;
}

export type Overlay = TextOverlay | StickerOverlay | ShapeOverlay | ImageOverlay;

let counter = 0;
export const overlayId = () => `ov-${Date.now().toString(36)}-${++counter}`;

export function makeText(partial: Partial<TextOverlay> & { text: string }): TextOverlay {
  return {
    id: overlayId(),
    kind: "text",
    x: 80,
    y: 80,
    rotation: 0,
    fontId: "geist",
    fontSize: 48,
    fill: "#ffffff",
    stroke: "#0a0a0a",
    strokeWidth: 0,
    fontStyle: "bold",
    align: "center",
    opacity: 1,
    shadow: true,
    ...partial,
  };
}

export function makeSticker(emoji: string, pos?: { x: number; y: number }): StickerOverlay {
  return { id: overlayId(), kind: "sticker", emoji, x: pos?.x ?? 100, y: pos?.y ?? 100, rotation: 0, fontSize: 96, opacity: 1 };
}

export function makeShape(shape: ShapeType, fill: string): ShapeOverlay {
  return {
    id: overlayId(),
    kind: "shape",
    shape,
    x: 120,
    y: 120,
    rotation: 0,
    width: 160,
    height: shape === "line" || shape === "arrow" ? 4 : 160,
    fill,
    stroke: "transparent",
    strokeWidth: 0,
    cornerRadius: shape === "rect" ? 8 : 0,
    opacity: 1,
  };
}
