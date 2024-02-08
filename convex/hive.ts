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

export const remove = mutation({
  args: {
    id: v.id("hive"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    // TODO: Remove favourite hives

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("hive"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const title = args.title.trim();

    if (!title) {
      throw new Error("Title is required");
    }

    if (title.length > 80) {
      throw new Error("Title is too long");
    }

    const hive = await ctx.db.patch(args.id, { title });

    return hive;
  },
});
