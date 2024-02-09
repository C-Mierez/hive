import Canvas from "./_components/canvas";

interface HiveIdPageParams {
  params: {
    hiveId: string;
  };
}

export default function HiveIdPage({ params }: HiveIdPageParams) {
  return (
    <div>
      <Canvas hiveId={params.hiveId} />
    </div>
  );
}
