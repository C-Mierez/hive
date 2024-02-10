import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Camera, Color } from "~/types/canvas";

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
