import {Checkbox} from "@/shared/ui";
import {TypeTaskWorker} from "@/entities/task/model/types/task";
import {ColumnDef} from "@tanstack/react-table";
import {UserAvatar} from "@/entities/user";
import {UserRoleIcon} from "@/entities/user/ui/users-icons/role-icon";
import {TypeUser} from "@/entities/user/model/types/user";

//             id: "6804f1ae-6152-4b9a-8f16-b28803088637",
//             firstname: "Admin",
//             lastname: "User",
//             imageUrl: null,
//             email: "admin@example.com",
//             role: "ADMIN",
//             createdAt: "2025-05-14T12:46:13.347Z"


// : ColumnDef<TypeTaskWorker>

type ColumnsObject = {
    [key: string]: ColumnDef<TypeTaskWorker>;
}

export const columns: ColumnsObject = {
select: {
    id: "select",
        header: ({ table }) => (
    <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
    />
),
    cell: ({ row }) => (
    <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
    />
),
    enableSorting: false,
    enableHiding: false,
},

firstname: {
    accessorKey: 'firstname',
    header: 'Имя',
    cell: ({row}) => {
        const firstname: string = row.getValue('firstname');
        const lastname: string | null = row.original.lastname;
        const imageUrl: string | null = row.original.imageUrl;
         return (
         <div className='flex items-center gap-2'>
             <UserAvatar user={{firstname, lastname, imageUrl}}/>
            <div className="capitalize">
                {String(firstname + ' ' + (lastname ?? ''))}
            </div>
        </div>)

}
},

email: {
    accessorKey: 'email',
        header: 'Электронная почта',
    cell: ({ row }) => (
    <div>
        {String(row.getValue('email'))}
    </div>
)
},






};