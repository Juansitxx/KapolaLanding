import Image from "next/image";

import logo from "@/public/images/logo.png";
import mascota from "@/public/images/mascota.png";
import { WhatsAppIcon } from "@/components/icons";
import { SocialLinks } from "@/components/social-links";
import { greetingWhatsappUrl, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-choco px-4 pt-12 pb-28 text-cream sm:px-6 sm:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <Image src={mascota} alt="" sizes="48px" className="w-12" />
          <Image src={logo} alt="Kapola" sizes="140px" className="h-12 w-auto" />
        </div>

        <p className="text-sm">
          © {new Date().getFullYear()} Kapola, Ibagué. {site.slogan}.
        </p>

        <div className="flex gap-2">
          <SocialLinks linkClassName="bg-cream/10 hover:bg-bubblegum" />
          <a
            href={greetingWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp de Kapola"
            className="grid size-11 place-items-center rounded-full bg-cream/10 transition hover:bg-bubblegum"
          >
            <WhatsAppIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
