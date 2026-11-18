"use client";

import { MAX_QUANTITY } from "@/lib/constants";

type Props = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
};

/** Sélecteur de quantité partagé par la fiche produit et le panier. */
export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = MAX_QUANTITY,
  size = "md",
}: Props) {
  const height = size === "sm" ? "h-9" : "h-12";
  const button =
    "h-full w-9 text-lg transition-colors hover:text-terracotta disabled:cursor-not-allowed disabled:text-ink/30 disabled:hover:text-ink/30";

  return (
    <div
      role="group"
      aria-label="Quantité"
      className={`inline-flex ${height} items-center rounded-md border border-ink/30 bg-cream`}
    >
      <button
        type="button"
        aria-label="Diminuer la quantité"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={button}
      >
        −
      </button>
      <output aria-live="polite" className="w-8 text-center text-sm font-medium">
        {value}
      </output>
      <button
        type="button"
        aria-label="Augmenter la quantité"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={button}
      >
        +
      </button>
    </div>
  );
}
