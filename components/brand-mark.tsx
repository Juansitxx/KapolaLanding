import Image from "next/image";

import { cn } from "cn";
import logo from "@/public/images/logo.png";
import { site } from "@/lib/site";

// Manual de marca V1.2026 (p. 11): el logotipo nunca se reproduce por debajo de
// 100 px de ancho. El mínimo vive aquí, en CSS, para que ningún uso lo rompa sin
// darse cuenta. El lockup oficial ya trae contorno blanco, así que la misma
// imagen sirve sobre fondo claro y sobre el rosa de marca: no hay variante de color.
export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt={site.name}
      sizes="200px"
      className={cn("w-[110px] min-w-[100px] sm:w-[132px]", className)}
    />
  );
}
