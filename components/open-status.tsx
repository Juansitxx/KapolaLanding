"use client";

import { useSyncExternalStore } from "react";

import { cn } from "cn";
import { getShopStatus, statusText, type ShopStatus } from "@/lib/schedule";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

/** null en el servidor: la página es estática y la hora real solo se conoce en el navegador */
export function useShopStatus(): ShopStatus | null {
  return useSyncExternalStore(subscribe, () => getShopStatus(), () => null);
}

export function OpenStatus({ className }: { className?: string }) {
  const status = useShopStatus();
  if (!status) return null;
  const open = status === "open";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-extrabold",
        open ? "bg-[#dcf5e3] text-[#14612f]" : "bg-cream text-choco",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-2.5 rounded-full", open ? "animate-pulse bg-[#1f9d4c]" : "bg-choco-soft")}
      />
      {statusText[status]}
    </span>
  );
}
