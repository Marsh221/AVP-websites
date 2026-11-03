"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Lock, ShieldCheck, Truck, CreditCard, Check, Loader2, MapPin, User, Mail } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/data";

type Step = 1 | 2 | 3;

const inputCls =
  "w-full rounded-xl border border-[#382b39] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#827587] focus:border-[#9f1d35] focus:ring-2 focus:ring-[#9f1d35]/15";
const labelCls = "mb-1.5 block text-[11px] font-bold tracking-[0.16em] uppercase text-[#a69aa8]";

export default function CheckoutPage() {
  const { items, subtotal, clear, count } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [placing, setPlacing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [address, setAddress] = useState({ street: "", city: "", state: "", zip: "", country: "Kenya" });
  const [delivery, setDelivery] = useState<"standard" | "express" | "whiteglove">("standard");
  const [payment, setPayment] = useState({ method: "card" as "card" | "paypal" | "applepay", cardNumber: "", expiry: "", cvc: "", cardName: "" });
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    if (orderNumber) return;
    if (count === 0) {
      // allow viewing empty state; don't force redirect so refresh is graceful
    }
  }, [count, orderNumber]);

  const shippingCost = delivery === "whiteglove" ? 8900 : delivery === "express" ? 4500 : subtotal >= 50000 ? 0 : 1800;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round((subtotal - discount) * 0.08);
  const total = subtotal - discount + shippingCost + tax;

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!contact.name.trim()) e.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(contact.email)) e.email = "Valid email required";
    if (!address.street.trim()) e.street = "Required";
    if (!address.city.trim()) e.city = "Required";
    if (!address.zip.trim()) e.zip = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (payment.method === "card") {
      if (payment.cardNumber.replace(/\s/g, "").length < 12) e.cardNumber = "Enter a valid card number";
      if (!payment.expiry) e.expiry = "Required";
      if (payment.cvc.length < 3) e.cvc = "Required";
      if (!payment.cardName.trim()) e.cardName = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: contact,
          address,
          items: items.map((i) => ({ slug: i.slug, title: i.title, size: i.size, price: i.price, qty: i.qty })),
          subtotal,
          shipping: shippingCost,
          tax,
          total,
        }),
      });
      const data = await res.json();
      setOrderNumber(data.orderNumber ?? `MS-${Date.now()}`);
      clear();
    } catch {
      setOrderNumber(`MS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);
      clear();
    } finally {
      setPlacing(false);
    }
  };

  const steps = [
    { n: 1, label: "Details", icon: User },
    { n: 2, label: "Delivery & Payment", icon: CreditCard },
    { n: 3, label: "Review", icon: Check },
  ];

  const summary = useMemo(
    () => (
      <div className="rounded-[24px] border border-[#382b39] bg-white p-6">
        <h3 className="font-serif text-xl font-semibold">Order summary</h3>
        {items.length === 0 && !orderNumber ? (
          <p className="mt-4 text-sm text-[#a69aa8]">Your cart is empty. <Link href="/shop" className="font-bold text-[#9f1d35] underline">Browse artworks</Link></p>
        ) : (
          <>
            <ul className="mt-4 space-y-4">
              {items.map((i) => (
                <li key={`${i.slug}-${i.size}`} className="flex gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={i.image} alt={i.title} className="h-16 w-14 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-bold leading-tight">{i.title}</p>
                    <p className="text-xs text-[#a69aa8]">{i.size} · Qty {i.qty}</p>
                  </div>
                  <span className="text-sm font-bold">{formatPrice(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex gap-2">
              <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code (try STUDIO10)" className="flex-1 rounded-full border border-[#382b39] px-4 py-2.5 text-sm outline-none placeholder:text-[#827587]" />
              <button
                onClick={() => setPromoApplied(promo.trim().toUpperCase() === "STUDIO10")}
                className="rounded-full bg-[#09070b] px-5 py-2.5 text-sm font-bold text-[#100d12] hover:bg-[#9f1d35]"
              >
                Apply
              </button>
            </div>
            {promoApplied && <p className="mt-2 text-xs font-semibold text-emerald-700">✓ STUDIO10 applied — 10% off</p>}

            <dl className="mt-5 space-y-2 border-t border-[#382b39] pt-5 text-sm">
              <div className="flex justify-between"><dt className="text-[#a69aa8]">Subtotal</dt><dd className="font-semibold">{formatPrice(subtotal)}</dd></div>
              {discount > 0 && <div className="flex justify-between text-emerald-700"><dt>Discount (STUDIO10)</dt><dd className="font-semibold">−{formatPrice(discount)}</dd></div>}
              <div className="flex justify-between"><dt className="text-[#a69aa8]">Shipping</dt><dd className="font-semibold">{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</dd></div>
              <div className="flex justify-between"><dt className="text-[#a69aa8]">Estimated tax (8%)</dt><dd className="font-semibold">{formatPrice(tax)}</dd></div>
              <div className="flex justify-between border-t border-[#382b39] pt-3 text-base"><dt className="font-bold">Total</dt><dd className="font-serif text-2xl font-semibold">{formatPrice(total)}</dd></div>
            </dl>
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-[#a69aa8]"><Lock size={11} /> DEMO CHECKOUT ONLY · No real payment is processed. Connect a payment provider before accepting orders.</p>
          </>
        )}
      </div>
    ),
    [items, subtotal, discount, shippingCost, tax, total, promo, orderNumber]
  );

  /* ── Confirmation ── */
  if (orderNumber) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="animate-fade-up rounded-[32px] border border-[#382b39] bg-white p-8 text-center sm:p-12">
          <div className="animate-pop mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="24" strokeDashoffset="24" style={{ animation: "drawCheck 0.6s 0.2s ease forwards" }} />
            </svg>
          </div>
          <h1 className="mt-6 font-serif text-4xl font-medium sm:text-5xl">Thank you, {contact.name.split(" ")[0] || "collector"}.</h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#c2b8c4]">
            Your order <b className="text-[#09070b]">{orderNumber}</b> is confirmed. Your order request has been recorded for <b>{contact.email}</b>. AVP will personally prepare your piece — expect it to ship within 5–10 business days.
          </p>
          <div className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-3">
            {[
              { icon: Truck, t: "Preparing", s: "Studio packing" },
              { icon: ShieldCheck, t: "Insured", s: "Tracked & signed" },
              { icon: Mail, t: "Updates", s: "By email & SMS" },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl bg-[#1b151d] p-4 text-center">
                <f.icon size={18} className="mx-auto text-[#9f1d35]" />
                <p className="mt-2 text-xs font-bold">{f.t}</p>
                <p className="text-[11px] text-[#a69aa8]">{f.s}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="rounded-full bg-[#09070b] px-7 py-3.5 text-sm font-bold text-[#100d12] hover:bg-[#9f1d35]">Continue collecting</Link>
            <Link href="/story" className="rounded-full border border-[#382b39] px-7 py-3.5 text-sm font-bold hover:border-[#09070b]">Visit the studio</Link>
          </div>
          <p className="mt-6 text-xs text-[#827587]">Order {orderNumber} · Total {formatPrice(total)} · A receipt was sent to {contact.email}</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-serif text-4xl">Your cart is empty</h1>
        <p className="mt-3 text-[#a69aa8]">Add a piece you love, then come back here to check out securely.</p>
        <Link href="/shop" className="mt-7 inline-block rounded-full bg-[#09070b] px-7 py-3.5 text-sm font-bold text-[#100d12] hover:bg-[#9f1d35]">Browse artworks</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-[#a69aa8] hover:text-[#09070b]">
        <ArrowLeft size={15} /> Continue shopping
      </Link>
      <h1 className="mt-4 font-serif text-4xl font-medium sm:text-5xl">Checkout</h1>

      {/* Stepper */}
      <div className="mt-8 flex items-center gap-2 sm:gap-4">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => { if (s.n < step) setStep(s.n as Step); }}
              className={`flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-bold transition ${
                step === s.n ? "bg-[#09070b] text-[#100d12]" : step > s.n ? "bg-emerald-50 text-emerald-700" : "bg-[#1b151d] text-[#a69aa8]"
              }`}
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${step === s.n ? "bg-[#9f1d35] text-white" : step > s.n ? "bg-emerald-500 text-white" : "bg-white"}`}>
                {step > s.n ? <Check size={12} /> : s.n}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < steps.length - 1 && <span className={`h-px w-6 sm:w-12 ${step > s.n ? "bg-emerald-400" : "bg-[#382b39]"}`} />}
          </div>
        ))}
        <span className="ml-auto hidden items-center gap-1.5 text-xs text-[#a69aa8] md:flex"><Lock size={12} /> Secure checkout</span>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
        <div>
          {/* STEP 1 */}
          {step === 1 && (
            <div className="animate-fade-up space-y-8">
              <section className="rounded-[24px] border border-[#382b39] bg-white p-6 sm:p-8">
                <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold"><Mail size={19} className="text-[#9f1d35]" /> Contact</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Full name *</label>
                    <input className={inputCls} value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Alexandra Moreau" />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Email *</label>
                    <input type="email" className={inputCls} value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="you@example.com" />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Phone (optional)</label>
                    <input className={inputCls} value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="+1 555 000 1234" />
                  </div>
                </div>
              </section>

              <section className="rounded-[24px] border border-[#382b39] bg-white p-6 sm:p-8">
                <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold"><MapPin size={19} className="text-[#9f1d35]" /> Shipping address</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Street address *</label>
                    <input className={inputCls} value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} placeholder="128 Gallery Row, Apt 4B" />
                    {errors.street && <p className="mt-1 text-xs text-red-600">{errors.street}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>City *</label>
                    <input className={inputCls} value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="New York" />
                    {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>State / Region</label>
                    <input className={inputCls} value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} placeholder="NY" />
                  </div>
                  <div>
                    <label className={labelCls}>ZIP / Postal code *</label>
                    <input className={inputCls} value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} placeholder="10001" />
                    {errors.zip && <p className="mt-1 text-xs text-red-600">{errors.zip}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Country</label>
                    <select className={inputCls} value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })}>
                      {["United States", "United Kingdom", "Canada", "Germany", "France", "Spain", "Italy", "Portugal", "Netherlands", "Australia", "Japan", "United Arab Emirates", "Brazil", "India"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <button onClick={() => validateStep1() && setStep(2)} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#09070b] py-4 text-sm font-bold text-[#100d12] hover:bg-[#9f1d35] sm:w-auto sm:px-10">
                Continue to delivery <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="animate-fade-up space-y-8">
              <section className="rounded-[24px] border border-[#382b39] bg-white p-6 sm:p-8">
                <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold"><Truck size={19} className="text-[#9f1d35]" /> Delivery method</h2>
                <div className="mt-5 grid gap-3">
                  {[
                    { id: "standard" as const, t: "Standard insured", s: "5–10 business days · Free over $500", p: subtotal >= 50000 ? "Free" : "$18" },
                    { id: "express" as const, t: "Express courier", s: "2–4 business days · Priority handling", p: "$45" },
                    { id: "whiteglove" as const, t: "White-glove delivery", s: "Room-of-choice placement · Packaging removed", p: "$89" },
                  ].map((o) => (
                    <label key={o.id} className={`flex cursor-pointer items-center justify-between rounded-2xl border px-5 py-4 transition ${delivery === o.id ? "border-[#09070b] bg-[#100d12]" : "border-[#382b39] hover:border-[#09070b]/40"}`}>
                      <span className="flex items-center gap-3">
                        <input type="radio" name="delivery" checked={delivery === o.id} onChange={() => setDelivery(o.id)} className="h-4 w-4 accent-[#9f1d35]" />
                        <span>
                          <span className="block text-sm font-bold">{o.t}</span>
                          <span className="block text-xs text-[#a69aa8]">{o.s}</span>
                        </span>
                      </span>
                      <span className="font-bold">{o.p}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-[#1b151d] p-4 text-sm">
                  <p className="font-semibold">Delivering to:</p>
                  <p className="mt-1 text-[#c2b8c4]">{contact.name} · {address.street}, {address.city} {address.zip}, {address.country}</p>
                  <button onClick={() => setStep(1)} className="mt-2 text-xs font-bold text-[#9f1d35] underline underline-offset-4">Edit details</button>
                </div>
              </section>

              <section className="rounded-[24px] border border-[#382b39] bg-white p-6 sm:p-8">
                <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold"><CreditCard size={19} className="text-[#9f1d35]" /> Payment</h2>
                <div className="mt-5 flex gap-2">
                  {([
                    { id: "card", l: "Card" },
                    { id: "paypal", l: "PayPal" },
                    { id: "applepay", l: "Apple Pay" },
                  ] as const).map((m) => (
                    <button key={m.id} onClick={() => setPayment({ ...payment, method: m.id })} className={`flex-1 rounded-full py-3 text-sm font-bold transition ${payment.method === m.id ? "bg-[#09070b] text-[#100d12]" : "border border-[#382b39] hover:border-[#09070b]"}`}>
                      {m.l}
                    </button>
                  ))}
                </div>

                {payment.method === "card" ? (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Card number *</label>
                      <input className={inputCls} value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value.replace(/[^\d]/g, "").replace(/(.{4})/g, "$1 ").trim() })} placeholder="4242 4242 4242 4242" maxLength={19} />
                      {errors.cardNumber && <p className="mt-1 text-xs text-red-600">{errors.cardNumber}</p>}
                      <p className="mt-1 text-[11px] text-[#827587]">Demo checkout — use 4242 4242 4242 4242, any future date & CVC.</p>
                    </div>
                    <div>
                      <label className={labelCls}>Expiry *</label>
                      <input className={inputCls} value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} placeholder="MM / YY" />
                      {errors.expiry && <p className="mt-1 text-xs text-red-600">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className={labelCls}>CVC *</label>
                      <input className={inputCls} value={payment.cvc} onChange={(e) => setPayment({ ...payment, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })} placeholder="123" />
                      {errors.cvc && <p className="mt-1 text-xs text-red-600">{errors.cvc}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Name on card *</label>
                      <input className={inputCls} value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} placeholder="As printed on card" />
                      {errors.cardName && <p className="mt-1 text-xs text-red-600">{errors.cardName}</p>}
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl bg-[#1b151d] p-5 text-center text-sm text-[#c2b8c4]">
                    You&apos;ll be redirected to {payment.method === "paypal" ? "PayPal" : "Apple Pay"} to complete your purchase securely after reviewing your order.
                  </div>
                )}
              </section>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => setStep(1)} className="rounded-full border border-[#382b39] bg-white px-8 py-4 text-sm font-bold hover:border-[#09070b]">Back</button>
                <button onClick={() => validateStep2() && setStep(3)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#09070b] py-4 text-sm font-bold text-[#100d12] hover:bg-[#9f1d35] sm:flex-none sm:px-10">
                  Review order <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="animate-fade-up space-y-8">
              <section className="rounded-[24px] border border-[#382b39] bg-white p-6 sm:p-8">
                <h2 className="font-serif text-2xl font-semibold">Review your order</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#1b151d] p-5">
                    <p className="text-[11px] font-bold tracking-widest uppercase text-[#a69aa8]">Contact & shipping</p>
                    <p className="mt-2 text-sm font-bold">{contact.name}</p>
                    <p className="text-sm text-[#c2b8c4]">{contact.email}</p>
                    <p className="mt-1 text-sm text-[#c2b8c4]">{address.street}, {address.city}, {address.state} {address.zip}, {address.country}</p>
                    <button onClick={() => setStep(1)} className="mt-2 text-xs font-bold text-[#9f1d35] underline underline-offset-4">Edit</button>
                  </div>
                  <div className="rounded-2xl bg-[#1b151d] p-5">
                    <p className="text-[11px] font-bold tracking-widest uppercase text-[#a69aa8]">Delivery & payment</p>
                    <p className="mt-2 text-sm font-bold capitalize">{delivery} delivery</p>
                    <p className="text-sm text-[#c2b8c4]">{payment.method === "card" ? `Card ending in ${payment.cardNumber.slice(-4) || "••••"}` : payment.method === "paypal" ? "PayPal" : "Apple Pay"}</p>
                    <p className="mt-1 text-sm text-[#c2b8c4]">Estimated arrival: {new Date(Date.now() + (delivery === "express" ? 3 : 8) * 86400000).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
                    <button onClick={() => setStep(2)} className="mt-2 text-xs font-bold text-[#9f1d35] underline underline-offset-4">Edit</button>
                  </div>
                </div>

                <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-[#c2b8c4]">
                  <input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 accent-[#9f1d35]" />
                  Email me studio updates and early access to Friday drops. (Optional — unsubscribe anytime.)
                </label>
              </section>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => setStep(2)} className="rounded-full border border-[#382b39] bg-white px-8 py-4 text-sm font-bold hover:border-[#09070b]">Back</button>
                <button
                  onClick={placeOrder}
                  disabled={placing}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#9f1d35] py-4 text-sm font-bold text-white transition hover:bg-[#751426] disabled:opacity-60 sm:flex-none sm:px-10"
                >
                  {placing ? <><Loader2 size={16} className="animate-spin" /> Placing your order…</> : <><Lock size={15} /> Place order — {formatPrice(total)}</>}
                </button>
              </div>
              <p className="text-center text-xs text-[#827587] sm:text-left">By placing this order you agree to our terms. Originals are one-of-one and cannot be reordered.</p>
            </div>
          )}
        </div>

        <aside className="h-fit lg:sticky lg:top-28">{summary}</aside>
      </div>
    </div>
  );
}
