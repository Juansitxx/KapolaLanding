"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ShoppingBag } from "lucide-react";

import { formatCOP } from "@/lib/site";
import { useCart } from "@/components/cart/cart-provider";
import { OrderDialog } from "@/components/cart/order-dialog";

export function FloatingCart() {
  const { count, subtotal, addedTick } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {count > 0 && (
          <m.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:right-6 sm:bottom-6"
          >
            <div className="glass flex items-center gap-3 rounded-full p-2 pl-3 sm:gap-5">
              <m.span
                key={addedTick}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.3, 0.9, 1] }}
                transition={{ duration: 0.3 }}
                className="relative grid size-12 shrink-0 place-items-center rounded-full bg-cream text-bubblegum-deep"
                aria-hidden="true"
              >
                <ShoppingBag className="size-6" />
                <span className="absolute -top-1 -right-1 grid min-w-6 place-items-center rounded-full border-2 border-white bg-bubblegum px-1 text-xs font-black text-white">
                  {count}
                </span>
              </m.span>

              <p className="min-w-0 flex-1 leading-tight" aria-live="polite">
                <span className="block text-sm font-bold text-choco-soft">
                  {count} {count === 1 ? "producto" : "productos"}
                </span>
                <span className="block text-lg font-black text-choco">{formatCOP(subtotal)}</span>
              </p>

              <button
                type="button"
                className="candy-btn h-12 shrink-0 px-5"
                onClick={() => setOpen(true)}
              >
                Finalizar pedido
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <OrderDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
