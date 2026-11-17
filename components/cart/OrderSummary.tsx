import { IoPricetagOutline } from "react-icons/io5";

const OrderSummary = () => {
  const SummaryInfo = [
    { label: "Nombre d'articles", value: "6" },
    { label: "Prix", value: "120,00 €" },
    { label: "Livraison", value: "15,00 €" },
  ];
  return (
    <div className="shrink-0  flex-col border border-zinc-200 rounded-sm p-6">
      <p className="text-lg font-semibold mb-2">Résumé de la commande</p>
      <div>
        {SummaryInfo.map((info, index) => (
          <div key={index} className="flex justify-between mb-1">
            <p className="text-sm text-zinc-500">{info.label}</p>
            <p className="text-sm font-medium">{info.value}</p>
          </div>
        ))}
      </div>
      <div className="divider"></div>
      <div className="flex justify-between mb-1">
        <p className="text-sm ">Total</p>
        <p className="text-sm font-medium">135,00 €</p>
      </div>
      <div className="space-x-2 flex items-center mt-4">
        <label className="input">
          <IoPricetagOutline />
          <input
            type="text"
            placeholder="Code promo"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <button className="btn text-sm font-normal bg-[#0C4039] text-zinc-50 rounded-lg">
          Appliquer
        </button>
      </div>
      <button className="btn font-normal bg-[#0C4039] text-zinc-50 mt-4 rounded-lg">
        Continuer
      </button>
    </div>
  );
};

export default OrderSummary;
