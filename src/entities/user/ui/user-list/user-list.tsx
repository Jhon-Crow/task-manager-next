import type {TypeUser} from "../../model/types/user";
import {UserListCard} from "../user-list-card/user-list-card";
import {UserActionsMenu} from "@/entities/user";

export function UserList({ users }: { users: TypeUser[] }) {
  return (
    <div className="space-y-4">
        {users.map((user) => (
            <UserActionsMenu key={user.id}>
              <UserListCard user={user} key={user.id} />
            </UserActionsMenu>
        //todo обернуть в добавлялку экшнов
        ))}
    </div>
  );
}
