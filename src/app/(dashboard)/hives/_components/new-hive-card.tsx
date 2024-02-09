"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "~/../convex/_generated/api";
import handleConvexPending from "~/lib/handle-convex-pending";

interface NewHiveCardParams {
  colonyId: string;
  disabled?: boolean;
}

export default function NewHiveCard({ colonyId, disabled }: NewHiveCardParams) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const mutate = useMutation(api.hive.create);

  const onClick = () => {
    toast.promise(
      handleConvexPending(
        mutate({
          colonyId,
          title: "Untitled",
        }).then((hive) => {
          router.push(`/hive/${hive}`);
        }),
        setPending,
      ),
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
      className="brutalHover group relative flex aspect-video flex-col items-center justify-end gap-4 overflow-clip rounded-sm border-global_sm"
    >
      <div className="absolute left-0 top-0 -z-10 grid h-full w-full flex-1 place-items-center bg-muted-foreground p-4 transition group-hover:scale-[1.1]">
        <PlusIcon className="h-16 w-16 text-background" />
      </div>
      <div className="z-1 w-full translate-y-full border-t-global_sm bg-background p-4 transition group-hover:translate-y-0">
        <h1 className="text-lg font-bold">Create a new Hive</h1>
        <p className="text-sm text-muted-foreground">
          Start a brand new Hive for this colony
        </p>
      </div>
    </button>
  );
}
