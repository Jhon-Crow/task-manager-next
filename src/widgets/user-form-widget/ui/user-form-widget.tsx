import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";
import { AddUserForm } from "@/features/add-user-form";

export function UserFormWidget({ type }: { type: "add" | "update" }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Создать задачу</CardTitle>
      </CardHeader>
      <CardContent>
        {type === "add" ? <AddUserForm /> : "<UpdateTaskForm />"}
      </CardContent>
    </Card>
  );
}
