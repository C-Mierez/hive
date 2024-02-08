import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    colonyId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const imageUrl = "/hivePlaceholder1.svg";

    const hive = await ctx.db.insert("hive", {
      title: args.title,
      colonyId: args.colonyId,
      authorId: identity.subject,
      authorName: identity.nickname!,
      imageUrl,
    });

    return hive;
  },
});
