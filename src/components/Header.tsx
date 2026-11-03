"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X, Search, AtSign } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/shop?collection=Chroma%20Drift" },
  { label: "The Artist", href: "/story" },
  { label: "Reviews", href: "/shop" },
];

export default function Header() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#09070b] text-[#100d12]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase">
          <span className="hidden sm:inline">Mystical digital art · Made to inspire</span>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <span className="text-[#c18a55]">Explore the AVP collection</span>
          <span className="hidden h-3 w-px bg-white/20 md:block" />
          <span className="hidden md:inline-flex items-center gap-1.5 normal-case tracking-normal">
            <AtSign size={13} /> art._visionary · Mystic digital art
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          scrolled ? "border-[#382b39] bg-[#100d12]/90 shadow-[0_8px_30px_rgba(22,19,14,0.06)] backdrop-blur-xl" : "border-transparent bg-[#100d12]"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          {/* Left nav desktop */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.slice(0, 2).map((n) => (
              <Link key={n.label} href={n.href} className="link-underline text-[13px] font-semibold tracking-[0.14em] uppercase hover:text-[#9f1d35]">
                {n.label}
              </Link>
            ))}
          </nav>

          <button className="rounded-full p-2 hover:bg-[#1b151d] lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="group text-center">
            <div className="font-serif text-[26px] leading-none font-semibold tracking-[0.08em] sm:text-[30px]">
              ART VISIONARY <span className="italic font-medium text-[#9f1d35]">PIXEL</span>
            </div>
            <div className="mt-1 text-[9px] font-bold tracking-[0.42em] uppercase text-[#a69aa8]">Mystic digital art</div>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-1 sm:gap-2">
            <form
              className="hidden items-center gap-2 rounded-full border border-[#382b39] bg-white/60 px-3 py-2 md:flex"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/shop?q=${encodeURIComponent(query)}`;
              }}
            >
              <Search size={15} className="text-[#a69aa8]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artworks…"
                className="w-32 bg-transparent text-sm outline-none placeholder:text-[#827587] xl:w-40"
              />
            </form>
            <nav className="hidden items-center gap-7 lg:flex">
              {NAV.slice(2).map((n) => (
                <Link key={n.label} href={n.href} className="link-underline text-[13px] font-semibold tracking-[0.14em] uppercase hover:text-[#9f1d35]">
                  {n.label}
                </Link>
              ))}
            </nav>
            <button
              onClick={openCart}
              className="relative ml-1 flex items-center gap-2 rounded-full bg-[#09070b] px-4 py-2.5 text-sm font-semibold text-[#100d12] transition hover:bg-[#9f1d35]"
              aria-label="Open cart"
            >
              <ShoppingBag size={17} />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c18a55] px-1 text-[11px] font-bold text-[#09070b]">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="animate-fade-in border-t border-[#382b39] bg-[#100d12] px-6 py-5 lg:hidden">
            <form
              className="mb-4 flex items-center gap-2 rounded-full border border-[#382b39] bg-white px-4 py-3"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/shop?q=${encodeURIComponent(query)}`;
              }}
            >
              <Search size={16} className="text-[#a69aa8]" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search artworks…" className="w-full bg-transparent text-sm outline-none" />
            </form>
            <div className="grid gap-1">
              {[...NAV, { label: "Checkout", href: "/checkout" }].map((n) => (
                <Link key={n.label} href={n.href} className="rounded-xl px-3 py-3 font-serif text-2xl hover:bg-[#1b151d]">
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
