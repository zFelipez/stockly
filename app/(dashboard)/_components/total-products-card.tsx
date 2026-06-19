import { ShoppingBasketIcon } from "lucide-react";

import { getTotalProducts } from "../../_data-access/dashboard/get-total-products";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";

export async function TotalProductsCard() {
  const totalProducts = await getTotalProducts();

  return (
    <SummaryCard>
      <SummaryCardIcon>
        <ShoppingBasketIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Produtos</SummaryCardTitle>
      <SummaryCardValue>{totalProducts}</SummaryCardValue>
    </SummaryCard>
  );
}
