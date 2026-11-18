import type { CartLine } from "@/types/product";
import { create } from "zustand";
import { MAX_QUANTITY } from "@/lib/constants";
import { createJSONStorage, persist } from "zustand/middleware";

type CartState = {
  lines: CartLine[];
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const clamp = (n: number) => Math.min(MAX_QUANTITY, Math.max(1, n));

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],

      addItem: (productId, quantity = 1) =>
        set((state) => {
          const exists = state.lines.some((l) => l.productId === productId);
          if (!exists) {
            return {
              lines: [...state.lines, { productId, quantity: clamp(quantity) }],
            };
          }
          return {
            lines: state.lines.map((l) =>
              l.productId === productId
                ? { ...l, quantity: clamp(l.quantity + quantity) }
                : l,
            ),
          };
        }),

      setQuantity: (productId, quantity) =>
        set((state) => ({
          lines:
            quantity < 1
              ? state.lines.filter((l) => l.productId !== productId)
              : state.lines.map((l) =>
                  l.productId === productId
                    ? { ...l, quantity: clamp(quantity) }
                    : l,
                ),
        })),

      removeItem: (productId) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.productId !== productId),
        })),

      clear: () => set({ lines: [] }),
    }),
    {
      name: "maille-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // On ne persiste que les données, pas les fonctions.
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);
