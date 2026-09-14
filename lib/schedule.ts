export type ShopStatus = "open" | "opens-today" | "opens-tomorrow" | "opens-monday";

const OPEN_HOUR = 9;
const CLOSE_HOUR = 20;

/** Horario: lunes a sábado 9:00 a 20:00, hora de Colombia */
export function getShopStatus(now: Date = new Date()): ShopStatus {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bogota",
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")!.value;
  const hour = Number(parts.find((p) => p.type === "hour")!.value);

  if (weekday === "Sun") return "opens-tomorrow";
  if (hour < OPEN_HOUR) return "opens-today";
  if (hour < CLOSE_HOUR) return "open";
  return weekday === "Sat" ? "opens-monday" : "opens-tomorrow";
}

export const statusText: Record<ShopStatus, string> = {
  open: "Abierto ahora",
  "opens-today": "Cerrado · abrimos hoy a las 9 AM",
  "opens-tomorrow": "Cerrado · abrimos mañana a las 9 AM",
  "opens-monday": "Cerrado · abrimos el lunes a las 9 AM",
};
