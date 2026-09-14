"use client";

import { Minus, Plus } from "lucide-react";

import { cn } from "cn";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
  label,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
  label: string;
  size?: "sm" | "md";
}) {
  const btn = cn(
    "grid place-items-center rounded-full bg-white text-bubblegum-deep shadow-[0_2px_0_#f1a7c8] transition active:translate-y-0.5 active:shadow-none disabled:opacity-40 disabled:active:translate-y-0",
    size === "md" ? "size-11" : "size-9",
  );

  return (
    <div
      role="group"
      aria-label={`Cantidad de ${label}`}
      className="inline-flex items-center gap-1 rounded-full bg-blush p-1"
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Quitar uno: ${label}`}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <output
        aria-live="polite"
        className={cn("text-center font-black text-choco tabular-nums", size === "md" ? "w-8 text-lg" : "w-6")}
      >
        {value}
      </output>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Sumar uno: ${label}`}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
