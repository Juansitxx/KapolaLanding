"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Check, Gift, Heart, Milk, Sparkles } from "lucide-react";

import { cn } from "cn";
import type { Product } from "@/data/menu";
import { formatCOP } from "@/lib/site";
import { MAX_QTY, useCart } from "@/components/cart/cart-provider";
import { QuantityStepper } from "@/components/quantity-stepper";

const swap = {
  initial: { opacity: 0, transform: "scale(0.96)", filter: "blur(2px)" },
  animate: { opacity: 1, transform: "scale(1)", filter: "blur(0px)" },
  exit: { opacity: 0, transform: "scale(0.96)", filter: "blur(2px)" },
  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] as const },
};

export function ProductCard({ product }: { product: Product }) {
  const { lines, add, setQuantity } = useCart();
  const inCartQty = lines.find((l) => l.product.id === product.id)?.quantity ?? 0;
  const inCart = inCartQty > 0;
  const actionsRef = useRef<HTMLDivElement>(null);
  const prevInCart = useRef(inCart);

  // El control cambia de botón a contador: se mueve el foco para no perderlo al teclado
  useEffect(() => {
    if (prevInCart.current === inCart) return;
    const hadFocus = actionsRef.current?.contains(document.activeElement) ||
      document.activeElement === document.body;
    prevInCart.current = inCart;
    if (!hadFocus) return;
    requestAnimationFrame(() => {
      const target = inCart
        ? actionsRef.current?.querySelector<HTMLElement>('[aria-label^="Sumar uno"]')
        : actionsRef.current?.querySelector<HTMLElement>("button");
      target?.focus();
    });
  }, [inCart]);

  const limited = Boolean(product.badge);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border-[3px] bg-white shadow-card",
        product.featured && "sm:flex-row",
        limited ? "border-bubblegum-soft" : "border-white",
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden",
          product.featured && "sm:aspect-auto sm:min-h-72 sm:w-1/2 lg:w-[55%]",
          product.imageStyle === "cutout" &&
            "grid place-items-center bg-blush-strong [background-image:radial-gradient(#fde4ee_2px,transparent_2px)] [background-size:18px_18px]",
        )}
      >
        {product.imageStyle === "photo" ? (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes={
              product.featured
                ? "(min-width: 1024px) 640px, (min-width: 640px) 50vw, 100vw"
                : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            }
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

      <div className={cn("flex flex-1 flex-col gap-3 p-5", product.featured && "sm:p-8")}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl leading-tight font-black text-choco">{product.name}</h3>
          <p className="candy-tag shrink-0 text-lg">{formatCOP(product.price)}</p>
        </div>
        <p className="text-choco-soft">{product.detail}</p>
        {product.note && (
          <p className="text-sm font-bold text-bubblegum-deep">{product.note}</p>
        )}
        {product.pairing && (
          <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blush px-3 py-1 text-sm font-extrabold text-choco">
            <Milk className="size-4 text-bubblegum-deep" aria-hidden="true" />
            {product.pairing}
          </p>
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

        <div ref={actionsRef} className="mt-auto grid pt-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {inCart ? (
              <m.div
                key="en-pedido"
                {...swap}
                className="flex h-13 items-center justify-between gap-3 rounded-full bg-cream py-0.5 pr-0.5 pl-4"
              >
                <span className="flex items-center gap-1.5 font-extrabold text-bubblegum-deep">
                  <Check className="size-5" aria-hidden="true" />
                  En tu pedido
                </span>
                <QuantityStepper
                  value={inCartQty}
                  min={0}
                  max={MAX_QTY}
                  onChange={(q) => setQuantity(product.id, q)}
                  label={product.name}
                />
              </m.div>
            ) : (
              <m.button
                key="agregar"
                {...swap}
                type="button"
                className="candy-btn h-13 w-full px-4"
                onClick={() => add(product.id, 1)}
              >
                Agregar al pedido
              </m.button>
            )}
          </AnimatePresence>
        </div>
        <p className="sr-only" aria-live="polite">
          {inCart ? `${product.name} en tu pedido: ${inCartQty}` : ""}
        </p>
      </div>
    </article>
  );
}
