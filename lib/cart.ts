import { SHIPPING_FEE } from "@/lib/constants";
import type { CartItem } from "@/types/product";

export type CartTotals = {
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
};

/**
 * Tout se calcule à partir des lignes : on ne stocke jamais un total.
 * Les montants passent par des centimes entiers pour éviter les erreurs
 * d'arrondi des flottants (0.1 + 0.2 !== 0.3).
 */
export function getCartTotals(items: CartItem[]): CartTotals {
  const itemCount = items.reduce((n, i) => n + i.quantity, 0);
  const subtotalCents = items.reduce(
    (sum, i) => sum + Math.round(i.price * 100) * i.quantity,
    0,
  );
  const shippingCents = itemCount > 0 ? SHIPPING_FEE * 100 : 0;
  return {
    itemCount,
    subtotal: subtotalCents / 100,
    shipping: shippingCents / 100,
    total: (subtotalCents + shippingCents) / 100,
  };
}
