"use client";

import { useCart } from "@/components/CartProvider";
import type { CartItem } from "@/lib/cart";

type Props = {
  item: Omit<CartItem, "quantity">;
  soldOut: boolean;
};

export default function CartButton({ item, soldOut }: Props) {
  const { addItem } = useCart();

  if (soldOut) {
    return (
      <span className="btn !cursor-default opacity-45" aria-disabled="true">
        Sold Out
      </span>
    );
  }

  return (
    <button className="btn" onClick={() => addItem(item)}>
      Add to Cart
    </button>
  );
}
