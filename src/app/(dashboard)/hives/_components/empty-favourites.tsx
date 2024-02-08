export default function EmptyFavourites() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-semibold">You have no favourite Hives!</h1>
      <p className="text-muted-foreground">
        Try marking some Hives as favourites
      </p>
    </div>
  );
}
