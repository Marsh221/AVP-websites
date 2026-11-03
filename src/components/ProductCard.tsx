"use client";

import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import Stars from "./Stars";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem, openCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [hover, setHover] = useState(false);

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.soldOut) return;
    addItem({
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: product.sizes[product.sizes.length - 1],
      edition: product.edition,
    });
    openCart();
  };

  return (
    <article
      className="group animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative overflow-hidden rounded-[20px] bg-[#1b151d]">
        <Link href={`/product/${product.slug}`} className="block aspect-[4/5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.title}
            loading="lazy"
            className="img-zoom h-full w-full object-cover"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <span className="rounded-full bg-[#09070b] px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#100d12] uppercase">New</span>}
          {product.bestseller && <span className="rounded-full bg-[#c18a55] px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#09070b] uppercase">Bestseller</span>}
          {product.compareAt && <span className="rounded-full bg-[#9f1d35] px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-white uppercase">Save {formatPrice(product.compareAt - product.price)}</span>}
          {product.soldOut && <span className="rounded-full bg-[#09070b]/85 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-white uppercase">Sold</span>}
        </div>

        <button
          onClick={() => setLiked(!liked)}
          aria-label="Save to wishlist"
          className={`absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition ${
            liked ? "bg-[#9f1d35] text-white" : "bg-white/80 text-[#09070b] hover:bg-white"
          }`}
        >
          <Heart size={16} className={liked ? "fill-current" : ""} />
        </button>

        {/* Quick add bar */}
        <div
          className={`absolute right-3 bottom-3 left-3 transition-all duration-500 ${
            hover ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {product.soldOut ? (
            <Link href={`/product/${product.slug}`} className="flex items-center justify-center gap-2 rounded-full bg-white/90 py-3 text-sm font-bold backdrop-blur hover:bg-white">
              <Eye size={15} /> View & join waitlist
            </Link>
          ) : (
            <button onClick={quickAdd} className="w-full rounded-full bg-[#09070b]/90 py-3 text-sm font-bold text-[#100d12] backdrop-blur transition hover:bg-[#9f1d35]">
              Add to cart — {formatPrice(product.price)}
            </button>
          )}
        </div>
      </div>

      <div className="px-1 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold tracking-[0.22em] text-[#9f1d35] uppercase">{product.collection}</span>
          <span className="flex items-center gap-1.5">
            <Stars rating={product.rating} size={12} />
            <span className="text-xs text-[#a69aa8]">({product.reviewCount})</span>
          </span>
        </div>
        <Link href={`/product/${product.slug}`} className="mt-1.5 block font-serif text-[22px] leading-tight font-semibold hover:text-[#9f1d35]">
          {product.title}
        </Link>
        <p className="mt-0.5 text-xs text-[#a69aa8]">{product.medium} · {product.year}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[17px] font-bold">{formatPrice(product.price)}</span>
          {product.compareAt && <span className="text-sm text-[#827587] line-through">{formatPrice(product.compareAt)}</span>}
          <span className="text-xs text-[#827587]">· prints from {formatPrice(24000)}</span>
        </div>
      </div>
    </article>
  );
}
