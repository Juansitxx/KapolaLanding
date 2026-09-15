import Image, { type StaticImageData } from "next/image";
import { CalendarClock } from "lucide-react";

import cheesecake from "@/public/images/postre-cheesecake.jpg";
import pave from "@/public/images/postre-pave.jpg";
import mascota from "@/public/images/mascota.png";
import { WhatsAppIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { whatsappUrl } from "@/lib/site";

const desserts: { name: string; detail: string; src: StaticImageData; alt: string }[] = [
  {
    name: "Cheesecake de frutos rojos",
    detail: "Cremoso, con base de galleta y bañado en salsa de frutos rojos.",
    src: cheesecake,
    alt: "Porción de cheesecake con salsa de frutos rojos y arándanos sobre un plato blanco",
  },
  {
    name: "Pavé de galleta",
    detail: "En vaso, por capas: crema de Milo o de leche Klim con galletas Kapola.",
    src: pave,
    alt: "Vaso de pavé con capas de crema y galleta, con el sticker de Kapola",
  },
];

export function Desserts() {
  return (
    <section id="postres" className="bg-blush px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="candy-title text-5xl sm:text-6xl">Postres por encargo</h2>
          <p className="mt-5 text-lg text-choco">
            Además de galletas, hacemos postres para compartir (o para no compartir, no juzgamos).
            Se piden con anticipación: escríbenos y te contamos tamaños y precios.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {desserts.map((d, i) => (
            <li key={d.name}>
              <Reveal className="h-full" delay={i * 0.05}>
                <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border-[3px] border-white bg-white shadow-card">
                  <Image
                    src={d.src}
                    alt={d.alt}
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                    placeholder="blur"
                  />
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="text-xl leading-tight font-black text-choco">{d.name}</h3>
                    <p className="text-choco-soft">{d.detail}</p>
                    <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-sm font-extrabold text-bubblegum-deep">
                      <CalendarClock className="size-4" aria-hidden="true" />
                      Por encargo
                    </p>
                    <a
                      href={whatsappUrl(`¡Hola Kapola! Quiero cotizar: ${d.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="candy-btn-soft mt-auto h-13 w-full px-4"
                    >
                      <WhatsAppIcon className="size-5" />
                      Cotizar por WhatsApp
                    </a>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}

          <li>
            <Reveal className="h-full" delay={0.1}>
              <article className="flex h-full flex-col items-center justify-center gap-4 rounded-[2rem] border-[3px] border-white bg-bubblegum p-6 text-center text-white shadow-card">
                <Image src={mascota} alt="" sizes="96px" className="w-20 -rotate-6" />
                <h3 className="font-display text-3xl leading-tight">¿Evento o pedido grande?</h3>
                <p className="font-bold">
                  Cumpleaños, oficina, bazar o detalle para tus clientes: lo armamos a tu medida.
                  Cuéntanos la fecha y la cantidad.
                </p>
                <a
                  href={whatsappUrl("¡Hola Kapola! Quiero cotizar un pedido grande para un evento")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="candy-btn-soft h-13 w-full px-4"
                >
                  <WhatsAppIcon className="size-5" />
                  Cotizar mi pedido
                </a>
              </article>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
