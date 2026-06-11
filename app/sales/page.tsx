import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";

import { getProduct } from "../_data-access/product/get-product";
import { getSales } from "../_data-access/sale/get-sales";
import CreateSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";

export default async function Sales() {
  const products = await getProduct();

  const filteredProducts = products.filter((product) => product.stock > 0);

  const productsOptions: ComboboxOption[] = filteredProducts.map((product) => ({
    label: product.name,
    value: product.id,
  }));

  const sales = await getSales();

  return (
    <div className="w-full space-y-8  bg-white m-8 p-8 rounded">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>

        <CreateSaleButton
          products={filteredProducts}
          productsOptions={productsOptions}
        />
      </div>

      <DataTable data={sales} columns={saleTableColumns}></DataTable>
    </div>
  );
}
