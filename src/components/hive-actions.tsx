import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Link1Icon, Link2Icon } from "@radix-ui/react-icons";
import { toast } from "sonner";

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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
