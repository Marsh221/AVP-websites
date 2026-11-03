"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Search, ChevronDown } from "lucide-react";
import type { Product } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest" | "title";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "title", label: "Alphabetical" },
];

const PRICE_BANDS = [
  { label: "Under $150", min: 0, max: 15000 },
  { label: "$150 – $500", min: 15000, max: 50000 },
  { label: "$500 – $2,000", min: 50000, max: 200000 },
  { label: "Over $2,000", min: 200000, max: Infinity },
];

function ShopInner({ initialProducts }: { initialProducts: Product[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [collection, setCollection] = useState(params.get("collection") ?? "All");
  const [sort, setSort] = useState<SortKey>("featured");
  const [bands, setBands] = useState<number[]>([]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyOriginals, setOnlyOriginals] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [visible, setVisible] = useState(12);

  useEffect(() => {
    const c = params.get("collection");
    if (c) setCollection(c);
    const q = params.get("q");
    if (q) setQuery(q);
  }, [params]);

  const collections = useMemo(() => ["All", ...Array.from(new Set(initialProducts.map((p) => p.collection)))], [initialProducts]);

  const filtered = useMemo(() => {
    let list = [...initialProducts];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.medium.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (collection !== "All") list = list.filter((p) => p.collection === collection);
    if (bands.length) {
      list = list.filter((p) => bands.some((b) => p.price >= PRICE_BANDS[b].min && p.price < PRICE_BANDS[b].max));
    }
    if (onlyAvailable) list = list.filter((p) => !p.soldOut);
    if (onlyOriginals) list = list.filter((p) => p.stock <= 2);

    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.sort((a, b) => b.year - a.year); break;
      case "title": list.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: list.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false) || b.reviewCount - a.reviewCount);
    }
    return list;
  }, [initialProducts, query, collection, bands, onlyAvailable, onlyOriginals, sort]);

  const activeCount = (collection !== "All" ? 1 : 0) + bands.length + (onlyAvailable ? 1 : 0) + (onlyOriginals ? 1 : 0) + (query ? 1 : 0);

  const clearAll = () => {
    setQuery(""); setCollection("All"); setBands([]); setOnlyAvailable(false); setOnlyOriginals(false);
  };

  const toggleBand = (i: number) => setBands((prev) => (prev.includes(i) ? prev.filter((b) => b !== i) : [...prev, i]));

  const FilterPanel = (
    <div className="space-y-7">
      {/* Search */}
      <div>
        <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#a69aa8]">Search</label>
        <div className="mt-2 flex items-center gap-2 rounded-full border border-[#382b39] bg-white px-4 py-2.5">
          <Search size={15} className="shrink-0 text-[#827587]" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Title, medium, mood…" className="w-full bg-transparent text-sm outline-none placeholder:text-[#827587]" />
          {query && <button onClick={() => setQuery("")}><X size={14} /></button>}
        </div>
      </div>

      {/* Collection */}
      <div>
        <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#a69aa8]">Collection</label>
        <div className="mt-3 flex flex-wrap gap-2">
          {collections.map((c) => (
            <button
              key={c}
              onClick={() => setCollection(c)}
              className={`rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                collection === c ? "bg-[#09070b] text-[#100d12]" : "border border-[#382b39] bg-white hover:border-[#09070b]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#a69aa8]">Price</label>
        <div className="mt-3 space-y-2">
          {PRICE_BANDS.map((b, i) => (
            <label key={b.label} className="flex cursor-pointer items-center gap-3 text-sm">
              <input type="checkbox" checked={bands.includes(i)} onChange={() => toggleBand(i)} className="h-4 w-4 rounded accent-[#9f1d35]" />
              {b.label}
            </label>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        <label className="flex cursor-pointer items-center justify-between text-sm font-semibold">
          Available only
          <input type="checkbox" checked={onlyAvailable} onChange={(e) => setOnlyAvailable(e.target.checked)} className="h-5 w-5 accent-[#9f1d35]" />
        </label>
        <label className="flex cursor-pointer items-center justify-between text-sm font-semibold">
          Low stock / originals
          <input type="checkbox" checked={onlyOriginals} onChange={(e) => setOnlyOriginals(e.target.checked)} className="h-5 w-5 accent-[#9f1d35]" />
        </label>
      </div>

      {activeCount > 0 && (
        <button onClick={clearAll} className="w-full rounded-full border border-[#9f1d35] py-3 text-sm font-bold text-[#9f1d35] hover:bg-[#9f1d35] hover:text-white">
          Clear all filters ({activeCount})
        </button>
      )}

      <div className="rounded-2xl bg-[#1b151d] p-5">
        <p className="font-serif text-lg leading-snug">Can&apos;t decide?</p>
        <p className="mt-1 text-xs leading-relaxed text-[#a69aa8]">Every order includes a free 15-min video consultation with AVP to help you choose the right piece for your space.</p>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.28em] text-[#9f1d35] uppercase">The shop</p>
          <h1 className="mt-2 font-serif text-4xl font-medium sm:text-5xl">
            {collection === "All" ? "All artworks" : collection}
          </h1>
          <p className="mt-2 text-sm text-[#a69aa8]">{filtered.length} {filtered.length === 1 ? "work" : "works"} · Originals are one-of-one · Prints made to order</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setMobileFilters(!mobileFilters)} className="flex items-center gap-2 rounded-full border border-[#382b39] bg-white px-5 py-3 text-sm font-bold lg:hidden">
            <SlidersHorizontal size={15} /> Filters {activeCount > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#9f1d35] text-[11px] text-white">{activeCount}</span>}
          </button>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="appearance-none rounded-full border border-[#382b39] bg-white py-3 pr-10 pl-5 text-sm font-bold outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[260px_1fr]">
        {/* Sidebar desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">{FilterPanel}</div>
        </aside>

        {/* Mobile filters */}
        {mobileFilters && (
          <div className="animate-fade-in rounded-[24px] border border-[#382b39] bg-[#100d12] p-6 lg:hidden">{FilterPanel}</div>
        )}

        {/* Grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center rounded-[24px] border border-dashed border-[#382b39] bg-white/50 px-8 py-20 text-center">
              <p className="font-serif text-3xl">No works match those filters</p>
              <p className="mt-2 max-w-sm text-sm text-[#a69aa8]">Try widening the price range or clearing your search — new originals land every Friday.</p>
              <button onClick={clearAll} className="mt-6 rounded-full bg-[#09070b] px-6 py-3 text-sm font-bold text-[#100d12] hover:bg-[#9f1d35]">Clear filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.slice(0, visible).map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
              {visible < filtered.length && (
                <div className="mt-12 text-center">
                  <button onClick={() => setVisible((v) => v + 9)} className="rounded-full border border-[#09070b] px-8 py-3.5 text-sm font-bold hover:bg-[#09070b] hover:text-[#100d12]">
                    Load more works ({filtered.length - visible} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopClient({ products }: { products: Product[] }) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-20 text-center text-[#a69aa8]">Loading the gallery…</div>}>
      <ShopInner initialProducts={products} />
    </Suspense>
  );
}
