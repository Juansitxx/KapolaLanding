import Image from "next/image";

import chocolate from "@/public/images/por-dentro-chocolate.jpg";
import nutella from "@/public/images/por-dentro-nutella.jpg";
import { Reveal } from "@/components/reveal";

const facts = ["85 gr por galleta", "Relleno de sobra", "Hechas bajo pedido"];

export function Inside() {
  return (
    <section id="por-dentro" className="relative overflow-hidden bg-choco px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1fr_1.1fr]">
        <Reveal className="text-center md:text-left">
          <h2 className="candy-title text-5xl sm:text-6xl">Así es por dentro</h2>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-cream md:mx-0">
            Nada de galletas planas y secas: las nuestras son gorditas, doraditas por fuera,
            suavecitas por dentro y con chocolate de sobra. Pártela y nos cuentas.
          </p>

          <ul className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
            {facts.map((f) => (
              <li key={f} className="rounded-full bg-cream px-3 py-1 text-sm font-extrabold text-choco">
                {f}
              </li>
            ))}
          </ul>

          <a href="#menu" className="candy-btn mt-8 h-14 w-full px-8 text-lg sm:w-auto">
            Quiero una (o varias)
          </a>
        </Reveal>

        <div className="grid grid-cols-[1.25fr_1fr] items-center gap-4">
          <Reveal>
            <figure className="-rotate-2 overflow-hidden rounded-[2rem] border-[6px] border-cream bg-cream shadow-pop">
              <Image
                src={chocolate}
                alt="Galleta de chips de chocolate partida por la mitad con el centro de chocolate derretido"
                sizes="(min-width: 768px) 340px, 55vw"
                className="aspect-[4/3] w-full object-cover"
                placeholder="blur"
              />
              <figcaption className="px-3 py-2 text-center text-sm font-extrabold text-choco">
                Partida al medio
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <figure className="rotate-3 overflow-hidden rounded-[2rem] border-[6px] border-cream bg-cream shadow-pop">
              <Image
                src={nutella}
                alt="Torre de tres galletas rellenas de chocolate con chocolate derretido chorreando por encima"
                sizes="(min-width: 768px) 270px, 42vw"
                className="aspect-[4/5] w-full object-cover"
                placeholder="blur"
              />
              <figcaption className="px-3 py-2 text-center text-sm font-extrabold text-choco">
                Capa sobre capa
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
