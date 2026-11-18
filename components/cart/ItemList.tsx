"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useCartItems } from "@/hooks/useCartItems";
import { useHydrated } from "@/hooks/useHydrated";
import Item from "./Item";

const BOX = "flex w-full flex-col rounded-sm border border-ink/15 p-4";

const ItemList = () => {
  const hydrated = useHydrated();
  const items = useCartItems();

  if (!hydrated) {
    return <div className={`${BOX} min-h-40`} aria-busy="true" />;
  }

  if (items.length === 0) {
    return (
      <div className={`${BOX} items-start gap-4`}>
        <p>Votre panier est vide.</p>
        <Link href="/catalogue" className="btn bg-[#0C4039] text-white font-normal">
          Découvrir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className={BOX}>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          {index > 0 && <div className="divider my-2" />}
          <Item item={item} />
        </Fragment>
      ))}
    </div>
  );
};

export default ItemList;
