"use client";

import { useTasksDataTableContext } from "@/features/task-data-table-features";
import { DataTable } from "@/shared/ui";

export const DataTableForWidget = () => {
  const { table, observerRef, isLoading } = useTasksDataTableContext();
  const { rows } = table.getRowModel();

  return (
    <>
      <DataTable table={table} rows={rows} isLoading={isLoading} />
      <div ref={observerRef} />
    </>
  );
};
