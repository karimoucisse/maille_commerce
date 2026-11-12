// components/QuantitySelector.tsx
"use client";

import { notify } from "@/utils/notify";
import { useState } from "react";

type QuantitySelectorProps = {
  initialQuantity?: number;
};

export default function QuantitySelector({
  initialQuantity = 1,
}: QuantitySelectorProps) {
  const [count, setCount]: [
    number,
    React.Dispatch<React.SetStateAction<number>>,
  ] = useState(initialQuantity);

  const handleCart = () => {
    notify.show("Produit ajouté au panier");
  };

  return (
    <div className="flex h-12 space-x-2">
      <div className="grid grid-cols-3 p-2 gap-4 border w-30">
        <button
          onClick={() => setCount((c) => Math.max(1, c - 1))}
          disabled={count == 1}
          className={`cursor-pointer text-lg ${count === 1 ? "text-zinc-400" : ""}`}
        >
          -
        </button>
        <p className="text-center text-lg">{count}</p>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="text-lg cursor-pointer"
        >
          +
        </button>
      </div>
      <button
        className="btn bg-[#0C4039] text-white font-normal lg:px-10 h-full"
        onClick={handleCart}
      >
        Ajouter au panier
      </button>
    </div>
  );
}
