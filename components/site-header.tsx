import Image from "next/image";

import logo from "@/public/images/logo.png";
import { WhatsAppIcon } from "@/components/icons";
import { greetingWhatsappUrl } from "@/lib/site";
import { TrackedLink } from "@/components/tracked-link";

const links = [
  { href: "#menu", label: "Menú" },
  { href: "#postres", label: "Postres" },
  { href: "#regalos", label: "Regalos" },
  { href: "#preguntas", label: "Preguntas" },
  { href: "#contacto", label: "Contacto" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6">
      <div className="glass relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 rounded-full pr-2 pl-4 sm:pl-6">
        <a href="#inicio" className="shrink-0 rounded-full focus-visible:outline-3 focus-visible:outline-bubblegum-deep">
          <Image src={logo} alt="Kapola" className="h-11 w-auto" sizes="120px" />
        </a>

        {/* Centrado respecto a la barra: logo y WhatsApp miden parecido, los huecos quedan simétricos */}
        <nav aria-label="Secciones" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-1 font-bold text-choco">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 transition-colors hover:bg-blush-strong hover:text-bubblegum-deep"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <TrackedLink
          event="whatsapp_click"
          source="header"
          href={greetingWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="candy-btn h-11 px-4 text-sm sm:px-5 sm:text-base"
        >
          <WhatsAppIcon className="size-5" />
          <span>WhatsApp</span>
        </TrackedLink>
      </div>
    </header>
  );
}
