"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Check, Gift, Heart, Sparkles } from "lucide-react";

import { cn } from "cn";
import type { Product } from "@/data/menu";
import { formatCOP } from "@/lib/site";
import { MAX_QTY, useCart } from "@/components/cart/cart-provider";
import { QuantityStepper } from "@/components/quantity-stepper";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1400);
    return () => clearTimeout(t);
  }, [justAdded]);

  const limited = Boolean(product.badge);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border-[3px] bg-white shadow-card",
        limited ? "border-bubblegum-soft" : "border-white",
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden",
          product.imageStyle === "cutout" &&
            "grid place-items-center bg-blush-strong [background-image:radial-gradient(#fde4ee_2px,transparent_2px)] [background-size:18px_18px]",
        )}
      >
        {product.imageStyle === "photo" ? (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            placeholder="blur"
          />
        ) : (
          <Image
            src={product.image}
            alt={product.imageAlt}
            sizes="176px"
            className="w-36 rounded-full drop-shadow-[0_14px_14px_rgb(158_13_82/0.35)] transition-transform duration-300 group-hover:rotate-12 sm:w-44"
          />
        )}

        {product.badge && (
          <p className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border-2 border-white bg-choco px-3 py-1 text-xs font-extrabold tracking-wide text-cream uppercase">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {product.badge}
          </p>
        )}
        {product.bestseller && (
          <p className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border-2 border-white bg-bubblegum px-3 py-1 text-xs font-extrabold tracking-wide text-white uppercase shadow-card">
            <Heart className="size-3.5 fill-current" aria-hidden="true" />
            Más pedido
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl leading-tight font-black text-choco">{product.name}</h3>
          <p className="candy-tag shrink-0 text-lg">{formatCOP(product.price)}</p>
        </div>
        <p className="text-choco-soft">{product.detail}</p>
        {product.note && (
          <p className="text-sm font-bold text-bubblegum-deep">{product.note}</p>
        )}
        {product.giftCard && (
          <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-sm font-extrabold text-bubblegum-deep">
            <Gift className="size-4" aria-hidden="true" />
            Tarjeta personalizada gratis
          </p>
        )}
        {product.pastFlavors && (
          <div className="flex items-center gap-3 rounded-2xl bg-blush px-3 py-2">
            <p className="text-xs leading-tight font-extrabold text-choco-soft">
              Ya pasaron por temporada:
            </p>
            <ul className="flex gap-2">
              {product.pastFlavors.map((f) => (
                <li key={f.name} className="flex flex-col items-center gap-0.5">
                  <Image
                    src={f.image}
                    alt={`Galleta de ${f.name.toLowerCase()} (temporada pasada)`}
                    sizes="48px"
                    className="size-11 rounded-full border-2 border-white object-cover shadow-card"
                  />
                  <span className="text-[0.7rem] font-bold text-choco">{f.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <QuantityStepper value={qty} onChange={setQty} max={MAX_QTY} label={product.name} />
          <button
            type="button"
            className="candy-btn h-12 flex-1 basis-44 px-4 whitespace-nowrap"
            onClick={() => {
              add(product.id, qty);
              setQty(1);
              setJustAdded(true);
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={justAdded ? "ok" : "add"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-1.5"
              >
                {justAdded ? (
                  <>
                    <Check className="size-5" aria-hidden="true" /> ¡Agregado!
                  </>
                ) : (
                  "Agregar al pedido"
                )}
              </m.span>
            </AnimatePresence>
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {justAdded ? `${product.name} agregado al pedido` : ""}
        </p>
      </div>
    </article>
  );
}
