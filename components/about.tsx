import Image from "next/image";

import equipo from "@/public/images/equipo.png";
import premio from "@/public/images/premio-emprendimiento.jpg";
import lechonaRun from "@/public/images/lechona-run.jpg";
import feriaValientes from "@/public/images/feria-valientes.jpg";
import hechoEnCasa from "@/public/images/hecho-en-casa.jpg";
import { Reveal } from "@/components/reveal";

// Promesa de marca, tal como la define el Manual de marca V1.2026
const promise = [
  { name: "Sabor", text: "Sabores deliciosos y especiales que convierten cada antojo en una experiencia." },
  { name: "Creatividad", text: "Sabores de temporada que sorprenden y conectan con nuestros clientes." },
  { name: "Experiencia", text: "Cada pedido es un momento para disfrutar, compartir y recordar." },
  { name: "Corazón", text: "Dedicación, pasión y nuestra esencia tolimense en cada creación." },
];

const moments = [
  {
    src: feriaValientes,
    alt: "Laura Lasso sonriendo en el stand de Kapola en la feria Mujeres que abren caminos",
    caption: "ValientES",
  },
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

export function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-background section-shell">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <Reveal className="relative order-last mx-auto w-full max-w-md md:order-first">
          <figure className="-rotate-2 overflow-hidden rounded-[2rem] border-[6px] border-blush-strong bg-white shadow-pop">
            <Image
              src={premio}
              alt="Juan Calderón y Laura Lasso sosteniendo el cheque del premio de emprendimiento de la Alcaldía de Ibagué"
              sizes="(min-width: 768px) 448px, 90vw"
              className="aspect-[6/5] w-full object-cover"
              placeholder="blur"
            />
            <figcaption className="px-4 py-3 text-center text-sm font-bold text-ink-soft">
              Estímulos Municipales de Juventudes 2026, línea Potencia tu Emprendimiento
            </figcaption>
          </figure>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {moments.map((m, i) => (
              <figure
                key={m.caption}
                className={`relative overflow-hidden rounded-3xl border-4 border-blush-strong bg-white shadow-card ${
                  i % 2 ? "-rotate-2" : "rotate-2"
                }`}
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  sizes="(min-width: 768px) 144px, 30vw"
                  className="aspect-[4/5] w-full object-cover"
                  placeholder="blur"
                />
                <figcaption className="absolute bottom-1.5 left-1.5 rounded-full bg-cream px-2 py-0.5 text-[0.65rem] font-extrabold text-bubblegum-deep sm:text-xs">
                  {m.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h2 className="candy-title text-5xl sm:text-6xl">Hecho con todo el corazón</h2>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink">
            <p>
              Kapola nació en 2024 en Ibagué, cuando Juan Calderón y Laura Lasso decidieron
              convertir su antojo favorito en un emprendimiento: galletas gorditas, doraditas por
              fuera, suavecitas por dentro y con relleno de sobra.
            </p>
            <p>
              Desde entonces hemos llevado nuestras galletas a ferias y eventos de la ciudad, como
              la Lechona Run o ValientES (Mujeres que abren caminos), y armamos una comunidad que
              nos escribe cada semana preguntando cuál es la galleta de temporada (spoiler: nunca lo
              contamos antes de tiempo).
            </p>
            <p>
              En 2026 ganamos el premio de la Alcaldía de Ibagué a los emprendimientos jóvenes, y
              lo tomamos como una señal para seguir haciendo lo mismo: repostería casera, buenos
              ingredientes y mucho, mucho cariño en cada caja.
            </p>
          </div>

          {/* Retrato oficial del manual: los dueños tal como los dibuja la marca */}
          <figure className="mt-8 flex items-center gap-4">
            <Image src={equipo} alt="" sizes="160px" className="w-36 shrink-0" />
            <figcaption className="text-lg leading-snug font-black text-bubblegum-deep">
              Laura y Juan,
              <span className="block text-base font-bold text-ink-soft">
                los que amasan todo esto
              </span>
            </figcaption>
          </figure>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {promise.map(({ name, text }) => (
              <li key={name} className="rounded-2xl bg-blush px-5 py-4">
                <p className="text-sm font-black tracking-wide text-bubblegum-deep uppercase">
                  {name}
                </p>
                <p className="mt-1 text-sm leading-snug text-ink-soft">{text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
