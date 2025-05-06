import { AddTaskForm } from "@/features/add-task-form/ui/add-task-form";
import UpdateTaskForm from "@/features/update-task-form/ui/update-task-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export function TaskFormWidget({ type }: { type: "add" | "update" }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Создать задачу</CardTitle>
      </CardHeader>
      <CardContent>
        {type === "add" ? <AddTaskForm /> : <UpdateTaskForm />}
      </CardContent>
    </Card>
  );
}
