"use client";

import { useState } from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { CanvasMode, CanvasState } from "~/types/canvas";
import { useCanRedo, useCanUndo, useHistory } from "@/liveblocks.config";

interface CanvasParams {
  hiveId: string;
}

export default function Canvas({ hiveId }: CanvasParams) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <main className="relative h-screen w-full touch-none bg-muted">
      <Info hiveId={hiveId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    </main>
  );
}
