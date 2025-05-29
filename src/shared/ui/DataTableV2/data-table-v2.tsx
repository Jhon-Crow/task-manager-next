
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
import { ReactNode } from "react";

type DataTableProps<TData> = {
  table: TypeTable<TData>;
  headers?: ReactNode;
  body?: ReactNode;
};

export function DataTableV2<TData>({
  table,
  headers,
  body,
}: DataTableProps<TData>) {
  return (
    <div className="rounded-md border">
      <Table>
        {headers || (
          <DefaultDataTableHeaderGroups
            headerGroups={table.getHeaderGroups()}
          />
        )}
        {body || (
          <DefaultTableBody
            rows={table.getRowModel().rows}
            columnsLength={table.getAllColumns() ? table.getAllColumns().length : 1}
          />
        )}
      </Table>
    </div>
  );
}

type DefaultDataTableHeaderGroupsProps<TData> = {
  headerGroups: HeaderGroup<TData>[];
  headerRow?: ReactNode;
};
export function DefaultDataTableHeaderGroups<TData>({
  headerGroups,
  headerRow,
}: DefaultDataTableHeaderGroupsProps<TData>) {
  return (
    <TableHeader>
      {headerRow ||
        headerGroups.map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <DefaultTableHead key={header.id} header={header} />
            ))}
          </TableRow>
        ))}
    </TableHeader>
  );
}

type DefaultDataTableHeadProps<TData, TValue> = {
  header: Header<TData, TValue>;
  head?: ReactNode;
};
export function DefaultTableHead<TData, TValue>({
  header,
  head,
}: DefaultDataTableHeadProps<TData, TValue>) {
  return (
    head || (
      <TableHead>
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
      </TableHead>
    )
  );
}

type DefaultTableBodyProps<TData> = {
  rows: Row<TData>[];
  columnsLength: number;
  rowsContent?: ReactNode;
  noResultContent?: ReactNode;
};
export function DefaultTableBody<TData>({
  rows,
  columnsLength,
  rowsContent,
  noResultContent,
}: DefaultTableBodyProps<TData>) {
  return (
    <TableBody>
      {rowsContent || rows.length
        ? rows.map((row) => <DefaultTableRow row={row} key={row.id} />)
        : noResultContent || (
            <DefaultNoResultContent columnsLength={columnsLength} />
          )}
    </TableBody>
  );
}

type DefaultTableRowProps<TData> = {
  row: Row<TData>;
  cell?: ReactNode;
};
export function DefaultTableRow<TData>({
  row,
  cell,
}: DefaultTableRowProps<TData>) {
  row.getVisibleCells();
  return (
    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
      {cell ||
        row
          .getVisibleCells()
          .map((cell) => <DefaultDataCell key={cell.id} cell={cell} />)}
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
