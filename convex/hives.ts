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

    return hives;
  },
});
