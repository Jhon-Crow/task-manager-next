'use client'
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
import {useState} from "react";

export default async function TaskCreatePage() {
    const [selectedUser, setSelectedUser] = useState();
    const data = await getAllUsers().then(u => u.data);



  return (
    <div className="flex gap-x-12 mx-auto max-w-[1200px] items-start mt-6">
      <div>
          <TaskPageCardClient />
          <div>
              <UsersDataTable data={data} setSelectedUser={setSelectedUser} />
          </div>
      </div>

      <TaskFormWidget type="create" />
    </div>
  );
}
