 

import { DataTable } from "../_components/ui/data-table";
import { productsTableColumns } from "./_components/table-columns";
import { getProduct } from "../_data-access/product/get-product";
import CreateProductButton from "./_components/create-product-button";
 

export const dynamic = "force-dinamic";

async function Products() {
  const products = await getProduct();

  return (
    <div className="w-full space-y-8  bg-white m-8 p-8 rounded">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>

        <CreateProductButton></CreateProductButton>
      </div>

      
      <DataTable
        columns={productsTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      ></DataTable>
    </div>
  );
}

export default Products;
