import Image from "next/image";

import { menu } from "@/data/menu";
import mascota from "@/public/images/mascota.png";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/menu/product-card";

export function MenuSection() {
  return (
    <section id="menu" className="relative bg-background px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="candy-title text-5xl sm:text-6xl">El menú</h2>
          <p className="mt-5 text-lg text-choco">
            Galletas de 85 gr, crocantes por fuera y suavecitas por dentro. Arma tu pedido aquí y
            nos llega directo a WhatsApp.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((product, i) => (
            <li key={product.id}>
              <Reveal className="h-full" delay={Math.min(i, 3) * 0.05}>
                <ProductCard product={product} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex items-center justify-center gap-4 text-center">
          <Image src={mascota} alt="" sizes="64px" className="w-14" />
          <p className="max-w-sm text-left font-bold text-choco-soft">
            ¿Pedido grande para un evento o un detalle? Escríbenos y lo armamos a tu medida.
          </p>
        </div>
      </div>
    </section>
  );
}
