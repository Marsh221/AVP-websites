import { notFound } from "next/navigation";
import { getProduct, getProducts, getReviews } from "@/lib/db-helpers";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [reviews, all] = await Promise.all([getReviews(slug), getProducts()]);
  const related = all.filter((p) => p.slug !== slug && p.collection === product.collection).slice(0, 4);
  const fallbackRelated = related.length ? related : all.filter((p) => p.slug !== slug).slice(0, 4);

  return <ProductDetailClient product={product} reviews={reviews} related={fallbackRelated} />;
}
