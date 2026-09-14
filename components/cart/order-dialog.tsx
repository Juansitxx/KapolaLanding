"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Bike, Trash2 } from "lucide-react";

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
import { buildOrderMessage, formatCOP, whatsappUrl } from "@/lib/site";
import { statusText } from "@/lib/schedule";

export function OrderDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { lines, subtotal, setQuantity } = useCart();
  const shopStatus = useShopStatus();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [sent, setSent] = useState(false);

  const empty = lines.length === 0;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (empty) return;
    const message = buildOrderMessage(
      lines.map((l) => ({ name: l.product.name, quantity: l.quantity, price: l.product.price })),
      name.trim(),
      address.trim(),
    );
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) setSent(false);
      }}
    >
      <DialogContent
        className="top-auto bottom-0 left-0 max-h-[92dvh] max-w-none translate-x-0 translate-y-0 gap-0 overflow-y-auto rounded-t-[2rem] rounded-b-none border-t-4 border-cream bg-background p-0 text-base ring-0 data-open:slide-in-from-bottom-10 data-open:zoom-in-100 data-closed:slide-out-to-bottom-10 data-closed:zoom-out-100 sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[2rem] sm:border-4 sm:data-open:slide-in-from-bottom-4 [&_[data-slot=dialog-close]]:top-4 [&_[data-slot=dialog-close]]:right-4 [&_[data-slot=dialog-close]]:size-10 [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:bg-blush"
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
                      size="sm"
                      value={quantity}
                      min={1}
                      max={MAX_QTY}
                      onChange={(q) => setQuantity(product.id, q)}
                      label={product.name}
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(product.id, 0)}
                      className="grid size-9 shrink-0 place-items-center rounded-full text-choco-soft transition hover:bg-blush hover:text-destructive"
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

          <p className="flex gap-2 rounded-2xl bg-cream px-4 py-3 text-sm text-choco">
            <Bike className="mt-0.5 size-4 shrink-0 text-bubblegum-deep" aria-hidden="true" />
            <span>
              El domicilio se paga aparte: el costo varía según tu zona dentro de Ibagué y te lo
              confirmamos por WhatsApp.
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

          {sent && !empty && (
            <p role="status" className="text-center text-sm font-bold text-bubblegum-deep">
              ¡Listo! Terminamos de cuadrar todo por WhatsApp. Si no se abrió el chat, vuelve a
              tocar el botón.
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
