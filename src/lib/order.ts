import { formatPrice } from "@/data/products";
import type { CartItem } from "@/lib/cart";

export type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  notes: string;
};

/**
 * Builds the wa.me deep-link that carries the full order — line items,
 * subtotal and the customer's contact + shipping details — so the order
 * lands in WhatsApp ready to confirm.
 */
export function buildWhatsAppOrderUrl(
  items: CartItem[],
  total: number,
  countryCode: string,
  c: CustomerDetails,
): string {
  const lines = items
    .map(
      (i) =>
        `• ${i.name} ×${i.quantity} — ${formatPrice(i.price * i.quantity, countryCode)}`,
    )
    .join("\n");

  const details = [
    `Name: ${c.name}`,
    `Email: ${c.email}`,
    `Phone: ${c.phone}`,
    `Address: ${c.address}`,
    c.city && `City: ${c.city}`,
    c.postal && `Postal code: ${c.postal}`,
    c.country && `Country: ${c.country}`,
    c.notes && `Notes: ${c.notes}`,
  ]
    .filter(Boolean)
    .join("\n");

  const msg = [
    "Hi Juliette! I'd like to place an order:",
    "",
    "— MY ORDER —",
    lines,
    `Subtotal: ${formatPrice(total, countryCode)}`,
    "",
    "— SHIPPING & CONTACT —",
    details,
    "",
    "Please confirm availability, shipping & payment. Thank you!",
  ].join("\n");

  const phone = process.env.NEXT_PUBLIC_WHATSAPP ?? "923001234567";
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}
