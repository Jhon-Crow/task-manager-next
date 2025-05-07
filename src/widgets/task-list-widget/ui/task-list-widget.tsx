import { TaskList } from "@/entities/task";
import { TypeTask } from "@/entities/task/public-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export function TaskListWidget({ tasks }: { tasks: TypeTask[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Список задач:</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskList tasks={tasks} />
      </CardContent>
    </Card>
  );
}
