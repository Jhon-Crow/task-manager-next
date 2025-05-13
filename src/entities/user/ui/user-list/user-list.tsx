import type {TypeUser} from "../../model/types/user";
import {UserListCard} from "../user-list-card/user-list-card";
import {ComponentType, ReactNode} from "react";

type OptionsSlot = ComponentType<{ userId: string; children: ReactNode }>;

export function UserList({ users, OptionsSlot }: { users: TypeUser[], OptionsSlot: OptionsSlot }) {
  return (
    <div className="space-y-4">
        {users.map((user) => (
            <OptionsSlot userId={user.id} key={user.id}>
              <UserListCard user={user} key={user.id} />
            </OptionsSlot>
        ))}
    </div>
  );
}
