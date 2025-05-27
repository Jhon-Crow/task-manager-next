// 'use client'
import { TaskPageCardClient } from "@/entities/task";
import { TaskFormWidget } from "@/widgets/task-form-widget";
import {DataTableV2} from "@/shared/ui";
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import {UsersDataTable} from "@/entities/user/ui/users-data-table/users-data-table";
import {getAllUsers} from "@/entities/user";

export default async function TaskCreatePage() {
    const data = await getAllUsers().then(u => u.data);
    //todo сделать энтити с получением юзеров и захардкоженными полями
    // экспортировать в форму, не заморачиваться с визуалом

    // const data = [
    //     {id: '1', status: 'success'},
    //     {id: '2', status: 'rejected'},
    //     {id: '3', status: 'success'},
    // ]

    console.log(data)

    // const columns = [
    //     {
    //         accessorKey: "status",
    //         header: "Status",
    //         cell: ({ row }) => (
    //             <div className="capitalize">{row.getValue("status")}</div>
    //         ),
    //     },
    // ]


  return (
    <div className="flex gap-x-12 mx-auto max-w-[1200px] items-start mt-6">
      <div>
          <TaskPageCardClient />
          <div>
              <UsersDataTable data={data} />
          </div>
      </div>

      <TaskFormWidget type="create" />
    </div>
  );
}
