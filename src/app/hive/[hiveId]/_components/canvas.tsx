"use client";

import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  connectionToColor,
  findIntersectingLayersWithRectangle,
  penPointsToPathLayer,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "~/lib/utils";
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

import { CursorPresence } from "./cursors-presence";
import Info from "./info";
import LayerPath from "./layers/layer-path";
import { LayerPreview } from "./layers/layer-preview";
import Participants from "./participants";
import { SelectionBox } from "./selection-box";
import SelectionToolbar from "./selection-toolbar";
import Toolbar from "./toolbar";
import useDisableScrollBounce from "~/hooks/use-disable-scroll-bounce";
import useDeleteLayers from "~/hooks/use-delete-layeres";

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

  useDisableScrollBounce();

  const layerIds = useStorage((root) => root.layerIds);

  const selections = useOthersMapped((other) => {
    return other.presence.selection;
  });

  const pencilDraft = useSelf((me) => {
    return me.presence.pencilDraft;
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

  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    // Threshold for starting multi-selection
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });
    }
  }, []);

  const updateMultiSelection = useMutation(
    (ctx, current: Point, origin: Point) => {
      const layers = ctx.storage.get("layers").toImmutable();

      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });

      const ids = findIntersectingLayersWithRectangle(
        layerIds,
        layers,
        origin,
        current,
      );

      ctx.setMyPresence({
        selection: ids,
      });
    },
    [layerIds],
  );

  const startDrawing = useMutation(
    (ctx, point: Point, pressure: number) => {
      ctx.setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      });
    },
    [lastUsedColor],
  );

  const updateDrawing = useMutation(
    (ctx, point: Point, e: React.PointerEvent) => {
      const { pencilDraft } = ctx.self.presence;

      if (
        canvasState.mode !== CanvasMode.Pencil ||
        e.buttons !== 1 ||
        pencilDraft == null
      ) {
        return;
      }

      ctx.setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0]![0] === point.x &&
          pencilDraft[0]![1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode],
  );

  const insertPath = useMutation(
    (ctx) => {
      const liveLayers = ctx.storage.get("layers");

      const { pencilDraft } = ctx.self.presence;

      if (
        pencilDraft == null ||
        pencilDraft.length < 2 ||
        liveLayers.size >= MAX_LAYERS
      ) {
        ctx.setMyPresence({
          pencilDraft: null,
        });
        return;
      }

      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor)),
      );

      const liveLayerIds = ctx.storage.get("layerIds");
      liveLayerIds.push(id);

      ctx.setMyPresence({
        pencilDraft: null,
      });

      setCanvasState({ mode: CanvasMode.Pencil });
    },
    [lastUsedColor, setCanvasState],
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

  const onPointerMove = useMutation(
    (ctx, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayers(current);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.Pencil) {
        updateDrawing(current, e);
      }

      ctx.setMyPresence({ cursor: current });
    },
    [
      canvasState,
      camera,
      resizeSelectedLayer,
      translateSelectedLayers,
      startMultiSelection,
      updateMultiSelection,
    ],
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

      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure);
        return;
      }

      setCanvasState({
        mode: CanvasMode.Pressing,
        origin: point,
      });
    },
    [canvasState.mode, camera, setCanvasState, startDrawing],
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
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPath();
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }

      history.resume();
    },
    [
      camera,
      canvasState,
      setCanvasState,
      history,
      insertLayer,
      unselectSelectedLayers,
      insertPath,
    ],
  );

  /* -------------------------------- Shortcuts ------------------------------- */
  const deleteLayers = useDeleteLayers();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "z": {
          if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) {
              history.redo();
            } else {
              history.undo();
            }
            break;
          }
        }
        case "Delete":
          deleteLayers();
          break;
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [deleteLayers, history]);

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
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current != null && (
              <rect
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
                className="fill-accent/25 stroke-accent stroke-2"
              />
            )}
          <CursorPresence />
          {pencilDraft != null && pencilDraft.length > 0 && (
            <LayerPath points={pencilDraft} fill={lastUsedColor} x={0} y={0} />
          )}
        </motion.g>
      </svg>
    </main>
  );
}
