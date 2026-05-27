import { pgTable, text, serial, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  image: text("image").notNull(),
  price: text("price").notNull(),
  rating: real("rating").notNull(),
  size: text("size").default("medium"),
});

export const insertDestinationSchema = createInsertSchema(destinations);
export const selectDestinationSchema = createSelectSchema(destinations);