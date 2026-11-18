"use client";

import { useState } from "react";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { useCartStore } from "@/stores/cart.store";
import { notify } from "@/utils/notify";

type Props = {
  productId: string;
  productName: string;
};

export default function AddToCart({ productId, productName }: Props) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem(productId, quantity);
    notify.show(`${productName} ajouté au panier`);
    setQuantity(1);
  };

  return (
    <div className="flex h-12 gap-2">
      <QuantityStepper value={quantity} onChange={setQuantity} />
      <button
        type="button"
        onClick={handleAdd}
        className="btn bg-[#0C4039] text-zinc-50 h-full font-normal lg:px-10"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
