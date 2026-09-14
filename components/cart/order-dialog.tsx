"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Bike, Gift, Milk, Trash2 } from "lucide-react";
import { track } from "@vercel/analytics";

import mascota from "@/public/images/mascota.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WhatsAppIcon } from "@/components/icons";
import { QuantityStepper } from "@/components/quantity-stepper";
import { MAX_QTY, useCart } from "@/components/cart/cart-provider";
import { useShopStatus } from "@/components/open-status";
import { addons } from "@/data/menu";
import { buildOrderMessage, formatCOP, whatsappUrl } from "@/lib/site";
import { statusText } from "@/lib/schedule";

const CARD_MAX = 200;

export function OrderDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { lines, subtotal, add, setQuantity } = useCart();
  const shopStatus = useShopStatus();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [wantsCard, setWantsCard] = useState(false);
  const [card, setCard] = useState({ to: "", from: "", message: "" });

  const empty = lines.length === 0;
  const cardProduct = lines.find((l) => l.product.giftCard)?.product;
  const includeCard = Boolean(cardProduct) && wantsCard;
  const milk = addons[0];
  const hasMilk = lines.some((l) => l.product.id === milk.id);

  const orderUrl = whatsappUrl(
    buildOrderMessage(
      lines.map((l) => ({ name: l.product.name, quantity: l.quantity, price: l.product.price })),
      name.trim(),
      address.trim(),
      includeCard
        ? { to: card.to.trim(), from: card.from.trim(), message: card.message.trim() }
        : undefined,
    ),
  );
  // El enlace de respaldo solo sirve si el pedido no cambió desde que se envió
  const showFallback = sentUrl !== null && sentUrl === orderUrl && !empty;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (empty) return;
    window.open(orderUrl, "_blank", "noopener,noreferrer");
    setSentUrl(orderUrl);
    track("pedido_enviado", {
      productos: lines.reduce((n, l) => n + l.quantity, 0),
      total: subtotal,
      tarjeta: includeCard ? "si" : "no",
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setSentUrl(null);
      }}
    >
      <DialogContent
        className="top-auto bottom-0 left-0 max-h-[92dvh] max-w-none translate-x-0 translate-y-0 gap-0 overflow-y-auto rounded-t-[2rem] rounded-b-none bg-background shadow-[inset_0_4px_0_var(--color-cream),0_-12px_40px_-12px_rgb(158_13_82/0.35)] p-0 text-base ring-0 data-open:slide-in-from-bottom-10 data-open:zoom-in-100 data-closed:slide-out-to-bottom-10 data-closed:zoom-out-100 sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[2rem] sm:shadow-[inset_0_0_0_4px_var(--color-cream),0_24px_48px_-20px_rgb(158_13_82/0.5)] sm:data-open:slide-in-from-bottom-4 [&_[data-slot=dialog-close]]:top-4 [&_[data-slot=dialog-close]]:right-4 [&_[data-slot=dialog-close]]:size-10 [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:bg-blush"
      >
        <DialogHeader className="flex-row items-center gap-3 px-5 pt-5 pb-3 pr-16">
          <Image src={mascota} alt="" sizes="48px" className="w-12" />
          <div>
            <DialogTitle className="font-display text-3xl font-normal text-bubblegum">
              Tu pedido
            </DialogTitle>
            <DialogDescription className="text-choco-soft">
              Revisa, completa tus datos y te llevamos al chat.
            </DialogDescription>
          </div>
        </DialogHeader>

        {empty ? (
          <div className="px-5 pt-4 pb-8 text-center">
            <p className="text-lg font-bold text-choco">Tu pedido está vacío… y la galleta está triste.</p>
            <button
              type="button"
              className="candy-btn mt-5 h-12 px-6"
              onClick={() => onOpenChange(false)}
            >
              Ver el menú
            </button>
          </div>
        ) : (
          <ul className="px-5">
            <AnimatePresence initial={false}>
              {lines.map(({ product, quantity }) => (
                <m.li
                  key={product.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-3 border-b-2 border-dashed border-border py-3">
                    <div className="min-w-0 flex-1">
                      <p className="leading-tight font-black text-choco">{product.name}</p>
                      <p className="text-sm text-choco-soft">
                        {formatCOP(product.price)} c/u ·{" "}
                        <span className="font-bold text-choco">
                          {formatCOP(product.price * quantity)}
                        </span>
                      </p>
                    </div>
                    <QuantityStepper
                      value={quantity}
                      min={1}
                      max={MAX_QTY}
                      onChange={(q) => setQuantity(product.id, q)}
                      label={product.name}
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(product.id, 0)}
                      className="grid size-11 shrink-0 place-items-center rounded-full text-choco-soft transition-colors hover:bg-blush hover:text-destructive"
                      aria-label={`Eliminar ${product.name} del pedido`}
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        )}

        {!empty && !hasMilk && (
          <div className="mx-5 mt-4 flex items-center gap-3 rounded-2xl border-2 border-dashed border-bubblegum-soft bg-white px-4 py-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cream text-bubblegum-deep">
              <Milk className="size-5" aria-hidden="true" />
            </span>
            <p className="min-w-0 flex-1 text-sm leading-snug text-choco">
              <strong className="block">¿Le agregas leche?</strong>
              {milk.detail}
            </p>
            <button
              type="button"
              onClick={() => add(milk.id, 1)}
              className="candy-btn-soft h-11 shrink-0 px-4 text-sm"
            >
              +{formatCOP(milk.price)}
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 pt-4 pb-6">
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-choco-soft">Total de productos</span>
            <span className="text-2xl font-black text-choco">{formatCOP(subtotal)}</span>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="order-name" className="text-base font-extrabold text-choco">
              ¿A nombre de quién?
            </Label>
            <Input
              id="order-name"
              name="name"
              autoComplete="name"
              required
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="h-12 rounded-2xl border-2 bg-white px-4 text-base"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="order-address" className="text-base font-extrabold text-choco">
              Dirección de entrega
            </Label>
            <Input
              id="order-address"
              name="address"
              autoComplete="street-address"
              required
              maxLength={160}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Barrio, calle y número, alguna referencia"
              className="h-12 rounded-2xl border-2 bg-white px-4 text-base"
            />
          </div>

          {cardProduct && (
            <div className="rounded-2xl border-2 border-dashed border-bubblegum-soft bg-white px-4 py-3">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={wantsCard}
                  onChange={(e) => setWantsCard(e.target.checked)}
                  className="mt-0.5 size-5 shrink-0 accent-bubblegum"
                />
                <span>
                  <span className="flex items-center gap-1.5 font-extrabold text-choco">
                    <Gift className="size-4 text-bubblegum" aria-hidden="true" />
                    ¿Es un regalo? Agrega una tarjeta
                  </span>
                  <span className="block text-sm text-choco-soft">
                    Gratis con tu {cardProduct.name}. Va con tu mensaje en la tarjeta.
                  </span>
                </span>
              </label>

              <AnimatePresence initial={false}>
                {wantsCard && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-3 pt-4 pb-1">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-1.5">
                          <Label htmlFor="card-to" className="font-extrabold text-choco">
                            Para
                          </Label>
                          <Input
                            id="card-to"
                            required
                            maxLength={40}
                            value={card.to}
                            onChange={(e) => setCard((c) => ({ ...c, to: e.target.value }))}
                            placeholder="Mamá"
                            className="h-11 rounded-2xl border-2 bg-white px-3 text-base"
                          />
                        </div>
                        <div className="grid gap-1.5">
                          <Label htmlFor="card-from" className="font-extrabold text-choco">
                            De <span className="font-normal text-choco-soft">(opcional)</span>
                          </Label>
                          <Input
                            id="card-from"
                            maxLength={40}
                            value={card.from}
                            onChange={(e) => setCard((c) => ({ ...c, from: e.target.value }))}
                            placeholder="Tu nombre"
                            className="h-11 rounded-2xl border-2 bg-white px-3 text-base"
                          />
                        </div>
                      </div>
                      <div className="grid gap-1.5">
                        <Label htmlFor="card-message" className="font-extrabold text-choco">
                          Mensaje
                        </Label>
                        <textarea
                          id="card-message"
                          required
                          maxLength={CARD_MAX}
                          rows={3}
                          value={card.message}
                          onChange={(e) => setCard((c) => ({ ...c, message: e.target.value }))}
                          placeholder="¡Feliz cumple! Para la mejor mamá, unas deliciosas galletas"
                          className="w-full resize-none rounded-2xl border-2 border-input bg-white px-3 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        />
                        <span className="text-right text-xs text-choco-soft" aria-live="polite">
                          {card.message.length}/{CARD_MAX}
                        </span>
                      </div>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <p className="flex gap-2 rounded-2xl bg-cream px-4 py-3 text-sm text-choco">
            <Bike className="mt-0.5 size-4 shrink-0 text-bubblegum-deep" aria-hidden="true" />
            <span>
              Puedes pedir tus galletas para hoy mismo o para mañana. El domicilio se paga aparte:
              el costo varía según tu zona dentro de Ibagué y lo acordamos por WhatsApp.
            </span>
          </p>

          {shopStatus && shopStatus !== "open" && (
            <p className="rounded-2xl bg-blush px-4 py-3 text-sm text-choco">
              <strong>{statusText[shopStatus]}.</strong> Igual puedes dejarnos tu pedido y te
              respondemos apenas abramos.
            </p>
          )}

          <button type="submit" className="candy-btn h-14 w-full text-lg" disabled={empty}>
            <WhatsAppIcon className="size-6" />
            Enviar pedido por WhatsApp
          </button>

          {showFallback && (
            <p role="status" className="text-center text-sm font-bold text-bubblegum-deep">
              ¡Listo! Terminamos de cuadrar todo por WhatsApp.{" "}
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-2"
              >
                ¿No se abrió el chat? Toca aquí
              </a>
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
