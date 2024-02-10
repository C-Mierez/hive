"use client";

import { useCallback, useState } from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { Camera, CanvasMode, CanvasState } from "~/types/canvas";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from "@/liveblocks.config";
import { CursorPresence } from "./cursors-presence";
import { pointerEventToCanvasPoint } from "~/lib/utils";

interface CanvasParams {
  hiveId: string;
}

export default function Canvas({ hiveId }: CanvasParams) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((prev) => {
      return {
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      };
    });
  }, []);

  const onPointerMove = useMutation((ctx, e: React.PointerEvent) => {
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e, camera);

    ctx.setMyPresence({ cursor: current });
  }, []);

  const onPointerLeave = useMutation((ctx) => {
    ctx.setMyPresence({ cursor: null });
  }, []);

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
      {/* Canvas */}
      <svg
        className="h-screen w-full"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorPresence />
        </g>
      </svg>
    </main>
  );
}
