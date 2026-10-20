"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

import galleta from "@/public/images/galleta.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { navLinks } from "@/components/nav-links";

// Por debajo de lg la barra no tiene sitio para las seis secciones: se abren en
// un panel. Reutiliza el Dialog que ya monta el pedido, así no entra otra
// dependencia solo para esto.
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir el menú de secciones"
        className="grid size-11 shrink-0 place-items-center rounded-full text-bubblegum-deep transition-colors hover:bg-blush-strong lg:hidden"
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-24 max-w-[calc(100%-1.5rem)] -translate-y-0 gap-0 rounded-[2rem] border border-blush-strong bg-background p-5 ring-0 shadow-pop sm:max-w-sm">
          <DialogTitle className="flex items-center gap-2 text-xl font-black text-bubblegum">
            <Image src={galleta} alt="" sizes="28px" className="w-7" />
            Secciones
          </DialogTitle>
          <DialogDescription className="sr-only">
            Enlaces a las secciones de la página de Kapola
          </DialogDescription>

          <nav aria-label="Secciones">
            <ul className="mt-4 grid gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-lg font-extrabold text-ink transition-colors hover:bg-blush-strong hover:text-bubblegum-deep"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </DialogContent>
      </Dialog>
    </>
  );
}
