"use client";

import { Button } from "@/app/_components/ui/button";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { Product } from "@prisma/client";
import { UpsertSheetContent } from "./upsert-sheet-content";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

type CreateSaleButtonProps = {
  products: Product[];
  productsOptions: ComboboxOption[];
};

const CreateSaleButton = ({
  products,
  productsOptions,
}: CreateSaleButtonProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          {" "}
          <PlusIcon size={20}/> Nova Venda
        </Button>
      </SheetTrigger>

      <UpsertSheetContent
        setSheetOpen={setSheetOpen}
        product={productsOptions}
        products={products}
      ></UpsertSheetContent>
    </Sheet>
  );
};

export default CreateSaleButton;
