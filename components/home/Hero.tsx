import Image from "next/image";
import { HERO_IMAGE } from "@/lib/constants";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import Link from "next/link";

const Hero = () => {
  const product: Product = products[6]
  return (
    <section className="gap-4 grid grid-rows-1 md:grid-cols-3  min-h-100 md:min-h-130">
      <div className="flex md:items-end pb-8">
        <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold">Elegance tricotée</h1>
      </div>
      <div className="md:col-span-2 row-start-1 md:col-start-2 w-full relative bg-red-400 md:px-20">
        <Link href={`/product/${product.id.toString(16)}`} className="absolute inset-0 z-10" >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 724px) 50vw, 100vw"
            className="object-cover"
          />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
