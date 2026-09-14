import Image, { type StaticImageData } from "next/image";
import { Gift } from "lucide-react";

import cumpleMama from "@/public/images/regalo-cumple-mama.jpg";
import gymRat from "@/public/images/regalo-gym-rat.jpg";
import diaMadres from "@/public/images/regalo-dia-madres.jpg";
import { Reveal } from "@/components/reveal";

const gifts: { src: StaticImageData; alt: string; caption: string }[] = [
  {
    src: cumpleMama,
    alt: "Vaso de galletas Kapola con moño fucsia y tarjeta de feliz cumpleaños para mamá",
    caption: "Cumpleaños",
  },
  {
    src: gymRat,
    alt: "Caja de galletas con tarjeta de cumpleaños divertida con Bob Esponja",
    caption: "Con humor",
  },
  {
    src: diaMadres,
    alt: "Caja de galletas con moño rosado y tarjeta por el Día de la Madre",
    caption: "Día de la Madre",
  },
];

const occasions = ["Cumpleaños", "San Valentín", "Día de la Madre", "Amor y amistad", "Porque sí"];

export function Gifts() {
  return (
    <section id="regalos" className="relative overflow-hidden bg-blush-strong px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="text-center lg:text-left">
          <h2 className="candy-title text-5xl sm:text-6xl">Hazlo un regalo</h2>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-choco lg:mx-0">
            Pide tu combo de Mini galletas x4 y le ponemos una tarjeta con tu mensaje, sin costo
            extra. Tú pones las palabras bonitas (o el chiste interno), nosotros las galletas.
          </p>

          <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
            {occasions.map((o) => (
              <li
                key={o}
                className="rounded-full bg-white px-3 py-1 text-sm font-bold text-bubblegum-deep"
              >
                {o}
              </li>
            ))}
          </ul>

          <a href="#producto-mini-galletas" className="candy-btn mt-8 h-14 w-full px-8 text-lg sm:w-auto">
            <Gift className="size-5" aria-hidden="true" />
            Pedir el combo x4
          </a>
        </Reveal>

        <ul className="grid grid-cols-3 gap-3 sm:gap-5">
          {gifts.map((g, i) => (
            <li key={g.caption}>
              <Reveal delay={i * 0.05}>
                <figure
                  className={`relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-card ${
                    i === 1 ? "-rotate-2 sm:-translate-y-4" : "rotate-2"
                  }`}
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    sizes="(min-width: 1024px) 220px, 31vw"
                    className="aspect-[4/5] w-full object-cover"
                    placeholder="blur"
                  />
                  <figcaption className="absolute bottom-2 left-2 rounded-full bg-cream px-2 py-0.5 text-[0.65rem] font-extrabold text-bubblegum-deep sm:px-3 sm:py-1 sm:text-xs">
                    {g.caption}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
