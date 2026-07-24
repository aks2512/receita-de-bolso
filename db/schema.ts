import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recipeTable = sqliteTable("recipes", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  filePath: text("file_path"),
  time: integer("time", { mode: "number" }),
  description: text("description"),
  category: text("category").notNull(),
  ingredients: text("ingredients", { mode: "json" })
    .$type<string[]>()
    .notNull()
    .default([]),
  steps: text("steps", { mode: "json" })
    .$type<string[]>()
    .notNull()
    .default([]),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
