import ItemList from "@/components/cart/ItemList"

const page = () => {
  return (
	<div className="max-w-7xl mx-auto w-full px-6 py-5 sm:py-10 space-y-10">
    <h1 className="text-4xl font-normal">Panier</h1>
    <ItemList />
  </div>
  )
}

export default page
