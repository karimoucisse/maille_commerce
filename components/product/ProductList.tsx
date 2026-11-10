import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 4} />
      ))}
    </div>
  );
};

export default ProductList;
