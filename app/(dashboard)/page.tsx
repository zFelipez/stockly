import { ShoppingBasketIcon } from "lucide-react";
import { Header, HeaderTitle } from "../_components/header";
import {
  SummaryCard,
  SummaryCardIcon,
  SummaryCardTitle,
  SummaryCardValue,
} from "./_components/summary-card";
import { RevenueChart } from "./_components/revenue-chart";
import { MostSoldProductItem } from "./_components/most-sold-products";
import { TotalRevenueCard } from "./_components/total-revenue-card";
import { Suspense } from "react";
import { Skeleton } from "../_components/ui/skeleton";
import { TodayRevenueCard } from "./_components/today-revenue-card";
import { TotalSalesCard } from "./_components/total-sales-card";
import { TotalStockValueCard } from "./_components/total-stock-value";
import { getDashboard } from "@/app/_data-access/dashboard/get-dashboard";

const HomePage = async () => {
  const { totalProducts, totalLast14DaysRevenue, mostSoldProducts } =
    await getDashboard();

  return (
    <div className="w-full space-y-6  bg-white my-6 mx-0 p-6 rounded flex flex-col ">
      <Header>
        <HeaderTitle> Dashboard </HeaderTitle>
      </Header>

      <div className="grid grid-cols-2 gap-6  ">
        <Suspense fallback={<Skeleton className="h-24 w-full bg-white" />}>
          <TotalRevenueCard></TotalRevenueCard>
        </Suspense>

        <Suspense fallback={<Skeleton className="h-24 w-full bg-white" />}>
          <TodayRevenueCard></TodayRevenueCard>
        </Suspense>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<Skeleton className="h-24 w-full bg-white" />}>
          <TotalSalesCard></TotalSalesCard>
        </Suspense>

        <Suspense fallback={<Skeleton className="h-24 w-full bg-white" />}>
          <TotalStockValueCard></TotalStockValueCard>
        </Suspense>

        <SummaryCard>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
          <SummaryCardTitle>Produtos</SummaryCardTitle>
          <SummaryCardValue>{totalProducts}</SummaryCardValue>
        </SummaryCard>
      </div>

      <div className="grid min-h-0 grid-cols-[2fr,1fr] gap-6">
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
          <p className=" font-semibold text-lg  text-slate-900">Receita</p>
          <p className="text-sm text-slate-400">Ultimos 14 dias</p>
          <RevenueChart data={totalLast14DaysRevenue} />
        </div>

        <div className="flex h-full flex-col overflow-hidden rounded-xl p-6 border shadow-sm">
          <p className=" font-semibold text-lg  text-slate-900 bg-gray-100 rounded-xl text-center">
            Produtos mais vendidos{" "}
          </p>

          <div className=" mt-6 space-y-1 flex flex-col gap-4 overflow-y-auto">
            {mostSoldProducts.map((product) => (
              <MostSoldProductItem key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
