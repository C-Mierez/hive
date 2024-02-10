/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import { useRenameModal } from "~/store/use-rename-modal";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useMutation } from "convex/react";
import handleConvexPending from "~/lib/handle-convex-pending";
import { Id } from "convex/_generated/dataModel";

export default function RenameModal() {
  const modal = useRenameModal();
  const [title, setTitle] = useState(modal.initialValues.title);
  const [pending, setPending] = useState(false);
  const mutate = useMutation(api.hive.update);

  useEffect(() => {
    setTitle(modal.initialValues.title);
  }, [modal.initialValues.title]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.promise(
      handleConvexPending(
        mutate({
          id: modal.initialValues.id as Id<"hive">,
          title,
        }),
        setPending,
      ).then(() => {
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
