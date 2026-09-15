import { Plus } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

// Solo datos confirmados. Lo que falta por confirmar está en assets/contenido.md
const faqs = [
  {
    q: "¿Puedo pedir galletas para hoy mismo?",
    a: "Sí. Las galletas las puedes pedir para hoy mismo o para mañana. Los postres y los pedidos grandes van por encargo, con anticipación.",
  },
  {
    q: "¿Qué pasa si escribo fuera del horario?",
    a: `Igual puedes dejarnos tu pedido y te respondemos apenas abramos. Atendemos ${site.schedule.toLowerCase()}.`,
  },
  {
    q: "¿Cuánto cuesta el domicilio?",
    a: "Depende de tu zona dentro de Ibagué. Cuando nos llegue tu pedido por WhatsApp acordamos contigo el valor del domicilio.",
  },
  {
    q: "¿Puedo elegir los sabores del combo o de la caja?",
    a: "Sí. En las mini galletas y en la Caja x4 eliges los sabores por WhatsApp, después de enviar tu pedido.",
  },
  {
    q: "¿Cuál es la galleta de temporada?",
    a: "Es un sabor sorpresa que cambia seguido (ya pasaron coco y fresa). Pregúntanos por WhatsApp cuál hay ahora, porque cuando se acaba, se acaba.",
  },
  {
    q: "¿Puedo enviarlo como regalo?",
    a: "Claro. Pide la Caja x4 y agrégale gratis una tarjeta con tu mensaje. La llevamos a la dirección que nos digas dentro de Ibagué.",
  },
  {
    q: "¿Hacen pedidos para eventos?",
    a: "Sí, armamos pedidos grandes a tu medida para cumpleaños, oficinas y detalles. Escríbenos con la fecha y la cantidad.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export function Faq() {
  return (
    <section id="preguntas" className="bg-blush px-4 py-20 sm:px-6 md:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <h2 className="candy-title text-5xl sm:text-6xl">Preguntas frecuentes</h2>
          <p className="mt-5 text-lg text-choco">Lo que más nos preguntan por WhatsApp, resuelto aquí.</p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 divide-y-2 divide-dashed divide-bubblegum-soft/40 rounded-[2rem] border-[3px] border-white bg-background px-5 shadow-pop sm:px-8">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-black text-choco [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-cream text-bubblegum-deep transition-transform duration-200 group-open:rotate-45">
                    <Plus className="size-5" aria-hidden="true" />
                  </span>
                </summary>
                <p className="-mt-1 pb-5 text-choco-soft">{a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
