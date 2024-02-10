import { useSelf, useStorage } from "@/liveblocks.config";
import { Layer } from "~/types/canvas";

function boundingBox(layers: Layer[]) {
  const first = layers[0];

  if (!first) {
    return null;
  }

  let left = first.x;
  let right = first.x + first.width;
  let top = first.y;
  let bottom = first.y + first.height;

  for (const layer of layers) {
    if (left > layer.x) {
      left = layer.x;
    }

    if (right < layer.x + layer.width) {
      right = layer.x + layer.width;
    }

    if (top > layer.y) {
      top = layer.y;
    }

    if (bottom < layer.y + layer.height) {
      bottom = layer.y + layer.height;
    }
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
}

export default function useSelectionBounds() {
  const selection = useSelf((me) => me.presence.selection);

  return useStorage((root) => {
    const selectedLayers = selection
      .map((layerId) => root.layers.get(layerId)!)
      .filter(Boolean);

    return boundingBox(selectedLayers);
  });
}
