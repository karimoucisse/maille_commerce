import Image from "next/image";
import { CartItem } from "@/types/product";

const Item = ({ item }: { item: CartItem }) => {
  return (
    <div className="flex justify-between h-full w-full  shadow-xs p-2">
      <div className="flex gap-4 w-full h-full">
        <Image
          src={item.image}
          alt={item.name}
          width={100}
          height={100}
          className="object-cover rounded-sm"
        />
        <div className=" spacing-y-1 flex flex-col">
          <p className="text-xl font-medium">{item.name}</p>
          <p className="text-sm text-zinc-500">{item.price}</p>
        </div>
      </div>
      <div className="flex items-end">
        <div className="w-20 h-10 grid grid-cols-3  items-center  bg-white rounded-sm  border-zinc-200 shadow-2xs border">
          <button
            // onClick={() => setCount((c) => Math.max(1, c - 1))}
            // disabled={count == 1}
            className={`cursor-pointer text-lg font-medium`}
          >
            -
          </button>
          <p className="text-center text-xs font-medium">{1}</p>
          <button
            // onClick={() => setCount((c) => c + 1)}
            className="text-lg cursor-pointer font-medium"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
