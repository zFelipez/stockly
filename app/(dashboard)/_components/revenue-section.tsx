import { getTotalLast14DaysRevenue } from "../../_data-access/dashboard/get-total-last-14-day-revenue";
import { RevenueChart } from "./revenue-chart";

export async function RevenueSection() {
  const totalLast14DaysRevenue = await getTotalLast14DaysRevenue();

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
      <p className=" font-semibold text-lg  text-slate-900">Receita</p>
      <p className="text-sm text-slate-400">Ultimos 14 dias</p>
      <RevenueChart data={totalLast14DaysRevenue} />
    </div>
  );
}
