import { motion } from "framer-motion";
import { layerTransition } from "~/lib/animation";
import { colorToRGBA } from "~/lib/utils";
import type { RectangleLayer } from "~/types/canvas";

interface LayerRectangleParams {
  id: string;
  layer: RectangleLayer;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export default function LayerRectangle({
  id,
  layer,
  onLayerPointerDown,
  selectionColor,
}: LayerRectangleParams) {
  const { x, y, width, height, fill } = layer;

  return (
    <motion.rect
      className="drop-shadow-brutal"
      initial={{ y, x, height: 0, width: 0, scale: 0 }}
      animate={{ x, y, width, height, scale: 1 }}
      transition={layerTransition}
      fill={colorToRGBA(fill)}
      stroke={selectionColor ?? "#000"}
      strokeWidth={selectionColor ? 2 : 1}
      onPointerDown={(e) => onLayerPointerDown(e, id)}
    />
  );
}
