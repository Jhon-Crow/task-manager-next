import { userDataTableColumns } from "@/entities/user";
import { TypeUser } from "@/entities/user/types";
import { DataTableSortingHeader } from "@/shared/ui";
import { ColumnDef } from "@tanstack/react-table";

export const userDataTableSortingColumn: Partial<
  Record<keyof TypeUser, ColumnDef<TypeUser>>
> = {
  firstname: {
    accessorKey: "firstname",
    header: (props) => <DataTableSortingHeader {...props} title="Имя" />,
    cell: userDataTableColumns.firstname?.cell,
    sortingFn: (rowA, rowB) =>
      (rowA.original.firstname + rowA.original.lastname).localeCompare(
        rowB.original.firstname + rowB.original.lastname
      ),
  },
  email: {
    accessorKey: "email",
    header: (props) => (
      <DataTableSortingHeader {...props} title="Почтовый адрес" />
    ),
    cell: userDataTableColumns.email?.cell,
    // sortingFn: (a, b) =>
    //   a.original.email
    //     .toLocaleLowerCase()
    //     .localeCompare(b.original.email.toLocaleLowerCase()),
  },
};
