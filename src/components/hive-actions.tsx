import type { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2Icon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { api } from "~/../convex/_generated/api";
import { Button } from "~/components/ui/button";
import { useRenameModal } from "~/store/use-rename-modal";

import ConfirmModal from "./confirm-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { useMutation } from "convex/react";
import handleConvexPending from "~/lib/handle-convex-pending";
import { Id } from "convex/_generated/dataModel";

interface HiveActionParams {
  children: React.ReactNode;
  id: string;
  title: string;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
}

export default function HiveActions({
  children,
  id,
  title,
  side,
  sideOffset,
}: HiveActionParams) {
  const [pendingRemoveHive, setPendingRemoveHive] = useState(false);
  const removeHive = useMutation(api.hive.remove);
  const { onOpen } = useRenameModal();

  const onRemoveHive = () => {
    toast.promise(
      handleConvexPending(
        removeHive({
          id: id as Id<"hive">,
        }),
        setPendingRemoveHive,
      ),
      {
        loading: `Deleting ${title} Hive...`,
        success: `${title} Hive deleted successfully.`,
        error: `Failed to delete ${title} Hive.`,
      },
    );
  };

  const onRenameHive = () => {
    onOpen({ id, title });
  };

  const onCopyLink = () => {
    toast.promise(
      navigator.clipboard.writeText(`${window.location.origin}/hives/${id}`),
      {
        loading: "Copying link...",
        success: "Link copied!",
        error: "Failed to copy link",
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        side={side}
        sideOffset={sideOffset}
        className=""
      >
        <DropdownMenuItem onClick={onCopyLink}>
          <Link2Icon className="mr-[1ch] h-5 w-5" />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRenameHive}>
          <Pencil2Icon className="mr-[1ch] h-5 w-5" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          title={`Delete ${title} Hive`}
          description={`This action cannot be undone. Are you sure you want to delete ${title} Hive?`}
          onConfirm={onRemoveHive}
          onCancel={() => {
            // Do nothing
          }}
        >
          <Button
            variant={"ghost"}
            disabled={pendingRemoveHive}
            className="w-full justify-start border-none p-2 text-sm font-normal"
          >
            <TrashIcon className="mr-[1ch] h-5 w-5" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
