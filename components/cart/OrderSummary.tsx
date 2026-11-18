"use client";

import { IoPricetagOutline } from "react-icons/io5";
import { useCartItems } from "@/hooks/useCartItems";
import { useHydrated } from "@/hooks/useHydrated";
import { getCartTotals } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

const OrderSummary = () => {
  const hydrated = useHydrated();
  const items = useCartItems();
  const totals = getCartTotals(items);
  const isEmpty = !hydrated || totals.itemCount === 0;
  const show = (value: string) => (hydrated ? value : "—");

  const rows = [
    { label: "Nombre d’articles", value: show(String(totals.itemCount)) },
    { label: "Sous-total", value: show(formatPrice(totals.subtotal)) },
    { label: "Livraison", value: show(formatPrice(totals.shipping)) },
  ];

  return (
    <aside className="shrink-0 flex-col rounded-sm border border-ink/15 p-6 lg:max-h-96 lg:w-80">
      <h2 className="mb-2 text-lg font-semibold">Résumé de la commande</h2>
      <div>
        {rows.map((row) => (
          <div key={row.label} className="mb-1 flex justify-between">
            <p className="text-sm text-ink-soft">{row.label}</p>
            <p className="text-sm font-medium">{row.value}</p>
          </div>
        ))}
      </div>
      <div className="divider" />
      <div className="mb-1 flex justify-between">
        <p className="text-sm">Total</p>
        <p className="text-sm font-medium">{show(formatPrice(totals.total))}</p>
      </div>

      {/* Codes promo : pas encore gérés, volontairement désactivé. */}
      <div className="mt-4 flex items-center gap-2">
        <label className="input w-full">
          <IoPricetagOutline />
          <input
            type="text"
            placeholder="Code promo"
            disabled
            aria-label="Code promo (bientôt disponible)"
          />
        </label>
        <button type="button" disabled className="btn font-normal">
          Appliquer
        </button>
      </div>

      {/* Le tunnel de commande arrive en phase 6. */}
      <button
        type="button"
        disabled={isEmpty}
        className="btn bg-[#0C4039] text-white mt-4 w-full font-normal"
      >
        Continuer
      </button>
    </aside>
  );
};

export default OrderSummary;
