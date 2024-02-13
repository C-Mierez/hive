import { useOther } from "@/liveblocks.config";
import { CursorArrowIcon } from "@radix-ui/react-icons";
import { memo } from "react";
import { connectionToColor } from "~/lib/utils";
import { motion } from "framer-motion";

interface CursorParams {
  connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorParams) => {
  const userInfo = useOther(connectionId, (user) => user.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);

  const name = userInfo?.name ?? "Fellow Bee";

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <motion.foreignObject
      style={{
        x,
        y,
        pointerEvents: "none",
      }}
      initial={
        // Start the cursor from the middle of the screen
        {
          x: window.innerWidth,
          y: 0,
          opacity: 0,
          scale: 0.5,
        }
      }
      animate={{ x, y, opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        damping: 30,
        mass: 0.5,
        stiffness: 300,
      }}
      height={40}
      width={40}
      className="relative overflow-visible"
    >
      <CursorArrowIcon
        className="h-5 w-5"
        style={{
          color: connectionToColor(connectionId),
          fill: connectionToColor(connectionId),
        }}
      />
      <div
        className="absolute -bottom-1 left-0 -translate-x-1/4 whitespace-nowrap text-sm font-medium"
        style={{
          color: connectionToColor(connectionId),
        }}
      >
        {name}
      </div>
    </motion.foreignObject>
  );
});

Cursor.displayName = "Cursor";
