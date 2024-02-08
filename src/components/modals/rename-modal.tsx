"use client";

import { useRenameModal } from "~/store/use-rename-modal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useConvexMutation from "~/hooks/use-convex-mutation";
import { api } from "~/../convex/_generated/api";
import { toast } from "sonner";

export default function RenameModal() {
  const modal = useRenameModal();
  const [title, setTitle] = useState(modal.initialValues.title);
  const { mutate, pending } = useConvexMutation(api.hive.update);

  useEffect(() => {
    setTitle(modal.initialValues.title);
  }, [modal.initialValues.title]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      mutate({
        id: modal.initialValues.id,
        title,
      }).then(() => {
        modal.onClose();
      }),
      {
        loading: "Renaming Hive...",
        success: "Hive renamed successfully.",
        error: "Failed to rename Hive.",
      },
    );
  };

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename {modal.initialValues.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>Edit the name of your Hive.</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={80}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter new name"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={"outline"}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
