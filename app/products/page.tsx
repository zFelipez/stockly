import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { productsTableColumns } from "./_components/table-columns";

async function Products() {
  const products = await db.product.findMany({});
  return (
    <div className="w-full space-y-8  bg-white m-8 p-8 rounded">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de tempo
          </span>
          <h2 className="text-xl font-semibold">Produtos</h2>
        </div>

        <Button className=" gap-2 ">
          <PlusIcon size={20}></PlusIcon>
          Novo Produto
        </Button>
      </div>

      <DataTable columns={productsTableColumns} data={products}></DataTable>
    </div>
  );
}

export default Products;
