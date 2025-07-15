import {
  Cell,
  flexRender,
  Row,
  type Header,
  type HeaderGroup,
  type Table as TypeTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Table/table";
import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Skeleton } from "../Skeleton/skeleton";
import {Button} from "@/shared/ui";

type DataTableProps<TData> = {
  table: TypeTable<TData>;
  Headers?: FC<DefaultDataTableHeaderGroupsProps<TData>>;
  Body?: FC<DefaultTableBodyProps<TData>>;
  HeaderGroup?: FC<DefaultDataTableHeaderRow<TData>>;
  Head?: FC<DefaultDataTableHeadProps<TData, unknown>>;
  Row?: FC<DefaultTableRowProps<TData>>;
  Cell?: FC<DefaultTableCell<TData, unknown>>;
  NoResultContent?: FC<Pick<DefaultTableBodyProps<TData>, "columnsLength">>;
  IsLoadingRow?: FC<DefaultDataTableIsLoadingProps>;
  className?: string;
  isLoading?: boolean;
};

export function DataTableV2<TData>({
  table,
  Headers = DefaultDataTableHeaderGroups,
  Body = DefaultTableBody,
  IsLoadingRow,
  HeaderGroup,
  Head,
  Row,
  Cell,
  NoResultContent,
  className,
  isLoading,
}: DataTableProps<TData>) {
  return (
    <div className={cn("rounded-md border", className)}>
      <Table>
        <Headers
          Head={Head}
          headerGroups={table.getHeaderGroups()}
          HeaderGroup={HeaderGroup}
        />
        <Body
          rows={table.getRowModel().rows}
          columnsLength={table.getAllColumns().length}
          Row={Row}
          Cell={Cell}
          isLoading={isLoading}
          NoResultContent={NoResultContent}
          IsLoadingRow={IsLoadingRow}
        />
      </Table>
      <div className="space-x-2">
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

type DefaultDataTableHeaderGroupsProps<TData> = {
  headerGroups: HeaderGroup<TData>[];
  HeaderGroup?: FC<DefaultDataTableHeaderRow<TData>>;
  Head?: FC<DefaultDataTableHeadProps<TData, unknown>>;
};
export function DefaultDataTableHeaderGroups<TData>({
  headerGroups,
  HeaderGroup = DefaultDataTableHeaderGroup,
  Head,
}: DefaultDataTableHeaderGroupsProps<TData>) {
  return (
    <TableHeader>
      {headerGroups.map((headerGroup) => (
        <HeaderGroup
          headerGroup={headerGroup}
          key={headerGroup.id}
          Head={Head}
        />
      ))}
    </TableHeader>
  );
}

type DefaultDataTableHeaderRow<TData> = {
  headerGroup: HeaderGroup<TData>;
  Head?: FC<DefaultDataTableHeadProps<TData, unknown>>;
};

export function DefaultDataTableHeaderGroup<TData>({
  headerGroup,
  Head = DefaultTableHead,
}: DefaultDataTableHeaderRow<TData>) {
  return (
    <TableRow>
      {headerGroup.headers.map((header) => (
        <Head key={header.id} header={header} />
      ))}
    </TableRow>
  );
}

type DefaultDataTableHeadProps<TData, TValue> = {
  header: Header<TData, TValue>;
};
export function DefaultTableHead<TData, TValue>({
  header,
}: DefaultDataTableHeadProps<TData, TValue>) {
  return (
    <TableHead>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </TableHead>
  );
}

type DefaultTableBodyProps<TData> = {
  rows: Row<TData>[];
  columnsLength: number;
  Row?: FC<DefaultTableRowProps<TData>>;
  NoResultContent?: FC<Pick<DefaultTableBodyProps<TData>, "columnsLength">>;
  Cell?: FC<DefaultTableCell<TData, unknown>>;
  isLoading?: boolean;
  IsLoadingRow?: FC<DefaultDataTableIsLoadingProps>;
};
export function DefaultTableBody<TData>({
  rows,
  columnsLength,
  Row = DefaultTableRow,
  NoResultContent = DefaultNoResultContent,
  Cell,
  isLoading,
  IsLoadingRow = DefaultDataTableIsLoading,
}: DefaultTableBodyProps<TData>) {
  return (
    <TableBody>
      {rows.length ? (
        rows.map((row) => <Row row={row} key={row.id} Cell={Cell} />)
      ) : isLoading ? (
        <IsLoadingRow columnsLength={columnsLength} />
      ) : (
        <NoResultContent columnsLength={columnsLength} />
      )}
    </TableBody>
  );
}

type DefaultTableRowProps<TData> = {
  row: Row<TData>;
  Cell?: FC<DefaultTableCell<TData, unknown>>;
};
export function DefaultTableRow<TData>({
  row,
  Cell = DefaultDataCell,
}: DefaultTableRowProps<TData>) {
  return (
    <TableRow data-state={row.getIsSelected() && "selected"}>
      {row.getVisibleCells().map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </TableRow>
  );
}

type DefaultTableCell<TData, TValue> = {
  cell: Cell<TData, TValue>;
};
export function DefaultDataCell<TData, TValue>({
  cell,
}: DefaultTableCell<TData, TValue>) {
  return (
    <TableCell>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
}

export function DefaultNoResultContent<TData>({
  columnsLength,
}: Pick<DefaultTableBodyProps<TData>, "columnsLength">) {
  return (
    <TableRow>
      <TableCell colSpan={columnsLength} className="h-24 text-center">
        Нет данных.
      </TableCell>
    </TableRow>
  );
}

type DefaultDataTableIsLoadingProps = {
  columnsLength: number;
};
export function DefaultDataTableIsLoading({
  columnsLength,
}: DefaultDataTableIsLoadingProps) {
  return (
    <TableRow className="p-0">
      <TableCell className="p-0" colSpan={columnsLength}>
        <Skeleton className="w-full h-24 rounded-none" />
      </TableCell>
    </TableRow>
  );
}
