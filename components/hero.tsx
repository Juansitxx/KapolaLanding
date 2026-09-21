import Image from "next/image";
import { Award } from "lucide-react";

import plato from "@/public/images/plato-surtido.jpg";
import mascota from "@/public/images/mascota.png";
import { Swoosh, WhatsAppIcon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { greetingWhatsappUrl } from "@/lib/site";
import { TrackedLink } from "@/components/tracked-link";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-blush px-4 pt-28 pb-20 sm:px-6 md:pt-32 md:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#f7b3cf_1.5px,transparent_1.5px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.05fr_1fr]">
        <div className="text-center md:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-cream px-4 py-1.5 text-sm font-extrabold text-bubblegum-deep shadow-card">
            <Award className="size-4 shrink-0" aria-hidden="true" />
            Ganadores del Portafolio de Estímulos Municipales de Juventudes 2026 prueba
          </p>

          <h1 className="candy-title mt-6 text-5xl sm:text-6xl lg:text-[4.25rem]">
            El sabor que te llena el{" "}
            <span className="relative inline-block">
              corazón
              <Swoosh className="absolute -bottom-3 left-0 h-4 w-full text-bubblegum-soft" />
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-choco md:mx-0">
            Galletas gorditas con el centro derretido, hechas en Ibagué y llevadas hasta tu puerta.
            Advertencia: una no alcanza.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
            <a href="#menu" className="candy-btn h-14 w-full px-8 text-lg sm:w-auto">
              Ver el menú
            </a>
            <TrackedLink
              event="whatsapp_click"
              source="hero"
              href={greetingWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="candy-btn-soft h-14 w-full px-7 text-lg sm:w-auto"
            >
              <WhatsAppIcon className="size-5" />
              WhatsApp
            </TrackedLink>
          </div>

          <OpenStatus className="mt-7" />
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-lg">
          <div className="relative rotate-2 overflow-hidden rounded-[2.5rem] border-[6px] border-cream shadow-pop">
            <Image
              src={plato}
              alt="Plato con galletas Kapola de Oreo, red velvet, chips de chocolate y chips blancos junto a un vaso de leche"
              sizes="(min-width: 768px) 512px, 90vw"
              className="aspect-[5/4] w-full object-cover"
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <p className="absolute -top-4 -right-2 rotate-6 animate-pop-in rounded-2xl border-[3px] border-white bg-bubblegum px-4 py-2 font-display text-xl text-white shadow-card [animation-delay:350ms] sm:-right-6">
            ¡Recién horneadas!
          </p>

          <div className="absolute -bottom-10 -left-4 w-32 animate-pop-in [animation-delay:150ms] sm:-left-10 sm:w-44">
            <Image
              src={mascota}
              alt=""
              sizes="176px"
              className="w-full animate-float drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
