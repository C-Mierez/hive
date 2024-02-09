"use client";

import { useSelf } from "liveblocks.config";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

interface CanvasParams {
  hiveId: string;
}

export default function Canvas({ hiveId }: CanvasParams) {
  const { info } = useSelf();

  return (
    <main className="relative h-screen w-full touch-none bg-muted">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
}
