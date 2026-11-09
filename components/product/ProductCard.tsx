// Product.tsx
import Image from "next/image";
import { Product } from "@/types/product";

type Props = {
  product: Product;
  priority?: boolean;
};

const ProductCard = ({ product, priority = false }: Props) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-md">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-sm text-zinc-500">€{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
