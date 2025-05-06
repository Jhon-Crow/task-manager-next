import {Card, CardContent, CardHeader, CardTitle} from "@/shared/ui";
import {UserList} from "@/entities/user/ui/user-list/user-list";
import {TypeUser} from "@/entities/user/model/types/user";

export function UserListWidget({ users }: { users: TypeUser[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Список пользователей:</CardTitle>
      </CardHeader>
      <CardContent>
        <UserList users={users} />
      </CardContent>
    </Card>
  );
}
