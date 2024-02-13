import { useMutation, useSelf } from "@/liveblocks.config";
import { memo } from "react";
import useSelectionBounds from "~/hooks/use-selection-bounds";
import { Camera, Color } from "~/types/canvas";
import ColorPicker from "./color-picker";
import useDeleteLayers from "../../../../hooks/use-delete-layeres";
import { Button } from "~/components/ui/button";
import {
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Hint from "~/components/hint";

interface SelectionToolbarParams {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionToolbar = memo(
  ({ camera, setLastUsedColor }: SelectionToolbarParams) => {
    const selection = useSelf((me) => {
      return me.presence.selection;
    });

    const setFill = useMutation(
      (ctx, fill: Color) => {
        const liveLayers = ctx.storage.get("layers");
        setLastUsedColor(fill);

        selection.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor],
    );

    const deleteLayers = useDeleteLayers();

    const sendToBack = useMutation(
      (ctx) => {
        const liveLayerIds = ctx.storage.get("layerIds");
        const indices: number[] = [];

        const arrLiveLayerIds = liveLayerIds.toImmutable();

        for (let i = 0; i < arrLiveLayerIds.length; i++) {
          if (arrLiveLayerIds[i] && selection.includes(arrLiveLayerIds[i]!)) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          if (indices[i]) {
            liveLayerIds.move(indices[i]!, i);
          }
        }
      },
      [selection],
    );

    const sendToFront = useMutation(
      (ctx) => {
        const liveLayerIds = ctx.storage.get("layerIds");
        const indices: number[] = [];

        const arrLiveLayerIds = liveLayerIds.toImmutable();

        for (let i = 0; i < arrLiveLayerIds.length; i++) {
          if (arrLiveLayerIds[i] && selection.includes(arrLiveLayerIds[i]!)) {
            indices.push(i);
          }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayerIds.move(
            indices[i]!,
            arrLiveLayerIds.length - 1 - (indices.length - 1 - i),
          );
        }
      },
      [selection],
    );

    /* ------------------------------- Positioning ------------------------------ */
    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute flex select-none flex-col gap-2 rounded-sm border-global_sm bg-background p-2"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
        }}
      >
        <ColorPicker onChange={setFill} />
        <Hint label="Delete" side="top">
          <Button variant={"darkColored"} size={"icon"} onClick={deleteLayers}>
            <TrashIcon />
          </Button>
        </Hint>
        <div className="flex gap-2">
          <Hint label="Send to Back" side="top">
            <Button variant={"darkColored"} size={"icon"} onClick={sendToBack}>
              <DoubleArrowDownIcon />
            </Button>
          </Hint>
          <Hint label="Send to Front" side="top">
            <Button variant={"darkColored"} size={"icon"} onClick={sendToFront}>
              <DoubleArrowUpIcon />
            </Button>
          </Hint>
        </div>
      </div>
    );
  },
);

SelectionToolbar.displayName = "SelectionToolbar";

export default SelectionToolbar;
