import Link from "next/link";
import { ArrowRight, ArrowUpRight, Play, Sparkles, AtSign, Heart, MessageCircle, Eye } from "lucide-react";
import { getProducts, getAllReviews } from "@/lib/db-helpers";
import { COLLECTIONS, STUDIO_IMAGE, STUDIO_IMAGE_2, STUDIO_IMAGE_3 } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Stars from "@/components/Stars";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);
  const heroProduct = products[0] ?? featured[0];
  const allReviews = await getAllReviews();
  const topReviews = allReviews.slice(0, 3);
  const avgRating = (allReviews.reduce((s, r) => s + r.rating, 0) / Math.max(1, allReviews.length)).toFixed(1);

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-8 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:pt-12 lg:pb-24">
          {/* Left copy */}
          <div className="relative z-10 flex flex-col justify-center lg:col-span-5">
            <div className="animate-fade-up inline-flex w-fit items-center gap-2 rounded-full border border-[#382b39] bg-white/70 px-4 py-2 text-[11px] font-bold tracking-[0.18em] uppercase">
              <Sparkles size={13} className="text-[#9f1d35]" />
              Original art · One of one
            </div>
            <h1 className="animate-fade-up mt-6 font-serif text-[52px] leading-[0.95] font-medium tracking-tight sm:text-[72px] lg:text-[84px]" style={{ animationDelay: "80ms" }}>
              Art made for
              <br />
              the <em className="text-[#9f1d35]">feed,</em>
              <br />
              made to <em>live with.</em>
            </h1>
            <p className="animate-fade-up mt-6 max-w-md text-[17px] leading-relaxed text-[#c2b8c4]" style={{ animationDelay: "160ms" }}>
              I&apos;m Art Visionary Pixel — a visionary artist painting from my the digital realm studio. Every original is one-of-one; every print is made to order. Followed by 284,000 collectors, owned by a few hundred lucky walls.
            </p>
            <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "240ms" }}>
              <Link href="/shop" className="group inline-flex items-center gap-2 rounded-full bg-[#09070b] px-7 py-4 text-sm font-bold text-[#100d12] transition hover:bg-[#9f1d35]">
                Shop originals
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
              <Link href="/story" className="inline-flex items-center gap-2 rounded-full border border-[#09070b]/15 bg-white/60 px-7 py-4 text-sm font-bold backdrop-blur transition hover:border-[#09070b]">
                <Play size={14} className="fill-current" /> Explore the studio
              </Link>
            </div>

            {/* Social proof */}
            <div className="animate-fade-up mt-10 flex items-center gap-5" style={{ animationDelay: "320ms" }}>
              <div className="flex -space-x-2.5">
                {["SM", "JO", "LF", "AC", "DR"].map((n, i) => (
                  <span key={n} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#100d12] text-[10px] font-bold text-white ${["bg-[#9f1d35]", "bg-[#a69aa8]", "bg-[#c18a55]", "bg-[#264653]", "bg-[#6d28d9]"][i]}`}>
                    {n}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Stars rating={5} size={13} />
                  <span className="text-sm font-bold">{avgRating} / 5</span>
                </div>
                <p className="text-xs text-[#a69aa8]">A growing collection of visual worlds</p>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative lg:col-span-7">
            <div className="grid grid-cols-12 gap-4">
              <div className="group relative col-span-8 overflow-hidden rounded-[28px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroProduct?.images[0]} alt={heroProduct?.title} className="img-zoom aspect-[4/5] w-full object-cover sm:aspect-[5/6]" />
                <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-2xl bg-white/85 px-4 py-3 backdrop-blur">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#9f1d35] uppercase">Featured · {heroProduct?.collection}</p>
                    <p className="font-serif text-lg leading-tight font-semibold">{heroProduct?.title}</p>
                  </div>
                  <Link href={`/product/${heroProduct?.slug}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#09070b] text-white transition hover:bg-[#9f1d35]" aria-label="View">
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </div>
              <div className="col-span-4 flex flex-col gap-4">
                <div className="group relative flex-1 overflow-hidden rounded-[28px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={STUDIO_IMAGE} alt="AVP in her studio" className="img-zoom h-full min-h-[220px] w-full object-cover" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-[#09070b]/80 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
                    <span className="inline-flex items-center gap-1.5"><AtSign size={11} /> art._visionary</span>
                  </div>
                </div>
                <div className="rounded-[28px] bg-[#09070b] p-5 text-[#100d12]">
                  <p className="font-serif text-4xl font-semibold">AVP</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">Explore original concepts, cinematic artwork and digital releases.</p>
                  <div className="mt-4 flex gap-4 text-[11px] text-white/50">
                    <span className="inline-flex items-center gap-1"><Eye size={12} /> 2.1M views</span>
                    <span className="inline-flex items-center gap-1"><Heart size={12} /> 89k saves</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden border-y border-[#382b39] bg-[#1b151d] py-3.5">
        <div className="flex w-max animate-marquee gap-0">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {["Originals — one of one", "Digital art · New collections", "Distinct visual concepts", "Celestial Archivesum-quality prints", "30-day returns", "New drops monthly", "the digital realm studio · Worldwide delivery"].map((t) => (
                <span key={t} className="flex items-center gap-6 pr-6 text-[12px] font-bold tracking-[0.22em] whitespace-nowrap uppercase">
                  {t} <span className="text-[#9f1d35]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── COLLECTIONS ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.28em] text-[#9f1d35] uppercase">Featured collections</p>
              <h2 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Four collections, <em>one vision.</em></h2>
            </div>
            <Link href="/shop" className="link-underline text-sm font-bold">View all artworks <ArrowRight size={14} className="inline" /></Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <Link href={`/shop?collection=${encodeURIComponent(c.name)}`} className="group block">
                <div className="relative overflow-hidden rounded-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={c.name} loading="lazy" className="img-zoom aspect-[3/4] w-full object-cover" />
                  <div className="absolute inset-0 bg-[#09070b]/0 transition group-hover:bg-[#09070b]/25" />
                  <span className="absolute top-4 left-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-bold backdrop-blur">{c.count} works</span>
                  <span className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#100d12] opacity-0 transition group-hover:opacity-100">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold group-hover:text-[#9f1d35]">{c.name}</h3>
                <p className="mt-0.5 text-sm text-[#a69aa8]">{c.tagline}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FEATURED / BESTSELLERS ── */}
      <section className="bg-[#1b151d]/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold tracking-[0.28em] text-[#9f1d35] uppercase">Most loved</p>
                <h2 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Bestsellers from AVP</h2>
                <p className="mt-3 max-w-lg text-[15px] text-[#c2b8c4]">Explore selected works from the Art Visionary Pixel collection.</p>
              </div>
              <Link href="/shop" className="rounded-full bg-[#09070b] px-6 py-3.5 text-sm font-bold text-[#100d12] hover:bg-[#9f1d35]">Shop all</Link>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTIST STORY ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-[28px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={STUDIO_IMAGE_2} alt="AVP painting in her the digital realm studio" className="img-zoom aspect-[4/5] w-full object-cover" />
              </div>
              <div className="absolute -right-4 -bottom-6 hidden w-52 overflow-hidden rounded-[20px] border-4 border-[#100d12] shadow-xl sm:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={STUDIO_IMAGE_3} alt="Painting drying in the studio" className="aspect-square w-full object-cover" />
              </div>
              <div className="absolute top-5 left-5 rounded-full bg-[#100d12]/90 px-4 py-2 text-xs font-bold backdrop-blur">
                Digital Art Studio · Est. 2019
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[11px] font-bold tracking-[0.28em] text-[#9f1d35] uppercase">The artist</p>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] font-medium sm:text-5xl">
              I paint the moment
              <br />
              <em className="text-[#9f1d35]">before it disappears.</em>
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-[#c2b8c4]">
              Six years ago I posted my first painting online and woke up to 40,000 people asking where they could buy it. I had no shop, no prints, no plan — just a studio in the digital realm and a stubborn belief that art should be owned by people who love it, not locked in galleries.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-[#c2b8c4]">
              Today every original is still painted by hand, still one-of-one. Every print is made to order on cotton rag and checked by me before it leaves. When you buy from this shop, you&apos;re not buying a product — you&apos;re joining the story.
            </p>
            <blockquote className="mt-7 border-l-2 border-[#9f1d35] pl-5 font-serif text-[22px] leading-snug italic">
              “The feed made me visible. Your walls make it matter.”
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-8">
              {[
                { n: "Original", l: "Originals sold" },
                { n: "∞", l: "Creative worlds" },
                { n: "4.9★", l: "Collector rating" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-serif text-3xl font-semibold">{s.n}</p>
                  <p className="text-xs tracking-wide text-[#a69aa8] uppercase">{s.l}</p>
                </div>
              ))}
            </div>
            <Link href="/story" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#09070b] px-7 py-4 text-sm font-bold text-[#100d12] hover:bg-[#9f1d35]">
              Read my full story <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── SOCIAL / INSTAGRAM STRIP ── */}
      <section className="border-y border-[#382b39] bg-white/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.28em] text-[#9f1d35] uppercase">
                  <AtSign size={13} /> @art._visionary
                </p>
                <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">From the studio feed</h2>
              </div>
              <span className="rounded-full border border-[#382b39] bg-[#100d12] px-4 py-2 text-xs font-semibold">AVP followers · New works every Friday</span>
            </div>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {products.slice(0, 4).map((p, i) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="group relative overflow-hidden rounded-[20px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.images[0]} alt={p.title} loading="lazy" className="img-zoom aspect-square w-full object-cover" />
                <div className="absolute inset-0 flex items-end bg-[#09070b]/0 p-4 transition group-hover:bg-[#09070b]/45">
                  <div className="translate-y-3 text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-serif text-lg leading-tight">{p.title}</p>
                    <p className="mt-1 flex items-center gap-3 text-[11px] text-white/80">
                      <span className="inline-flex items-center gap-1"><Heart size={11} /> {(12 + i * 7)}k</span>
                      <span className="inline-flex items-center gap-1"><MessageCircle size={11} /> {p.reviewCount}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED GRID ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <div className="text-center">
            <p className="text-[11px] font-bold tracking-[0.28em] text-[#9f1d35] uppercase">Curated for you</p>
            <h2 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Featured works</h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-[#c2b8c4]">Hand-picked originals currently available. Each ships with a signed certificate.</p>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-[#09070b] text-[#100d12]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold tracking-[0.28em] text-[#c18a55] uppercase">Collector stories</p>
                <h2 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Loved, hung & <em className="text-[#c18a55]">lived with</em></h2>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-white/15 px-5 py-3">
                <Stars rating={5} size={15} />
                <span className="text-sm font-bold">{avgRating} average</span>
                <span className="text-sm text-white/50">· {allReviews.length} reviews</span>
              </div>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {topReviews.map((r, i) => (
              <Reveal key={i} delay={i * 100}>
                <figure className="flex h-full flex-col rounded-[24px] border border-white/10 bg-white/5 p-7">
                  <Stars rating={r.rating} size={15} />
                  <blockquote className="mt-4 flex-1 font-serif text-[21px] leading-snug italic">“{r.body}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9f1d35] text-xs font-bold">
                      {r.author.split(" ").map((w) => w[0]).join("")}
                    </span>
                    <div>
                      <p className="text-sm font-bold">{r.author}</p>
                      <p className="text-xs text-white/50">{r.location} · Verified collector</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-[#9f1d35] px-8 py-16 text-center text-white sm:px-16">
            <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#09070b]/15" />
            <p className="relative text-[11px] font-bold tracking-[0.3em] uppercase text-white/70">The Friday Drop</p>
            <h2 className="relative mx-auto mt-4 max-w-2xl font-serif text-4xl leading-tight font-medium sm:text-5xl">
              New originals land every Friday at 6pm the digital realm time. They rarely survive the weekend.
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-[15px] text-white/80">
              Join the Studio Letter for first access — collectors on the list get 30 minutes before the public drop.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/shop" className="rounded-full bg-[#100d12] px-8 py-4 text-sm font-bold text-[#09070b] transition hover:bg-[#09070b] hover:text-[#100d12]">
                Shop available works
              </Link>
              <Link href="/story" className="rounded-full border border-white/40 px-8 py-4 text-sm font-bold transition hover:bg-white/10">
                Visit the studio
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
