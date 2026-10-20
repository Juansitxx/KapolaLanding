import Image from "next/image";

import slogan from "@/public/images/slogan.png";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

// El slogan va rotulado en Hug Me Tight, la fuente oficial: se usa el lettering
// del manual en vez de componerlo con la display provisional.
export function SloganBand() {
  return (
    <section aria-label="Eslogan de Kapola" className="relative overflow-hidden bg-bubblegum px-4 py-16 sm:px-6 md:py-20">
      <Reveal className="relative mx-auto flex max-w-4xl justify-center">
        <Image src={slogan} alt={site.slogan} sizes="(min-width: 768px) 640px, 85vw" className="w-full max-w-md" />
      </Reveal>
    </section>
  );
}
