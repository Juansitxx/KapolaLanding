import Image from "next/image";

import logo from "@/public/images/logo.png";
import mascota from "@/public/images/mascota.png";
import { WhatsAppIcon } from "@/components/icons";
import { SocialLinks } from "@/components/social-links";
import { greetingWhatsappUrl, site } from "@/lib/site";
import { TrackedLink } from "@/components/tracked-link";

export function SiteFooter() {
  return (
    <footer className="bg-bubblegum-fill px-4 pt-12 pb-28 text-white sm:px-6 sm:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        {/* Placa blanca: el logo provisional es rosa y no contrasta sobre el footer */}
        <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2">
          <Image src={mascota} alt="" sizes="48px" className="w-10" />
          <Image src={logo} alt="Kapola" sizes="140px" className="h-10 w-auto" />
        </div>

        <p className="text-sm">
          © {new Date().getFullYear()} Kapola, Ibagué. {site.slogan}.
        </p>

        <div className="flex gap-2">
          <SocialLinks linkClassName="bg-white/15 hover:bg-white/25 focus-visible:outline-white" />
          <TrackedLink
            event="whatsapp_click"
            source="footer"
            href={greetingWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp de Kapola"
            className="grid size-11 place-items-center rounded-full bg-white/15 transition hover:bg-white/25 focus-visible:outline-white"
          >
            <WhatsAppIcon className="size-5" />
          </TrackedLink>
        </div>
      </div>
    </footer>
  );
}
