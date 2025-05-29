"use client";

import { TypeTaskWorker } from "@/entities/task/public-types";
import { Checkbox } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";

export const selectInUserDataTableColumn: ColumnDef<TypeTaskWorker> = {
  id: "select",
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
