"use client";

import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";
import { memo } from "react";

import { Cursor } from "./cursor";
import { shallow } from "@liveblocks/client";
import LayerPath from "./layers/layer-path";

function Cursors() {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((id) => (
        <Cursor key={id} connectionId={id} />
      ))}
    </>
  );
}

function Drafts() {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow,
  );

  return (
    <>
      {others.map((o) => {
        const [key, other] = o;
        if (other.pencilDraft) {
          return (
            <LayerPath
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ?? { r: 14, g: 13, b: 12, a: 1 }}
            />
          );
        }

        return null;
      })}
    </>
  );
}

export const CursorPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorPresence.displayName = "CursorPresence";
