"use client";

import {getTaskCompletionPercentage} from "@/entities/task";
import {TypeTask} from "@/entities/task/public-types";
import {useTasksDataTableContext} from "@/features/task-data-table-features";
import {cn} from "@/shared/lib/utils";
import {DataTableV2, DefaultDataCell, TableRow} from "@/shared/ui";
import {Row} from "@tanstack/react-table";
import {useSession} from "next-auth/react";

export const DataTableForWidget = () => {
  const { table, observerRef, isLoading } = useTasksDataTableContext();

  return (
    <>
      <DataTableV2 table={table} isLoading={isLoading} Row={DataTableRow} />
      <div ref={observerRef} />
    </>
  );
};

const DataTableRow = ({ row }: { row: Row<TypeTask> }) => {
  const now = new Date();
  const session = useSession().data;
  const percent = getTaskCompletionPercentage(row.original, now.getTime());

  const visualRequest =
    session &&
    ((row.original.completeRequest &&
      (session.user.role === "ADMIN" ||
        (session.user.role === "MANAGER" &&
          session.user.id === row.original.author.id))) ||
      row.original.workers?.some((worker) => worker.id === session.user.id));

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      style={{ width: `${percent >= 100 ? 100 : percent}%` }}
      className={cn(
        "relative",
        {
          "bg-red-500/25 data-[state=selected]:bg-red-500/10 hover:bg-red-500/20":
            row.original.completed === false,
          "bg-green-500/25 data-[state=seleced]:bg-red-500/10 hover:bg-green-500/20":
            row.original.completed === true,
        },
        {
          "bg-fuchsia-700 data-[state=seleced]:bg-red-500/10 hover:bg-fuchsia-700/20":
            visualRequest,
        }
      )}
    >
      {row.getVisibleCells().map((cell) => (
        <DefaultDataCell cell={cell} key={cell.id} />
      ))}
      {row.original.completed === null && <Progress percent={percent} />}
    </TableRow>
  );
};

const Progress = ({ percent }: { percent: number }) => {
  return (
    <td
      className={`absolute left-0 top-0 bottom-0 bg-muted-foreground/10 pointer-events-none `}
      style={{ width: `${percent >= 100 ? 100 : percent}%` }}
    />
  );
};
