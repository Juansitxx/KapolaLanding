import { menu } from "@/data/menu";
import { Reveal } from "@/components/reveal";
import { ProductCard } from "@/components/menu/product-card";

const steps = [
  "Agrega tus galletas al pedido",
  "Pon tu nombre y dirección",
  "Lo confirmamos por WhatsApp y te lo llevamos",
];

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
          <p className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 text-sm font-bold">
            <span className="rounded-full bg-cream px-3 py-1 text-bubblegum-deep">
              Galletas para hoy o mañana
            </span>
            <span className="rounded-full bg-blush px-3 py-1 text-choco">
              Postres y pedidos grandes por encargo
            </span>
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <ol className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-bubblegum-soft/60 bg-white px-4 py-3"
              >
                <span className="candy-tag size-9 shrink-0 justify-center p-0">{i + 1}</span>
                <span className="text-sm leading-snug font-bold text-choco">{step}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((product, i) => (
            <li
              key={product.id}
              id={`producto-${product.id}`}
              className={product.featured ? "sm:col-span-2 lg:col-span-3" : undefined}
            >
              <Reveal className="h-full" delay={Math.min(i, 3) * 0.05}>
                <ProductCard product={product} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
