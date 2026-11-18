import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCart from "@/components/product/AddToCart";
import ColorSwitcher from "@/components/product/ColorSwitcher";
import {
  getProductBySlug,
  getSiblingProducts,
  products,
} from "@/data/products";
import { formatPrice } from "@/lib/format";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, images: [product.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 py-5 md:grid-cols-3 md:gap-8 md:py-10">
      <div className="relative aspect-square overflow-hidden rounded-md bg-sand md:col-span-2">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="space-y-6 md:col-span-1">
        <div className="space-y-2">
          <h1 className="text-4xl">{product.name}</h1>
          <p className="text-lg text-ink-soft">{formatPrice(product.price)}</p>
        </div>
        <ColorSwitcher
          current={product}
          siblings={getSiblingProducts(product)}
        />
        <AddToCart productId={product.id} productName={product.name} />
        <p className="text-sm leading-relaxed">{product.description}</p>
      </div>
    </div>
  );
}
