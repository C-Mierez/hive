"use client";

import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

interface CanvasParams {
  hiveId: string;
}

export default function Canvas({ hiveId }: CanvasParams) {
  return (
    <main className="relative h-screen w-full touch-none bg-muted">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
}
