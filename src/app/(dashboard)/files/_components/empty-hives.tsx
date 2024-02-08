import { Button } from "~/components/ui/button";

export default function EmptyHives() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold">Create your first Hive!</h1>
        <p className="text-muted-foreground">
          Start by creating a Hive for your colony
        </p>
      </div>
      <Button>Create new Hive</Button>
    </div>
  );
}
