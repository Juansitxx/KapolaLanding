import Image from "next/image";

import premio from "@/public/images/premio-emprendimiento.jpg";
import lechonaRun from "@/public/images/lechona-run.jpg";
import hechoEnCasa from "@/public/images/hecho-en-casa.jpg";
import { Reveal } from "@/components/reveal";

const moments = [
  {
    src: lechonaRun,
    alt: "Galleta Kapola empacada con el sticker de la Lechona Run",
    caption: "Lechona Run",
  },
  {
    src: hechoEnCasa,
    alt: "Bandeja de galletas de coco recién horneadas enfriándose en la rejilla",
    caption: "Recién horneadas",
  },
];

const facts = [
  { value: "2024", label: "horneando en Ibagué" },
  { value: "$10M", label: "premio municipal de emprendimiento" },
  { value: "+ferias", label: "de la ciudad, como la Lechona Run" },
];

export function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-blush px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <Reveal className="relative order-last mx-auto w-full max-w-md md:order-first">
          <figure className="-rotate-2 overflow-hidden rounded-[2rem] border-[6px] border-white bg-white shadow-pop">
            <Image
              src={premio}
              alt="Juan Calderón y Laura Lasso sosteniendo el cheque del premio de emprendimiento de la Alcaldía de Ibagué"
              sizes="(min-width: 768px) 448px, 90vw"
              className="aspect-[6/5] w-full object-cover"
              placeholder="blur"
            />
            <figcaption className="px-4 py-3 text-center text-sm font-bold text-choco-soft">
              Estímulos Municipales de Juventudes 2026 · Potencia tu Emprendimiento
            </figcaption>
          </figure>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {moments.map((m, i) => (
              <figure
                key={m.caption}
                className={`relative overflow-hidden rounded-3xl border-[5px] border-white bg-white shadow-card ${
                  i ? "-rotate-2" : "rotate-2"
                }`}
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  sizes="(min-width: 768px) 216px, 45vw"
                  className="aspect-square w-full object-cover"
                  placeholder="blur"
                />
                <figcaption className="absolute bottom-2 left-2 rounded-full bg-cream px-3 py-1 text-xs font-extrabold text-bubblegum-deep">
                  {m.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h2 className="candy-title text-5xl sm:text-6xl">Hecho con todo el corazón</h2>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-choco">
            <p>
              Kapola nació en 2024 en Ibagué, cuando Juan Calderón y Laura Lasso decidieron
              convertir su antojo favorito en un emprendimiento: galletas gorditas, doraditas por
              fuera, suavecitas por dentro y con relleno de sobra.
            </p>
            <p>
              Desde entonces hemos llevado nuestras galletas a ferias y eventos de la ciudad, como
              la Lechona Run, y armamos una comunidad que nos escribe cada semana preguntando cuál
              es la galleta de temporada (spoiler: nunca lo contamos antes de tiempo).
            </p>
            <p>
              En 2026 ganamos el premio de la Alcaldía de Ibagué a los emprendimientos jóvenes, y
              lo tomamos como una señal para seguir haciendo lo mismo: repostería casera, buenos
              ingredientes y mucho, mucho cariño en cada caja.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-3">
            {facts.map((f) => (
              <div
                key={f.label}
                className="flex flex-col-reverse gap-1 rounded-3xl border-[3px] border-white bg-cream p-3 text-center shadow-card"
              >
                <dt className="text-xs leading-tight font-bold text-choco-soft sm:text-sm">
                  {f.label}
                </dt>
                <dd className="font-display text-2xl text-bubblegum-deep sm:text-3xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
