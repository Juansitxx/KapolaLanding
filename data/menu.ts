import type { StaticImageData } from "next/image";

import chipsChocolate from "@/public/images/chips-chocolate.jpg";
import redVelvet from "@/public/images/red-velvet.png";
import cheesecakeMaracuya from "@/public/images/cheesecake-maracuya.jpg";
import oreo from "@/public/images/oreo.jpg";
import temporada from "@/public/images/temporada.png";
import temporadaCoco from "@/public/images/temporada-coco.jpg";
import temporadaFresa from "@/public/images/temporada-fresa.jpg";
import miniGalletas from "@/public/images/mini-galletas.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  detail: string;
  image: StaticImageData;
  imageAlt: string;
  /** "photo" llena la tarjeta; "cutout" es una galleta recortada sobre fondo rosa */
  imageStyle: "photo" | "cutout";
  badge?: string;
  note?: string;
  pastFlavors?: { name: string; image: StaticImageData }[];
};

export const menu: Product[] = [
  {
    id: "chips-chocolate",
    name: "Chips Chocolate",
    price: 6000,
    detail: "Galleta de 85 gr",
    image: chipsChocolate,
    imageAlt: "Galleta de chips de chocolate sobre un plato",
    imageStyle: "photo",
  },
  {
    id: "red-velvet",
    name: "Red Velvet",
    price: 6000,
    detail: "Galleta de 85 gr",
    image: redVelvet,
    imageAlt: "Galleta red velvet con chips de chocolate blanco",
    imageStyle: "cutout",
  },
  {
    id: "cheesecake-maracuya",
    name: "Cheesecake de Maracuyá",
    price: 6000,
    detail: "Galleta de 85 gr",
    image: cheesecakeMaracuya,
    imageAlt: "Galleta partida con relleno cremoso de maracuyá y chips blancos",
    imageStyle: "photo",
  },
  {
    id: "oreo",
    name: "Oreo",
    price: 6000,
    detail: "Galleta de 85 gr",
    image: oreo,
    imageAlt: "Mano sumergiendo una galleta de Oreo en un vaso de leche",
    imageStyle: "photo",
  },
  {
    id: "temporada",
    name: "Galleta de Temporada",
    price: 7000,
    detail: "Sabor sorpresa que cambia seguido. Cuando se acaba, se acaba.",
    image: temporada,
    imageAlt: "Galleta rosada con un signo de interrogación: sabor sorpresa",
    imageStyle: "cutout",
    badge: "Edición limitada",
    pastFlavors: [
      { name: "Coco", image: temporadaCoco },
      { name: "Fresa", image: temporadaFresa },
    ],
  },
  {
    id: "mini-galletas",
    name: "Mini galletas (combo x3)",
    price: 15000,
    detail: "3 galletas de 45 gr, sabores clásicos",
    image: miniGalletas,
    imageAlt: "Vaso Kapola con mini galletas de chocolate, red velvet y Oreo",
    imageStyle: "photo",
    note: "Los sabores los eliges por WhatsApp",
  },
];
