import type { StaticImageData } from "next/image";

import chipsChocolate from "@/public/images/chips-chocolate.jpg";
import redVelvet from "@/public/images/red-velvet.png";
import cheesecakeMaracuya from "@/public/images/cheesecake-maracuya.png";
import oreo from "@/public/images/oreo.png";
import temporada from "@/public/images/temporada.png";
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
};

export const menu: Product[] = [
  {
    id: "chips-chocolate",
    name: "Chips Chocolate",
    price: 6000,
    detail: "Galleta de 85 gr",
    image: chipsChocolate,
    imageAlt: "Galleta de chips de chocolate partida con el centro de chocolate derretido",
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
    imageAlt: "Galleta de cheesecake de maracuyá con chips blancos",
    imageStyle: "cutout",
  },
  {
    id: "oreo",
    name: "Oreo",
    price: 6000,
    detail: "Galleta de 85 gr",
    image: oreo,
    imageAlt: "Galleta con trozos de galleta Oreo",
    imageStyle: "cutout",
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

export const productById = new Map(menu.map((p) => [p.id, p]));
