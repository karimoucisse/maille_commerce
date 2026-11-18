import Banner from "@/components/home/Banner";
import Hero from "@/components/home/Hero";
import ProductList from "@/components/product/ProductList";
import { products } from "@/data/products";
import { ToastContainer } from "react-toastify";
// 2xl:max-w-screen  2xl:px-100
export default function Home() {
  return (
    <div className="space-y-8">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 space-y-8 ">
        <Hero />
        <div className="space-y-4">
          <h3 className="text-lg font-normal">Meilleures ventes</h3>
          <ProductList products={products.slice(0, 4)} />
        </div>
      </div>
      <Banner />
      
    </div>
  );
}
