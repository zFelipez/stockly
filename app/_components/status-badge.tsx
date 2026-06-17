import { CircleIcon } from "lucide-react";
import { Badge } from "./ui/badge";

const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    console.log(status);
    return "Em estoque";
  }
  console.log(status);
  return "Fora de Estoque";
};

export function StatusBadge({
  status,
}: {
  status: "IN_STOCK" | "OUT_OF_STOCK";
}) {
  const label = getStatusLabel(status);

  return (
    <Badge
      variant={label === "Em estoque" ? "default" : "destructive"}
      className="gap-1.5"
    >
      <CircleIcon
        size={14}
        className={
          label === "Em estoque"
            ? "fill-primary-foreground"
            : "fill-destructive-foreground"
        }
      ></CircleIcon>
      {label}
    </Badge>
  );
}
