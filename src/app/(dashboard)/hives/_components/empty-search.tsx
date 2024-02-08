export default function EmptySearch() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-semibold">No Hives found</h1>
      <p className="text-muted-foreground">Try searching for something else</p>
    </div>
  );
}
