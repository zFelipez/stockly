import { getTotalRevenue } from "@/app/_data-access/dashboard/get-total-revenue";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { transformCurrency } from "@/app/_helpers/currency";
import { DollarSignIcon } from "lucide-react";

export async function TotalRevenueCard() {
  const totalRevenue = await getTotalRevenue();

  return (
    <SummaryCard>
      <SummaryCardIcon>
        <DollarSignIcon />
      </SummaryCardIcon>
      <SummaryCardTitle>Receita</SummaryCardTitle>
      <SummaryCardValue>{transformCurrency(totalRevenue)}</SummaryCardValue>
    </SummaryCard>
  );
}
