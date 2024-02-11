import { type ClassValue, clsx } from "clsx";
import { Point } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { Camera, Color, Side, XYHW } from "~/types/canvas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const UserColors = [
  "#B03030",
  "#17B890",
  "#17B890",
  "#326EB3",
  "#463F3A",
  "#FE9148",
  "#E9D858",
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
