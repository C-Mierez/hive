import type { Dispatch, SetStateAction } from "react";

// I created this reusable function as a way to make the pending state management a little easier to do on each Convex call
// The reason this is not a hook is because wrapping the convex mutation or query makes it really hard to keep type-safety
export default function handleConvexPending<T>(
  promise: Promise<T>,
  setPending: Dispatch<SetStateAction<boolean>>,
) {
  setPending(true);

  promise
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      setPending(false);
    });

  return promise;
}
