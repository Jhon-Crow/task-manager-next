import { ColumnDef } from "@tanstack/react-table";
import { UserAvatar } from "@/entities/user";
import { TypeTaskWorker } from "@/entities/task/public-types";
import { TypeUser } from "@/entities/user/types";

export const userDataTableColumns: Partial<
  Record<keyof TypeTaskWorker, ColumnDef<TypeUser>>
> = {
  firstname: {
    accessorKey: "firstname",
    header: "Имя",
    cell: ({ row }) => {
      const firstname: string = row.getValue("firstname");
      const lastname: string | null = row.original.lastname;
      const imageUrl: string | null = row.original.imageUrl;
      return (
        <div className="flex items-center gap-2">
          <UserAvatar user={{ firstname, lastname, imageUrl }} />
          <div className="capitalize">
            {String(firstname + " " + (lastname ?? ""))}
          </div>
        </div>
      );
    },
  },

  email: {
    accessorKey: "email",
    header: "Электронная почта",
    cell: ({ row }) => <div>{String(row.getValue("email"))}</div>,
  },
};
