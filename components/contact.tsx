import Image from "next/image";
import { Bike, CalendarClock, Clock, MapPin, Stamp, Wallet } from "lucide-react";

import mascota from "@/public/images/mascota.png";
import { WhatsAppIcon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { Reveal } from "@/components/reveal";
import { socials } from "@/components/social-links";
import { greetingWhatsappUrl, site } from "@/lib/site";
import { TrackedLink } from "@/components/tracked-link";

const info = [
  {
    icon: Bike,
    title: "Solo a domicilio",
    text: "No tenemos local de atención al público: trabajamos bajo pedido y te llevamos todo a tu casa.",
  },
  {
    icon: MapPin,
    title: "Llegamos hasta tu zona",
    text: "Realizamos entregas en la zona urbana, el costo del envío se confirma según tu ubicación.",
  },
  {
    icon: CalendarClock,
    title: "Tiempos de entrega",
    text: "Preparamos cada pedido con dedicación; algunos se entregan rápido y otros necesitan programación previa.",
  },
  {
    icon: Clock,
    title: "Horario de atención",
    text: site.schedule,
  },
  {
    icon: Wallet,
    title: "Formas de pago",
    text: "Efectivo, transferencia, Nequi, Daviplata… aceptamos casi todos los métodos.",
  },
  {
    icon: Stamp,
    title: "Tarjeta de fidelidad",
    text: "Cada compra suma un sello en tu tarjeta Kapola. Pídela en tu próximo pedido y empieza a coleccionar.",
  },
];

export function Contact() {
  return (
    <section id="contacto" className="bg-blush-strong px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="text-center lg:sticky lg:top-28 lg:self-start lg:text-left">
          <Image
            src={mascota}
            alt=""
            sizes="112px"
            className="mx-auto w-24 -rotate-6 sm:w-28 lg:mx-0"
          />
          <h2 className="candy-title mt-5 text-5xl sm:text-6xl">
            ¡Pide y recibe en casa!
          </h2>
          <OpenStatus className="mt-6" />

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <TrackedLink
              event="whatsapp_click"
              source="contacto"
              href={greetingWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="candy-btn h-14 w-full px-7 text-lg sm:w-auto"
            >
              <WhatsAppIcon className="size-6" />
              {site.whatsappDisplay}
            </TrackedLink>
            <ul className="flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="candy-btn-soft size-14"
                  >
                    <Icon className="size-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 font-bold text-choco-soft">
            Encuéntranos como {site.instagramHandle} en Instagram y TikTok.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="divide-y-2 divide-dashed divide-bubblegum-soft/40 rounded-[2rem] border-[3px] border-white bg-background px-5 shadow-pop sm:px-8">
            {info.map(({ icon: Icon, title, text }) => (
              <div key={title} className="relative py-5 pl-16 sm:py-6 sm:pl-[4.25rem]">
                <dt className="text-lg font-black text-choco">
                  <span className="absolute top-5 left-0 grid size-12 place-items-center rounded-2xl bg-cream text-bubblegum-deep sm:top-6">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  {title}
                </dt>
                <dd className="mt-1 text-choco-soft">{text}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
