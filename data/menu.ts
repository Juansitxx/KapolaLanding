import type { StaticImageData } from "next/image";

import chipsChocolate from "@/public/images/chips-chocolate.jpg";
import redVelvet from "@/public/images/red-velvet.png";
import cheesecakeMaracuya from "@/public/images/cheesecake-maracuya.jpg";
import oreo from "@/public/images/oreo.jpg";
import temporada from "@/public/images/temporada.png";
import temporadaCoco from "@/public/images/temporada-coco.jpg";
import temporadaFresa from "@/public/images/temporada-fresa.jpg";
import miniGalletas from "@/public/images/mini-galletas.jpg";
import cajaX4 from "@/public/images/caja-x4.jpg";

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
  bestseller?: boolean;
  /** Permite agregar una tarjeta personalizada gratis al pedido */
  giftCard?: boolean;
  /** Sugerencia de combinación, visible en la tarjeta */
  pairing?: string;
  /** Tarjeta a lo ancho de la cuadrícula */
  featured?: boolean;
};

/** Lo mínimo que necesita el carrito: productos del menú y adicionales */
export type CartItem = Pick<Product, "id" | "name" | "price" | "giftCard">;

export type Addon = CartItem & { detail: string };

export const menu: Product[] = [
  {
    id: "chips-chocolate",
    bestseller: true,
    name: "Chips Chocolate",
    price: 6000,
    detail: "Galleta de 85 gr",
    image: chipsChocolate,
    imageAlt: "Galleta de chips de chocolate sobre un plato",
    imageStyle: "photo",
  },
  {
    id: "red-velvet",
    bestseller: true,
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
    bestseller: true,
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
    name: "Mini galletas (combo x4)",
    price: 15000,
    detail: "4 galletas de 45 gr, sabores clásicos",
    image: miniGalletas,
    imageAlt: "Vaso Kapola con mini galletas de chocolate, red velvet y Oreo",
    imageStyle: "photo",
    note: "Los sabores los eliges por WhatsApp",
  },
  {
    id: "caja-x4",
    name: "Caja x4 galletas",
    price: 25500,
    detail: "4 galletas grandes de 85 gr en caja Kapola, lista para regalar",
    image: cajaX4,
    imageAlt: "Caja Kapola con galletas grandes y moño fucsia",
    imageStyle: "photo",
    note: "Tú eliges los 4 sabores por WhatsApp",
    giftCard: true,
    pairing: "Con leche: $28.000",
    featured: true,
  },
];

export const addons: Addon[] = [
  {
    id: "leche",
    name: "Leche para acompañar",
    price: 2500,
    detail: "Cajita de leche entera de 200 ml, perfecta para mojar la galleta",
  },
];

export const cartCatalog: CartItem[] = [...menu, ...addons];
