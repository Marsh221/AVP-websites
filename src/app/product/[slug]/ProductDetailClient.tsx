"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Heart, Share2, ShieldCheck, Truck, RotateCcw, Check, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import type { Product, Review } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import Stars from "@/components/Stars";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailClient({ product, reviews, related }: { product: Product; reviews: Review[]; related: Product[] }) {
  const { addItem, openCart } = useCart();
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState(product.sizes[product.sizes.length - 1]);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  const [tab, setTab] = useState<"story" | "details" | "shipping">("story");
  const [reviewForm, setReviewForm] = useState({ author: "", location: "", rating: 5, title: "", body: "" });
  const [reviewState, setReviewState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews);
  const [waitlisted, setWaitlisted] = useState(false);

  const isOriginal = size.includes("Original");
  const unitPrice = isOriginal ? product.price : Math.round(product.price * (size.includes("30") ? 0.13 : 0.32));
  const displayPrice = unitPrice * qty;

  const handleAdd = () => {
    if (product.soldOut) return;
    addItem(
      {
        slug: product.slug,
        title: product.title,
        price: unitPrice,
        image: product.images[0],
        size,
        edition: isOriginal ? product.edition : "Celestial Archivesum print · Made to order",
      },
      qty
    );
    openCart();
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewState("sending");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug: product.slug, ...reviewForm }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setLocalReviews((prev) => [{ ...data.review, createdAt: new Date().toISOString() }, ...prev]);
      setReviewState("done");
      setReviewForm({ author: "", location: "", rating: 5, title: "", body: "" });
    } catch {
      setReviewState("error");
    }
  };

  const avg = localReviews.length ? (localReviews.reduce((s, r) => s + r.rating, 0) / localReviews.length).toFixed(1) : product.rating.toFixed(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#a69aa8]">
        <Link href="/" className="hover:text-[#09070b]">Home</Link> <span>/</span>
        <Link href="/shop" className="hover:text-[#09070b]">Shop</Link> <span>/</span>
        <Link href={`/shop?collection=${encodeURIComponent(product.collection)}`} className="hover:text-[#09070b]">{product.collection}</Link> <span>/</span>
        <span className="font-semibold text-[#09070b]">{product.title}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden rounded-[28px] bg-[#1b151d]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={imgIdx} src={product.images[imgIdx]} alt={product.title} className="animate-fade-in aspect-[4/5] w-full object-cover" />
            {product.soldOut && (
              <span className="absolute top-4 left-4 rounded-full bg-[#09070b]/85 px-4 py-2 text-xs font-bold tracking-widest text-white uppercase">Sold — one of one</span>
            )}
            {product.images.length > 1 && (
              <>
                <button onClick={() => setImgIdx((imgIdx - 1 + product.images.length) % product.images.length)} className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 backdrop-blur hover:bg-white" aria-label="Previous image">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={() => setImgIdx((imgIdx + 1) % product.images.length)} className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 backdrop-blur hover:bg-white" aria-label="Next image">
                  <ChevronRight size={18} />
                </button>
              </>
            )}
            <span className="absolute right-4 bottom-4 rounded-full bg-[#09070b]/70 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
              {imgIdx + 1} / {product.images.length}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {product.images.map((src, i) => (
              <button key={i} onClick={() => setImgIdx(i)} className={`overflow-hidden rounded-2xl border-2 transition ${i === imgIdx ? "border-[#9f1d35]" : "border-transparent opacity-70 hover:opacity-100"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${product.title} view ${i + 1}`} className="aspect-[4/3] w-full object-cover" />
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-[#827587]">Main view · Detail texture · In your home — tap to explore</p>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#1b151d] px-3 py-1 text-[11px] font-bold tracking-[0.18em] uppercase text-[#9f1d35]">{product.collection}</span>
            <span className="text-xs text-[#a69aa8]">{product.edition}</span>
          </div>
          <h1 className="mt-4 font-serif text-4xl leading-[1.02] font-medium sm:text-5xl">{product.title}</h1>
          <p className="mt-2 text-sm text-[#a69aa8]">{product.medium} · {product.year} · Digital Art Studio</p>

          <div className="mt-4 flex items-center gap-3">
            <Stars rating={Number(avg)} size={16} />
            <span className="text-sm font-bold">{avg}</span>
            <a href="#reviews" className="link-underline text-sm text-[#a69aa8]">{localReviews.length} reviews</a>
          </div>

          {/* Palette */}
          <div className="mt-5 flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#a69aa8]">Palette</span>
            <div className="flex gap-1.5">
              {product.palette.map((c) => (
                <span key={c} title={c} className="h-7 w-7 rounded-full border border-black/10" style={{ background: c }} />
              ))}
            </div>
          </div>

          <p className="mt-6 text-[16px] leading-relaxed text-[#3d3830]">{product.description}</p>

          {/* Size selector */}
          <div className="mt-8">
            <label className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#a69aa8]">Format</label>
            <div className="mt-3 grid gap-2">
              {product.sizes.map((s) => {
                const orig = s.includes("Original");
                const price = orig ? product.price : Math.round(product.price * (s.includes("30") ? 0.13 : 0.32));
                return (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${
                      size === s ? "border-[#09070b] bg-white shadow-sm" : "border-[#382b39] bg-white/50 hover:border-[#09070b]/40"
                    }`}
                  >
                    <span>
                      <span className="block text-sm font-bold">{s}</span>
                      <span className="block text-xs text-[#a69aa8]">{orig ? "Ships in 5–10 days · Certificate included" : "Made to order in 5–7 days · Cotton rag"}</span>
                    </span>
                    <span className="font-serif text-lg font-semibold">{formatPrice(price)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Qty + Add */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-[#382b39] bg-white">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3.5 hover:text-[#9f1d35]" aria-label="Decrease quantity"><Minus size={15} /></button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3.5 hover:text-[#9f1d35]" aria-label="Increase quantity"><Plus size={15} /></button>
            </div>
            {product.soldOut ? (
              <button
                onClick={() => setWaitlisted(true)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#09070b] py-4 text-sm font-bold text-[#100d12] hover:bg-[#9f1d35]"
              >
                {waitlisted ? <><Check size={16} /> You&apos;re on the waitlist</> : "Join the waitlist for prints"}
              </button>
            ) : (
              <button onClick={handleAdd} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#09070b] py-4 text-sm font-bold text-[#100d12] transition hover:bg-[#9f1d35]">
                <ShoppingBag size={16} /> Add to cart — {formatPrice(displayPrice)}
              </button>
            )}
            <button onClick={() => setLiked(!liked)} aria-label="Save" className={`flex h-[52px] w-[52px] items-center justify-center rounded-full border transition ${liked ? "border-[#9f1d35] bg-[#9f1d35] text-white" : "border-[#382b39] bg-white hover:border-[#9f1d35]"}`}>
              <Heart size={18} className={liked ? "fill-current" : ""} />
            </button>
            <button aria-label="Share" className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[#382b39] bg-white hover:border-[#09070b]" onClick={() => navigator.clipboard?.writeText(window.location.href)}>
              <Share2 size={18} />
            </button>
          </div>

          {!product.soldOut && product.stock <= 2 && (
            <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#9f1d35]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#9f1d35]" />
              Only {product.stock} left — originals never restock
            </p>
          )}

          {/* Trust */}
          <div className="mt-7 grid grid-cols-3 gap-3">
            {[
              { icon: ShieldCheck, t: "Certificate", s: "Signed by AVP" },
              { icon: Truck, t: "Insured shipping", s: "Free over $500" },
              { icon: RotateCcw, t: "30-day returns", s: "No questions" },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl bg-[#1b151d] p-4 text-center">
                <f.icon size={19} className="mx-auto text-[#9f1d35]" />
                <p className="mt-2 text-xs font-bold">{f.t}</p>
                <p className="text-[11px] text-[#a69aa8]">{f.s}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-8 border-t border-[#382b39] pt-6">
            <div className="flex gap-2">
              {(["story", "details", "shipping"] as const).map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`rounded-full px-5 py-2.5 text-sm font-bold capitalize transition ${tab === t ? "bg-[#09070b] text-[#100d12]" : "bg-[#1b151d] hover:bg-[#382b39]"}`}>
                  {t === "story" ? "The story" : t === "details" ? "Details" : "Shipping"}
                </button>
              ))}
            </div>
            <div className="mt-5 animate-fade-in text-[15px] leading-relaxed text-[#3d3830]" key={tab}>
              {tab === "story" && <p>{product.story}</p>}
              {tab === "details" && (
                <ul className="space-y-2">
                  <li><b>Medium:</b> {product.medium}</li>
                  <li><b>Year:</b> {product.year} · Painted in the digital realm</li>
                  <li><b>Edition:</b> {product.edition}</li>
                  <li><b>Prints:</b> Giclée on Hahnemühle 308gsm cotton rag, archival 100+ years</li>
                  <li><b>Framing:</b> Unframed prints ship rolled in a tube; originals ship crated. Framing available at checkout.</li>
                </ul>
              )}
              {tab === "shipping" && (
                <ul className="space-y-2">
                  <li><b>Originals:</b> 5–10 business days, white-glove insured delivery, signature required.</li>
                  <li><b>Prints:</b> Made to order in 5–7 days, then 3–7 days transit worldwide.</li>
                  <li><b>Free shipping</b> on orders over $500. Duties calculated at checkout — no surprises.</li>
                  <li><b>Returns:</b> 30 days, prepaid label included. Originals are returnable in original condition.</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section id="reviews" className="mt-20 border-t border-[#382b39] pt-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-serif text-3xl font-medium sm:text-4xl">Collector reviews</h2>
              <div className="flex items-center gap-2 rounded-full bg-[#1b151d] px-4 py-2">
                <Stars rating={Number(avg)} size={14} />
                <span className="text-sm font-bold">{avg} · {localReviews.length} reviews</span>
              </div>
            </div>

            {localReviews.length === 0 ? (
              <p className="mt-8 rounded-2xl bg-[#1b151d] p-6 text-sm text-[#a69aa8]">No reviews yet — be the first collector to share your story with this piece.</p>
            ) : (
              <div className="mt-8 space-y-5">
                {localReviews.map((r, i) => (
                  <article key={r.id ?? i} className="rounded-[24px] border border-[#382b39] bg-white/70 p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#09070b] text-xs font-bold text-[#100d12]">
                          {r.author.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                        </span>
                        <div>
                          <p className="flex items-center gap-1.5 text-sm font-bold">
                            {r.author}
                            {r.verified && <BadgeCheck size={14} className="text-[#9f1d35]" />}
                          </p>
                          <p className="text-xs text-[#a69aa8]">{r.location || "Verified collector"} {r.createdAt ? `· ${new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}` : ""}</p>
                        </div>
                      </div>
                      <Stars rating={r.rating} size={14} />
                    </div>
                    <h3 className="mt-4 font-serif text-xl font-semibold">{r.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#3d3830]">{r.body}</p>
                    {r.verified && <p className="mt-3 text-[11px] font-semibold tracking-wide text-emerald-700 uppercase">✓ Verified purchase</p>}
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Review form */}
          <aside className="h-fit rounded-[24px] bg-[#09070b] p-7 text-[#100d12] lg:sticky lg:top-28">
            <h3 className="font-serif text-2xl">Own this piece?</h3>
            <p className="mt-1 text-sm text-white/60">Share your experience — it helps the next collector decide.</p>
            {reviewState === "done" ? (
              <div className="mt-6 rounded-2xl bg-white/10 p-5 text-center">
                <Check size={28} className="mx-auto text-emerald-400" />
                <p className="mt-3 font-bold">Thank you!</p>
                <p className="mt-1 text-sm text-white/60">Your review is live below.</p>
                <button onClick={() => setReviewState("idle")} className="mt-4 text-sm font-bold text-[#c18a55] underline underline-offset-4">Write another</button>
              </div>
            ) : (
              <form onSubmit={submitReview} className="mt-6 space-y-3">
                <div>
                  <label className="text-xs font-bold tracking-widest uppercase text-white/50">Your rating</label>
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button type="button" key={n} onClick={() => setReviewForm({ ...reviewForm, rating: n })} aria-label={`${n} stars`}>
                        <svg width="26" height="26" viewBox="0 0 24 24" className={n <= reviewForm.rating ? "fill-[#c18a55] text-[#c18a55]" : "fill-white/20 text-white/20"}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <input required value={reviewForm.author} onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })} placeholder="Your name" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40" />
                <input value={reviewForm.location} onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })} placeholder="City, Country (optional)" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40" />
                <input required value={reviewForm.title} onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })} placeholder="Review headline" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40" />
                <textarea required rows={4} value={reviewForm.body} onChange={(e) => setReviewForm({ ...reviewForm, body: e.target.value })} placeholder="How does it feel in your home?" className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/40" />
                {reviewState === "error" && <p className="text-sm text-red-300">Something went wrong — please try again.</p>}
                <button disabled={reviewState === "sending"} className="w-full rounded-full bg-[#9f1d35] py-3.5 text-sm font-bold hover:bg-[#751426] disabled:opacity-60">
                  {reviewState === "sending" ? "Posting…" : "Post review"}
                </button>
              </form>
            )}
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-3xl font-medium">You may also love</h2>
            <Link href="/shop" className="link-underline text-sm font-bold">View all</Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
