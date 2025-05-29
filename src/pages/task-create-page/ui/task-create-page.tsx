// 'use client'
import {TaskPageCardClient} from "@/entities/task";
import {TaskFormWidget} from "@/widgets/task-form-widget";
import {UsersDataTable} from "@/entities/user/ui/users-data-table/users-data-table";
import {getAllUsers} from "@/entities/user";

export default async function TaskCreatePage() {
    // const [selectedUser, setSelectedUser] = useState();

    const data = await getAllUsers().then(user => user.data);

  return (
    <div className="flex gap-x-12 mx-auto max-w-[1200px] items-start mt-6">
      <div>
          <TaskPageCardClient />
          <div>
              <UsersDataTable
                  data={data}
                              /*todo FIX when use client everything breaks*/
                              // setSelectedUser={setSelectedUser}
              />
          </div>
      </div>

      <TaskFormWidget type="create" />
    </div>
  );
}
