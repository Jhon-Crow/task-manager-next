"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeTaskColumns } from "@/entities/task/model/types/task";
import { DataTableSortingHeader } from "@/shared/ui";
import { Check, X } from "lucide-react";

const order: Record<"true" | "null" | "false", 0 | 1 | 2> = {
  true: 0,
  null: 1,
  false: 2,
} as const;

export const completedInTaskDataTableColumn: ColumnDef<TypeTaskColumns> = {
  id: "completed",
  accessorKey: "completed",
  header: (props) => <DataTableSortingHeader {...props} title="Статус" />,
  cell: ({ row }) => {
    const completed = row.getValue("completed");
    return (
      <div className="flex justify-center">
        {completed === true ? <Check /> : completed === false ? <X /> : <div></div>}
      </div>
    );
  },
  sortingFn: (rowA, rowB) => {
    const valA = order[String(rowA.original.completed) as keyof typeof order];
    const valB = order[String(rowB.original.completed) as keyof typeof order];
    return valA - valB;
  },
};
