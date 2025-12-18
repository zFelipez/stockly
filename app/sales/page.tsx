import { Button } from "../_components/ui/button";
import { ComboboxOption } from "../_components/ui/combobox";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { getProduct } from "../_data-access/product/get-product";
import { UpsertSalesDialogContent } from "./_components/upsert-sheet-content";

const SalesPage = async () => {

    const response =  await getProduct(); 
    
    const product: ComboboxOption[] = response.map((v)=>({
        value:  v.id , 
        label: v.name ,  
    }))
    
    
  return (
    <div className="w-full space-y-8  bg-white m-8 p-8 rounded">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Vendas </h2>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button>Nova Venda </Button>
          </SheetTrigger>
          <UpsertSalesDialogContent  products={ response} product = {product}/>
        </Sheet>
      </div>

      {/*       
      <DataTable
        columns={productsTableColumns}
        data={JSON.parse(JSON.stringify(products))}
      ></DataTable> */}
    </div>
  );
};

export default SalesPage;
