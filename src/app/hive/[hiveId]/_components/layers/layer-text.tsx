import { colorToRGBA } from "~/lib/utils";
import { TextLayer } from "~/types/canvas";
import { motion } from "framer-motion";
import { layerTransition } from "~/lib/animation";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useMutation } from "@/liveblocks.config";

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

interface LayerTextParams {
  id: string;
  layer: TextLayer;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export default function LayerText({
  id,
  layer,
  onLayerPointerDown,
  selectionColor,
}: LayerTextParams) {
  const { x, y, width, height, fill, value } = layer;

  const updateTextValue = useMutation((ctx, newValue: string) => {
    const liveLayers = ctx.storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const onChange = (e: ContentEditableEvent) => {
    updateTextValue(e.target.value);
  };

  return (
    <motion.foreignObject
      // className="drop-shadow-brutal"
      // initial={{ y, x, height, width, scale: 1 }}
      initial={{ x, y, width, height, scale: 0 }}
      animate={{ x, y, width, height, scale: 1 }}
      transition={layerTransition}
      fill={colorToRGBA(fill)}
      stroke={selectionColor || "#000"}
      strokeWidth={selectionColor ? 2 : 1}
      onPointerDown={(e) => onLayerPointerDown(e, id)}
    >
      <ContentEditable
        html={value || "Text"}
        onChange={onChange}
        className="flex h-full w-full items-center justify-center text-center  outline-none"
        style={{
          color: fill ? colorToRGBA(fill) : "#000",
          fontSize: calculateFontSize(width, height),
        }}
      />
    </motion.foreignObject>
  );
}
