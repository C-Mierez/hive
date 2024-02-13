import { useMutation } from "@/liveblocks.config";
import { motion } from "framer-motion";
import type { ContentEditableEvent } from "react-contenteditable";
import ContentEditable from "react-contenteditable";
import { layerTransition } from "~/lib/animation";
import { colorToRGBA, getContrastingTextColor } from "~/lib/utils";
import type { NoteLayer } from "~/types/canvas";

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

interface LayerNoteParams {
  id: string;
  layer: NoteLayer;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export default function LayerNote({
  id,
  layer,
  onLayerPointerDown,
  selectionColor,
}: LayerNoteParams) {
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
      initial={{
        x,
        y,
        width,
        height,
        scale: 0,
      }}
      animate={{
        x,
        y,
        width,
        height,
        scale: 1,
      }}
      transition={layerTransition}
      fill={colorToRGBA(fill)}
      stroke={selectionColor ?? "#000"}
      strokeWidth={selectionColor ? 2 : 1}
      onPointerDown={(e) => onLayerPointerDown(e, id)}
      style={
        {
          // backgroundColor: fill ? colorToRGBA(fill) : "#000",
          // fill: fill ? colorToRGBA(fill) : "#000",
        }
      }
      className={"overflow-visible"}
    >
      <ContentEditable
        html={value ?? "Text"}
        onChange={onChange}
        className="flex h-full w-full items-center justify-center rounded-sm  border-global_sm text-center shadow-brutal outline-none"
        style={{
          color: fill ? getContrastingTextColor(fill) : "#000",
          fontSize: calculateFontSize(width, height),
          backgroundColor: fill ? colorToRGBA(fill) : "#000",
        }}
      />
    </motion.foreignObject>
  );
}
