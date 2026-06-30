import { pgTable, text, serial, real, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

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

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  cover_image: text("cover_image"),
  category: text("category").default("Viagem"),
  location: text("location"),
  content: text("content").notNull(),
  status: text("status").default("draft"),
  featured: boolean("featured").default(false),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertPostSchema = createInsertSchema(posts);
export const selectPostSchema = createSelectSchema(posts);

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

export const itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  vip_code: text("vip_code").notNull().unique(),
  destination: text("destination").notNull(),
  image_url: text("image_url"),
  start_date: text("start_date"),
  flight_detail: text("flight_detail"),
  flight_sub: text("flight_sub"),
  hotel_detail: text("hotel_detail"),
  hotel_sub: text("hotel_sub"),
  transfer_detail: text("transfer_detail"),
  transfer_sub: text("transfer_sub"),
  days: jsonb("days").$type<{ day: number; title: string; description: string; location: string }[]>().default([]),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertItinerarySchema = createInsertSchema(itineraries);
export const selectItinerarySchema = createSelectSchema(itineraries);

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  created_at: timestamp("created_at").defaultNow(),
});
