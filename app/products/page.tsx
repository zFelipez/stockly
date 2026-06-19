import { DataTable } from "../_components/ui/data-table";
import { productsTableColumns } from "./_components/table-columns";
import { getProduct } from "../_data-access/product/get-product";
import CreateProductButton from "./_components/create-product-button";
import { Header, HeaderTitle } from "../_components/header";

async function Products() {
  const products = await getProduct();

  return (
    <div className="w-full space-y-6  bg-white my-6 mx-0 p-6 rounded overflow-auto">
      <Header button={<CreateProductButton></CreateProductButton>}>
        <HeaderTitle> Gestão de Produtos </HeaderTitle>
      </Header>

      <DataTable
        columns={productsTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      ></DataTable>
    </div>
  );
}

export default Products;
