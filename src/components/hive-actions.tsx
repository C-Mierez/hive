import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Link2Icon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import useConvexMutation from "~/hooks/use-convex-mutation";
import { api } from "~/../convex/_generated/api";
import ConfirmModal from "./confirm-modal";
import { Button } from "~/components/ui/button";
import { useRenameModal } from "~/store/use-rename-modal";

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
  const { mutate: removeHive, pending } = useConvexMutation(api.hive.remove);
  const { onOpen } = useRenameModal();

  const onRemoveHive = () => {
    toast.promise(
      removeHive({
        id: id,
      }),
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
          Copy link to Hive
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRenameHive}>
          <Pencil2Icon className="mr-[1ch] h-5 w-5" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          title={`Delete ${title} Hive`}
          description={`This action cannot be undone. Are you sure you want to delete ${title} Hive?`}
          onConfirm={onRemoveHive}
          onCancel={() => {}}
        >
          <Button
            variant={"ghost"}
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
