export const site = {
  name: "Kapola",
  slogan: "El sabor que te llena el corazón",
  whatsappNumber: "573243786221",
  whatsappDisplay: "+57 324 378 6221",
  instagramHandle: "@kapola_ibague",
  instagramUrl: "https://www.instagram.com/kapola_ibague/",
  facebookUrl: "https://www.facebook.com/kapolaaa",
  tiktokUrl: "https://www.tiktok.com/@kapola_ibague",
  schedule: "Lunes a sábado, 9:00 AM a 8:00 PM",
  city: "Ibagué",
} as const;

export function formatCOP(value: number) {
  return `$${Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

// Sin emojis en los mensajes: WhatsApp los muestra como "?" en algunos dispositivos
export function whatsappUrl(text: string) {
  return `https://api.whatsapp.com/send?phone=${site.whatsappNumber}&text=${encodeURIComponent(text)}`;
}

export const greetingWhatsappUrl = whatsappUrl("¡Hola Kapola! Quiero hacer un pedido");

export type OrderLine = { name: string; quantity: number; price: number };

export type GiftCard = { to: string; from: string; message: string };

export function buildOrderMessage(
  lines: OrderLine[],
  name: string,
  address: string,
  giftCard?: GiftCard,
) {
  const items = lines.map(
    (l) => `- ${l.quantity}x ${l.name} (${formatCOP(l.quantity * l.price)})`,
  );
  const total = lines.reduce((sum, l) => sum + l.quantity * l.price, 0);
  const card = giftCard
    ? [
        "",
        "Tarjeta personalizada:",
        `Para: ${giftCard.to}`,
        ...(giftCard.from ? [`De: ${giftCard.from}`] : []),
        `Mensaje: ${giftCard.message}`,
      ]
    : [];
  return [
    "¡Hola Kapola! Quiero hacer este pedido:",
    ...items,
    `Total: ${formatCOP(total)}`,
    ...card,
    "",
    `Nombre: ${name}`,
    `Dirección de entrega: ${address}`,
  ].join("\n");
}
