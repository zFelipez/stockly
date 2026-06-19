import { Header, HeaderTitle } from "../_components/header";
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

  const tableData = sales.map((sale) => {
    return {
      ...sale,
      products,
      productsOptions,
    };
  });

  return (
    <div className="w-full space-y-6  bg-white my-6 mx-0 p-6 rounded overflow-auto">
      <Header
        button={
          <CreateSaleButton
            products={filteredProducts}
            productsOptions={productsOptions}
          />
        }

      >
        <HeaderTitle> Gestão de Vendas </HeaderTitle>
      </Header>

      <DataTable data={tableData} columns={saleTableColumns}></DataTable>
    </div>
  );
}
