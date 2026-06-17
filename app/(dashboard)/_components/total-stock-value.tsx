import { PackageIcon } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { getTotalStockValue } from "@/app/_data-access/dashboard/get-total-stock-value";
import { transformCurrency } from "@/app/_helpers/currency";

export async function TotalStockValueCard() {
  const totalStockValue = await getTotalStockValue();

  return (
    <SummaryCard>
      <SummaryCardIcon>
        <PackageIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
      <SummaryCardValue>{transformCurrency(totalStockValue)}</SummaryCardValue>
    </SummaryCard>
  );
}
