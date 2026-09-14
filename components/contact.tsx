import Image from "next/image";
import { Bike, CalendarClock, Clock, MapPin, Stamp, Wallet } from "lucide-react";

import mascota from "@/public/images/mascota.png";
import { WhatsAppIcon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { Reveal } from "@/components/reveal";
import { socials } from "@/components/social-links";
import { greetingWhatsappUrl, site } from "@/lib/site";

const info = [
  {
    icon: Bike,
    title: "100% a domicilio",
    text: "No tenemos local de atención al público: trabajamos bajo pedido y te llevamos todo a tu casa.",
  },
  {
    icon: MapPin,
    title: "Toda la zona urbana de Ibagué",
    text: "El costo del domicilio depende de tu zona y lo acordamos por WhatsApp.",
  },
  {
    icon: CalendarClock,
    title: "¿Para cuándo lo quieres?",
    text: "Las galletas las puedes pedir para hoy mismo o para mañana. Los postres y los pedidos grandes se hacen por encargo, con anticipación.",
  },
  {
    icon: Clock,
    title: "Horario de atención",
    text: site.schedule,
  },
  {
    icon: Wallet,
    title: "Paga como te quede fácil",
    text: "Efectivo, transferencia, Nequi, Daviplata, tarjeta… aceptamos todos los métodos.",
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
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Image src={mascota} alt="" sizes="112px" className="mx-auto w-24 sm:w-28" />
          <h2 className="candy-title mt-4 text-5xl sm:text-6xl">No tenemos local… ¡vamos hasta ti!</h2>
          <OpenStatus className="mt-6" />
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {info.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={Math.min(i, 3) * 0.05} className="h-full">
                <div className="flex h-full gap-4 rounded-[2rem] border-[3px] border-white bg-background p-5 shadow-card">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-cream text-bubblegum-deep">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-choco">{title}</h3>
                    <p className="mt-1 text-choco-soft">{text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={greetingWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="candy-btn h-14 w-full px-7 text-lg sm:w-auto"
          >
            <WhatsAppIcon className="size-6" />
            {site.whatsappDisplay}
          </a>
          <div className="flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="candy-btn-soft size-14"
              >
                <Icon className="size-6" />
              </a>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center font-bold text-choco-soft">
          Síguenos como {site.instagramHandle} en Instagram y TikTok
        </p>
      </div>
    </section>
  );
}
