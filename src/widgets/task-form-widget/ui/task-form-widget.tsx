import { CreateTaskForm } from "@/features/add-task-form/ui/add-task-form";
import UpdateTaskForm from "@/features/update-task-form/ui/update-task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export function TaskFormWidget({ type }: { type: "create" | "update" }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === "create" ? "Создать задачу" : "Обновить Задачу"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {type === "create" ? <CreateTaskForm /> : <UpdateTaskForm />}
      </CardContent>
    </Card>
  );
}
