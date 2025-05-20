"use client";

import { TypeTaskColumns } from "@/entities/task/public-types";
import { Button, Timer, TruncatedTextWithTooltip } from "@/shared/ui";
import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const taskDataTableSortingInColumns: Partial<
  Record<keyof TypeTaskColumns, ColumnDef<TypeTaskColumns>>
> = {
  title: {
    accessorKey: "title",
    header: (props) => <Header {...props} title="Задача" />,
    cell: ({ row }) => (
      <TruncatedTextWithTooltip
        text={row.getValue("title") || ""}
        className="max-w-24"
      />
    ),
  },
  deadline: {
    accessorKey: "deadline",
    header: (props) => <Header {...props} title="Дедлайн" />,
    cell: ({ row }) => (
      <Timer end={(row.getValue("deadline") as Date).getTime()} />
    ),
  },
};

const Header = ({
  column,
  title,
}: HeaderContext<TypeTaskColumns, unknown> & { title: string }) => {
  return (
    <Button
      variant={"ghost"}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown />
    </Button>
  );
};
