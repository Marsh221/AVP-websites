"use client";

import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/data";

const FREE_SHIP = 50000; // $500

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal, count } = useCart();

  if (!isOpen) return null;

  const progress = Math.min(100, (subtotal / FREE_SHIP) * 100);
  const remaining = FREE_SHIP - subtotal;

  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 animate-fade-in bg-[#09070b]/50 backdrop-blur-sm" onClick={closeCart} />
      <aside className="absolute top-0 right-0 flex h-full w-full max-w-md animate-drawer flex-col bg-[#100d12] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#382b39] px-6 py-5">
          <div>
            <h2 className="font-serif text-2xl font-semibold">Your Collection</h2>
            <p className="text-xs text-[#a69aa8]">{count} {count === 1 ? "piece" : "pieces"} · saved on this device</p>
          </div>
          <button onClick={closeCart} className="rounded-full p-2 hover:bg-[#1b151d]" aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1b151d]">
              <ShoppingBag size={30} className="text-[#9f1d35]" />
            </div>
            <h3 className="mt-5 font-serif text-2xl">Your walls are waiting</h3>
            <p className="mt-2 text-sm text-[#a69aa8]">Every original is one-of-one. When it's gone, it's gone.</p>
            <Link href="/shop" onClick={closeCart} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#09070b] px-6 py-3 text-sm font-bold text-[#100d12] hover:bg-[#9f1d35]">
              Browse the shop <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b border-[#382b39] bg-[#1b151d] px-6 py-4">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Truck size={14} className="text-[#9f1d35]" />
                {remaining > 0 ? (
                  <span>You&apos;re <b className="text-[#9f1d35]">{formatPrice(remaining)}</b> away from free insured shipping</span>
                ) : (
                  <span className="text-emerald-700">Free insured shipping unlocked ✓</span>
                )}
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#382b39]">
                <div className="h-full rounded-full bg-[#9f1d35] transition-all duration-700" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="divide-y divide-[#382b39]">
                {items.map((item) => (
                  <li key={`${item.slug}-${item.size}`} className="flex gap-4 py-4">
                    <Link href={`/product/${item.slug}`} onClick={closeCart} className="h-24 w-20 shrink-0 overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link href={`/product/${item.slug}`} onClick={closeCart} className="font-serif text-lg leading-tight font-semibold hover:text-[#9f1d35]">
                            {item.title}
                          </Link>
                          <p className="mt-0.5 text-xs text-[#a69aa8]">{item.size}</p>
                          <p className="text-[11px] text-[#827587]">{item.edition}</p>
                        </div>
                        <button onClick={() => removeItem(item.slug, item.size)} className="rounded-full p-1.5 text-[#827587] hover:bg-[#1b151d] hover:text-[#9f1d35]" aria-label="Remove">
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-[#382b39]">
                          <button onClick={() => updateQty(item.slug, item.size, item.qty - 1)} className="p-2 hover:text-[#9f1d35]" aria-label="Decrease">
                            <Minus size={13} />
                          </button>
                          <span className="w-6 text-center text-sm font-bold">{item.qty}</span>
                          <button onClick={() => updateQty(item.slug, item.size, item.qty + 1)} className="p-2 hover:text-[#9f1d35]" aria-label="Increase">
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="font-serif text-lg font-semibold">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#382b39] bg-white/60 px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#a69aa8]">Subtotal</span>
                <span className="font-serif text-2xl font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-[11px] text-[#827587]">Shipping & taxes calculated at checkout · Insured delivery</p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#09070b] py-4 text-sm font-bold tracking-wide text-[#100d12] transition hover:bg-[#9f1d35]"
              >
                Proceed to checkout <ArrowRight size={16} />
              </Link>
              <button onClick={closeCart} className="mt-2 w-full py-2 text-center text-sm font-semibold text-[#a69aa8] hover:text-[#09070b]">
                Continue browsing
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
