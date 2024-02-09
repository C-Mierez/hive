"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "liveblocks.config";

interface RoomParams {
  children: React.ReactNode;
  roomId: string;
  fallback: NonNullable<React.ReactNode> | null;
}

export default function Room({ children, roomId, fallback }: RoomParams) {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
