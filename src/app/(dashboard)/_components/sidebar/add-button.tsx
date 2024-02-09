"use client";

import { CreateOrganization } from "@clerk/nextjs";
import { PlusIcon } from "@radix-ui/react-icons";
import Hint from "~/components/hint";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

export default function AddButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square w-full">
          <Hint label="New organization" side="right" align="start">
            <button className=" brutalHover_sm grid h-full w-full place-items-center rounded-sm border-global_sm bg-primary p-2">
              <PlusIcon className="text-foreground" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="border-none bg-transparent p-0">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
}
