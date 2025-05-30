import { HeaderContext } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Button } from "../Button/button";

export function DataTableSortingHeader<T>({
  column,
  title,
}: HeaderContext<T, unknown> & { title: string }) {
  const sort = column.getIsSorted();
  const isAsc = sort === "asc";
  return (
    <Button
      variant={"ghost"}
      onClick={() => {
        column.toggleSorting(isAsc);
      }}
    >
      {title}
      {sort ? isAsc ? <ArrowDown /> : <ArrowUp /> : <ArrowUpDown />}
    </Button>
  );
}
