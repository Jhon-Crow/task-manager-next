import type {TypeUser} from "../../model/types/user";
import {UserListCard} from "../user-list-card/user-list-card";

export function UserList({ users }: { users: TypeUser[] }) {
  return (
    <div className="space-y-4">
        {users.map((user) => (
          <UserListCard user={user} key={user.id} />
        ))}
    </div>
  );
}
