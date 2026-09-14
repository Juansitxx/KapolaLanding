import Image from "next/image";
import { Award, Clock, MapPin } from "lucide-react";

import plato from "@/public/images/plato-surtido.jpg";
import mascota from "@/public/images/mascota.png";
import { Swoosh } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { greetingWhatsappUrl } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-blush px-4 pt-28 pb-16 sm:px-6 md:pt-36 md:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#f7b3cf_1.5px,transparent_1.5px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_1fr]">
        <div className="text-center md:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-cream px-4 py-1.5 text-sm font-extrabold text-bubblegum-deep shadow-card">
            <Award className="size-4" aria-hidden="true" />
            Ganadores del Premio Municipal de Emprendimiento 2026
          </p>

          <h1 className="candy-title mt-6 text-5xl sm:text-6xl lg:text-7xl">
            El sabor que te llena el{" "}
            <span className="relative inline-block">
              corazón
              <Swoosh className="absolute -bottom-3 left-0 h-4 w-full text-bubblegum-soft" />
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-choco md:mx-0">
            Galletas gorditas, recién horneadas y con el centro derretido. Hechas en Ibagué y
            llevadas hasta la puerta de tu casa. Advertencia: una no alcanza.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
            <a href="#menu" className="candy-btn h-14 w-full px-8 text-lg sm:w-auto">
              Ver el menú
            </a>
            <a
              href={greetingWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="candy-btn-soft h-14 w-full px-7 text-lg sm:w-auto"
            >
              Escríbenos
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-bold text-choco-soft md:justify-start">
            <li className="flex items-center gap-1.5">
              <MapPin className="size-4 text-bubblegum" aria-hidden="true" />
              Domicilios en todo Ibagué
            </li>
            <li className="flex items-center gap-1.5">
              <Clock className="size-4 text-bubblegum" aria-hidden="true" />
              Lun a sáb · 9 AM a 8 PM
            </li>
            <li>
              <OpenStatus />
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-lg">
          <div className="relative rotate-2 overflow-hidden rounded-[2.5rem] border-[6px] border-cream shadow-pop">
            <Image
              src={plato}
              alt="Plato con galletas Kapola de Oreo, red velvet, chips de chocolate y chips blancos junto a un vaso de leche"
              sizes="(min-width: 768px) 512px, 90vw"
              className="aspect-[5/4] w-full object-cover"
              placeholder="blur"
              preload
            />
          </div>

          <p className="absolute -top-4 -right-2 rotate-6 rounded-2xl border-[3px] border-white bg-bubblegum px-4 py-2 font-display text-xl text-white shadow-card sm:-right-6">
            ¡Recién horneadas!
          </p>

          <Image
            src={mascota}
            alt=""
            sizes="176px"
            className="absolute -bottom-10 -left-4 w-32 animate-float drop-shadow-xl sm:-left-10 sm:w-44"
          />
        </div>
      </div>
    </section>
  );
}
