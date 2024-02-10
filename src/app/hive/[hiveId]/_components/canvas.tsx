"use client";

import React, { useCallback, useMemo, useState } from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
} from "~/types/canvas";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useStorage,
} from "@/liveblocks.config";
import { CursorPresence } from "./cursors-presence";
import { connectionToColor, pointerEventToCanvasPoint } from "~/lib/utils";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";

interface CanvasParams {
  hiveId: string;
}

const MAX_LAYERS = 100;

export default function Canvas({ hiveId }: CanvasParams) {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 5,
    g: 5,
    b: 5,
    a: 1,
  });

  const layerIds = useStorage((root) => root.layerIds);

  const selections = useOthersMapped((other) => {
    return other.presence.selection;
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionToColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  const onLayerPointerDown = useMutation(
    (ctx, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if (!ctx.self.presence.selection.includes(layerId)) {
        ctx.setMyPresence(
          {
            selection: [layerId],
          },
          {
            addToHistory: true,
          },
        );
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        current: point,
      });
    },
    [canvasState, history, camera, canvasState.mode],
  );

  const insertLayer = useMutation(
    (
      ctx,
      layerType:
        | LayerType.Circle
        | LayerType.Rectangle
        | LayerType.Note
        | LayerType.Text,
      position: Point,
    ) => {
      const liveLayers = ctx.storage.get("layers");

      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = ctx.storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      ctx.setMyPresence(
        {
          selection: [layerId],
        },
        {
          addToHistory: true,
        },
      );

      setCanvasState({
        mode: CanvasMode.None,
      });
    },
    [lastUsedColor],
  );

  /* --------------------------------- Events --------------------------------- */
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

  const onPointerUp = useMutation(
    (ctx, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(LayerType.Rectangle, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer],
  );

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
        onPointerUp={onPointerUp}
      >
        <motion.g
          initial={{ x: 0, y: 0 }}
          animate={{ x: camera.x, y: camera.y }}
          transition={{
            type: "tween",
            duration: 0.2,
          }}
        >
          {layerIds.map((layerId) => {
            return (
              <LayerPreview
                key={layerId}
                id={layerId}
                onLayerPointerDown={onLayerPointerDown}
                selectionColor={layerIdsToColorSelection[layerId]}
              />
            );
          })}
          <SelectionBox onResizeHandlePointerDown={() => {}} />
          <CursorPresence />
        </motion.g>
      </svg>
    </main>
  );
}
