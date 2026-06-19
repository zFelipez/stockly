import { getMostSoldProducts } from "../../_data-access/dashboard/get-most-sold-products";
import { MostSoldProductItem } from "./most-sold-products";

export async function MostSoldProductsCard() {
  const mostSoldProducts = await getMostSoldProducts();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl p-6 border shadow-sm">
      <p className=" font-semibold text-lg  text-slate-900 bg-gray-100 rounded-xl text-center">
        Produtos mais vendidos{" "}
      </p>

      <div className=" mt-6 space-y-1 flex flex-col gap-4 overflow-y-auto">
        {mostSoldProducts.map((product) => (
          <MostSoldProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
