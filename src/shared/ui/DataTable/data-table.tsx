"use client";

import {
  ColumnDef,
  flexRender,
  Table as TTable,
  TableOptions,
  useReactTable,
  HeaderGroup,
  Row,
  getCoreRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Table/table";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "../Tooltip/tooltip";
import { cn } from "@/shared/lib/utils";
import { ReactNode, Ref } from "react";
import { Skeleton } from "../Skeleton/skeleton";

interface DataTableProps {
  ref?: Ref<HTMLDivElement> | null;
}

interface DefaultDataTableProps<TData, TValue> extends DataTableProps {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  options: Partial<Omit<TableOptions<TData>, "columns" | "data">>;
  table?: undefined;
}

interface TableDataTableProps<TData> extends DataTableProps {
  table: TTable<TData>;
  rows?: Row<TData>[];
  isLoading?: boolean;
}

function DataTableHeader<TData>({
  headers,
}: {
  headers: HeaderGroup<TData>[];
}) {
  return (
    <TableHeader>
      {headers.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

function DataTableLayout({
  ref,
  headers,
  body,
}: {
  ref?: Ref<HTMLDivElement> | null;
  headers: ReactNode;
  body: ReactNode;
}) {
  return (
    <div className="rounded-md border" ref={ref}>
      <Table>
        <TooltipProvider>
          {headers}
          {body}
        </TooltipProvider>
      </Table>
    </div>
  );
}

function DataTableContent<TData extends object>({
  rows,
  columnsLength,
  isLoading,
}: {
  rows: Row<TData>[];
  columnsLength: number;
  isLoading?: boolean;
}) {
  return rows.length ? (
    <>
      {rows.map((row) => {
        return (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected()}
            data-pending={
              "pending" in row.original ? row.original.pending : undefined
            }
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
      {isLoading && (
        <TableRow className="p-0">
          <TableCell className="p-0" colSpan={columnsLength}>
            <Skeleton className="w-full h-24 rounded-none" />
          </TableCell>
        </TableRow>
      )}
    </>
  ) : isLoading ? (
    <TableRow className="p-0">
      <TableCell className="p-0" colSpan={columnsLength}>
        <Skeleton className="w-full h-24 rounded-none" />
      </TableCell>
    </TableRow>
  ) : (
    <TableRow>
      <TableCell colSpan={columnsLength} className="h-24 text-center">
        Нет Данных.
      </TableCell>
    </TableRow>
  );
}

function DefaultDataTable<TData, TValue>({
  columns,
  data,
  options,
  ref,
}: DefaultDataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...options,
  });

  return (
    <DataTableLayout
      ref={ref}
      headers={<DataTableHeader headers={table.getHeaderGroups()} />}
      body={
        <TableBody>
          <DataTableContent
            rows={table.getRowModel().rows}
            columnsLength={columns.length}
          />
        </TableBody>
      }
    />
  );
}

function DataTableWithTable<TData>({
  table,
  ref,
  rows,
  isLoading,
}: TableDataTableProps<TData>) {
  return (
    <DataTableLayout
      ref={ref}
      body={
        <TableBody>
          <DataTableContent
            rows={rows ? rows : table.getCoreRowModel().rows}
            columnsLength={table.getAllColumns().length}
            isLoading={isLoading}
          />
        </TableBody>
      }
      headers={<DataTableHeader headers={table.getHeaderGroups()} />}
    />
  );
}

export function DataTable<TData, TValue>(
  props: TableDataTableProps<TData> | DefaultDataTableProps<TData, TValue>
) {
  if (props.table) {
    return <DataTableWithTable {...props} />;
  }
  return <DefaultDataTable {...props} />;
}

export const TruncatedTextWithTooltip = ({
  text,
  className,
  content,
}: {
  text: string;
  className?: string;
  content?: ReactNode;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={cn("truncate block", className)}>{text}</span>
      </TooltipTrigger>
      <TooltipContent>{content ? content : text}</TooltipContent>
    </Tooltip>
  );
};
