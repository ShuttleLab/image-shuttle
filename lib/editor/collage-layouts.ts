// Programmatic collage layouts. Each cell is a fractional rect (0..1) of the
// canvas. Unlike FotoJet's fixed template list, grids are generated — any
// count from 2-9 gets multiple arrangements.

export interface Cell { x: number; y: number; w: number; h: number }
export interface CollageLayout { id: string; cells: Cell[] }

function grid(cols: number, rows: number): Cell[] {
  const cells: Cell[] = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      cells.push({ x: c / cols, y: r / rows, w: 1 / cols, h: 1 / rows });
  return cells;
}

export const COLLAGE_LAYOUTS: CollageLayout[] = [
  // pure grids
  { id: "g-1x2", cells: grid(2, 1) },
  { id: "g-2x1", cells: grid(1, 2) },
  { id: "g-2x2", cells: grid(2, 2) },
  { id: "g-3x1", cells: grid(1, 3) },
  { id: "g-1x3", cells: grid(3, 1) },
  { id: "g-3x2", cells: grid(3, 2) },
  { id: "g-2x3", cells: grid(2, 3) },
  { id: "g-3x3", cells: grid(3, 3) },
  // feature splits
  { id: "f-left-2", cells: [{ x: 0, y: 0, w: 2 / 3, h: 1 }, { x: 2 / 3, y: 0, w: 1 / 3, h: 0.5 }, { x: 2 / 3, y: 0.5, w: 1 / 3, h: 0.5 }] },
  { id: "f-right-2", cells: [{ x: 1 / 3, y: 0, w: 2 / 3, h: 1 }, { x: 0, y: 0, w: 1 / 3, h: 0.5 }, { x: 0, y: 0.5, w: 1 / 3, h: 0.5 }] },
  { id: "f-top-3", cells: [{ x: 0, y: 0, w: 1, h: 2 / 3 }, { x: 0, y: 2 / 3, w: 1 / 3, h: 1 / 3 }, { x: 1 / 3, y: 2 / 3, w: 1 / 3, h: 1 / 3 }, { x: 2 / 3, y: 2 / 3, w: 1 / 3, h: 1 / 3 }] },
  { id: "f-bottom-3", cells: [{ x: 0, y: 1 / 3, w: 1, h: 2 / 3 }, { x: 0, y: 0, w: 1 / 3, h: 1 / 3 }, { x: 1 / 3, y: 0, w: 1 / 3, h: 1 / 3 }, { x: 2 / 3, y: 0, w: 1 / 3, h: 1 / 3 }] },
  { id: "f-left-3", cells: [{ x: 0, y: 0, w: 0.6, h: 1 }, { x: 0.6, y: 0, w: 0.4, h: 1 / 3 }, { x: 0.6, y: 1 / 3, w: 0.4, h: 1 / 3 }, { x: 0.6, y: 2 / 3, w: 0.4, h: 1 / 3 }] },
  { id: "f-center", cells: [{ x: 0.25, y: 0.25, w: 0.5, h: 0.5 }, { x: 0, y: 0, w: 0.5, h: 0.25 }, { x: 0.5, y: 0, w: 0.5, h: 0.25 }, { x: 0, y: 0.75, w: 0.5, h: 0.25 }, { x: 0.5, y: 0.75, w: 0.5, h: 0.25 }, { x: 0, y: 0.25, w: 0.25, h: 0.5 }, { x: 0.75, y: 0.25, w: 0.25, h: 0.5 }] },
  // asymmetric artful
  { id: "a-double-stack", cells: [{ x: 0, y: 0, w: 0.5, h: 2 / 3 }, { x: 0, y: 2 / 3, w: 0.5, h: 1 / 3 }, { x: 0.5, y: 0, w: 0.5, h: 1 / 3 }, { x: 0.5, y: 1 / 3, w: 0.5, h: 2 / 3 }] },
  { id: "a-columns", cells: [{ x: 0, y: 0, w: 1 / 3, h: 1 }, { x: 1 / 3, y: 0, w: 1 / 3, h: 0.5 }, { x: 1 / 3, y: 0.5, w: 1 / 3, h: 0.5 }, { x: 2 / 3, y: 0, w: 1 / 3, h: 1 }] },
  { id: "a-mosaic-5", cells: [{ x: 0, y: 0, w: 0.5, h: 0.5 }, { x: 0.5, y: 0, w: 0.5, h: 1 / 3 }, { x: 0.5, y: 1 / 3, w: 0.5, h: 1 / 3 }, { x: 0, y: 0.5, w: 0.5, h: 0.5 }, { x: 0.5, y: 2 / 3, w: 0.5, h: 1 / 3 }] },
  { id: "a-strips", cells: [{ x: 0, y: 0, w: 1, h: 0.4 }, { x: 0, y: 0.4, w: 0.5, h: 0.6 }, { x: 0.5, y: 0.4, w: 0.5, h: 0.6 }] },
  { id: "g-4x2", cells: grid(4, 2) },
  { id: "g-2x4", cells: grid(2, 4) },
];

export const ASPECTS = [
  { id: "1:1", ratio: 1 },
  { id: "4:5", ratio: 4 / 5 },
  { id: "3:4", ratio: 3 / 4 },
  { id: "4:3", ratio: 4 / 3 },
  { id: "16:9", ratio: 16 / 9 },
  { id: "9:16", ratio: 9 / 16 },
] as const;
