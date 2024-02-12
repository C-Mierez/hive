import { colorToRGBA } from "~/lib/utils";
import { RectangleLayer } from "~/types/canvas";
import { motion } from "framer-motion";
import { layerTransition } from "~/lib/animation";

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
    // <rect
    //   x={0}
    //   y={0}
    //   width={width}
    //   height={height}
    //   style={{ transform: `translate(${x}px, ${y}px)` }}
    //   fill={colorToRGBA(fill)}
    //   stroke={selectionColor}
    //   strokeWidth={selectionColor ? 2 : 0}
    //   onPointerDown={(e) => onLayerPointerDown(e, id)}
    // />
    <motion.rect
      initial={{ y, x, height: 0, width: 0, scale: 0 }}
      animate={{ x, y, width, height, scale: 1 }}
      transition={layerTransition}
      fill={colorToRGBA(fill)}
      stroke={selectionColor}
      strokeWidth={selectionColor ? 2 : 0}
      onPointerDown={(e) => onLayerPointerDown(e, id)}
    />
  );
}
