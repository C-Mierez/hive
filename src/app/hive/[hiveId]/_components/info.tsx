"use client";

import { api } from "@/convex/_generated/api";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import type { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Link from "next/link";
import Hint from "~/components/hint";
import HiveActions from "~/components/hive-actions";
import { Button } from "~/components/ui/button";
import { useRenameModal } from "~/store/use-rename-modal";

interface InfoParams {
  hiveId: string;
}

export default function Info({ hiveId }: InfoParams) {
  const hive = useQuery(api.hive.get, {
    id: hiveId as Id<"hive">,
  });

  const { onOpen } = useRenameModal();

  if (!hive) {
    return null;
  }

  return (
    <div className="absolute left-4 top-4 grid grid-flow-col">
      <Hint label="Back to Hives" side="bottom">
        <Button
          asChild
          className="h-full rounded-br-none rounded-tr-none py-2 font-black uppercase"
        >
          <Link href={"/hives"}>HIVE</Link>
        </Button>
      </Hint>

      <Button
        onClick={() => {
          onOpen({ id: hive._id, title: hive.title });
        }}
        variant={"outline"}
        brutal={false}
        className="h-full rounded-none border-l-0 border-r-0 py-2 hover:bg-muted"
      >
        <h1 className="max-w-[10vw] truncate">{hive.title}</h1>
      </Button>

      <HiveActions id={hive._id} title={hive.title} side="bottom">
        <div>
          <Hint label="Actions" side="bottom">
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-full rounded-bl-none rounded-tl-none py-2"
            >
              <HamburgerMenuIcon />
            </Button>
          </Hint>
        </div>
      </HiveActions>
    </div>
  );
}
