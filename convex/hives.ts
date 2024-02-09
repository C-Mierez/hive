import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    colonyId: v.string(),
    search: v.optional(v.string()),
    favourites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    // If the user is querying for favourite hives
    // we need to query the favouriteHives index
    // and return them with the isFavourite property
    if (args.favourites) {
      const favouriteHives = await ctx.db
        .query("favouriteHives")
        .withIndex("by_user_colony", (q) =>
          q.eq("userId", identity.subject).eq("colonyId", args.colonyId),
        )
        .order("desc")
        .collect();

      const favouriteIds = favouriteHives.map((favourite) => favourite.hiveId);

      const hives = await getAllOrThrow(ctx.db, favouriteIds);

      return hives.map((hive) => {
        return {
          ...hive,
          isFavourite: true,
        };
      });
    }

    // If the user is searching for hives
    // we need to query the search index
    // otherwise we can just query the by_colony index
    const title = args.search as string;
    let hives = [];

    if (title) {
      // Query with search index
      hives = await ctx.db
        .query("hive")
        .withSearchIndex("search_by_title", (q) =>
          q.search("title", title).eq("colonyId", args.colonyId),
        )
        .collect();
    } else {
      // Query with colonyId index
      hives = await ctx.db
        .query("hive")
        .withIndex("by_colony", (q) => {
          return q.eq("colonyId", args.colonyId);
        })
        .order("desc")
        .collect();
    }

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
