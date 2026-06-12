"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/cart";

type State = { items: CartItem[]; open: boolean };
type Action =
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "ADD"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE"; id: number }
  | { type: "SET_QTY"; id: number; qty: number }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "CLEAR" };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "HYDRATE":
      return { ...s, items: a.items };
    case "ADD": {
      const idx = s.items.findIndex((i) => i.id === a.payload.id);
      if (idx >= 0) {
        return {
          ...s,
          open: true,
          items: s.items.map((i, j) =>
            j === idx ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...s, open: true, items: [...s.items, { ...a.payload, quantity: 1 }] };
    }
    case "REMOVE":
      return { ...s, items: s.items.filter((i) => i.id !== a.id) };
    case "SET_QTY":
      if (a.qty < 1) return { ...s, items: s.items.filter((i) => i.id !== a.id) };
      return { ...s, items: s.items.map((i) => (i.id === a.id ? { ...i, quantity: a.qty } : i)) };
    case "OPEN":
      return { ...s, open: true };
    case "CLOSE":
      return { ...s, open: false };
    case "CLEAR":
      return { ...s, items: [] };
  }
}

type Ctx = {
  items: CartItem[];
  open: boolean;
  countryCode: string;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
};

const CartContext = createContext<Ctx | null>(null);

export function useCart(): Ctx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be called inside <CartProvider>");
  return ctx;
}

export function CartProvider({
  children,
  countryCode = "PK",
}: {
  children: ReactNode;
  countryCode?: string;
}) {
  const [state, dispatch] = useReducer(reducer, { items: [], open: false });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("juliette-cart");
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch { }
  }, []);

  useEffect(() => {
    localStorage.setItem("juliette-cart", JSON.stringify(state.items));
  }, [state.items]);

  const totalCount = state.items.reduce((n, i) => n + i.quantity, 0);
  const totalPrice = state.items.reduce((n, i) => n + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        open: state.open,
        countryCode,
        addItem: (payload) => dispatch({ type: "ADD", payload }),
        removeItem: (id) => dispatch({ type: "REMOVE", id }),
        setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
        openCart: () => dispatch({ type: "OPEN" }),
        closeCart: () => dispatch({ type: "CLOSE" }),
        clearCart: () => dispatch({ type: "CLEAR" }),
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
