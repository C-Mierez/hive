import { useMutation } from "convex/react";
import { useState } from "react";

export default function useConvexMutation(mutationFunction: any) {
  const [pending, setPending] = useState(false);

  const convexMutation = useMutation(mutationFunction);

  const mutate = (payload: any) => {
    setPending(true);
    return convexMutation(payload)
      .finally(() => {
        setPending(false);
      })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

  return { mutate, pending };
}
