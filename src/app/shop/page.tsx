import { getProducts } from "@/lib/db-helpers";
import ShopClient from "./ShopClient";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopClient products={products} />;
}
