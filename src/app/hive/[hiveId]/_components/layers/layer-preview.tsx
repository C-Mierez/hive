import { useStorage } from "@/liveblocks.config";
import { memo } from "react";
import { LayerType } from "~/types/canvas";
import LayerRectangle from "./layer-rectange";
import LayerCircle from "./layer-circle";
import LayerText from "./layer-text";
import LayerNote from "./layer-note";
import LayerPath from "./layer-path";

interface LayerPreviewParams {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewParams) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <LayerRectangle
            id={id}
            layer={layer}
            onLayerPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Circle:
        return (
          <LayerCircle
            id={id}
            layer={layer}
            onLayerPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Text:
        return (
          <LayerText
            id={id}
            layer={layer}
            onLayerPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Note:
        return (
          <LayerNote
            id={id}
            layer={layer}
            onLayerPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Path:
        return (
          <LayerPath
            x={layer.x}
            y={layer.y}
            fill={layer.fill}
            points={layer.points}
            onLayerPointerDown={(e) => onLayerPointerDown(e, id)}
            selectionColor={selectionColor}
          />
        );
      default:
        return null;
    }
  },
);

LayerPreview.displayName = "LayerPreview";
