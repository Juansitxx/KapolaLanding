"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

const btn =
  "grid size-11 place-items-center rounded-full bg-white text-bubblegum-deep shadow-[0_2px_0_#f1a7c8] transition-[transform,box-shadow,color] duration-150 ease-(--ease-out) active:translate-y-0.5 active:shadow-none disabled:opacity-40 disabled:active:translate-y-0";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  /** Con min=0, el botón de restar en 1 unidad se convierte en "quitar del pedido" */
  min?: number;
  max: number;
  label: string;
}) {
  const removes = min === 0 && value === 1;

  return (
    <div
      role="group"
      aria-label={`Cantidad de ${label}`}
      className="inline-flex items-center gap-1 rounded-full bg-blush p-1"
    >
      <button
        type="button"
        className={removes ? `${btn} hover:text-destructive` : btn}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={removes ? `Quitar ${label} del pedido` : `Quitar uno: ${label}`}
      >
        {removes ? (
          <Trash2 className="size-4" aria-hidden="true" />
        ) : (
          <Minus className="size-4" aria-hidden="true" />
        )}
      </button>
      <output aria-live="polite" className="w-7 text-center text-lg font-black text-choco tabular-nums">
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
