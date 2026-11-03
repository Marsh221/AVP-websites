"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, ShieldCheck, Truck, RotateCcw, Award } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setLoading(true);
    try {
      await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    } catch {}
    setLoading(false);
    setDone(true);
  };

  return (
    <footer className="mt-0 bg-[#09070b] text-[#100d12]">
      {/* Trust bar */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          {[
            { icon: Truck, title: "Digital-first creations", sub: "Discover cinematic visual worlds" },
            { icon: ShieldCheck, title: "Original concepts", sub: "Created with a distinct visual identity" },
            { icon: RotateCcw, title: "Commissions", sub: "Custom visual concepts available" },
            { icon: Award, title: "Celestial Archivesum-quality prints", sub: "High-resolution visual creations" },
          ].map((f) => (
            <div key={f.title} className="flex gap-3">
              <f.icon size={22} className="mt-0.5 shrink-0 text-[#c18a55]" />
              <div>
                <div className="text-sm font-bold">{f.title}</div>
                <div className="mt-0.5 text-xs text-white/60">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-serif text-3xl font-semibold tracking-wide">
            MIRA <span className="italic text-[#c18a55]">SOLENE</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Mystical, cinematic digital art exploring cosmic worlds, symbolism, shadow and ascension. Created by Art Visionary Pixel.
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Digital studio · New creations
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-[0.24em] uppercase text-[#c18a55]">Shop</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link className="hover:text-white" href="/shop">All artworks</Link></li>
            <li><Link className="hover:text-white" href="/shop?collection=Chroma%20Drift">Eclipse Guardian</Link></li>
            <li><Link className="hover:text-white" href="/shop?collection=Terra%20Memoria">Ascension Through Light</Link></li>
            <li><Link className="hover:text-white" href="/shop?collection=Gilded%20Hours">Crimson Dominion</Link></li>
            <li><Link className="hover:text-white" href="/shop?collection=Celestial Archives">Celestial Archives</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-[0.24em] uppercase text-[#c18a55]">Atelier</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link className="hover:text-white" href="/story">About AVP</Link></li>
            <li><Link className="hover:text-white" href="/story">Process & care</Link></li>
            <li><Link className="hover:text-white" href="/shop">Commissions</Link></li>
            <li><Link className="hover:text-white" href="/checkout">Shipping & returns</Link></li>
            <li><Link className="hover:text-white" href="/shop">Gift cards</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-[0.24em] uppercase text-[#c18a55]">The Studio Letter</h4>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Get occasional updates about new collections, digital releases and commissions.
          </p>
          {done ? (
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm">
              <Check size={16} className="text-emerald-400" /> Welcome to the studio. Check your inbox.
            </div>
          ) : (
            <form onSubmit={subscribe} className="mt-4 flex overflow-hidden rounded-full border border-white/15 bg-white/5 p-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent px-4 text-sm outline-none placeholder:text-white/40"
              />
              <button disabled={loading} className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#9f1d35] px-4 py-2.5 text-sm font-bold hover:bg-[#751426]">
                {loading ? "…" : <>Join <ArrowRight size={14} /></>}
              </button>
            </form>
          )}
          <p className="mt-3 text-[11px] text-white/40">Get updates on new artwork and releases</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/45 sm:flex-row">
          <span>© {new Date().getFullYear()} Art Visionary Pixel · Kenya</span>
          <span>Digital artwork and commission enquiries. Delivery terms will be confirmed per product.</span>
        </div>
      </div>
    </footer>
  );
}
