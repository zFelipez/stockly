import { StatusBadge } from "@/app/_components/status-badge";
import { MostSoldProductDto } from "@/app/_data-access/dashboard/get-dashboard";
import { transformCurrency } from "@/app/_helpers/currency";

type MostSoldProductsProps = {
  product: MostSoldProductDto;
};

export function MostSoldProductItem({ product }: MostSoldProductsProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-100 rounded-xl">
      <div className="space-y-[6px]">
        <StatusBadge status={product.status}></StatusBadge>
        <p className="font-semibold text-lg text-slate-900">{product.name}</p>
        <p className="font-medium text-slate-500">
          {" "}
          {transformCurrency(product.price)}
        </p>
      </div>

      <div className="">
        <p className="font-semibold text-lg text-slate-900">
          {product.totalQuantitySold} vendido(s)
        </p>
      </div>
    </div>
  );
}
