import { Header, HeaderTitle } from "../_components/header";
import { TotalRevenueCard } from "./_components/total-revenue-card";
import { Suspense } from "react";
import { Skeleton } from "../_components/ui/skeleton";
import { TodayRevenueCard } from "./_components/today-revenue-card";
import { TotalSalesCard } from "./_components/total-sales-card";
import { TotalStockValueCard } from "./_components/total-stock-value";
import { TotalProductsCard } from "./_components/total-products-card";
import { RevenueSection } from "./_components/revenue-section";
import { MostSoldProductsCard } from "./_components/most-sold-products-card";

const HomePage = async () => {
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

        <Suspense fallback={<Skeleton className="h-24 w-full bg-white" />}>
          <TotalProductsCard></TotalProductsCard>
        </Suspense>
      </div>

      <div className="grid min-h-0 grid-cols-[2fr,1fr] gap-6">
        <Suspense fallback={<Skeleton className="h-[320px] w-full bg-white" />}>
          <RevenueSection></RevenueSection>
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[320px] w-full bg-white" />}>
          <MostSoldProductsCard></MostSoldProductsCard>
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
