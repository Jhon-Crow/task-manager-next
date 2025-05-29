"use client";
import React, { useState, useEffect } from "react";
import { Checkbox, DataTableV2 } from "@/shared/ui";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TypeTaskWorker } from "@/entities/task/public-types";
import { UserAvatar } from "../user-avatar/user-avatar";

export function UsersDataTable({
  data,
  setSelectedWorker,
  className,
  workersId,
}: {
  className?: string;
  data: TypeTaskWorker[];
  workersId?: TypeTaskWorker["id"][];
  setSelectedWorker?: (worker: TypeTaskWorker["id"][]) => void;
}) {
  const [rowSelection, setRowSelection] = useState({});
  useEffect(() => {
    setRowSelection(
      workersId
        ? data.reduce(
            (acc, worker, index) => ({
              ...acc,
              [index]: workersId.some((id) => worker.id === id),
            }),
            {} as Record<string, boolean>
          )
        : {}
    );
  }, [data, workersId]);
  useEffect(() => {
    const selectedUsers = Object.keys(rowSelection).map(
      (k) => data[Number(k)].id
    );

    if (!setSelectedWorker) return;
    setSelectedWorker(selectedUsers);
  }, [rowSelection, data, setSelectedWorker]);
  const columns: ColumnDef<TypeTaskWorker>[] = [
    {
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
    },

    {
      accessorKey: "firstname",
      header: "Имя",
      cell: ({ row }) => (
        <div className="capitalize">
          <UserAvatar user={row.original} />
          {String(row.getValue("firstname") || "")}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return <DataTableV2 className={className} table={table} />;
}
