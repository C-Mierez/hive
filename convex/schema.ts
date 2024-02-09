import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  hive: defineTable({
    title: v.string(),
    colonyId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index("by_colony", ["colonyId"])
    .searchIndex("search_by_title", {
      searchField: "title",
      filterFields: ["colonyId"],
    }),
  favouriteHives: defineTable({
    colonyId: v.string(),
    userId: v.string(),
    hiveId: v.id("hive"),
  })
    .index("by_colony", ["colonyId"])
    .index("by_user_colony", ["userId", "colonyId"])
    .index("by_user_hive", ["userId", "hiveId"])
    .index("by_user_colony_hive", ["userId", "colonyId", "hiveId"]),
});
