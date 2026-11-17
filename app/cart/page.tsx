import ItemList from "@/components/cart/ItemList";
import OrderSummary from "@/components/cart/OrderSummary";

const page = () => {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-5 sm:py-10 space-y-10">
      <h1 className="text-4xl font-normal">Panier</h1>
      <div className="flex justify-between gap-10 flex-col lg:flex-row">
        <ItemList />
        <OrderSummary />
      </div>
    </div>
  );
};

export default page;
