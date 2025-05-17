import {Card, CardContent, CardHeader, CardTitle} from "@/shared/ui";
import {AddUserForm} from "@/features/add-user-form";
import {UpdateUserForm} from "@/features/update-user-form";
import {User} from "@/shared/lib/db/generated";

export function UserFormWidget({ type, userId }: { type: "add" | "update", userId: User['id'] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Создать задачу</CardTitle>
      </CardHeader>
      <CardContent>
        {type === "add" ? <AddUserForm /> : <UpdateUserForm userId={userId}/>}
      </CardContent>
    </Card>
  );
}
