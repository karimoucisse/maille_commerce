"use client";

import Image from "next/image";
import Link from "next/link";
import { HiOutlineTrash } from "react-icons/hi2";
import QuantityStepper from "@/components/ui/QuantityStepper"
import { useCartStore } from "@/stores/cart.store";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/types/product";

const Item = ({ item }: { item: CartItem }) => {
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex w-full gap-4 p-2">
      <Link
        href={`/product/${item?.slug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-sm bg-sand"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>
      
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex justify-between gap-2">
          <div>
            <p className="text-lg font-medium">{item.name}</p>
            <p className="text-sm text-ink-soft">
              {formatPrice(item.price)} l’unité
            </p>
          </div>
          <p className="text-sm font-medium">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <QuantityStepper
            size="sm"
            value={item.quantity}
            onChange={(q) => setQuantity(item.id, q)}
          />
          <button
            type="button"
            aria-label={`Retirer ${item.name} du panier`}
            onClick={() => removeItem(item.id)}
            className="p-2 text-xl text-ink-soft transition-colors hover:text-terracotta"
          >
            <HiOutlineTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
