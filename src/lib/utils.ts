import { type ClassValue, clsx } from "clsx";
import { Point } from "framer-motion";
import { twMerge } from "tailwind-merge";
import {
  Camera,
  Color,
  Layer,
  LayerType,
  PathLayer,
  Side,
  XYHW,
} from "~/types/canvas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Threshold for starting multi-selection: 10
export const SelectionNetThreshold = 5;

export const UserColors = [
  "#B03030",
  "#17B890",
  "#326EB3",
  "#463F3A",
  "#FE9148",
  "#E9D858",
  "#0E0D0C",
];

export function connectionToColor(connectionId: number) {
  return UserColors[connectionId % UserColors.length]!;
}

export function pointerEventToCanvasPoint(
  event: React.PointerEvent,
  camera: Camera,
) {
  return {
    x: Math.round(event.clientX) - camera.x,
    y: Math.round(event.clientY) - camera.y,
  };
}

export function colorToRGBA(color: Color) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
}

export function resizeBounds(bounds: XYHW, corner: Side, point: Point) {
  const { x, y, width, height } = bounds;

  const result = {
    x,
    y,
    width,
    height,
  };

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, x + width);
    result.width = Math.abs(x + width - point.x);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, x);
    result.width = Math.abs(point.x - x);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, y + height);
    result.height = Math.abs(y + height - point.y);
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, y);
    result.height = Math.abs(point.y - y);
  }

  return result;
}

export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point,
) {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids = [];

  for (const layerId of layerIds) {
    const layer = layers.get(layerId);

    if (layer == null) {
      continue;
    }

    const { x, y, height, width } = layer;

    if (
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height
    ) {
      ids.push(layerId);
    }
  }
  return ids;
}

export function getContrastingTextColor(color: Color) {
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

  return luminance > 182 ? "black" : "white";
}

export type PencilPoints = [x: number, y: number, pressure: number][];

export function penPointsToPathLayer(
  points: PencilPoints,
  color: Color,
): PathLayer {
  if (points.length < 2) {
    throw new Error("At least two points are required to create a path");
  }

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    const [x, y] = point;

    if (left > x) {
      left = x;
    }

    if (top > y) {
      top = y;
    }

    if (right < x) {
      right = x;
    }

    if (bottom < y) {
      bottom = y;
    }
  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => {
      return [x - left, y - top, pressure];
    }),
  };
}

// This is straight-up copy-pasted.
// No idea what it does.
export function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"],
  );

  d.push("Z");
  return d.join(" ");
}
