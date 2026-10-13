"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

const btn =
  "grid size-11 place-items-center rounded-full border border-blush-strong bg-white text-bubblegum-deep transition-[transform,background-color,color] duration-150 ease-(--ease-out) active:scale-95 disabled:opacity-40 disabled:active:scale-100";

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
      className="inline-flex items-center gap-1 rounded-full bg-blush-strong p-1"
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
      <output aria-live="polite" className="w-7 text-center text-lg font-black text-ink tabular-nums">
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
