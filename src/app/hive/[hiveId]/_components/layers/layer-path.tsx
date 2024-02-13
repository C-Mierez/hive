import getStroke from "perfect-freehand";
import { colorToRGBA, getSvgPathFromStroke } from "~/lib/utils";
import type { PencilPoints } from "~/lib/utils";
import type { Color } from "~/types/canvas";

interface LayerPathParams {
  x: number;
  y: number;
  fill: Color;
  points: PencilPoints;
  onLayerPointerDown?: (e: React.PointerEvent) => void;
  selectionColor?: string;
  stroke?: string;
}

export default function LayerPath({
  x,
  y,
  fill,
  points,
  onLayerPointerDown,
  selectionColor,
}: LayerPathParams) {
  return (
    <path
      onPointerDown={onLayerPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        }),
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      fill={colorToRGBA(fill)}
      stroke={selectionColor ?? colorToRGBA(fill)}
      strokeWidth={selectionColor ? 2 : 1}
    />
  );
}
