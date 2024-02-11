"use client";

import { useSelf, useStorage } from "@/liveblocks.config";
import { memo } from "react";
import useSelectionBounds from "~/hooks/use-selection-bounds";
import { connectionToColor } from "~/lib/utils";
import { LayerType, Side, XYHW } from "~/types/canvas";

interface SelectionBox {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYHW) => void;
}

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBox) => {
    const soleLayerId = useSelf((me) => {
      return me.presence.selection.length === 1
        ? me.presence.selection[0]
        : null;
    });

    const isShowingHandle = useStorage((root) => {
      return (
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
      );
    });

    const bounds = useSelectionBounds();

    if (!bounds) {
      return null;
    }

    const connectionId = useSelf((me) => {
      return me.connectionId;
    });

    // const strokeColor = connectionId
    //   ? connectionToColor(connectionId)
    //   : "black";

    const strokeColor = "#FE9148";

    return (
      <>
        <rect
          className="pointer-events-none fill-transparent stroke-2"
          style={{
            transform: `translate(${bounds.x}px, ${bounds.y}px)`,
          }}
          x={0}
          y={0}
          stroke={strokeColor}
          width={bounds.width}
          height={bounds.height}
        />
        {isShowingHandle && (
          <>
            {/* --------------------------------- Corners -------------------------------- */}
            <rect
              className="fill-white stroke-1 "
              x={0}
              y={0}
              stroke={strokeColor}
              style={{
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${
                  bounds.y - HANDLE_WIDTH / 2
                }px)`,
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
            />
            <rect
              className="fill-white stroke-1 "
              x={0}
              y={0}
              stroke={strokeColor}
              style={{
                transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${
                  bounds.y - HANDLE_WIDTH / 2
                }px)`,
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
            />
            <rect
              className="fill-white stroke-1 "
              x={0}
              y={0}
              stroke={strokeColor}
              style={{
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${
                  bounds.y + bounds.height - HANDLE_WIDTH / 2
                }px)`,
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
            />
            <rect
              className="fill-white stroke-1 "
              x={0}
              y={0}
              stroke={strokeColor}
              style={{
                transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${
                  bounds.y + bounds.height - HANDLE_WIDTH / 2
                }px)`,
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
            />
            {/* --------------------------------- Sides -------------------------------- */}
            <rect
              className="fill-white stroke-1 "
              x={0}
              y={0}
              stroke={strokeColor}
              style={{
                transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${
                  bounds.y - HANDLE_WIDTH / 2
                }px)`,
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
            />
            <rect
              className="fill-white stroke-1 "
              x={0}
              y={0}
              stroke={strokeColor}
              style={{
                transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${
                  bounds.y + bounds.height - HANDLE_WIDTH / 2
                }px)`,
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
            />
            <rect
              className="fill-white stroke-1 "
              x={0}
              y={0}
              stroke={strokeColor}
              style={{
                transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${
                  bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2
                }px)`,
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
            />
            <rect
              className="fill-white stroke-1 "
              x={0}
              y={0}
              stroke={strokeColor}
              style={{
                transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${
                  bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2
                }px)`,
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
            />
          </>
        )}
      </>
    );
  },
);

SelectionBox.displayName = "SelectionBox";