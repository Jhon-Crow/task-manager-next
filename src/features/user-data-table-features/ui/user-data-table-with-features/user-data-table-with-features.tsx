"use client";

import { TypeTaskWorker } from "@/entities/task/public-types";
import { UsersDataTable } from "@/entities/user/ui/users-data-table/users-data-table";
import {
  ColumnDef,
  getSortedRowModel,
  SortingState,
  TableOptions,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { selectInUserDataTableColumn } from "../user-data-table-selection-column/user-data-table-selection-column";
import { userDataTableSortingColumn } from "../user-data-table-sorting-columns/user-data-table-sorting-columns";
import { TypeUser } from "@/entities/user/types";

export const WorkersDataTableWithFeatures = ({
  workers,
}: {
  workers: TypeTaskWorker[];
}) => {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, onSortingChange] = useState<SortingState>([]);

  useEffect(() => {
    setRowSelection({});
  }, [workers]);

  useEffect(() => {
    const selectedUsers = Object.keys(rowSelection).map(
      (k) => workers[Number(k)].id
    );
    console.log(selectedUsers);
  }, [rowSelection, workers]);

  const options = {
    onRowSelectionChange: setRowSelection,
    onSortingChange,
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
      sorting,
    },
  } as Partial<TableOptions<TypeUser>>;

  return (
    <UsersDataTable
      data={workers as TypeUser[]}
      options={options}
      shiftColumns={{
        select: selectInUserDataTableColumn as ColumnDef<TypeUser>,
      }}
      addColumns={
        userDataTableSortingColumn as Record<string, ColumnDef<TypeUser>>
      }
    />
  );
};
