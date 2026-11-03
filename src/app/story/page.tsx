import Link from "next/link";
import { ArrowRight, AtSign, Heart, Eye, Award, Palette, Package, MessageCircle } from "lucide-react";
import { STUDIO_IMAGE, STUDIO_IMAGE_2, STUDIO_IMAGE_3, COLLECTIONS } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { getAllReviews } from "@/lib/db-helpers";
import Stars from "@/components/Stars";

export const dynamic = "force-dynamic";

export default async function StoryPage() {
  const reviews = await getAllReviews();
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / Math.max(1, reviews.length)).toFixed(1);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.28em] text-[#9f1d35] uppercase">The artist</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.02] font-medium sm:text-6xl">
              Welcome to Art Visionary Pixel.
              <br />
              <em className="text-[#9f1d35]">I create for the</em>
              <br />
              curious mind.
            </h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#c2b8c4]">
              Art Visionary Pixel is a digital art project exploring mystical, cinematic and surreal visual worlds. The work draws on cosmic imagery, symbolic forms, dramatic light, shadow and themes of transformation. The goal is to create artwork that feels like a glimpse into a larger universe.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-[#09070b] px-7 py-4 text-sm font-bold text-[#100d12] hover:bg-[#9f1d35]">
                Shop my work <ArrowRight size={15} />
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#382b39] bg-white px-6 py-4 text-sm font-semibold">
                <AtSign size={15} className="text-[#9f1d35]" /> art._visionary · AVP
              </span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative">
              <div className="overflow-hidden rounded-[28px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={STUDIO_IMAGE} alt="Abstract digital artwork from Art Visionary Pixel" className="img-zoom aspect-[4/5] w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 left-6 flex items-center gap-4 rounded-2xl bg-[#09070b] px-5 py-4 text-[#100d12] shadow-xl">
                <Award size={22} className="text-[#c18a55]" />
                <div>
                  <p className="text-sm font-bold">Digital art studio</p>
                  <p className="text-xs text-white/60">Rua das Flores 42 · Visits by appointment</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#382b39] bg-[#1b151d]/70">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { n: "Original", l: "Originals sold", i: Palette },
            { n: "01", l: "Mystical concepts", i: AtSign },
            { n: "∞", l: "Creative possibilities", i: Package },
            { n: "Open", l: "Commissions", i: Heart },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <s.i size={20} className="mx-auto text-[#9f1d35]" />
              <p className="mt-3 font-serif text-4xl font-semibold">{s.n}</p>
              <p className="mt-1 text-xs tracking-wide text-[#a69aa8] uppercase">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[0.28em] text-[#9f1d35] uppercase">The journey</p>
          <h2 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Building worlds beyond the frame</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { y: "01", t: "The vision", b: "A creative direction shaped by mystical imagery, cosmic themes and dramatic contrast." },
            { y: "2021", t: "The first original sold", b: "Eclipse Guardian No. 1 sold in 11 minutes. I cried, then painted for three days straight. The atelier was born." },
            { y: "03", t: "Digital creation", b: "The work grew into digital artwork, visual storytelling and content for online platforms." },
            { y: "04", t: "What comes next", b: "New collections, digital releases and creative collaborations are part of the journey ahead." },
          ].map((m, i) => (
            <Reveal key={m.y} delay={i * 90}>
              <div className="h-full rounded-[24px] border border-[#382b39] bg-white/70 p-7">
                <span className="font-serif text-5xl font-semibold text-[#9f1d35]/25">{m.y}</span>
                <h3 className="mt-3 font-serif text-2xl font-semibold">{m.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#c2b8c4]">{m.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#09070b] text-[#100d12]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={STUDIO_IMAGE_2} alt="Painting process" className="aspect-[3/4] w-full rounded-[24px] object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={STUDIO_IMAGE_3} alt="Studio details" className="mt-10 aspect-[3/4] w-full rounded-[24px] object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[11px] font-bold tracking-[0.28em] text-[#c18a55] uppercase">How it&apos;s made</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight font-medium sm:text-5xl">A universe in every image.</h2>
            <div className="mt-8 space-y-6">
              {[
                { t: "A distinct visual identity", b: "A consistent dark, mystical and cinematic direction across the collections." },
                { t: "Visual storytelling", b: "Each artwork is developed to communicate atmosphere, symbolism and a sense of narrative." },
                { t: "Made for digital spaces", b: "Artwork is prepared for digital presentation, sharing and selected product formats." },
              ].map((f) => (
                <div key={f.t} className="flex gap-4">
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#9f1d35]"><CheckIcon /></span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold">{f.t}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">{f.b}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-6 text-sm text-white/60">
              <span className="inline-flex items-center gap-2"><Eye size={15} className="text-[#c18a55]" /> Digital creativity</span>
              <span className="inline-flex items-center gap-2"><MessageCircle size={15} className="text-[#c18a55]" /> Commissions & collaborations</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Collections recap */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-4xl font-medium">Explore the collections</h2>
            <Link href="/shop" className="link-underline text-sm font-bold">Shop all works</Link>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTIONS.map((c) => (
            <Link key={c.slug} href={`/shop?collection=${encodeURIComponent(c.name)}`} className="group relative overflow-hidden rounded-[24px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name} loading="lazy" className="img-zoom aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-end bg-[#09070b]/35 p-5 text-white">
                <p className="font-serif text-2xl font-semibold">{c.name}</p>
                <p className="text-xs text-white/75">{c.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews strip */}
      <section className="border-t border-[#382b39] bg-[#1b151d]/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-serif text-3xl font-medium">What collectors say</h2>
              <span className="flex items-center gap-2"><Stars rating={5} size={15} /><b>{avg}</b><span className="text-[#a69aa8]">· {reviews.length} reviews</span></span>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.slice(0, 3).map((r, i) => (
              <Reveal key={i} delay={i * 90}>
                <figure className="h-full rounded-[24px] bg-white p-6 shadow-sm">
                  <Stars rating={r.rating} size={13} />
                  <blockquote className="mt-3 font-serif text-lg leading-snug italic">“{r.body}”</blockquote>
                  <figcaption className="mt-4 text-sm font-bold">{r.author} <span className="font-normal text-[#a69aa8]">· {r.location}</span></figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-[#09070b] px-8 py-4 text-sm font-bold text-[#100d12] hover:bg-[#9f1d35]">
              Find your piece <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
  );
}
