import { db } from "./index";
import { products, reviews } from "./schema";
import { FALLBACK_PRODUCTS, SEED_REVIEWS } from "../lib/data";

async function main() {
  console.log("Seeding products...");
  for (const p of FALLBACK_PRODUCTS) {
    await db
      .insert(products)
      .values({
        slug: p.slug,
        title: p.title,
        collection: p.collection,
        medium: p.medium,
        year: p.year,
        price: p.price,
        compareAt: p.compareAt ?? null,
        rating: String(p.rating),
        reviewCount: p.reviewCount,
        description: p.description,
        story: p.story,
        palette: p.palette,
        images: p.images,
        sizes: p.sizes,
        stock: p.stock,
        featured: !!p.featured,
        bestseller: !!p.bestseller,
        isNew: !!p.isNew,
        soldOut: !!p.soldOut,
      })
      .onConflictDoNothing();
  }
  console.log("Seeding reviews...");
  for (const r of SEED_REVIEWS) {
    await db
      .insert(reviews)
      .values({
        productSlug: r.productSlug,
        author: r.author,
        location: r.location,
        rating: r.rating,
        title: r.title,
        body: r.body,
        verified: r.verified,
      })
      .onConflictDoNothing();
  }
  console.log("Seed complete.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
