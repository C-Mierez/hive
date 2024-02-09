import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    colonyId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const hives = await ctx.db
      .query("hive")
      .withIndex("by_colony", (q) => {
        return q.eq("colonyId", args.colonyId);
      })
      .order("desc")
      .collect();

    // This is a bit of a hack to get the isFavourite property on the hives
    const hivesWithFavourites = hives.map((hive) => {
      return ctx.db
        .query("favouriteHives")
        .withIndex("by_user_hive", (q) =>
          q.eq("userId", identity.subject).eq("hiveId", hive._id),
        )
        .unique()
        .then((favourite) => {
          return {
            ...hive,
            isFavourite: !!favourite,
          };
        });
    });

    const hivesWithFavouritesResolved = await Promise.all(hivesWithFavourites);

    return hivesWithFavouritesResolved;
  },
});
