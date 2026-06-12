"use client";

import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/data/products";
import type { CartItem } from "@/lib/cart";

function buildWAUrl(items: CartItem[], total: number, countryCode: string): string {
  const lines = items
    .map((i) => `• ${i.name} ×${i.quantity}  —  ${formatPrice(i.price * i.quantity, countryCode)}`)
    .join("\n");
  const msg = [
    "Hi Juliette! I'd like to place an order:\n",
    lines,
    `\nSubtotal: ${formatPrice(total, countryCode)}`,
    "Please confirm my order and shipping details. Thank you!",
  ].join("\n");
  const phone = process.env.NEXT_PUBLIC_WHATSAPP ?? "923001234567";
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

export default function CartDrawer() {
  const { items, open, closeCart, removeItem, setQty, totalCount, totalPrice, clearCart, countryCode } =
    useCart();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-espresso/40 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-cream flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-espresso/15">
          <p className="label-caps">
            Cart{totalCount > 0 ? ` · ${totalCount} item${totalCount !== 1 ? "s" : ""}` : ""}
          </p>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-espresso hover:text-rose transition-colors p-1"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 2l14 14M16 2L2 16" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {items.length === 0 ? (
            <p className="text-espresso/55 text-center py-16 italic font-serif text-lg">
              Your cart is empty.
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-5 border-b border-espresso/10 last:border-0"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 flex-shrink-0 bg-kraft-soft overflow-hidden border border-espresso/10">
                  {item.image ? (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-logo text-3xl text-espresso/25">
                      J
                    </div>
                  )}
                </div>

                {/* Info + controls */}
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base leading-snug">{item.name}</p>
                  <p className="label-caps !text-[0.6rem] mt-1 text-espresso/60">
                    {formatPrice(item.price, countryCode)} each
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => setQty(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 border border-espresso/25 flex items-center justify-center hover:bg-espresso hover:text-cream transition-colors text-base leading-none"
                    >
                      −
                    </button>
                    <span className="label-caps !text-[0.65rem] w-5 text-center tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => setQty(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="w-7 h-7 border border-espresso/25 flex items-center justify-center hover:bg-espresso hover:text-cream transition-colors text-base leading-none"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="ml-auto text-espresso/35 hover:text-rose transition-colors"
                    >
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1.5 1.5l10 10M11.5 1.5l-10 10" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Line total */}
                <p className="label-caps !text-[0.65rem] text-espresso/75 self-start flex-shrink-0">
                  {formatPrice(item.price * item.quantity, countryCode)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer — only when cart has items */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-espresso/15 space-y-4">
            {/* Subtotal row */}
            <div className="flex justify-between items-center">
              <span className="label-caps">Subtotal</span>
              <span className="label-caps">{formatPrice(totalPrice, countryCode)}</span>
            </div>

            {/* COD notice */}
            <div className="bg-kraft-soft border border-espresso/12 px-4 py-3">
              <p className="label-caps !text-[0.58rem] text-espresso/75 leading-relaxed">
                Worldwide Shipping &nbsp;·&nbsp; Secure Payments
                &nbsp;·&nbsp; Hand-finished in our atelier
              </p>
            </div>

            {/* WhatsApp order button */}
            <a
              href={buildWAUrl(items, totalPrice, countryCode)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeCart}
              className="btn w-full text-center block"
            >
              Order via WhatsApp
            </a>

            <button
              onClick={clearCart}
              className="w-full label-caps !text-[0.58rem] text-espresso/40 hover:text-rose transition-colors py-1"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
