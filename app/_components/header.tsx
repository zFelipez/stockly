export function HeaderTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export function Header({
  children,
  button,
}: {
  children: React.ReactNode;
  button?: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-center justify-between">
      {children}
      {button}
    </div>
  );
}
