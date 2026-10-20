import Image from "next/image";

import equipo from "@/public/images/equipo-busto-blanco.png";
import { BrandMark } from "@/components/brand-mark";
import { WhatsAppIcon } from "@/components/icons";
import { SocialLinks } from "@/components/social-links";
import { greetingWhatsappUrl, site } from "@/lib/site";
import { TrackedLink } from "@/components/tracked-link";

export function SiteFooter() {
  return (
    <footer className="bg-bubblegum-fill px-4 pt-12 pb-28 text-white sm:px-6 sm:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-5 sm:items-start">
          <BrandMark className="sm:w-[150px]" />
          {/* Laura, Juan y la mascota en línea blanca, como la franja del membrete */}
          <Image src={equipo} alt="" sizes="200px" className="w-44" />
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
