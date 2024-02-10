"use client";

import { useOthers, useSelf } from "@/liveblocks.config";
import CanvasAvatar from "./canvas-avatar";
import { connectionToColor } from "~/lib/utils";

const MAX_SHOWN_COLLABORATORS = 2;

export default function Participants() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_COLLABORATORS;

  return (
    <div className="absolute right-4 top-4 grid grid-flow-col items-center gap-2">
      {hasMoreUsers && (
        <span className="text-md text-muted-foreground">
          +{users.length - MAX_SHOWN_COLLABORATORS}
        </span>
      )}
      {users.slice(0, MAX_SHOWN_COLLABORATORS).map((user) => (
        <AvatarWrapper color={connectionToColor(user.connectionId)}>
          <CanvasAvatar
            key={user.id}
            src={user.info?.picture}
            name={user.info?.name}
            fallback={user.info?.name?.charAt(0).toUpperCase() || "B"}
          />
        </AvatarWrapper>
      ))}
      {currentUser && (
        <AvatarWrapper color={connectionToColor(currentUser.connectionId)}>
          <CanvasAvatar
            src={currentUser.info?.picture}
            name={"You"}
            fallback={currentUser.info?.name?.charAt(0).toUpperCase() || "B"}
          />
        </AvatarWrapper>
      )}
    </div>
  );
}

function AvatarWrapper({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      {children}
      <div
        className="h-[0.125rem] w-full rounded-sm"
        style={{
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
}
