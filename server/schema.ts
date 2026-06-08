import { pgTable, text, serial, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

// Tabela de destinos
export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  description: text("description"),
  image: text("image").notNull(),
  price: text("price").notNull(),
  rating: real("rating").notNull(),
  category: text("category").default("praia"),
  size: text("size").default("medium"),
});

export const insertDestinationSchema = createInsertSchema(destinations);
export const selectDestinationSchema = createSelectSchema(destinations);

// Tabela de posts do blog
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  cover_image: text("cover_image"),
  category: text("category").default("Viagem"),
  content: text("content").notNull(),
  status: text("status").default("draft"), // "draft" | "published"
  created_at: timestamp("created_at").defaultNow(),
});

export const insertPostSchema = createInsertSchema(posts);
export const selectPostSchema = createSelectSchema(posts);

// Tabela de codigos VIP
export const vipCodes = pgTable("vip_codes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  client_name: text("client_name").notNull(),
  notes: text("notes"),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertVipCodeSchema = createInsertSchema(vipCodes);
export const selectVipCodeSchema = createSelectSchema(vipCodes);
