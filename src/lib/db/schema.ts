import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";

export const phones = sqliteTable("phones", {
  id: text("id").primaryKey(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  imageUrl: text("image_url").notNull().default(""),
  releaseDate: text("release_date").notNull().default(""),
  specifications: text("specifications").notNull().default("{}"),
});

export const phonePrices = sqliteTable("phone_prices", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  phoneId: text("phone_id")
    .notNull()
    .references(() => phones.id, { onDelete: "cascade" }),
  store: text("store").notNull(),
  price: real("price"),
  currency: text("currency").notNull().default("₺"),
  url: text("url").notNull().default(""),
  updatedAt: text("updated_at").notNull().default(""),
});

export const phoneStoreUrls = sqliteTable("phone_store_urls", {
  phoneId: text("phone_id")
    .primaryKey()
    .references(() => phones.id, { onDelete: "cascade" }),
  amazon: text("amazon"),
  trendyol: text("trendyol"),
  hepsiburada: text("hepsiburada"),
});

export type Phone = typeof phones.$inferSelect;
export type PhonePrice = typeof phonePrices.$inferSelect;
export type PhoneStoreUrl = typeof phoneStoreUrls.$inferSelect;
