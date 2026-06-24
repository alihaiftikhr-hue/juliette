"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { LeafDivider } from "@/components/Logo";
import { formatPrice } from "@/data/products";
import { buildWhatsAppOrderUrl, type CustomerDetails } from "@/lib/order";

const EMPTY: CustomerDetails = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postal: "",
  country: "",
  notes: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CheckoutPage() {
  const { items, totalPrice, countryCode, clearCart } = useCart();
  const [form, setForm] = useState<CustomerDetails>({
    ...EMPTY,
    country: countryCode === "PK" ? "Pakistan" : "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [placed, setPlaced] = useState(false);
  const [orderUrl, setOrderUrl] = useState("");

  const set = (key: keyof CustomerDetails) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  function validate(): boolean {
    const next: Partial<Record<keyof CustomerDetails, string>> = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!form.email.trim()) next.email = "We need an email to reach you.";
    else if (!EMAIL_RE.test(form.email.trim())) next.email = "That email doesn't look right.";
    if (!form.phone.trim()) next.phone = "A contact number, please.";
    if (!form.address.trim()) next.address = "Where should we send your finery?";
    if (!form.city.trim()) next.city = "Please add your city.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0 || !validate()) return;

    const url = buildWhatsAppOrderUrl(items, totalPrice, countryCode, {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
    });
    setOrderUrl(url);

    // Open WhatsApp in a new tab; fall back to same-tab if blocked.
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;

    clearCart();
    setPlaced(true);
  }

  // ── Confirmation ──
  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-5 sm:px-8 pt-20 pb-24 text-center">
        <p className="label-caps text-espresso/60">Order on its way</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Thank you, truly</h1>
        <LeafDivider className="w-44 mx-auto my-7 text-espresso/70" />
        <p className="text-espresso/80 leading-relaxed">
          We&rsquo;ve opened WhatsApp with your order and details. Just press send and
          we&rsquo;ll confirm availability, shipping and payment with you shortly.
        </p>
        <p className="mt-6 text-espresso/65 text-sm">
          WhatsApp didn&rsquo;t open?{" "}
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose border-b border-rose/50 hover:border-rose"
          >
            Tap here to send your order
          </a>
          .
        </p>
        <Link href="/shop" className="btn btn-ghost mt-10">
          Continue Browsing
        </Link>
      </div>
    );
  }

  // ── Empty cart ──
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 sm:px-8 pt-20 pb-24 text-center">
        <p className="label-caps text-espresso/60">Checkout</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Your cart is empty</h1>
        <LeafDivider className="w-44 mx-auto my-7 text-espresso/70" />
        <p className="text-espresso/80">
          Add a little finery to your cart and your order will appear here.
        </p>
        <Link href="/shop" className="btn mt-10">
          Explore the Collection
        </Link>
      </div>
    );
  }

  // ── Checkout form + summary ──
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-14 sm:pt-20 pb-24">
      <div className="text-center mb-10">
        <p className="label-caps text-espresso/60">Checkout</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Your details</h1>
        <p className="mt-4 max-w-xl mx-auto text-espresso/75">
          Tell us where to send your finery. When you place your order we&rsquo;ll open
          WhatsApp with everything filled in — you just press send.
        </p>
        <LeafDivider className="w-44 mx-auto mt-6 text-espresso/70" />
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16 items-start">
        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="order-2 lg:order-1">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" required error={errors.name} className="sm:col-span-2">
              <input className="field" value={form.name} onChange={set("name")} autoComplete="name" />
            </Field>
            <Field label="Email" required error={errors.email}>
              <input className="field" type="email" value={form.email} onChange={set("email")} autoComplete="email" />
            </Field>
            <Field label="Phone / WhatsApp" required error={errors.phone}>
              <input className="field" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
            </Field>
            <Field label="Shipping address" required error={errors.address} className="sm:col-span-2">
              <textarea className="field" rows={3} value={form.address} onChange={set("address")} autoComplete="street-address" />
            </Field>
            <Field label="City" required error={errors.city}>
              <input className="field" value={form.city} onChange={set("city")} autoComplete="address-level2" />
            </Field>
            <Field label="Postal code">
              <input className="field" value={form.postal} onChange={set("postal")} autoComplete="postal-code" />
            </Field>
            <Field label="Country" className="sm:col-span-2">
              <input className="field" value={form.country} onChange={set("country")} autoComplete="country-name" />
            </Field>
            <Field label="Order notes (optional)" className="sm:col-span-2">
              <textarea className="field" rows={2} value={form.notes} onChange={set("notes")} placeholder="Gift wrapping, delivery preferences, a note to the atelier…" />
            </Field>
          </div>

          <button type="submit" className="btn w-full mt-8">
            Place Order via WhatsApp
          </button>
          <p className="mt-3 text-center text-espresso/55 text-sm italic">
            No payment is taken here — we confirm everything with you on WhatsApp.
          </p>
        </form>

        {/* Order summary */}
        <aside className="order-1 lg:order-2 bg-kraft-soft border border-espresso/10 p-6 lg:sticky lg:top-20">
          <p className="label-caps text-espresso/70">Order summary</p>
          <LeafDivider className="w-28 mt-4 mb-5 text-espresso/50" />

          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <div className="relative w-14 h-14 flex-shrink-0 bg-cream overflow-hidden border border-espresso/10">
                  {item.image ? (
                    <Image src={item.image.src} alt={item.image.alt} fill className="object-cover" sizes="56px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-logo text-2xl text-espresso/25">
                      J
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base leading-snug">{item.name}</p>
                  <p className="label-caps !text-[0.58rem] mt-0.5 text-espresso/60">Qty {item.quantity}</p>
                </div>
                <p className="label-caps !text-[0.62rem] text-espresso/75 self-start">
                  {formatPrice(item.price * item.quantity, countryCode)}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-6 pt-5 border-t border-espresso/15">
            <span className="label-caps">Subtotal</span>
            <span className="label-caps">{formatPrice(totalPrice, countryCode)}</span>
          </div>
          <p className="mt-4 label-caps !text-[0.55rem] text-espresso/55 leading-relaxed">
            Worldwide Shipping · Secure Payments · Hand-finished in our atelier
          </p>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="label-caps !text-[0.58rem] text-espresso/70 block mb-2">
        {label}
        {required && <span className="text-rose"> *</span>}
      </span>
      {children}
      {error && <span className="block mt-1.5 text-sm text-rose italic">{error}</span>}
    </label>
  );
}
