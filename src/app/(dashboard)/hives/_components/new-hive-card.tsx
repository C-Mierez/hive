"use client";

import { useOrganization } from "@clerk/nextjs";
import { PlusIcon } from "@radix-ui/react-icons";
import { api } from "~/../convex/_generated/api";
import { toast } from "sonner";
import useConvexMutation from "~/hooks/use-convex-mutation";

interface NewHiveCardParams {
  colonyId: string;
  disabled?: boolean;
}

export default function NewHiveCard({ colonyId, disabled }: NewHiveCardParams) {
  const { mutate, pending } = useConvexMutation(api.hive.create);

  const onClick = () => {
    toast.promise(
      mutate({
        colonyId,
        title: "Untitled",
      }),
      {
        loading: "Creating Hive...",
        success: "Hive created successfully.",
        error: "Failed to create Hive.",
      },
    );
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className="border-global_sm group relative flex aspect-video flex-col items-center justify-end gap-4 overflow-clip rounded-sm hover:shadow-brutal_sm"
    >
      <div className="absolute left-0 top-0 -z-10 grid h-full w-full flex-1 place-items-center bg-muted-foreground p-4 transition group-hover:scale-[1.1]">
        <PlusIcon className="h-16 w-16 text-background" />
      </div>
      <div className="z-1 border-t-global_sm w-full translate-y-full bg-background p-4 transition group-hover:translate-y-0">
        <h1 className="text-lg font-bold">Create a new Hive</h1>
        <p className="text-sm text-muted-foreground">
          Start a brand new Hive for this colony
        </p>
      </div>
    </button>
  );
}
