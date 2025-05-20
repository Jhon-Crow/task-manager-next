import type { TypeUser } from "../../model/types/user";
import { UserListCard } from "../user-list-card/user-list-card";
import { ComponentType } from "react";

type OptionsSlot = ComponentType<{ userId: string }>;

export function UserList({
  users,
  Actions,
}: {
  users: TypeUser[];
  Actions: OptionsSlot;
}) {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserListCard
          user={user}
          key={user.id}
          actions={<Actions userId={user.id} />}
        />
      ))}
    </div>
  );
}
