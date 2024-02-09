import Room from "~/components/room";
import Canvas from "./_components/canvas";
import CanvasLoading from "./_components/canvas-loading";

interface HiveIdPageParams {
  params: {
    hiveId: string;
  };
}

export default function HiveIdPage({ params }: HiveIdPageParams) {
  return (
    <Room roomId={params.hiveId} fallback={<CanvasLoading />}>
      <Canvas hiveId={params.hiveId} />
    </Room>
  );
}
