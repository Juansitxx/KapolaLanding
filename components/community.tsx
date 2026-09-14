import Image, { type StaticImageData } from "next/image";

import feria from "@/public/images/feria-entrega.jpg";
import memeUno from "@/public/images/meme-uno.jpg";
import colombia from "@/public/images/a-que-sabe-colombia.jpg";
import memePerro from "@/public/images/meme-perro.jpg";
import { InstagramIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

type Tile = { src: StaticImageData; alt: string; caption: string };

const tiles: Tile[] = [
  { src: feria, alt: "Entregando un pedido a una clienta en una feria", caption: "En ferias" },
  { src: memeUno, alt: "Meme de cartas UNO +2 con galletas Kapola", caption: "Memes" },
  { src: colombia, alt: "La mascota de Kapola con la bandera de Colombia", caption: "Nuestra mascota" },
  { src: memePerro, alt: "Meme de un bulldog francés pensando en galletas", caption: "Antojos" },
];

export function Community() {
  return (
    <section className="bg-background px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="candy-title text-5xl sm:text-6xl">Así se vive Kapola</h2>
          <p className="mt-5 text-lg text-choco">
            Ferias, antojos y uno que otro meme. Lo que pasa en nuestras redes, no se queda en
            nuestras redes.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
          {tiles.map((t, i) => (
            <li key={t.alt}>
              <Reveal delay={i * 0.05}>
                <figure
                  className={`relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-card ${
                    i % 2 ? "rotate-1" : "-rotate-1"
                  }`}
                >
                  <Image
                    src={t.src}
                    alt={t.alt}
                    sizes="(min-width: 768px) 220px, 45vw"
                    className="aspect-[4/5] w-full object-cover"
                    placeholder="blur"
                  />
                  <figcaption className="absolute bottom-2 left-2 rounded-full bg-cream px-3 py-1 text-xs font-extrabold text-bubblegum-deep">
                    {t.caption}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
          <li className="col-span-2 md:col-span-1">
            <Reveal delay={0.2} className="h-full">
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full min-h-32 flex-col items-center justify-center gap-2 rounded-3xl border-4 border-white bg-bubblegum p-4 text-center text-white shadow-card transition hover:-translate-y-1"
              >
                <InstagramIcon className="size-10" />
                <span className="font-display text-2xl leading-tight">Síguenos</span>
                <span className="text-sm font-extrabold">{site.instagramHandle}</span>
              </a>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
