"use client";

import { useOrganization } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "~/../convex/_generated/api";
import { Button } from "~/components/ui/button";
import handleConvexPending from "~/lib/handle-convex-pending";

export default function EmptyHives() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const mutate = useMutation(api.hive.create);

  const { organization } = useOrganization();

  const onClick = () => {
    if (!organization) {
      return;
    }

    toast.promise(
      handleConvexPending(
        mutate({
          colonyId: organization.id,
          title: "Untitled",
        }).then((hive) => {
          router.push(`/hive/${hive}`);
        }),
        setPending,
      ),
      {
        loading: "Creating Hive...",
        success: "Hive created successfully",
        error: "Failed to create Hive",
      },
    );
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold">Create your first Hive!</h1>
        <p className="text-muted-foreground">
          Start by creating a Hive for your colony
        </p>
      </div>
      <Button onClick={onClick} disabled={pending} size={"lg"}>
        Create new Hive
      </Button>
    </div>
  );
}
