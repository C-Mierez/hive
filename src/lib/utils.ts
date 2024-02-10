import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
  return UserColors[connectionId % UserColors.length];
}
