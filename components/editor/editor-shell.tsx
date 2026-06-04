"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Konva touches `window` on import — must be client-only.
const Loading = () => (
  <div className="flex items-center justify-center min-h-[360px] text-muted-foreground">
    <Loader2 className="size-6 animate-spin" />
  </div>
);

export const EditorShell = dynamic(() => import("./editor-app"), { ssr: false, loading: Loading });
export const CollageShell = dynamic(() => import("./collage-app"), { ssr: false, loading: Loading });
export const DesignShell = dynamic(() => import("./design-app"), { ssr: false, loading: Loading });
