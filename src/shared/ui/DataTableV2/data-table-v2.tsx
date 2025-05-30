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

type DataTableProps<TData> = {
  table: TypeTable<TData>;
  Headers?: FC<DefaultDataTableHeaderGroupsProps<TData>>;
  Body?: FC<DefaultTableBodyProps<TData>>;
  HeaderGroup?: FC<DefaultDataTableHeaderRow<TData>>;
  Head?: FC<DefaultDataTableHeadProps<TData, unknown>>;
  Row?: FC<DefaultTableRowProps<TData>>;
  Cell?: FC<DefaultTableCell<TData, unknown>>;
  NoResultContent?: FC<Pick<DefaultTableBodyProps<TData>, "columnsLength">>;
  className?: string;
};

export function DataTableV2<TData>({
  table,
  Headers = DefaultDataTableHeaderGroups,
  Body = DefaultTableBody,
  HeaderGroup,
  Head,
  Row,
  Cell,
  NoResultContent,
  className,
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
          NoResultContent={NoResultContent}
        />
      </Table>
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
};
export function DefaultTableBody<TData>({
  rows,
  columnsLength,
  Row = DefaultTableRow,
  NoResultContent = DefaultNoResultContent,
  Cell,
}: DefaultTableBodyProps<TData>) {
  return (
    <TableBody>
      {rows.length ? (
        rows.map((row) => <Row row={row} key={row.id} Cell={Cell} />)
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
  row.getVisibleCells();
  return (
    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
