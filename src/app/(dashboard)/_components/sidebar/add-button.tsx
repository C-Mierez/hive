"use client";

import { CreateOrganization } from "@clerk/nextjs";
import { PlusIcon } from "@radix-ui/react-icons";
import Hint from "~/components/hint";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function AddButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint label="New organization" side="right" align="start">
            <button className=" h-full w-full rounded-sm bg-red-500 p-2">
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
