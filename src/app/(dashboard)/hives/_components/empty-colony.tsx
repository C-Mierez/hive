import { CreateOrganization } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

export default function EmptyColony() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Welcome to your dashboard!</h2>
        <p className="text-muted-foreground">
          You don't have any Colonies yet.
        </p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create new Colony</Button>
        </DialogTrigger>
        <DialogContent className="border-none bg-transparent p-0">
          <CreateOrganization />
        </DialogContent>
      </Dialog>
    </div>
  );
}
