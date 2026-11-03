import { pgTable, serial, text, integer, boolean, timestamp, jsonb, numeric } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  collection: text("collection").notNull(),
  medium: text("medium").notNull(),
  year: integer("year").notNull().default(2025),
  price: integer("price").notNull(), // cents
  compareAt: integer("compare_at"),
  rating: numeric("rating").notNull().default("4.8"),
  reviewCount: integer("review_count").notNull().default(0),
  description: text("description").notNull(),
  story: text("story").notNull(),
  palette: jsonb("palette").$type<string[]>().notNull().default([]),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  sizes: jsonb("sizes").$type<string[]>().notNull().default([]),
  stock: integer("stock").notNull().default(1),
  featured: boolean("featured").notNull().default(false),
  bestseller: boolean("bestseller").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  soldOut: boolean("sold_out").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productSlug: text("product_slug").notNull(),
  author: text("author").notNull(),
  location: text("location").notNull().default(""),
  rating: integer("rating").notNull().default(5),
  title: text("title").notNull(),
  body: text("body").notNull(),
  verified: boolean("verified").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  address: jsonb("address").$type<Record<string, string>>().notNull().default({}),
  items: jsonb("items").$type<Array<Record<string, unknown>>>().notNull().default([]),
  subtotal: integer("subtotal").notNull(),
  shipping: integer("shipping").notNull().default(0),
  tax: integer("tax").notNull().default(0),
  total: integer("total").notNull(),
  status: text("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletter = pgTable("newsletter", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
