"use client";

import { useCallback, useState } from "react";

interface Hist<T> {
  past: T[];
  present: T;
  future: T[];
}

/**
 * Snapshot-based undo/redo backed entirely by React state (no refs — safe to
 * read during render). State must be JSON-serializable; snapshots are
 * parametric edit descriptions, never pixel data, so copies are cheap.
 */
export function useHistory<T>(initial: T, limit = 60) {
  const [hist, setHist] = useState<Hist<T>>({ past: [], present: initial, future: [] });

  const set = useCallback(
    (next: T | ((prev: T) => T), record = true) => {
      setHist((h) => {
        const value = typeof next === "function" ? (next as (p: T) => T)(h.present) : next;
        if (record && JSON.stringify(h.present) !== JSON.stringify(value)) {
          const past = [...h.past, h.present];
          if (past.length > limit) past.shift();
          return { past, present: value, future: [] };
        }
        return { ...h, present: value };
      });
    },
    [limit],
  );

  const undo = useCallback(() => {
    setHist((h) => {
      if (h.past.length === 0) return h;
      const past = [...h.past];
      const last = past.pop() as T;
      return { past, present: last, future: [...h.future, h.present] };
    });
  }, []);

  const redo = useCallback(() => {
    setHist((h) => {
      if (h.future.length === 0) return h;
      const future = [...h.future];
      const next = future.pop() as T;
      return { past: [...h.past, h.present], present: next, future };
    });
  }, []);

  const reset = useCallback((value: T) => {
    setHist({ past: [], present: value, future: [] });
  }, []);

  return {
    state: hist.present,
    set,
    undo,
    redo,
    reset,
    canUndo: hist.past.length > 0,
    canRedo: hist.future.length > 0,
  };
}
