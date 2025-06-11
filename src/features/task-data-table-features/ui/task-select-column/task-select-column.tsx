"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TypeTaskColumns } from "@/entities/task/model/types/task";
import {Checkbox, DataTableSortingHeader} from "@/shared/ui";
import { Check, X } from "lucide-react";

export const selectInTaskDataTableColumn: ColumnDef<TypeTaskColumns> = {
  // todo не вызывает ререндер!!
  id: "select",
  accessorKey: "select",
  header: ({ table }) => (
      <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
      />
  ),
  cell: ({ row }) => (
      <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
      />
  ),
  enableSorting: false,
  enableHiding: false,
};

