import { colorToRGBA } from "~/lib/utils";
import { CircleLayer } from "~/types/canvas";
import { motion } from "framer-motion";
import { layerTransition } from "~/lib/animation";

interface LayerCircleParams {
  id: string;
  layer: CircleLayer;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export default function LayerCircle({
  id,
  layer,
  onLayerPointerDown,
  selectionColor,
}: LayerCircleParams) {
  const { x, y, width, height, fill } = layer;
  return (
    <motion.ellipse
      className="drop-shadow-brutal"
      // style={{
      //   transform: `translate(${x}px, ${y}px)`,
      // }}
      // cx={width / 2}
      // cy={height / 2}
      // rx={width / 2}
      // ry={height / 2}
      initial={{
        scale: 0,
        x,
        y,
        cx: width / 2,
        cy: height / 2,
        rx: width / 2,
        ry: height / 2,
      }}
      animate={{
        scale: 1,
        x,
        y,
        cx: width / 2,
        cy: height / 2,
        rx: width / 2,
        ry: height / 2,
      }}
      transition={layerTransition}
      fill={fill ? colorToRGBA(fill) : "#000"}
      stroke={selectionColor || "#000"}
      strokeWidth={selectionColor ? 2 : 1}
      onPointerDown={(e) => onLayerPointerDown(e, id)}
    />
  );
}
