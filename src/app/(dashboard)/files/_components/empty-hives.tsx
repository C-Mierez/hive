"use client";

import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";
import { api } from "~/../convex/_generated/api";
import { Button } from "~/components/ui/button";
import useConvexMutation from "~/hooks/use-convex-mutation";

export default function EmptyHives() {
  const { mutate, pending } = useConvexMutation(api.hive.create);

  const { organization } = useOrganization();

  const onClick = () => {
    if (!organization) {
      return;
    }

    mutate({
      orgId: organization.id,
      title: "Untitled",
    }).then((id) => {
      toast.success("Hive created successfully");
    });

    // toast.promise(
    //   mutate({
    //     orgId: organization.id,
    //     title: "Untitled",
    //   }),
    //   {
    //     loading: "Creating Hive...",
    //     success: "Hive created successfully",
    //     error: "Failed to create Hive",
    //   }
    // );
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold">Create your first Hive!</h1>
        <p className="text-muted-foreground">
          Start by creating a Hive for your colony
        </p>
      </div>
      <Button onClick={onClick} disabled={pending}>
        Create new Hive
      </Button>
    </div>
  );
}
