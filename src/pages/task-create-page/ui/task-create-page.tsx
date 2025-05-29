// 'use client'
import {TaskPageCardClient} from "@/entities/task";
import {TaskFormWidget} from "@/widgets/task-form-widget";
import {UsersDataTable} from "@/entities/user/ui/users-data-table/users-data-table";

export default async function TaskCreatePage() {
    // const [selectedUser, setSelectedUser] = useState();

    // const data = await getAllUsers().then(u => u.data);

    const data = [
        {
            id: "6804f1ae-6152-4b9a-8f16-b28803088637",
            firstname: "Admin",
            lastname: "User",
            imageUrl: null,
            email: "admin@example.com",
            role: "ADMIN",
            createdAt: "2025-05-14T12:46:13.347Z"
        },
        {
            id: "ce175363-ccc0-4946-bee2-5f9b31b5ee6e",
            firstname: "Manager",
            lastname: "User",
            imageUrl: null,
            email: "manager@example.com",
            role: "MANAGER",
            createdAt: "2025-05-14T12:46:13.347Z"
        },
        {
            id: "d291ce41-cd2d-473e-a4ce-5ba6fc75bec7",
            firstname: "Worker1",
            lastname: null,
            imageUrl: null,
            email: "worker1@example.com",
            role: "WORKER",
            createdAt: "2025-05-14T12:46:13.347Z"
        },
        {
            id: "afa1d304-0ba5-4a86-8909-261e524efa8c",
            firstname: "Worker2",
            lastname: null,
            imageUrl: null,
            email: "worker2@example.com",
            role: "WORKER",
            createdAt: "2025-05-14T12:46:13.347Z"
        }
    ]

    // console.log(data)

  return (
    <div className="flex gap-x-12 mx-auto max-w-[1200px] items-start mt-6">
      <div>
          <TaskPageCardClient />
          <div>
              <UsersDataTable
                  // data={data}
                              /*todo FIX when use client everything breaks*/
                              // setSelectedUser={setSelectedUser}
              />
          </div>
      </div>

      <TaskFormWidget type="create" />
    </div>
  );
}
