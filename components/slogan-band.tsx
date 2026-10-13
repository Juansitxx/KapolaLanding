import { Swoosh } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function SloganBand() {
  return (
    <section aria-label="Eslogan de Kapola" className="bg-bubblegum px-4 py-16 sm:px-6 md:py-20">
      <Reveal className="mx-auto max-w-4xl text-center">
        <p className="font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
          {site.slogan}
        </p>
        <Swoosh className="mx-auto mt-5 h-4 w-48 text-cream sm:w-64" />
      </Reveal>
    </section>
  );
}
