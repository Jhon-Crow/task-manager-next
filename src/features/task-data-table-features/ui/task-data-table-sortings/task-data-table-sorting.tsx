"use client";

import { taskDataDefaultColumns } from "@/entities/task";
import { TypeTaskColumns } from "@/entities/task/public-types";
import {Checkbox, DataTableSortingHeader, TruncatedTextWithTooltip} from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";

export const taskDataTableSortingInColumns: Partial<
  Record<keyof TypeTaskColumns, ColumnDef<TypeTaskColumns>>
> = {

  // completed: {
  //   accessorKey: "completed",
  //   header: (props) => <DataTableSortingHeader {...props} title="Статус" />,
  //   cell: ({ row }) => {
  //     return (
  //         <div className="flex justify-center">
  //           <Checkbox
  //               checked={row.getValue("completed")}
  //               aria-label="Выполнено"
  //               className="pointer-events-none"
  //           />
  //         </div>
  //     );
  //   },
  // },

  title: {
    accessorKey: "title",
    header: (props) => <DataTableSortingHeader {...props} title="Задача" />,
    cell: ({ row }) => (
      <TruncatedTextWithTooltip
        text={row.getValue("title") || ""}
        className="max-w-24"
      />
    ),
  },
  deadline: {
    accessorKey: "deadline",
    header: (props) => <DataTableSortingHeader {...props} title="Дедлайн" />,
    cell: taskDataDefaultColumns.deadline?.cell,
  },
  author: {
    accessorKey: "author",
    header: (props) => <DataTableSortingHeader {...props} title="Автор" />,
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
    header: (props) => <DataTableSortingHeader {...props} title="Выполняют" />,
    sortingFn: (rowA, rowB) =>
      (rowA.original.workers?.length || 0) -
      (rowB.original.workers?.length || 0),
    cell: taskDataDefaultColumns.workers?.cell,
  },
  createdAt: {
    accessorKey: "createdAt",
    header: (props) => <DataTableSortingHeader {...props} title="Создана" />,
    cell: taskDataDefaultColumns.createdAt?.cell,
  },
};
