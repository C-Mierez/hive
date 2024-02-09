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

    const userId = identity.subject;

    const existingFavourites = await ctx.db
      .query("favouriteHives")
      .withIndex("by_user_hive", (q) =>
        q.eq("userId", userId).eq("hiveId", args.id),
      )
      .collect();

    // Remove all favourites for this hive
    await Promise.all(
      existingFavourites.map((favourite) => ctx.db.delete(favourite._id)),
    );

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

export const favourite = mutation({
  args: {
    hiveId: v.id("hive"),
    colonyId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const hive = await ctx.db.get(args.hiveId);

    if (!hive) {
      throw new Error("Hive not found");
    }

    const userId = identity.subject;

    const existingFavourite = await ctx.db
      .query("favouriteHives")
      .withIndex("by_user_hive", (q) =>
        q.eq("userId", userId).eq("hiveId", args.hiveId),
      )
      .unique();

    if (existingFavourite) {
      throw new Error("Hive already favourited");
    }

    await ctx.db.insert("favouriteHives", {
      userId,
      colonyId: args.colonyId,
      hiveId: args.hiveId,
    });

    return hive;
  },
});

export const unfavourite = mutation({
  args: {
    hiveId: v.id("hive"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const hive = await ctx.db.get(args.hiveId);

    if (!hive) {
      throw new Error("Hive not found");
    }

    const userId = identity.subject;

    const existingFavourite = await ctx.db
      .query("favouriteHives")
      .withIndex("by_user_hive", (q) =>
        q.eq("userId", userId).eq("hiveId", hive._id),
      )
      .unique();

    if (!existingFavourite) {
      throw new Error("Hive was not found");
    }

    await ctx.db.delete(existingFavourite._id);

    return hive;
  },
});
