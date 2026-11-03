"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  slug: string;
  title: string;
  price: number;
  image: string;
  size: string;
  edition: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (slug: string, size: string) => void;
  updateQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  toast: string | null;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "mira-solene-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const addItem = (item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.slug === item.slug && i.size === item.size);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { ...item, qty }];
    });
    setToast(`${item.title} added to your collection`);
  };

  const removeItem = (slug: string, size: string) =>
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));

  const updateQty = (slug: string, size: string, qty: number) => {
    if (qty <= 0) return removeItem(slug, size);
    setItems((prev) => prev.map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i)));
  };

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);

  const value: CartCtx = {
    items,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    updateQty,
    clear,
    count,
    subtotal,
    toast,
  };

  return (
    <Ctx.Provider value={value}>
      {children}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 animate-toast">
          <div className="flex items-center gap-3 rounded-full bg-[#09070b] px-5 py-3 text-sm text-[#100d12] shadow-2xl">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#9f1d35] text-xs">✓</span>
            {toast}
            <button onClick={() => { setToast(null); setIsOpen(true); }} className="ml-2 font-semibold underline underline-offset-4 hover:text-[#c18a55]">
              View cart
            </button>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
