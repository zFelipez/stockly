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

const HomePage =  async () => {
  const { revenue, revenueToday, totalSales, totalStockValue, totalProducts } = await getDashboard();

  return (
    <div className="w-full space-y-8  bg-white m-8 p-8 rounded">
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
          <SummaryCardValue>{ totalSales}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <PackageIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
          <SummaryCardValue>{ totalStockValue}</SummaryCardValue>
        </SummaryCard>

        <SummaryCard>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Produtos</SummaryCardTitle>
          <SummaryCardValue>{ totalProducts}</SummaryCardValue>
        </SummaryCard>
      </div>
    </div>
  );
};

export default HomePage;
