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
import { useTaskActions } from "@/entities/task";
import { useSelectWorkersIdInTask } from "@/entities/task/model/selectors/selectTask";

export const WorkersDataTableWithFeatures = ({
  workers,
  className,
}: {
  workers: TypeTaskWorker[];
  className?: string;
}) => {
  const [rowSelection, setRowSelection] = useState<Record<number, boolean>>({});
  const [sorting, onSortingChange] = useState<SortingState>([]);
  const { setWorkers, setNewTaskWorkers } = useTaskActions();
  const defaultWorkersId = useSelectWorkersIdInTask();

  useEffect(() => {
    setWorkers(workers);
  }, [setWorkers, workers]);

  useEffect(() => {
    setRowSelection(
      workers.reduce(
        (acc, worker, index) => ({
          ...acc,
          [index]: defaultWorkersId?.some((id) => worker.id === id),
        }),
        {}
      )
    );
  }, [defaultWorkersId, workers]);

  useEffect(() => {
    const selectedWorkers = Object.entries(rowSelection).reduce(
      (acc, [k, v]) => {
        if (v) return [...acc, workers[Number(k)].id];
        return acc;
      },
      [] as string[]
    );

    setNewTaskWorkers(selectedWorkers);
  }, [rowSelection, setNewTaskWorkers, workers]);

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
      className={className}
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
