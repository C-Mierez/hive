import SquareLoader from "~/components/loaders/square-loader";

export default function CanvasLoading() {
  return (
    <main className="relative flex h-screen w-full touch-none flex-col items-center justify-center gap-4 bg-muted">
      <SquareLoader size="md" />
      <h1 className="text-xl text-muted-foreground">Loading Hive</h1>
    </main>
  );
}
