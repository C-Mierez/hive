"use client";

import { useOthersConnectionIds } from "@/liveblocks.config";
import { memo } from "react";
import { Cursor } from "./cursor";

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

export const CursorPresence = memo(() => {
  return (
    <>
      <Cursors />
    </>
  );
});

CursorPresence.displayName = "CursorPresence";
