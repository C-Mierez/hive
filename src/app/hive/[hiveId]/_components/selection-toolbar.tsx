import { useMutation, useSelf } from "@/liveblocks.config";
import { memo } from "react";
import useSelectionBounds from "~/hooks/use-selection-bounds";
import { Camera, Color } from "~/types/canvas";
import ColorPicker from "./color-picker";

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

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute select-none rounded-sm border-global_sm bg-background p-2"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
        }}
      >
        <ColorPicker onChange={setFill} />
      </div>
    );
  },
);

SelectionToolbar.displayName = "SelectionToolbar";

export default SelectionToolbar;
