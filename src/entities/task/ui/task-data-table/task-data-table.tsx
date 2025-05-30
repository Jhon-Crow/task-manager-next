"use client";

import {
  ColumnDef,
  getCoreRowModel,
  TableOptions,
} from "@tanstack/react-table";
import { TypeTaskColumns } from "../../model/types/task";
import { DataTable } from "@/shared/ui";
import { taskDataDefaultColumns as defaultColumns } from "./columns/columns";

interface TaskDataTableProps {
  tasks: TypeTaskColumns[];
  columns?: Record<string, ColumnDef<TypeTaskColumns>>;
  options?: Omit<
    TableOptions<TypeTaskColumns>,
    "data" | "columns" | "getCoreRowModel"
  >;
}

export function TaskDataTable({ tasks, columns, options }: TaskDataTableProps) {
  const defaultOptions: Omit<
    TableOptions<TypeTaskColumns>,
    "data" | "columns"
  > = {
    getCoreRowModel: getCoreRowModel<TypeTaskColumns>(),
  };
  return (
    <DataTable
      data={tasks}
      columns={
        columns
          ? [...Object.values(Object.assign({}, defaultColumns, columns))]
          : Object.values(defaultColumns)
      }
      options={{ ...defaultOptions, ...options }}
    />
  );
}
