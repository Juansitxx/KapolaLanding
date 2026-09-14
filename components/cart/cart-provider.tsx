"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

import { cartCatalog, type CartItem } from "@/data/menu";

export type CartLine = { product: CartItem; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  /** Cambia en cada "agregar" para disparar el rebote del carrito */
  addedTick: number;
  add: (id: string, quantity: number) => void;
  setQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export const MAX_QTY = 50;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedTick, setAddedTick] = useState(0);

  const add = useCallback((id: string, quantity: number) => {
    setQuantities((q) => ({ ...q, [id]: Math.min(MAX_QTY, (q[id] ?? 0) + quantity) }));
    setAddedTick((t) => t + 1);
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setQuantities((q) => {
      const next = { ...q };
      if (quantity <= 0) delete next[id];
      else next[id] = Math.min(MAX_QTY, quantity);
      return next;
    });
  }, []);

  const value = useMemo(() => {
    const lines = cartCatalog
      .filter((p) => quantities[p.id])
      .map((product) => ({ product, quantity: quantities[product.id] }));
    return {
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.quantity * l.product.price, 0),
      addedTick,
      add,
      setQuantity,
    };
  }, [quantities, addedTick, add, setQuantity]);

  return (
    <CartContext.Provider value={value}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
