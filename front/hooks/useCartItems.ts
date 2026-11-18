import { useMemo } from "react";
import { getProductById } from "@/data/products";
import { useCartStore } from "@/stores/cart.store";
import type { CartItem } from "@/types/product";

/** Lignes du panier jointes aux produits. Ignore les ids devenus inconnus. */
export function useCartItems(): CartItem[] {
  const lines = useCartStore((s) => s.lines);
  return useMemo(
    () =>
      lines.flatMap((line) => {
        const product = getProductById(line.productId);
        return product ? [{ ...product, quantity: line.quantity }] : [];
      }),
    [lines],
  );
}
