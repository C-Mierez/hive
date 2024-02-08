import SquareLoader from "../loaders/square-loader";

export default function LoadingAuth() {
  return (
    <div className="flex min-h-[100lvh] flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-black uppercase">Hive</h1>
      <SquareLoader />
    </div>
  );
}
