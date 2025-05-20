import { TypeTask } from "@/entities/task/public-types";
import { TaskListCard } from "@/entities/task/ui/task-list-card/task-list-card";
import { TaskContextMenu } from "@/features/task-context-menu";
import { TimerProvider } from "@/shared/providers";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export function TaskListWidget({ tasks }: { tasks: TypeTask[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Список задач:</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <TimerProvider>
          {tasks.map((task, index) => (
            <TaskContextMenu
              type={index % 2 === 0 ? "form" : "onclick"}
              key={task.id}
              id={task.id}
            >
              <TaskListCard task={task} />
            </TaskContextMenu>
          ))}
        </TimerProvider>
      </CardContent>
    </Card>
  );
}
