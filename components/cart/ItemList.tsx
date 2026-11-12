import Item from "./Item";
import { products } from "@/data/products";
const ItemList = () => {
  return (
    <div className="flex max-w-150 flex-col border border-zinc-200 rounded-sm p-4">
      <Item item={{ ...products[0], quantity: 1 }} />
	  <div className="divider"></div>
      <Item item={{ ...products[1], quantity: 2 }} />
	  <div className="divider"></div>
      <Item item={{ ...products[2], quantity: 3 }} />
    </div>
  );
};

export default ItemList;
