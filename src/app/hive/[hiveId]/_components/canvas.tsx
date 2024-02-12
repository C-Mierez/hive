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
  Side,
  XYHW,
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
import {
  connectionToColor,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "~/lib/utils";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";
import SelectionToolbar from "./selection-toolbar";

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

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYHW) => {
      history.pause();
      setCanvasState({
        mode: CanvasMode.Resizing,
        corner,
        initialBounds,
      });
    },
    [history],
  );

  /* --------------------------------- Actions -------------------------------- */
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

  const translateSelectedLayers = useMutation(
    (ctx, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) {
        return;
      }

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = ctx.storage.get("layers");

      for (const id of ctx.self.presence.selection) {
        const layer = liveLayers.get(id);

        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        current: point,
      });
    },
    [canvasState],
  );

  const resizeSelectedLayer = useMutation(
    (ctx, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point,
      );

      const liveLayers = ctx.storage.get("layers");
      const layer = liveLayers.get(ctx.self.presence.selection[0]!);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState],
  );

  const unselectSelectedLayers = useMutation((ctx) => {
    if (ctx.self.presence.selection.length > 0) {
      ctx.setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  /* --------------------------------- Events --------------------------------- */
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((prev) => {
      return {
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY,
      };
    });
  }, []);

  const onPointerMove = useMutation(
    (ctx, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayers(current);
      }

      if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      }

      ctx.setMyPresence({ cursor: current });
    },
    [canvasState, camera, resizeSelectedLayer, translateSelectedLayers],
  );

  const onPointerLeave = useMutation((ctx) => {
    ctx.setMyPresence({ cursor: null });
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) {
        return;
      }

      setCanvasState({
        mode: CanvasMode.Pressing,
        origin: point,
      });
    },
    [canvasState.mode, camera, setCanvasState],
  );

  const onPointerUp = useMutation(
    (ctx, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectSelectedLayers();
        setCanvasState({
          mode: CanvasMode.None,
        });
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(LayerType.Rectangle, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer, unselectSelectedLayers],
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
      <SelectionToolbar camera={camera} setLastUsedColor={setLastUsedColor} />

      {/* Canvas */}
      <svg
        className="h-screen w-full"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
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
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          <CursorPresence />
        </motion.g>
      </svg>
    </main>
  );
}
