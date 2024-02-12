import { useMutation, useSelf } from "@/liveblocks.config";

export default function useDeleteLayers() {
  const selection = useSelf((me) => me.presence.selection);

  return useMutation(
    (ctx) => {
      const liveLayers = ctx.storage.get("layers");
      const liveLayerIds = ctx.storage.get("layerIds");

      for (const id of selection) {
        liveLayers.delete(id);

        const index = liveLayerIds.indexOf(id);

        if (index > -1) {
          liveLayerIds.delete(index);
        }

        ctx.setMyPresence(
          {
            selection: [],
          },
          {
            addToHistory: true,
          },
        );
      }
    },
    [selection],
  );
}
