export function SummaryCardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-9 w-9 flex items-center justify-center rounded-md bg-emerald-500  text-emerald-500 bg-opacity-10">
      {children}
    </div>
  );
}

export function SummaryCardTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-slate-500">{children}</p>;
}

export function SummaryCardValue({ children }: { children: React.ReactNode }) {
  return <p className="text-sm  font-bold">{children}</p>;
}

export function SummaryCard({ children }: { children: React.ReactNode }) {
  return <div className="bg-gray-100 p-4 rounded-xl gap-2 flex flex-col">{children}</div>;
}
