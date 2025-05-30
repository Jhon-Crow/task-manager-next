"use client";
import { DataTableV2 } from "@/shared/ui";
import {
  ColumnDef,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { userDataTableColumns } from "./columns/user-data-table-columns";
import { TypeUser } from "../../types";

export function UsersDataTable({
  data,
  addColumns,
  shiftColumns,
  options,
  className,
}: {
  className?: string;
  data: TypeUser[];
  addColumns?: Record<string, ColumnDef<TypeUser>>;
  shiftColumns?: Record<string, ColumnDef<TypeUser>>;
  options?: Omit<
    TableOptions<TypeUser>,
    "data" | "columns" | "getCoreRowModel"
  >;
}) {
  const table = useReactTable({
    data,
    columns: Object.values(
      Object.assign(
        {},
        shiftColumns,
        userDataTableColumns as Record<string, TypeUser>,
        addColumns
      )
    ),
    getCoreRowModel: getCoreRowModel(),
    ...options,
  });

  return <DataTableV2 className={className} table={table} />;
}
