import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { FALLBACK_PRODUCTS, SEED_REVIEWS, type Product, type Review } from "./data";

function mapRow(r: typeof products.$inferSelect): Product {
  return {
    slug: r.slug,
    title: r.title,
    collection: r.collection,
    medium: r.medium,
    year: r.year,
    price: r.price,
    compareAt: r.compareAt,
    rating: Number(r.rating),
    reviewCount: r.reviewCount,
    description: r.description,
    story: r.story,
    palette: r.palette ?? [],
    images: r.images ?? [],
    sizes: r.sizes ?? [],
    stock: r.stock,
    featured: r.featured,
    bestseller: r.bestseller,
    isNew: r.isNew,
    soldOut: r.soldOut,
    edition: r.stock <= 1 ? "Original — 1 of 1" : `Original — Edition of ${r.stock}`,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await db.select().from(products).orderBy(desc(products.createdAt));
    if (!rows.length) return FALLBACK_PRODUCTS;
    return rows.map(mapRow);
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    if (rows.length) return mapRow(rows[0]);
  } catch {}
  return FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export async function getReviews(slug: string): Promise<Review[]> {
  try {
    const rows = await db.select().from(reviews).where(eq(reviews.productSlug, slug)).orderBy(desc(reviews.createdAt));
    if (rows.length) {
      return rows.map((r) => ({
        id: r.id,
        productSlug: r.productSlug,
        author: r.author,
        location: r.location,
        rating: r.rating,
        title: r.title,
        body: r.body,
        verified: r.verified,
        createdAt: r.createdAt?.toISOString(),
      }));
    }
  } catch {}
  return SEED_REVIEWS.filter((r) => r.productSlug === slug);
}

export async function getAllReviews(): Promise<Review[]> {
  try {
    const rows = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
    if (rows.length) {
      return rows.map((r) => ({
        id: r.id,
        productSlug: r.productSlug,
        author: r.author,
        location: r.location,
        rating: r.rating,
        title: r.title,
        body: r.body,
        verified: r.verified,
        createdAt: r.createdAt?.toISOString(),
      }));
    }
  } catch {}
  return SEED_REVIEWS;
}
