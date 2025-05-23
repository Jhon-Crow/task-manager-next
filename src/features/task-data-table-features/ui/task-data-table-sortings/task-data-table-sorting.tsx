"use client";

import { taskDataDefaultColumns } from "@/entities/task";
import { TypeTaskColumns } from "@/entities/task/public-types";
import { Button, TruncatedTextWithTooltip } from "@/shared/ui";
import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

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
    cell: taskDataDefaultColumns.deadline?.cell,
  },
  author: {
    accessorKey: "author",
    header: (props) => <Header {...props} title="Автор" />,
    sortingFn: (rowA, rowB) =>
      (
        rowA.original.author.firstname + rowA.original.author.lastname
      ).localeCompare(
        rowB.original.author.firstname + rowB.original.author.lastname
      ),
    cell: taskDataDefaultColumns.author?.cell,
  },
  workers: {
    accessorKey: "workers",
    header: (props) => <Header {...props} title="Выполняют" />,
    sortingFn: (rowA, rowB) =>
      (rowA.original.workers?.length || 0) -
      (rowB.original.workers?.length || 0),
    cell: taskDataDefaultColumns.workers?.cell,
  },
  createdAt: {
    accessorKey: "createdAt",
    header: (props) => <Header {...props} title="Создана" />,
    cell: taskDataDefaultColumns.createdAt?.cell,
  },
};
const Header = ({
  column,
  title,
}: HeaderContext<TypeTaskColumns, unknown> & { title: string }) => {
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
};
