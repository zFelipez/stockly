import { DollarSignIcon } from "lucide-react";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./summary-card";
import { transformCurrency } from "@/app/_helpers/currency";
import { getTodayRevenue } from "@/app/_data-access/dashboard/get-today-revenue";

export async function TodayRevenueCard() {
  const revenueToday = await getTodayRevenue();

  return (
    <SummaryCard>
      <SummaryCardIcon>
        <DollarSignIcon />
      </SummaryCardIcon>
      <SummaryCardTitle><span className=" font-semibold text-lg">Receita Hoje</span></SummaryCardTitle>
      <SummaryCardValue><span className=" font-semibold text-lg">{transformCurrency(revenueToday)}</span></SummaryCardValue>
    </SummaryCard>
  );
}
