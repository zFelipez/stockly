import {
  CircleDollarSign,
  DollarSignIcon,
  PackageIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import { Header, HeaderTitle } from "../_components/header";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-card";
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import { transformCurrency } from "../_helpers/currency";
import { RevenueChart } from "./_components/revenue-chart";

const HomePage = async () => {
  const {
    revenue,
    revenueToday,
    totalSales,
    totalStockValue,
    totalProducts,
    totalLast14DaysRevenue,
  } = await getDashboard();

  return (
    <div className="w-full space-y-8  bg-white m-8 p-8 rounded flex flex-col ">
      <Header>
        <HeaderTitle> Dashboard </HeaderTitle>
      </Header>

      <div className="grid grid-cols-2 gap-6  ">
        <SummaryCard>
          <SummaryCardIcon>
            <DollarSignIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Receita</SummaryCardTitle>
          <SummaryCardValue>{transformCurrency(revenue)}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <DollarSignIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Receita Hoje </SummaryCardTitle>
          <SummaryCardValue>{transformCurrency(revenueToday)}</SummaryCardValue>
        </SummaryCard>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard>
          <SummaryCardIcon>
            <CircleDollarSign />
          </SummaryCardIcon>
          <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
          <SummaryCardValue>{totalSales}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <PackageIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
          <SummaryCardValue>{totalStockValue}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Produtos</SummaryCardTitle>
          <SummaryCardValue>{totalProducts}</SummaryCardValue>
        </SummaryCard>
      </div>

      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
        <p className=" font-semibold text-lg  text-slate-900">Receita</p>
       <p className="text-sm text-slate-400">Ultimos 14 dias</p>
        <RevenueChart data={totalLast14DaysRevenue} />
      </div>
    </div>
  );
};

export default HomePage;
